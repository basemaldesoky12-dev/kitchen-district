import { after } from "next/server";
import { createZohoLead } from "@/lib/zoho";
import type { InquiryFields, InquirySource } from "@/lib/inquiry";

// Email may take 10 seconds, then background token refresh + CRM another 20.
export const maxDuration = 45;

const RECIPIENTS = [
  "abdullah@kitchendistricts.com",
  "support@kitchendistricts.com",
  "basem.aldesoky@kitchendistricts.com",
  "ali@kitchendistricts.com",
];

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

type InquiryPayload = {
  source?: string;
  name?: string;
  brand?: string;
  city?: string;
  phone?: string;
  email?: string;
  branch?: string;
  message?: string;
  website?: string; // honeypot — humans never see or fill this field
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Invalid inquiry" }, { status: 400 });
  }
  const keys = ["source", "name", "brand", "city", "phone", "email", "branch", "message", "website"] as const;
  for (const key of keys) {
    const value = (body as Record<string, unknown>)[key];
    if (value !== undefined && typeof value !== "string") {
      return Response.json({ error: "Invalid inquiry field" }, { status: 400 });
    }
  }
  const payload = body as InquiryPayload;

  const name = payload.name?.trim();
  if (!name) {
    return Response.json({ error: "Name is required" }, { status: 400 });
  }

  // Honeypot filled → pretend success, send nothing.
  if (payload.website?.trim()) {
    return Response.json({ ok: true });
  }

  if (payload.source !== "modal" && payload.source !== "contact") {
    return Response.json({ error: "Invalid inquiry source" }, { status: 400 });
  }

  const fields: InquiryFields = { ...payload, name };
  const source = payload.source;
  // Schedule before sending email so CRM is attempted even if email fails.
  // Next.js keeps this task alive after the response; it cannot change it.
  try {
    after(async () => {
      try {
        await createZohoLead(source, fields);
      } catch {
        console.error("Inquiry CRM delivery failed");
      }
    });
  } catch {
    console.error("Inquiry CRM scheduling failed");
  }

  // Only email delivery determines the visitor's response.
  try {
    await sendInquiryEmail(source, fields);
  } catch {
    console.error("Inquiry email delivery failed");
    return Response.json({ error: "Email send failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}

async function sendInquiryEmail(inquirySource: InquirySource, payload: InquiryFields) {
  const name = payload.name;
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("BREVO_API_KEY is not set");
  }

  const source = inquirySource === "contact" ? "Contact page" : "Inquiry modal";
  const rows: [string, string | undefined][] = [
    ["Source", source],
    ["Name", name],
    ["Brand", payload.brand],
    ["City", payload.city],
    ["Phone", payload.phone],
    ["Email", payload.email],
    ["Preferred branch", payload.branch],
    ["Message", payload.message],
  ];
  const htmlContent = `<h2 style="margin:0 0 12px">New website inquiry</h2>
<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
${rows
  .filter(([, value]) => value?.trim())
  .map(
    ([label, value]) =>
      `<tr><td style="font-weight:bold;vertical-align:top">${label}</td><td>${escapeHtml(value!.trim())}</td></tr>`,
  )
  .join("\n")}
</table>`;

  const submitterEmail = payload.email?.trim();
  const res = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    signal: AbortSignal.timeout(10_000),
    headers: { "api-key": apiKey, "content-type": "application/json" },
    body: JSON.stringify({
      sender: {
        name: "Kitchen District Website",
        email: process.env.BREVO_SENDER_EMAIL ?? "basemaldesoky12@gmail.com",
      },
      to: RECIPIENTS.map((email) => ({ email })),
      ...(submitterEmail ? { replyTo: { email: submitterEmail, name } } : {}),
      subject: `${source}: ${name}${payload.brand?.trim() ? ` — ${payload.brand.trim()}` : ""}`,
      htmlContent,
    }),
  });

  if (!res.ok) {
    throw new Error(`Brevo send failed (HTTP ${res.status})`);
  }
}
