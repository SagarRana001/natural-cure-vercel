# Design System: Natural Cure

## 1. Visual Theme & Atmosphere
A "Natural Luxe" aesthetic that feels organic, trustworthy, and high-end. The interface uses generous whitespace ("Art Gallery Airy"), asymmetric layouts, and smooth spring-physics motion to elevate the handmade nature of the products.

## 2. Color Palette & Roles
- **Canvas White** (#FDFCFB) — Primary background surface (off-white for warmth)
- **Sage Leaf** (#7C9082) — Secondary accent for icons and subtle backgrounds
- **Earth Umber** (#2C2C24) — Primary text and structural lines
- **Saffron Amber** (#D4A373) — Highlight color for CTAs and seasonal products
- **Whisper Border** (rgba(44, 44, 36, 0.08)) — 1px structural dividers

## 3. Typography Rules
- **Display:** `Instrument Serif` — Track-tight, elegant, and traditional. Used for large headers.
- **Body:** `Outfit` — Modern, clean, and highly readable. Used for all descriptive text.
- **Banned:** Inter, generic system fonts, oversaturated "neon" colors.

## 4. Component Stylings
- **Buttons:** Flat, with a `-1px` tactile push on active. No outer glows.
- **Cards:** Generously rounded (2rem). Uses subtle inner borders instead of heavy shadows.
- **Grid:** Asymmetric bento grid for the product catalog to avoid the "generic e-commerce" look.

## 5. Layout Principles
- **Asymmetric Hero:** Left-aligned headers with overlapping herbal imagery on the right.
- **Mobile-First:** All complex layouts collapse to a clean single column on mobile.
- **Min-Height:** Hero and full sections use `min-h-[100dvh]` to avoid iOS Safari layout jumps.

## 6. Motion & Interaction
- **Smooth Scroll:** Lenis integrated for a buttery-smooth scrolling experience.
- **Staggered Reveal:** Product cards fade and slide in sequentially.
- **Magnetic Buttons:** Primary CTAs pull toward the cursor slightly on hover.

## 7. Anti-Patterns (Banned)
- No emojis.
- No pure black (#000000).
- No standard 3-column equal grids.
- No generic "Jane Doe" or "John Doe" placeholders.
- No AI copywriting clichés ("Elevate your routine").
