# Anveshana

A single-page website for Anveshana — a serious tech community for people curious about technology, innovation, entrepreneurship, life and philosophy.

**Ask. Share. Build. Together.**

Stack: React (JavaScript) + Vite on the client, Express + MongoDB on the server.

```
.
├─ client/            React single-page app
├─ server/            Express API (join requests, health check)
├─ shared/            Validation shared by both sides
└─ README.md
```

## Requirements

- Node.js 20.19+ (developed on Node 24)
- A MongoDB connection string (MongoDB Atlas free tier works) — only needed for the join form

## 1. Client

```bash
cd client
npm install
npm run dev
```

The site runs at http://localhost:5173. `/api` requests are proxied to the server on port 5000, so no CORS setup is needed locally.

```bash
npm run build     # production build in client/dist
npm run preview   # preview the build
npm run lint
```

## 2. Server

```bash
cd server
npm install
npm run dev       # nodemon
npm start         # production
```

Environment lives in `server/.env` (already created, git-ignored). Fill in what you need:

| Variable | Required | Default | Notes |
| --- | --- | --- | --- |
| `NODE_ENV` | no | `development` | Set to `production` on your host |
| `PORT` | no | `5000` | |
| `MONGODB_URI` | yes for the form | — | Atlas connection string |
| `CLIENT_ORIGIN` | yes in production | `http://localhost:5173` | Comma-separated allowed origins |
| `RATE_LIMIT_WINDOW_MS` | no | `3600000` | Join form window |
| `RATE_LIMIT_MAX` | no | `5` | Requests per window per IP |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | no | — | Enables email notification for new requests |
| `NOTIFY_EMAIL` | no | `theheroadityasingh498@gmail.com` | Where notifications go |

Without `MONGODB_URI` the API still starts in development: the site works, `/api/health` reports `db: "disconnected"`, and join requests return `503` until the URI is added. In production a missing URI stops the server.

### MongoDB Atlas in short

1. Create a free cluster and a database user.
2. Allow your IP (or `0.0.0.0/0` while testing).
3. Copy the driver connection string, add the database name, and paste it into `MONGODB_URI`.

### Optional email notifications

Set the four `SMTP_*` values. With Gmail, use an App Password (Google Account → Security → 2-Step Verification → App passwords) and `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`.

## API

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/api/join` | Create a join request. `201` saved, `400` validation, `409` duplicate email, `429` rate limited, `503` database unavailable |
| `GET` | `/api/health` | `{ ok, status, db, uptime }` |

Validation rules live in `shared/join.js` and are used by both the form and the API, so the two cannot drift apart.

## Editing content

All copy — sections, topics, steps, FAQ, form labels, member count, email and social links — is in `client/src/data/site.js`.

The artwork lives in `client/src/assets`. `Anveshana-logo.png`, `Anveshana-extra-image.png` and `Anveshana-extra-image-2.png` are the originals. `logo-full.png` (footer) and `logo-lockup.png` (navbar) are transparent, web-sized derivatives of the supplied logo, so the beige background of the original does not show against the site; `client/public/favicon.png` is the favicon. `what-we-do.png` is a trimmed copy of `Anveshana-extra-image-2.png` with its empty transparent margin removed for the "What we do" header. If you replace an image, regenerate its derivative.

Social links are empty by default so the footer never ships dead links. Add your URLs to `SOCIAL`:

```js
export const SOCIAL = [
  { label: 'WhatsApp', href: 'https://chat.whatsapp.com/…', icon: 'whatsapp' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/…', icon: 'linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/…', icon: 'instagram' },
]
```

Filled links render as clickable icons; empty ones render as muted placeholders.

## Deployment

- **Client:** `npm run build` and host `client/dist` on Netlify, Vercel, or any static host. Set `VITE_API_BASE_URL` to the deployed API URL (for example `https://api.example.com/api`) if the client is on a different domain.
- **Server:** host `server/` on Render, Railway, Fly.io or similar. Set `NODE_ENV=production`, `MONGODB_URI`, and `CLIENT_ORIGIN` to your live site origin.

## Structure

```
client/src
├─ assets/        source artwork and transparent logo derivatives
├─ components/    layout, sections, forms, ui
├─ data/site.js   all copy and links
├─ hooks/         form state, scroll reveal, active section, scroll lock
├─ lib/           API client, GSAP setup
└─ styles/        tokens, base, layout, sections, cursor
server/src
├─ config/        env and database
├─ controllers/   join handler
├─ middleware/    validation, rate limit, errors
├─ models/        Member
├─ routes/        API routes
├─ services/      optional email notification
└─ utils/         AppError
shared/join.js    field rules, genders, validation
```
