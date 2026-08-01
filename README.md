# AcademyX

**Full-stack e-learning platform with course creation, video streaming, and paid enrollment.**

AcademyX lets teachers build and publish multi-chapter video courses, and students purchase and track progress through them — with a full teacher dashboard for course management.

---

## 🚀 What it does

- **Teacher side**: create courses, add chapters, upload videos, attach downloadable resources, reorder chapters via drag-and-drop, publish/unpublish
- **Student side**: browse and purchase courses, watch chapter videos, track completion progress per chapter and per course
- Role-based access (teacher vs. student) via Clerk authentication
- Video upload and adaptive streaming through Mux
- Rich text course/chapter descriptions via a WYSIWYG editor
- Stripe checkout for course purchases
- File uploads (images, PDFs, attachments) via UploadThing/Cloudinary
- Teacher analytics dashboard (revenue, sales) with charts

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router), TypeScript |
| UI | Tailwind CSS, shadcn/ui, Radix UI |
| Auth | Clerk |
| Database | PostgreSQL, Prisma ORM |
| Video | Mux (upload, encoding, streaming player) |
| Payments | Stripe |
| File Uploads | UploadThing, Cloudinary |
| Editor | TipTap / React Quill |
| Charts | Recharts |

---

## 🏗️ Architecture

Single Next.js app using the App Router, with route groups separating concerns:

```
app/
├── (dashboard)/    # Teacher dashboard — course management, analytics
├── (course)/       # Student-facing course player — chapters, video, progress
└── api/            # Route handlers — uploads, webhooks (Stripe, Mux)
```

Server Components handle data fetching directly via Prisma; Server Actions handle mutations (progress updates, course publishing). Stripe and Mux webhooks keep purchase status and video processing state in sync with the database.

---

## 📄 License

**All rights reserved.**

This project and its source code are proprietary. No part of this repository may be copied, modified, distributed, or used in any form without explicit written permission from the author.

© Safwen Ben Mabrouk

---

## 📬 Contact

**Safwen Ben Mabrouk** — Full-Stack Software Engineer
- Email: safwenbenmabrouk@gmail.com
- LinkedIn: [linkedin.com/in/safwen-ben-mabrouk](https://linkedin.com/in/safwen-ben-mabrouk)
- GitHub: [@Safwen-bm](https://github.com/Safwen-bm)