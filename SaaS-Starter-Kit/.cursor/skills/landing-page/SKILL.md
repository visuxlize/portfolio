---
name: landing-page
description: Customize the template landing page with the user's product name, copy, features, pricing, and FAQ
---

# Landing Page Customization

The boilerplate includes a fully built landing page composed of template components in `components/landing/` and `components/header.tsx`. Each component contains inline `{placeholder}` comments that describe what to replace and in what tone.

**Never invent product details — always ask the user.**

## Step 1: Collect Information

Before making any edits, ask the user for the following if you can't figure it out yourself. Use the AskQuestion tool when available.

### Product Identity

- **App/product name** — what the product is called
- **Logo** — does the user have a custom logo/icon, or should we keep the default?

### Hero Section

- **Problem statement** — what problem does the product solve? (one sentence)
- **Value proposition** — one-line description of what the product does and why it's different
- **Key features** — at least 4 short bullet points for the hero checklist
- **Call to action** — button text (e.g. "Start Free Trial", "Get Started Free")
- **Social proof** — setup time or trust signal (e.g. "Set up in under 2 minutes", "Trusted by 1,000+ teams")

### Features Section

- **Top features (3)** — short name + one-sentence benefit for each
- **Bottom features (2)** — short name + two-sentence benefit for each
- **Section headline** — or let AI generate one based on the product

### How It Works

- **3 steps** — each with an action verb title and a one-two sentence description
- **Icons** — the user can suggest icons or let AI pick from lucide-react

### Pricing

- **Number of tiers** — how many plans (default is 2)
- **For each tier**: name, monthly price, original price (if discounted), who it's for, list of included features, CTA button text
- **Which tier is highlighted** — the recommended/popular plan

### FAQ

- **3+ questions and answers** — common questions about the product, covering trust/safety, core value, and differentiation

### Demo Section

- **Headline** — or use default "See {app name} in Action"
- **Demo content** — does the user have a video/screenshot to embed, or keep the placeholder?

## Step 2: Template Marker Reference

Every customizable string in the landing page has an inline comment describing what to put there. Search for `// {` and `{/*` patterns in the component files to find all markers.

| File                                  | What to Customize                                                                                        |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `components/landing/hero.tsx`         | Title (problem statement), subtitle (value prop), features checklist, CTA button text, social proof line |
| `components/landing/features.tsx`     | Section heading, 3 top feature cards (title + description), 2 bottom feature cards (title + description) |
| `components/landing/how-it-works.tsx` | Section heading, 3 steps (icon, title, description)                                                      |
| `components/landing/pricing.tsx`      | Plan names, prices, descriptions, feature lists, CTA text, links                                         |
| `components/landing/faq.tsx`          | Questions and answers (replace "TodoFlow" with app name throughout)                                      |
| `components/landing/demo.tsx`         | Section heading                                                                                          |
| `components/landing/footer.tsx`       | Brand name (split into styled parts), link groups                                                        |
| `components/header.tsx`               | Brand name (match footer), nav links                                                                     |

## Step 3: Apply Edits

Follow these rules when editing:

1. **Replace content guided by the comments** — each `{placeholder}` comment describes the tone and structure of what goes there. Replace the content on the line(s) below the comment.
2. **Update the brand name everywhere** — the app name appears as split text (e.g. `Todo<span>Flow</span>`) in the header and footer. Also replace "TodoFlow" in FAQ questions and answers.
3. **Keep the component structure intact** — do not change the layout, animations, class names, or component hierarchy. Only replace text content, data arrays, and icons.
4. **Add or remove array items as needed** — if the user has more or fewer features, pricing tiers, or FAQ entries than the template, adjust the arrays accordingly while following the same object shape.
5. **Pick appropriate lucide-react icons** — for how-it-works steps, choose icons that visually represent each step. Update the import statement to match.
6. **Remove template comments after customization** — once all content is replaced, delete the `// {placeholder}` and `{/* placeholder */}` comments so the code is clean.
7. **Remind user about placeholder images** — the landing page has grey placeholder boxes for the hero image, feature card illustrations, how-it-works step illustrations, and the demo video. Remind the user to replace these with real assets.
8. **Nav links** — if sections are added or removed, update the nav links in `components/header.tsx` and footer link groups in `components/landing/footer.tsx` to match.
