This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Before starting, copy `.env.local.example` to `.env.local` and fill in the
credentials for Firebase and EmailJS. Do **not** commit `.env.local` to version
control – it is ignored by `.gitignore`.

Then run the development server:

```bash
cd supekar-electronics
npm install
npm run dev
# or with yarn/pnpm/bun if you prefer
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Environment variables

Several services require API keys and identifiers. See `.env.local.example` for a
list of values used by the application. At a minimum you will need:

- Firebase project configuration (all `NEXT_PUBLIC_FIREBASE_*` values)
- EmailJS service ID, template ID, and public key (`NEXT_PUBLIC_EMAILJS_*`)
- (Optional) `NEXT_PUBLIC_CONTACT_*` values can be overridden here.

Additional back-end variables such as `MONGODB_URI` are used by the
authentication routes (not yet implemented in this repo). Keep sensitive
data in `.env.local` and never commit it.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Before deploying to Vercel

1. **Set up a Vercel project** by connecting your GitHub repository or deploying directly.
2. **Add environment variables** to your Vercel project settings. Go to **Project Settings > Environment Variables** and add:
   - All `NEXT_PUBLIC_FIREBASE_*` variables from your Firebase console
   - All `NEXT_PUBLIC_EMAILJS_*` variables from EmailJS
   - `NEXT_PUBLIC_CONTACT_*` variables (email, WhatsApp, Instagram)
   - `NEXT_PUBLIC_SENTRY_DSN` (optional, for error tracking via Sentry)
3. **Deploy** – Vercel will automatically detect Next.js and run `npm run build` and `npm start`.

**Do not commit `.env.local`** – it is in `.gitignore`. Vercel will use the environment variables you set in the dashboard instead.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Email service configuration

The contact form uses [EmailJS](https://www.emailjs.com/) with a Gmail integration.
If you see errors such as `Gmail_API: Invalid grant. Please reconnect your Gmail account`
(or HTTP 412 responses) when attempting to send a message, log into the
EmailJS dashboard and reconnect or re‑authorize the Gmail service. Credentials
can expire or be revoked, and re‑authorizing fixes the problem without code changes.

## Testing

Run the test suite:

```bash
npm test
```

Tests are located in `__tests__/` and use Jest and React Testing Library.
