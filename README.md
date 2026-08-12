# Phone-explorer
# Signal — Mobile Phone Explorer

A responsive mobile-phone catalog site: search, filters, sort, detail view,
wishlist, compare (up to 3 phones), and an EMI calculator.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

This outputs a static site into `dist/` — upload that folder to any static
host (Vercel, Netlify, GitHub Pages, S3, etc.).

## Where things live

- `src/App.jsx` — the entire app: mock phone data, filters, cards, modal,
  compare table, EMI calculator.
- `src/index.css` — Tailwind + font setup.
- `tailwind.config.js` — Tailwind content paths.

## Customizing

- **Real data**: replace the `PHONES` array near the top of `src/App.jsx`
  with data from your own API or CMS. Every other part of the app (filters,
  sorting, cards, compare) reads from that array automatically.
- **Colors/theme**: the accent colors are inline hex values in `App.jsx`
  (e.g. `#5AA9E6` blue, `#8B7FE8` purple for Flagship, `#F5A623` amber for
  Mid-range, `#34D399` green for Budget). Change them there.
- **Currency**: the `inr()` helper formats prices as ₹ — swap it for your
  own currency/locale.
