export type InquirySource = "modal" | "contact";

export type InquiryFields = {
  name: string;
  brand?: string;
  city?: string;
  phone?: string;
  email?: string;
  branch?: string;
  message?: string;
  /** Honeypot — hidden from humans; a filled value marks the submission as spam. */
  website?: string;
};

/** POST a form submission to the inquiry API. Resolves on success, throws otherwise. */
export async function submitInquiry(source: InquirySource, fields: InquiryFields) {
  const res = await fetch("/api/inquiry", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ source, ...fields }),
  });
  if (!res.ok) throw new Error(`Inquiry submit failed: ${res.status}`);
}
