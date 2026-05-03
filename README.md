# BookNest - Online Book Borrowing Platform

## Project Overview
BookNest is a modern online book borrowing platform built with Next.js App Router. It digitizes the library experience and allows users to browse books, filter by category, view detailed book information, and manage their profile with authenticated access.

## Live URL
- Live URL: Add your deployment link here after hosting the application.

## Core Features
- Responsive layout with a Navbar, Footer, and mobile-friendly design.
- Home page banner, scrolling marquee, featured books, and custom sections.
- Authentication with BetterAuth using email/password and Google social login.
- Protected routes for book details and profile pages.
- All Books page with search and category filtering sidebar.
- Private Book Details page with a borrow action restricted to logged-in users.
- Profile page with editable user name and image via update form.
- Local MongoDB support and secure environment variable configuration.

## Assignment Requirements Covered
- Header with logo, navigation links, and conditional auth controls.
- Footer with social links and contact information.
- JSON-based book data and API-powered book display.
- Login and register pages with form validation and toast notifications.
- Private routes for `My Profile`, `Update Profile`, and `Book Details`.
- Search, category filtering, and responsive design.
- Use of one npm package: `swiper` and `react-fast-marquee` for animations.

## Tech Stack
- Next.js 16 (App Router)
- React 19
- Tailwind CSS + DaisyUI
- BetterAuth for authentication
- MongoDB for user/session storage
- `react-hot-toast` for notifications
- `react-fast-marquee` for marquee animation
- `swiper` for book carousel display
- `animate.css` for additional UI animation effects

## Environment Variables
Create a `.env.local` file with the following values:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/assignment8
MONGODB_DB=assignment8
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

> If you want Google login, set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from a Google Cloud OAuth app.

## Quick Start
```bash
npm install
npm run dev
```

Open the app at `http://localhost:3000`.

## Build and Production
```bash
npm run build
npm run start
```

## Deploy to Netlify (comment)
- **Netlify UI**: New site from Git → select this repo
- **Build command**: `npm run build`
- **Publish directory**: leave empty (Next runtime will handle it)
- **Environment variables**: set these in Netlify → Site configuration → Environment variables
  - `MONGODB_URI`
  - `MONGODB_DB`
  - `BETTER_AUTH_SECRET`
  - `BETTER_AUTH_URL` = your Netlify site URL (example: `https://your-site.netlify.app`)
  - `NEXT_PUBLIC_BETTER_AUTH_URL` = same as above
  - `NEXT_PUBLIC_APP_URL` = same as above
  - `GOOGLE_CLIENT_ID` (optional)
  - `GOOGLE_CLIENT_SECRET` (optional)

## Deploy to Vercel (recommended)
- **Vercel**: Add New → Project → Import this GitHub repo → Deploy
- **Framework preset**: Next.js (auto-detected)
- **Build command**: `npm run build` (default)
- **Output directory**: leave empty
- **Environment variables** (Project → Settings → Environment Variables):
  - `MONGODB_URI`
  - `MONGODB_DB`
  - `BETTER_AUTH_SECRET`
  - `BETTER_AUTH_URL` = `https://<your-project>.vercel.app`
  - `NEXT_PUBLIC_BETTER_AUTH_URL` = same as above
  - `NEXT_PUBLIC_APP_URL` = same as above
  - `GOOGLE_CLIENT_ID` (optional)
  - `GOOGLE_CLIENT_SECRET` (optional)

## Notes
- This project is designed to work with a local MongoDB instance by default.
- If you use MongoDB Atlas, update `MONGODB_URI` accordingly and ensure network access is configured.
- Add your live deployment URL once hosted.
