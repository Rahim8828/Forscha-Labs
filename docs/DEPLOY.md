# Production Deployment Playbook: Forscha Labs

This playbook details deployment pipelines for the Web, API, Database, and Mobile components of the Business Growth OS.

---

## 1. Database Setup (Supabase)

1. Sign up for a [Supabase](https://supabase.com) account.
2. Create a new PostgreSQL project named `Forscha Labs`.
3. In your database connection panel, retrieve the Direct Connection URL (`DATABASE_URL`).
4. Initialize the schema locally using Prisma:
   ```bash
   cd packages/database
   npx prisma db push
   ```

---

## 2. API Backend Deployment (NestJS)

We recommend deploying NestJS on **Railway**, **Render**, or a custom **Docker** instance.

### Dockerized Build Instructions
1. Build the production image:
   ```bash
   docker build -f apps/api/Dockerfile -t forscha-api .
   ```
2. Define the runtime Environment variables:
   - `DATABASE_URL`: Your Supabase connection string.
   - `PORT`: `4000`
   - `STRIPE_SECRET_KEY`: Stripe gateway token keys.
   - `RAZORPAY_KEY_ID`: Razorpay gateway merchant identifier.
   - `GEMINI_API_KEY`: Google Gemini AI engine credentials.

---

## 3. Frontend Web Application (Next.js 15)

We recommend deploying Next.js directly on **Vercel** for maximum performance and edge routing support.

1. Install Vercel CLI or import the GitHub repository in the Vercel dashboard.
2. Choose Workspace project folder: `apps/web`.
3. Configure the environment inputs matching API locations:
   - `NEXT_PUBLIC_API_URL`: `https://api.yourdomain.com/api`
4. Deploy the production workspace.

---

## 4. White Label Domain Settings (CNAME Mapping)

To support White-Label agencies mapping their own custom subdomains:

1. Map wildcard subdomains to your Next.js instance on Vercel (`*.yourplatform.com`).
2. Agencies should configure a CNAME DNS record in their settings pointing to your domain:
   - Host: `portal` (or any sub-host)
   - Value: `cname.yourplatform.com`
3. Vercel automatically requests and sets up LetsEncrypt SSL certificates for incoming white-label domains.

---

## 5. Mobile App Compilation (Expo EAS)

Configure Expo Application Services (EAS) to compile iOS and Android bundles:

1. Log in to your Expo account:
   ```bash
   npm i -g eas-cli
   eas login
   ```
2. Initialize mobile project settings:
   ```bash
   cd apps/mobile
   eas project:init
   ```
3. Build for Android (generates production AAB file for Google Play Console):
   ```bash
   eas build --platform android
   ```
4. Build for iOS (generates production IPA file for Apple App Store Connect):
   ```bash
   eas build --platform ios
   ```
