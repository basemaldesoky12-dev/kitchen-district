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
  let payload: InquiryPayload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = payload.name?.trim();
  if (!name) {
    return Response.json({ error: "Name is required" }, { status: 400 });
  }

  // Honeypot filled → pretend success, send nothing.
  if (payload.website?.trim()) {
    return Response.json({ ok: true });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY is not set");
    return Response.json({ error: "Email service unavailable" }, { status: 502 });
  }

  const source = payload.source === "contact" ? "Contact page" : "Inquiry modal";
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
    console.error("Brevo send failed", res.status, await res.text());
    return Response.json({ error: "Email send failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
