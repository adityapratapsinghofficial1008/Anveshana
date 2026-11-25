# Anveshana

A single-page website for Anveshana — a serious tech community for people curious about technology, innovation, entrepreneurship, life and philosophy.

**Ask. Share. Build. Together.**

Stack: React (JavaScript) + Vite. The join form opens the visitor's email app with their answers prefilled; there is no backend, API, or database.

```
.
├─ client/            React single-page app
└─ README.md
```

## Requirements

- Node.js 20.19+ (developed on Node 24)

## Run locally

```bash
cd client
npm install
npm run dev
```

The site runs at http://localhost:5173.

```bash
npm run build     # production build in client/dist
npm run preview   # preview the build
npm run lint
```

No environment variables, API keys, MongoDB connection, or server process are needed.

## Join form

When someone submits the form, it opens their default email app addressed to `SITE.email` with a subject and body containing the details they entered. The visitor sends the email from their mail app — nothing is stored by the site.

- Required fields use the browser's own validation; only "What are you building?" is optional.
- The subject and body are built in `client/src/lib/mailto.js`.
- The recipient address is `SITE.email` in `client/src/data/site.js`.

## Editing content

All copy — sections, topics, steps, FAQ, form labels, member count, email and social links — is in `client/src/data/site.js`. The member count is `SITE.memberCount` (currently 50) and appears in both the hero and About section. Core member cards come from `CORE_MEMBERS` in the same file; each entry has a name, initials, role, LinkedIn URL and a condensed bio. Leave `linkedin` empty to render a non-link placeholder card. Each card is an image card: set `image` to an imported asset (for example `import hasiniPhoto from '../assets/hasini.jpg'` at the top of `site.js`, then `image: hasiniPhoto`) or a public path such as `'/images/hasini.jpg'`. Until an image is set, the card shows a large monogram on a plum-to-night gradient. The name and headline sit in a frosted panel over the top of the image; hovering zooms the image, lifts the card and slides up the bio.

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

Run `npm run build` in `client` and host `client/dist` on Netlify, Vercel, or any static host. No server or environment configuration is required.

## Structure

```
client/src
├─ assets/        source artwork and transparent logo derivatives
├─ components/    layout, sections, forms, ui
├─ data/site.js   all copy, links, member count and gender options
├─ hooks/         scroll reveal, active section, scroll lock
├─ lib/           mailto builder, GSAP setup
└─ styles/        tokens, base, layout, sections, cursor
client/public
└─ favicon.png
```
