# Zoho CRM helper

`src/lib/zoho.ts` exports `createZohoLead(source, fields)` and returns
the created lead ID. `/api/inquiry` calls it for both website forms alongside
the existing Brevo notification. Email delivery alone determines the form's
success/error response. CRM creation runs after the response via Next.js `after`.

Configure these private environment variables in `.env.local` and Vercel:

```dotenv
ZOHO_CLIENT_ID=...
ZOHO_CLIENT_SECRET=...
ZOHO_REFRESH_TOKEN=...
ZOHO_ACCOUNTS_URL=https://accounts.zoho.com
ZOHO_API_DOMAIN=https://www.zohoapis.com
```

The domains above are US examples. Use your account's data center and API
domain. Authorize the OAuth client with `ZohoCRM.modules.leads.CREATE`.
Never use a `NEXT_PUBLIC_` prefix for credentials or commit their values.

Server-side usage, after validating the submission:

```ts
const leadId = await createZohoLead(source, fields);
```

The full submitted name maps to `Last_Name`; brand, city, phone, and email map
to their standard CRM fields. Blank optional fields are omitted. Message,
form source are preserved in `Description`.
Inquiry from is preserved in `Lead Source`.
Preferred branch is preserved in `Preferred branch`.
Check the CRM layout for additional
mandatory fields when configuring the CRM. CRM automation follows Zoho's
default API behavior because the helper does not override `trigger`.

Tokens are refreshed and cached per server instance, sharing concurrent refresh
requests. Requests time out after 10 seconds. The helper checks individual
record results as well as HTTP status, and does not log credentials or form data.

This helper creates leads; it does not merge repeat customers or retry failed
creates. A timeout can occur after a record was saved. The route returns success
when email succeeds and HTTP 502 when email fails, regardless of CRM outcome.
CRM work is scheduled before attempting email, so it runs even after an email
failure. CRM failures or latency cannot change or delay the visitor's response.
Scheduling and delivery failures are caught and logged without credentials or
inquiry content. The route allows 45 seconds for email and background work.
There is no durable retry queue: if CRM fails but email succeeds, staff must
recover the lead from the notification email. Check server logs for
`Inquiry CRM delivery failed`, `Inquiry CRM scheduling failed`, or
`Inquiry email delivery failed`. Background execution is not a durable queue.
If email fails but CRM succeeds, a visitor retry can create another lead.
Duplicate prevention across resubmissions and durable retries remain future work.

Local configuration does not configure the live site. Set all five variables
in Vercel's Production environment and redeploy this code to enable it there.

References: [OAuth refresh](https://www.zoho.com/crm/developer/docs/api/v8/refresh.html),
[creating records](https://www.zoho.com/crm/developer/docs/api/v8/insert-records.html).

## Verifying without side effects

- Never test with a real submission — it sends the notification email and creates
  a real lead.
- Safe probe: `POST /api/inquiry` with body `[]` returns
  `400 {"error":"Invalid inquiry"}` (the Zoho-era validation) and sends nothing. If
  it returns `Name is required`, the deployed route predates this integration.
- End-to-end check (a person does it): one inquiry with a name like
  `TEST - delete me`, confirm the lead in Zoho and the email, then delete the lead.
- Local runs: the `ZOHO_*` variables are only in Vercel, not in `.env.local`, so
  local submissions never reach Zoho (the route logs `Inquiry CRM delivery failed`).

## Incident — CRM offline 2026-09-30 17:51 → 2026-10-02 21:52 (KSA time)

- **What happened:** PR #1/#2 were merged on GitHub and auto-deployed (production
  had Zoho from 2026-09-28 23:26). On 2026-09-30 an Arabic-SEO change was deployed
  with `vercel deploy --prebuilt` from a local clone whose `main` had never fetched
  those PRs, so that deploy replaced the Zoho build. Emails kept working; **no CRM
  leads were created in that window.**
- **Fix:** fetched GitHub, rebased the local commits onto `origin/main`, rebuilt,
  verified (route returns the Zoho-era `Invalid inquiry`), redeployed `59bcfc6`.
- **Recovery (owner):** add inquiries received in that window to Zoho by hand from
  the notification emails. While Brevo's domain DNS records are still missing, only
  ali@ and basem.aldesoky@ receive those emails (abdullah@ and support@ bounce).
- **Prevention:** the deploy rule in AGENTS.md / docs/ARCHITECTURE.md — fetch and
  rebase before any CLI deploy, push right after.
