# Coffee Shop Store

A modern, RTL-first coffee e-commerce experience built with the Next.js App Router. The project showcases a full-stack flow—from product discovery and blog content to authentication-protected dashboards—optimized for deployment on Vercel.

[![Live Demo]([https://img.shields.io/badge/Live%20Demo-Vercel-blue?style=for-the-badge&logo=vercel)](https://coffee-shop-store.vercel.app](https://coffee-shop-store.vercel.app/))


## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture Highlights](#architecture-highlights)
- [Directory Structure](#directory-structure)
- [API Surface](#api-surface)
- [State & Data Management](#state--data-management)
- [Styling & UX](#styling--ux)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Database & Seeding](#database--seeding)
- [Screenshots](#screenshots)
- [Deployment Notes](#deployment-notes)
- [Testing](#testing)
- [Roadmap Ideas](#roadmap-ideas)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

Coffee Shop Store delivers a polished, Persian-language storefront with dark mode, responsive layouts, and animated interactions. It uses Vercel-ready Next.js 15 features and connects to MongoDB via Mongoose for dynamic content such as products, categories, blogs, and user profiles. Authentication is secured with JWTs stored in HTTP-only cookies and enforced through middleware.

## Key Features

- Full RTL layout with custom Persian typography and Jalali date formatting.
- Responsive home experience featuring product carousels, category highlights, loyalty “Coffee Club”, and blog teasers.
- Dedicated product grid with filtering, availability toggles, and client-side sorting.
- Blog listing and detail pages backed by dynamic API routes and reusable UI components.
- Persistent shopping cart with Redux Toolkit, localStorage hydration, and mini-cart overlay.
- JWT-based authentication (login/register/logout) with protected `my-account` dashboard sections (orders, favorites, addresses, profile settings).
- App Router API endpoints for products, categories, blogs, and authenticated user updates.
- Dark/light theming powered by `next-themes`, bespoke Tailwind CSS 4 theme tokens, and icon sprites.
- Smooth client-side interactions using Framer Motion animations and Swiper-driven carousels.
- Toast notifications for user feedback (react-hot-toast).

## Tech Stack

- **Framework:** Next.js 15 (App Router, Route Groups, Edge-ready middleware)
- **Language:** TypeScript (strict mode)
- **UI:** React 19, Tailwind CSS v4, CSS custom properties, Lucide icons
- **State:** Redux Toolkit with typed hooks and persistence
- **Animations & UX:** Framer Motion, Swiper, react-hot-toast
- **Backend:** Next.js API routes, Mongoose 8, MongoDB driver 6
- **Auth & Security:** JWT (jsonwebtoken), bcryptjs, HTTP-only cookies, route middleware
- **Utilities:** Axios (preconfigured `/api` base URL), jalali-moment, next-themes

## Architecture Highlights

### App Router
- `(main)`: customer-facing pages (home, products, blogs, about, contact, cart).
- `(auth)`: login and register routes with client-side validation.
- `(dashboard)`: `my-account` area guarded by middleware and server-side token verification.
- `api/`: REST-style handlers (`/api/products`, `/api/categories`, `/api/blogs`, `/api/auth`, `/api/users/[id]`).

### Data Layer
- `src/models`: Mongoose schemas for `Product`, `Category`, `Blog`, and `User`.
- `src/lib`: MongoDB connection helper, JWT utilities, and Axios instance.
- `src/data`: Seed data (products, categories, blogs, users) used for initial population.
- `src/scripts`: `seedProducts.ts` scaffold for database seeding.

### Components
- `src/components/home`: Sectioned homepage widgets (hero, products, blogs, services, coffee club).
- `src/components/layout`: Headers, footers, navigation, overlays, and theming toggles.
- `src/components/shared`: Reusable UI primitives (product/blog cards, breadcrumb, Jalali date, icon sprite).
- `src/components/providers`: Theme + Redux providers injected at the root.

## Directory Structure

```
src/
  app/
    (main)/         # Public-facing routes
    (auth)/         # Login & Register
    (dashboard)/    # Protected dashboard
    api/            # REST-style API routes
    layout.tsx      # Root layout (RTL, themes, providers)
  components/
    home/           # Landing page sections
    layout/         # Navigational UI & overlays
    providers/      # Theme + Redux providers
    shared/         # UI primitives & utilities
  data/             # Seed fixtures
  lib/              # DB connection, auth helpers, axios client
  models/           # Mongoose models
  scripts/          # Seeding utilities
  store/            # Redux slices & hooks
  types/            # TypeScript interfaces
public/
  images/           # Marketing assets
  icons/            # SVG sprite sheet
  fonts/            # Local Persian font files
  screenshots/      # UI captures for docs/marketing
```

## API Surface

| Route | Method | Description |
|-------|--------|-------------|
| `/api/products` | GET | Fetch all products (MongoDB). |
| `/api/products` | POST | Create product (guards duplicate IDs). |
| `/api/products/[id]` | GET | Fetch single product (dynamic route). |
| `/api/categories` | GET/POST | List or create categories. |
| `/api/blogs` | GET | List blog posts. |
| `/api/blogs/[slug]` | GET | Fetch blog post by slug. |
| `/api/auth/register` | POST | Create user, hash password, set JWT cookie. |
| `/api/auth/login` | POST | Validate credentials, issue JWT cookie. |
| `/api/auth/logout` | POST | Clear JWT cookie. |
| `/api/auth/me` | GET | Return authenticated user (middleware-protected). |
| `/api/users/[id]` | PATCH | Update user profile (name/email/password) after JWT check. |

Authentication-specific middleware (`middleware.ts`) intercepts `/my-account/*` requests and redirects unauthenticated visitors to `/login`.

## State & Data Management

- Redux Toolkit slices:
  - `cartSlice`: cart CRUD (add, remove, increment/decrement, clear) with localStorage persistence.
  - `authSlice`: persists current user from `/api/auth/me`.
  - `uiSlice`: coordinates overlays (cart, sidebar, confirmation modals, user dropdown).
- `useAuth` hook wraps the `/auth/me` fetch, exposes `logout`, error/loading states, and keeps Redux in sync.
- Axios instance (`src/lib/axios.ts`) centralizes `/api` base URL, timeout, and `withCredentials` flags.

## Styling & UX

- Tailwind CSS v4 with `@theme` custom properties and variant shorthands (`@custom-variant child`, etc.).
- Bespoke Persian font stack (`Dana`, `IRANSans`, `Lalezar`) loaded via `@font-face`.
- Dark mode via `next-themes` + `class` strategy and persistent `coffee-shop-theme` storage key.
- Icon sprite (`public/icons/icons.svg`) consumed through `<use href="#icon-id" />`.
- Framer Motion for animated entrances on product grids and cart interactions.
- Swiper sliders for “Most Selling” carousel; navigation wired through custom refs.
- Toast notifications for auth flows and form validation feedback.

## Environment Variables

Create `.env.local` with:

```
MONGODB_URI=mongodb://127.0.0.1:27017/coffeeShop
JWT_SECRET=replace-with-strong-secret
```

(Use the production MongoDB connection string and secret when deploying to Vercel.)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/coffee-shop-store.git
   cd coffee-shop-store
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set environment variables**

   Create `.env.local` using the values above.

4. **Run the development server**

   ```bash
   npm run dev
   ```

   The app will be available at http://localhost:3000.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js in development mode. |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Start the production server (after `build`). |
| `npm run lint` | Run ESLint (`next/core-web-vitals` + TypeScript rules). |

## Database & Seeding

- Models expect MongoDB collections (`products`, `categories`, `blogs`, `users`). Sample fixtures live in `src/data`.
- `src/scripts/seedProducts.ts` contains a commented-out seeding script you can adapt. To seed:
  1. Uncomment the script body.
  2. Run `npx ts-node src/scripts/seedProducts.ts` (ensure `ts-node` is installed globally or use `npm exec ts-node`).
- Repeat similar patterns for categories or blogs as needed.

## Screenshots

Update this section with relevant UI captures from `public/screenshots`:

- ![Home](public/screenshots/cofee%20(1).png)
- ![Products](public/screenshots/cofee%20(2).png)
- ![Dashboard](public/screenshots/Screenshot%20(91).png)

> Filenames currently contain spaces. Consider renaming (e.g., `home.png`) for cleaner Markdown links.

## Deployment Notes

- Designed for Vercel; `next.config.ts` is the default generated configuration.
- Ensure the `JWT_SECRET` and `MONGODB_URI` environment variables are set in the Vercel project dashboard.
- `next build` must succeed before deployment; use `npm run lint` to enforce coding standards pre-deploy.

## Testing

Automated tests are not yet included. Recommended additions:

- Component tests with React Testing Library (e.g., cart interactions).
- Integration tests for critical API routes (auth, products) using Supertest or Playwright.
- Smoke E2E tests to validate localization, theming, and dashboard access.

## Roadmap Ideas

- Replace mock dashboard data (orders, favorites, addresses) with live collections.
- Add role-based access control (admin product/category management).
- Implement payment workflows and order creation endpoints.
- Introduce caching (ISR/SSG) for high-traffic content (blogs, home highlights).
- Localize static strings via i18n framework for multi-language support.

## License

No license file is currently provided. Add one (e.g., `MIT`) if you intend to open-source the project.

## Acknowledgements

- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for font optimization.
- [`lucide-react`](https://lucide.dev/) for iconography.
- [`jalali-moment`](https://github.com/fingerpich/jalali-moment) for Persian date formatting.
- [`swiper`](https://swiperjs.com/react) and [`framer-motion`](https://www.framer.com/motion/) for interactive UI elements.
