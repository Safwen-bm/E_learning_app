# AcademyX

A full-stack e-learning platform built with Next.js. Instructors publish courses with chaptered video lessons, students track their progress chapter by chapter, and purchases are handled through Stripe.

## Features

- Public landing page, with courses browsable before signing in
- Course creation for instructors: title, description, image, category, price, chapters
- Video lessons via Mux, with per-chapter progress tracking
- File attachments per course via UploadThing
- Purchases and checkout via Stripe
- Authentication via Clerk

## Tech stack

- **Framework:** Next.js 15 (App Router)
- **Database:** MySQL, via Prisma ORM
- **Auth:** Clerk
- **Video:** Mux
- **File uploads:** UploadThing
- **Payments:** Stripe
- **Styling:** Tailwind CSS, shadcn/ui

## Architecture

```mermaid
flowchart TD
    User["Student / Instructor browser"]

    subgraph Vercel["Next.js app (Vercel)"]
        Pages["Pages & Server Components"]
        API["API routes"]
    end

    DB[("MySQL database")]
    Clerk["Clerk (auth)"]
    Mux["Mux (video hosting & playback)"]
    UT["UploadThing (images & attachments)"]
    Stripe["Stripe (payments)"]

    User -->|HTTPS| Pages
    User -->|HTTPS| API

    Pages -->|Prisma| DB
    API -->|Prisma| DB
    Pages -.->|session| Clerk
    API -.->|verify user| Clerk

    API -->|create/delete asset| Mux
    User -->|stream video| Mux

    API -->|upload callback| UT
    User -->|direct upload| UT

    API -->|checkout, webhook| Stripe
```

## Getting started locally

```bash
npm install
cp .env.example .env   # fill in your own keys
npx prisma migrate dev
npm run dev
```

## License

MIT, see [LICENSE](./LICENSE).
