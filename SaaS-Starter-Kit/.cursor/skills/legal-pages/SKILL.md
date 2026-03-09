---
name: legal-pages
description: Customize the template Privacy Policy and Terms and Conditions pages with user-specific details
---

# Legal Pages Customization

The boilerplate includes template legal pages at `app/privacy/page.tsx` (Privacy Policy) and `app/terms/page.tsx` (Terms and Conditions). Both contain `[PLACEHOLDER]` tokens that must be replaced with the user's real information.

**Never invent legal details — always ask the user.**

## Step 1: Collect Information

Before making any edits, ask the user for the following. Use the AskQuestion tool when available.

### Shared (both pages)
- **Company name** — legal entity name
- **Website URL** — production domain
- **Contact email** — for privacy/legal inquiries
- **Company address** — physical or registered address
- **Last updated date** — or use today's date

### Privacy Policy
- **Additional data collected** — beyond name/email/billing (e.g., phone, usage analytics, location)
- **Additional use cases** — beyond the defaults (e.g., marketing emails, personalized recommendations)
- **Cookie details** — what cookies are used and for what purposes
- **Data retention period** — how long personal data is stored
- **Minimum age** — minimum user age (commonly 13 or 16)
- **Third-party services** — list services like Supabase, Stripe, analytics providers
- **Applicable privacy regulations** — GDPR, CCPA, etc. (add region-specific sections if needed)

### Terms and Conditions
- **Service description** — one-paragraph summary of what the product does
- **Pricing model** — free, freemium, subscription, one-time, etc.
- **Billing cycle** — monthly, annual, etc.
- **Payment methods** — credit card, PayPal, etc.
- **Refund policy** — refund window and conditions
- **Price change notice period** — e.g., "30 days"
- **Account deletion method** — how users delete their account (e.g., settings page, email request)
- **Data handling on termination** — what happens to user data after account deletion
- **Liability period** — lookback period for liability cap (e.g., "12 months")
- **Governing jurisdiction** — state/country whose laws govern the agreement
- **Additional acceptable-use restrictions** — any product-specific rules

## Step 2: Replace Placeholder Tokens

Search for the bracket pattern `[ALL_CAPS]` in both files. Here is the full token reference:

| Token | File(s) | Description |
|---|---|---|
| `[COMPANY_NAME]` | Both | Legal entity name |
| `[WEBSITE_URL]` | Both | Production URL |
| `[CONTACT_EMAIL]` | Both | Legal/privacy email |
| `[COMPANY_ADDRESS]` | Both | Physical address |
| `[LAST_UPDATED_DATE]` | Both | Date string (e.g., "February 28, 2026") |
| `[ADDITIONAL_DATA_COLLECTED]` | Privacy | Extra data types collected |
| `[ADDITIONAL_USE_CASES]` | Privacy | Extra data usage purposes |
| `[COOKIE_DETAILS]` | Privacy | Cookie usage specifics |
| `[DATA_RETENTION_PERIOD]` | Privacy | How long data is kept |
| `[MINIMUM_AGE]` | Privacy | Minimum user age |
| `[THIRD_PARTY_SERVICES]` | Privacy | List of 3rd-party services |
| `[SERVICE_DESCRIPTION]` | Terms | What the product does |
| `[PRICING_MODEL_DESCRIPTION]` | Terms | Pricing overview |
| `[BILLING_CYCLE]` | Terms | Billing frequency |
| `[PAYMENT_METHODS]` | Terms | Accepted payment methods |
| `[REFUND_POLICY]` | Terms | Refund terms |
| `[PRICE_CHANGE_NOTICE]` | Terms | Notice period for price changes |
| `[ACCOUNT_DELETION_METHOD]` | Terms | How to delete an account |
| `[DATA_HANDLING_ON_TERMINATION]` | Terms | Post-deletion data handling |
| `[LIABILITY_PERIOD]` | Terms | Liability cap lookback |
| `[GOVERNING_JURISDICTION]` | Terms | Governing law jurisdiction |
| `[ADDITIONAL_RESTRICTIONS]` | Terms | Extra acceptable-use rules |

## Step 3: Apply Edits

Follow these rules when editing:

1. **Replace all instances** — tokens like `[COMPANY_NAME]` appear multiple times in each file.
2. **Update metadata** — also replace placeholders in the `metadata` export at the top of each file.
3. **Keep the structure** — do not remove sections; they cover standard legal bases.
4. **Add sections when needed** — if the user mentions GDPR, CCPA, or other regulations, add dedicated compliance sections.
5. **Remove unused placeholders** — if a placeholder isn't applicable (e.g., no billing), remove the entire containing bullet/paragraph rather than leaving a blank.
6. **Disclaimer** — remind the user that these are templates and they should have a lawyer review the final versions.
