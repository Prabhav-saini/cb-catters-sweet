# CB Catters & Sweet — Wholesale Sweets Website

A single-page static catalogue for **CB Catters & Sweet**: 3 categories, 30 sweets, quantity selection, and order enquiries over WhatsApp. It has no backend, no database and no paid services.

**WHOLESALE & BULK ORDERS ONLY**

| | |
|---|---|
| WhatsApp | +91 98371 72497 → `https://wa.me/919837172497` |
| Phone | +91 74558 45671 → `tel:+917455845671` |
| Cheena Sweets | ₹300/kg (CB-CH-001 … 010) |
| Desi Ghee Sweets | ₹500/kg (CB-DG-001 … 010) |
| Kaju Sweets | ₹800/kg (CB-KJ-001 … 010) |

The full product list is in [`PRODUCT_CATALOGUE.md`](PRODUCT_CATALOGUE.md). Photo sources and licences are in [`IMAGE_CREDITS.md`](IMAGE_CREDITS.md).

---

## Run locally

Requires Node.js 20.19+ (or 22+).

```bash
npm install
npm run dev        # http://localhost:5173
```

## Production build

```bash
npm run build      # outputs static files to dist/
npm run preview    # serves dist/ at http://localhost:4173 to check it
```

`dist/` is a plain static site. Because `vite.config.js` uses `base: './'`, it works from any domain or sub-folder.

## Free hosting

### Option A: Netlify (easiest, no Git needed)
1. Run `npm run build`.
2. Go to <https://app.netlify.com/drop> and drag the `dist` folder onto the page.
3. Netlify gives you a live `https://…netlify.app` link. You can rename it under *Site settings → Change site name*.

To deploy automatically from GitHub instead, choose *Add new site → Import an existing project*. `netlify.toml` already sets the build command (`npm run build`) and the publish folder (`dist`).

### Option B: GitHub Pages
1. Push this folder to a GitHub repository on the `main` branch.
2. In the repo, go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes on every push. The site appears at `https://<username>.github.io/<repo>/`.

### Option C: Vercel
Import the repo at <https://vercel.com/new>. It detects Vite automatically (build: `npm run build`, output: `dist`).

> Click-to-copy needs HTTPS. All three hosts above serve HTTPS by default.

---

## Updating the site (for the business owner)

| To change… | Edit this file |
|---|---|
| Business name, tagline, phone or WhatsApp number | `src/config/business.js` |
| A category price (updates every sweet in it) | `src/data/products.js` → `CATEGORIES` → `pricePerKg` |
| Sweet names or descriptions, or adding a sweet | `src/data/products.js` → `ITEMS` |
| A product photo | Replace `public/images/products/<PRODUCT-ID>.webp` |
| Colours and fonts | Top of `src/index.css` (`:root`) |

After changing products, run `npm run catalogue` to regenerate `PRODUCT_CATALOGUE.md`.

**Product IDs are permanent.** Customers quote them on WhatsApp, so never renumber or reuse one. Add new sweets with the next free number (for example `CB-KJ-011`) and add a photo with the same name.

### Replacing photos
- Use your own photos where you can. They are more accurate and need no attribution.
- Use a 4:3 landscape photo, about 800×600 px, saved as `.webp` (or `.jpg`; if you use `.jpg`, change the `image` path in `products.js`).
- Keep the file name the same as the product ID.
- When you replace a Wikimedia photo, delete its entry from `src/data/imageCredits.js` and from `IMAGE_CREDITS.md`.
- If a photo is missing or fails to load, the site shows a branded "Photo coming soon" placeholder (`public/images/fallback.svg`).

---

## How ordering works

### Single sweet (core flow)
Each product card has a kilogram quantity field with −/+ buttons and decimal support (for example 2.5). The card shows a live estimated subtotal (`quantity × price per kg`). **Order on WhatsApp** opens:

```
https://wa.me/919837172497?text=<URL-encoded message>
```

The message contains the business name, product name, product code, category, quantity, rate and estimated subtotal, in the same format as the brief.

Quantities are checked before WhatsApp opens. Empty, zero, negative and non-numeric values are rejected with an inline error, as are values with more than 2 decimals or above 10,000 kg.

### Bulk order list (multi-item)
**Add to Bulk Order** collects sweets from any category. The list (header bag icon, or *My Order* on mobile) lets the customer:
- change quantities
- remove items
- see each line's subtotal and the estimated total

It then sends one combined WhatsApp message with each product's code, name, category, quantity, rate, line subtotal and the grand total. The list is saved in the browser's `localStorage`, so it survives a page reload. The site clearly states that totals are estimates and that pricing, availability, minimum order and delivery are confirmed by the business.

### Click-to-call
All call buttons use `tel:+917455845671`. They appear in the header, hero, Bulk Orders section, footer, mobile menu and the floating mobile bar.

### Clipboard copy: behaviour and limits
When a customer taps a WhatsApp order button:
1. The button is a real link (`<a href="https://wa.me/…" target="_blank">`), so the browser opens WhatsApp natively. **Pop-up blockers do not block it**, because no `window.open` happens after an asynchronous step.
2. In the same tap, the site calls the free `navigator.clipboard.writeText()` with the full order message. If that API is unavailable, it falls back to the older `document.execCommand('copy')`.
3. A short notice confirms whether the copy worked.

Limits:
- The Clipboard API works only on **HTTPS** (or localhost) and only in response to a user tap. Some browsers or in-app webviews refuse it; the notice then says the message is prefilled instead.
- Copying and prefilling are separate. The site **cannot** send a message by itself. The customer still has to tap *Send* in WhatsApp.
- If the clipboard fails, ordering still works, because the message is always prefilled through the `wa.me` link.

---

## Project structure

```
cb-catters-sweet/
├── index.html                  # Page title, meta description, theme colour, OG tags, fonts
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── products/CB-XX-NNN.webp   # 30 product photos (800×600)
│       ├── site/                     # hero + 3 category photos
│       └── fallback.svg              # shown if a photo fails
├── src/
│   ├── config/business.js      # name, numbers, nav links
│   ├── data/products.js        # categories, prices, 30 products
│   ├── data/imageCredits.js    # attribution list shown in the footer
│   ├── utils/order.js          # validation, ₹ formatting, WhatsApp messages/URL, clipboard
│   ├── utils/asset.js          # path helper for /public files
│   ├── components/             # Header, Hero, Categories, Catalogue, ProductCard,
│   │                           # QuantityInput, BulkOrders, CartDrawer, Footer,
│   │                           # MobileContactBar, SmartImage, Icons
│   ├── App.jsx                 # page layout, bulk-order list state, toasts
│   └── index.css               # all styles (design tokens at the top)
├── scripts/generate-catalogue.mjs
├── PRODUCT_CATALOGUE.md        # generated, all 30 products
├── IMAGE_CREDITS.md            # photo sources, licences, stand-in notes
├── netlify.toml
└── .github/workflows/deploy.yml
```

Stack: React 19, Vite, plain CSS, and lucide-react icons. Fonts (Fraunces, Mukta) load from Google Fonts.
