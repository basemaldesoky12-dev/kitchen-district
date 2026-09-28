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
