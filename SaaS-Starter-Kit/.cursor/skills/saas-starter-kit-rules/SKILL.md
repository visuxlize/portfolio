---
name: saas-starter-kit-rules
description: Development guidelines for the SaaS starter kit boilerplate
---

# SaaS Starter Kit Rules

A Next.js 15 + Supabase + Drizzle ORM + tRPC boilerplate. Follow the existing project structure when making changes.

## Project Structure

- **`server/`** - tRPC routers, context, and procedure builder. Add new routers here.
- **`server/routers/todos.ts`** - Reference implementation for tRPC CRUD procedures.
- **`lib/trpc/server.ts`** - Server-side `trpc` caller for direct data access in server components.
- **`lib/trpc/client.tsx`** - `TRPCProvider` and exported `trpc` hooks for client components.
- **`lib/trpc/query-client.ts`** - Shared `makeQueryClient` factory.
- **`components/`** - React components. UI primitives in `components/ui/`, feature components in named subdirectories.
- **`app/`** - Next.js App Router pages and layouts.
- **`app/(app)/`** - Protected route group. All routes here require authentication via the group layout.
- **`db/`** - Database schema (Drizzle ORM).
- **`lib/supabase/`** - Supabase client utilities. Do not modify these files.
- **`lib/stripe.ts`** - Lazy-initialized Stripe client via `getStripe()`. Only throws when called without `STRIPE_SECRET_KEY`, not at import time.
- **`server/routers/stripe.ts`** - Stripe subscription tRPC router (getSubscriptionStatus, createCheckoutSession, createPortalSession).
- **`components/requires-subscription.tsx`** - Wrapper component that gates UI behind an active subscription. Shows an upgrade dialog when clicked without a subscription.
- **`actions/login.ts`** - The only remaining server action. Do not migrate this to tRPC.

## Guidelines

### Backend: Use tRPC, not server actions

All data fetching and mutations go through tRPC procedures in `server/routers/`.

1. **Queries** use `.query(async ({ ctx, input }) => ...)`.
2. **Mutations** use `.mutation(async ({ ctx, input }) => ...)`.
3. **All user-data procedures** must use `protectedProcedure`. Never use `publicProcedure` for anything that reads/writes user data.
4. **Input validation**: Use Zod inline in the router. `z.string().min(1).trim()` handles both validation and transformation.
5. **Errors**: Throw `TRPCError` with appropriate codes (`UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`). Do not return `{ success: false, error: "..." }` objects.

### Server Components: Use the server-side caller

```typescript
import { trpc } from "@/lib/trpc/server";

export default async function Page() {
  const data = await trpc.feature.method();
  return <div>{data.name}</div>;
}
```

### Client Components: Use trpc hooks

Use `useQuery` for data fetching. Do not use `useSuspenseQuery`, `prefetch()`, or `HydrateClient`.

```typescript
import { trpc } from "@/lib/trpc/client";

export function MyClientComponent() {
  const { data } = trpc.feature.list.useQuery();
  const utils = trpc.useUtils();
  const mutation = trpc.feature.create.useMutation({
    onSuccess: () => utils.feature.list.invalidate(),
  });
}
```

### Auth

- Protected pages go in `app/(app)/`. The layout handles auth redirects automatically.
- tRPC protection uses `protectedProcedure` in `server/trpc.ts`.
- Do not create per-page `AuthGuard` components — the group layout handles it.

### Database

- Schema defined in `db/schema.ts`. Use Drizzle ORM for all queries.
- Run `npx drizzle-kit push` after schema changes.

### Cache Invalidation

- Do **not** use `revalidatePath()` in tRPC procedures.
- After a mutation, call `utils.[router].[procedure].invalidate()` to trigger React Query refetch.

### Stripe Subscriptions (opt-in)

Stripe is integrated but optional. The app runs without `STRIPE_SECRET_KEY`. **Do not add subscription gating or billing features unless the user explicitly asks.**

- `stripe.getSubscriptionStatus` queries Stripe directly (no local DB cache). Returns `{ isActive, isConfigured }`. When Stripe is not configured, `isConfigured` is `false` and all gating is bypassed.
- `stripe.createCheckoutSession` creates/reuses a Stripe customer (stored as `stripeCustomerId` on the `users` table), then returns a Checkout URL. Derives the app URL from request headers.
- `stripe.createPortalSession` returns a billing portal URL. Throws `PRECONDITION_FAILED` if no Stripe customer exists.
- To gate a feature, wrap the interactive element with `RequiresSubscription`:

```tsx
import { RequiresSubscription } from "@/components/requires-subscription";

<RequiresSubscription message="Upgrade to Pro to use this feature.">
  <Button onClick={doSomething}>Feature</Button>
</RequiresSubscription>;
```

- To check subscription status in a component:

```tsx
const { data } = trpc.stripe.getSubscriptionStatus.useQuery();
const isActive = data?.isActive ?? false;
```

- Env vars: `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID` (both optional, see `.env.example`).

## After Adding New Features

1. **Schema changes**: Run `npx drizzle-kit push`.
2. **Router registration**: Add new sub-routers to `server/routers/index.ts`.
3. **Mock data**: Use Supabase MCP tools (`execute_sql`) to insert seed data for immediate testing.
