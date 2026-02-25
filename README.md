# Parth the Illusionist — Frontend

A production-ready React frontend for a professional magician website, featuring magical animations, scroll effects, and a dark luxury aesthetic.

## ✦ Features

- **5 Full Pages**: Home, About, Services, Blog, Contact
- **Magical Animations**: Custom cursor, floating particles, scroll-triggered reveals, parallax effects, stagger animations
- **API Integration**: Connects to the backend REST API
- **SEO Ready**: React Helmet, meta tags, canonical URLs, schema.org, heading hierarchy
- **Mobile Responsive**: Full mobile-first responsive design
- **Accessible**: ARIA labels, keyboard navigation, focus management, reduced motion support
- **Fast**: Code splitting, lazy loading, optimized assets
- **Deployable**: Vercel, Netlify, or nginx configs included

## 🚀 Quick Start

### 1. Install dependencies

```bash
cd magician-frontend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Start development server

```bash
npm run dev
# Runs on http://localhost:3000
```

The Vite dev server automatically proxies `/api` requests to `http://localhost:5000` (your backend).

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Navbar.jsx     # Fixed navigation with mobile menu
│   ├── Footer.jsx     # Site footer
│   ├── Cursor.jsx     # Custom animated cursor
│   ├── MagicParticles.jsx  # Floating particle effect
│   ├── LoadingScreen.jsx   # Intro loading animation
│   └── SEOHead.jsx    # SEO meta management
├── hooks/
│   └── useScrollReveal.js  # Scroll animation hooks
├── pages/
│   ├── Home.jsx       # Landing page with all sections
│   ├── About.jsx      # About Parth + timeline
│   ├── Services.jsx   # Service listing + detail view
│   ├── Blog.jsx       # Blog listing + post reader
│   ├── Contact.jsx    # Contact form + info
│   └── NotFound.jsx   # 404 page
├── utils/
│   └── api.js         # API client & endpoint helpers
├── styles/
│   └── global.css     # Design tokens, utility classes, animations
└── App.jsx            # Router & layout
```

## 🌐 Environment Variables

| Variable             | Description              | Example                        |
| -------------------- | ------------------------ | ------------------------------ |
| `VITE_API_URL`       | Backend API URL          | `http://localhost:5000/api/v1` |
| `VITE_API_BASE_URL`  | Backend base URL         | `http://localhost:5000`        |
| `VITE_SITE_NAME`     | Site display name        | `Parth the Illusionist`        |
| `VITE_SITE_URL`      | Production URL (for SEO) | `https://yourdomain.com`       |
| `VITE_CONTACT_EMAIL` | Contact email            | `contact@yourdomain.com`       |
| `VITE_CONTACT_PHONE` | Contact phone            | `+1 (555) 000-0000`            |
| `VITE_INSTAGRAM_URL` | Instagram profile URL    | `https://instagram.com/...`    |
| `VITE_FACEBOOK_URL`  | Facebook page URL        | `https://facebook.com/...`     |
| `VITE_YOUTUBE_URL`   | YouTube channel URL      | `https://youtube.com/...`      |

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
npm run build
vercel --prod
```

Set environment variables in the Vercel dashboard.

### Netlify

```bash
npm run build
# Drag the dist/ folder into Netlify UI
# Or: netlify deploy --prod --dir=dist
```

The `netlify.toml` handles SPA routing and headers automatically.

### Self-hosted (nginx)

```bash
npm run build

# Copy dist/ to server
scp -r dist/ user@server:/var/www/magician-frontend/

# Configure nginx (see nginx.conf)
sudo cp nginx.conf /etc/nginx/sites-available/magician
sudo ln -s /etc/nginx/sites-available/magician /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### Docker

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

## 🎨 Design System

### Colors

- **Void** `#0a0a0f` — deepest background
- **Gold** `#c9a227` — primary accent
- **Silver** `#b8b8c8` — secondary text
- **Crimson** `#8b1a2a` — highlights

### Fonts

- **Display**: Cinzel Decorative — hero titles
- **Heading**: Cinzel — section headers, nav
- **Body**: Raleway — body text

### Key CSS Classes

- `.reveal`, `.reveal-left`, `.reveal-right` — scroll animations
- `.stagger` — staggered child animations
- `.shimmer-text` — gold shimmer effect
- `.btn-primary`, `.btn-outline`, `.btn-ghost` — button variants
- `.card` — glass-morphism card
- `.section-label`, `.section-title`, `.section-subtitle` — typography

## 🔌 API Integration

The frontend connects to the backend via `src/utils/api.js`. Available API helpers:

```js
import { blogAPI, serviceAPI, contactAPI, bannerAPI } from "@/utils/api";

// Blogs
blogAPI.getAll("?page=1&limit=10");
blogAPI.getOne("slug-or-id");
blogAPI.getFeatured();
blogAPI.getCategories();

// Services
serviceAPI.getAll("?limit=6");
serviceAPI.getOne("slug-or-id");

// Contact (form submission)
contactAPI.submit({ name, email, subject, message, phone, service });

// Banners
bannerAPI.getActive("home");
```

All API calls degrade gracefully — pages show hardcoded fallback data if the backend is unavailable.

## 🔍 SEO

Each page uses `<SEOHead>` with:

- Unique `<title>` and `<meta description>`
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- `robots` meta (noindex for 404)

The `index.html` includes Schema.org JSON-LD for the business.

## ⚡ Performance

- Route-based code splitting via React Router lazy loading (can be added)
- Vendor chunk separation in Vite config
- CSS animations use `transform` and `opacity` (GPU accelerated)
- `will-change: transform` on parallax elements
- Passive scroll event listeners
- Images lazy-loaded

## ♿ Accessibility

- Semantic HTML5 (`<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`)
- ARIA labels on interactive elements
- `aria-hidden` on decorative elements
- `role="alert"` on form errors
- `prefers-reduced-motion` media query disables animations
- Keyboard navigation support
- Focus-visible styles
