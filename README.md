# DÉESSES Bakery — Multi-Branch Brand Demo

A single-page, **static** brand website for *DÉESSES Bakery* (Artemis by Deesses Bakery),
a Hong Kong bakery with four neighbourhood counters. No build step, no dependencies,
no backend — just `index.html`, `styles.css`, and `script.js`.

> **Static demo site.** This is an unofficial design demo built for presentation. It is
> not the official site. Branch details, contacts and seasonal prices are taken from the
> brand's public Instagram bio and public listings (OpenRice / AIRSIDE) for illustration,
> and should be confirmed with the business before any real use.

## What it is

A unified, mobile-first brand site that lets a customer **choose a branch** and **filter the
product menu** by category and branch. It pairs the bakery's warm golden palette with the
pink-and-purple "goddess" gift aesthetic seen on the brand's Instagram.

Sections: hero with Instagram stats → choose-your-branch grid → filterable product menu →
Artemis signature highlights → pre-order CTA (Instagram DM / WhatsApp) → Instagram social
proof → footer with per-branch contacts and full disclaimer. Labels are bilingual
(Traditional Chinese + English) where helpful.

## Branches (公開資料 / public facts)

| Heart | Branch | Address | Phone |
|------|--------|---------|-------|
| 💜 | 啟德 Kai Tak — *Artemis · AIRSIDE* | 九龍啟德協調道2號 Airside B132C · Shop B132C, B1/F, AIRSIDE, 2 Concorde Road | 6812 8981 |
| 🧡 | 西環 Kennedy Town — *Bernice* | 堅尼地城卑路乍街聯威新樓地下 | Pre-order via IG / WhatsApp |
| 💖 | 天水圍 Tin Shui Wai | Wetland Seasons Bay 地下10號 · Shop 10, G/F, Wetland Seasons Bay, 1 Wetland Park Road | 6812 8908 |
| 💓 | 上水 Sheung Shui | 上水廣場5樓512號 · Shop 512, 5/F, Sheung Shui Plaza | 6812 8980 |

**Pre-order:** Instagram DM [@deesses_bakery](https://www.instagram.com/deesses_bakery/) or
WhatsApp **6812 8098** (per the public Instagram bio). Instagram at time of research:
436 posts, ~6,250 followers.

## Product data

Products live in the `PRODUCTS` array in `script.js`, each tagged with a category
(`cake` 🎂 / `pastry` 🧁 / `bakery` 🥯) and the branches that carry it. Products are broadly
shared brand-wide; **Artemis at Kai Tak** carries extra signature/gift bakes (e.g. pistachio
mochi croissant, Déesses unicorn). Items reflect public Instagram posts and snippets:
mini cakes / 散水餅, additive-free natural sourdough, handmade double-fermented croissants,
seasonal cakes (strawberry, Mother's Day rose, unicorn, Lunar New Year orange), filled
bagels and wheel croissants.

### Pricing labels

Prices change often and most are not publicly fixed, so the demo is deliberately conservative:

- **Ask in branch · 門市查詢** — no reliable public price.
- **From public posts · 售價或有變動** — drawn from older social posts; may have changed.
- **Seasonal · 節日限定** — festive/limited items. Past promo figures (e.g. the strawberry
  cake's HK$318 special / HK$368 regular) are shown **as expired examples only**, not current prices.

No prices were invented.

## ⚠️ Images are temporary

The product and Instagram-preview thumbnails use **local temporary preview files** in `assets/`
(defined in the `IMG` map at the top of `script.js`). They are for demo/preview only and
**must be replaced with approved, licensed assets before client delivery**.

## Files

| File         | Purpose                                                             |
|--------------|---------------------------------------------------------------------|
| `index.html` | Page structure: hero, branches, menu, signature, order, social.     |
| `styles.css` | Golden + pink/purple palette, layout, responsive rules, theme tokens.|
| `script.js`  | Branch/product data, filter rendering, sticky-nav & scroll themes.  |
| `README.md`  | This file.                                                          |

## Features

- **Choose your branch** — four branch cards; tapping one filters the menu to that branch.
- **Filterable menu** — category chips (🎂 cake / 🧁 pastry / 🥯 bakery) + branch chips,
  rendered live from data with availability hearts per item.
- **Warm + goddess palette** — golden crust/honey/butter base with rose/plum gift accents.
- **Scroll-driven theme** — page warms through dawn → midday → golden → dusk on scroll.
- **Bilingual labels** — Traditional Chinese + English throughout.
- **Responsive & mobile-first** — fluid type and grids that collapse gracefully.
- **Accessible & reduced-motion aware** — semantic cards, modal focus management, mobile navigation, and reduced-motion-aware scrolling.

## Running it

No tooling required:

```powershell
start index.html
```

Or serve the folder with any static server:

```powershell
python -m http.server 8000
# then visit http://localhost:8000
```

## Customization

- Branches, categories and products are plain data arrays at the top of `script.js` —
  edit `BRANCHES`, `CATEGORIES`, `PRODUCTS`, and the `IMG` map.
- Palette and theme tokens live at the top of `styles.css` (`:root` and the
  `body[data-theme="…"]` blocks).
- Scroll themes are defined by the `themes` array in `script.js`.

## Disclaimer

Unofficial design demo for presentation only. Brand and place names appear for illustrative,
non-commercial purposes. Confirm all hours, pricing, addresses and availability with the
business directly. Replace temporary preview images with approved assets before delivery.
