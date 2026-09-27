import "server-only";

import type { InquiryFields, InquirySource } from "./inquiry";

type LeadOptions = {
  sourceField?: string;
  branchField?: string;
};

type AccessToken = { value: string; expiresAt: number };
let cachedToken: AccessToken | undefined;
let pendingToken: Promise<AccessToken> | undefined;

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function origin(name: string): string {
  const url = new URL(requiredEnv(name));
  if (
    url.protocol !== "https:" || url.username || url.password ||
    url.pathname !== "/" || url.search || url.hash
  ) {
    throw new Error(`${name} must be an HTTPS origin`);
  }
  return url.origin;
}

function object(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

async function readJson(response: Response): Promise<Record<string, unknown>> {
  try {
    return object(await response.json());
  } catch {
    throw new Error(`Zoho returned invalid JSON (HTTP ${response.status})`);
  }
}

async function refreshToken(): Promise<AccessToken> {
  const response = await fetch(`${origin("ZOHO_ACCOUNTS_URL")}/oauth/v2/token`, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: requiredEnv("ZOHO_CLIENT_ID"),
      client_secret: requiredEnv("ZOHO_CLIENT_SECRET"),
      refresh_token: requiredEnv("ZOHO_REFRESH_TOKEN"),
    }),
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(10_000),
  });
  const data = await readJson(response);
  if (
    !response.ok || data.error ||
    typeof data.access_token !== "string" || !data.access_token ||
    typeof data.expires_in !== "number" || data.expires_in <= 0
  ) {
    // Never include provider response bodies: they may contain credentials or PII.
    throw new Error(`Zoho token refresh failed (HTTP ${response.status})`);
  }
  return {
    value: data.access_token,
    expiresAt: Date.now() + Math.max(0, data.expires_in - 60) * 1000,
  };
}

async function accessToken(): Promise<AccessToken> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken;
  // Share refresh work among concurrent requests in this server instance.
  pendingToken ??= refreshToken();
  try {
    cachedToken = await pendingToken;
    return cachedToken;
  } finally {
    pendingToken = undefined;
  }
}

/**
 * Creates one lead and returns its CRM ID. Call only after validating the form.
 * No automatic create retries or deduplication: a timeout can mean Zoho saved it.
 * Required server env: ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN,
 * ZOHO_ACCOUNTS_URL, ZOHO_API_DOMAIN (matching your Zoho data center).
 */
export async function createZohoLead(
  source: InquirySource,
  fields: InquiryFields,
  options: LeadOptions = {},
): Promise<string> {
  const name = fields.name.trim();
  if (!name) throw new Error("A lead name is required");
  if (fields.website?.trim()) throw new Error("Spam submission rejected");
  if (source !== "modal" && source !== "contact") {
    throw new Error("Invalid inquiry source");
  }

  const lead: Record<string, string> = { Last_Name: name };
  const mappings = {
    Company: fields.brand,
    City: fields.city,
    Phone: fields.phone,
    Email: fields.email,
  };
  for (const [key, value] of Object.entries(mappings)) {
    if (value?.trim()) lead[key] = value.trim();
  }

  const description = [fields.message?.trim()].filter(Boolean);
  const reserved = new Set(["Last_Name", ...Object.keys(mappings), "Description"]);
  for (const [field, label, value] of [
    [options.sourceField, "Website form", source === "contact" ? "Contact page" : "Inquiry modal"],
    [options.branchField, "Preferred branch", fields.branch?.trim()],
  ]) {
    if (field) {
      if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(field) || reserved.has(field)) {
        throw new Error("Invalid or conflicting Zoho custom field API name");
      }
      reserved.add(field);
      if (value) lead[field] = value;
    } else if (value) {
      // Preserve these values even before custom CRM fields are configured.
      description.push(`${label}: ${value}`);
    }
  }
  if (description.length) lead.Description = description.join("\n\n");

  const apiDomain = origin("ZOHO_API_DOMAIN");
  const token = await accessToken();
  const response = await fetch(`${apiDomain}/crm/v8/Leads`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${token.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: [lead] }),
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(10_000),
  });
  if (response.status === 401 && cachedToken === token) cachedToken = undefined;
  const data = await readJson(response);
  const result = object(Array.isArray(data.data) ? data.data[0] : undefined);
  const id = object(result.details).id;
  if (!response.ok || result.status !== "success" || result.code !== "SUCCESS" || typeof id !== "string" || !id) {
    const code = typeof result.code === "string" && /^[A-Z_]+$/.test(result.code)
      ? `, ${result.code}` : "";
    throw new Error(`Zoho lead creation failed (HTTP ${response.status}${code})`);
  }
  return id;
}
