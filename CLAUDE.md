# Monsignore web, kolo 2

## Purpose and scope

This project is the Vite + Tailwind CSS 3 website for Taneční centrum Monsignore. Keep the existing stack, routing, and content-editing approach. Round 2 redesigns only the Home page, the course overview, and one course detail as a visual proposal for Filip and Magda. Do not build the remaining pages or continue the therapy and summer-school sections until Magda approves the TC Monsignore visual direction.

Follow the project-wide rules in `AGENTS.md`. This file records the round-two implementation constraints. Do not let it override the user's explicit instruction that the supplied DOCX is the primary source for site structure.

## Sources of truth

- Primary source for navigation, page structure, block order, and the content outline: the user-supplied `hlavní STRUKTURA NOVÉHO WEBU TC MONSIGNORE.docx`. Follow it when arranging Home and the main sections.
- `BRIEF-monsignore.md` and the round-two prompt supplement the DOCX with visual direction, color/font tokens, accessibility, technical constraints, and the review workflow. If they disagree about structure, follow the DOCX. Record scope pauses and missing facts in `TODO.md` rather than inventing a resolution.
- Exact client copy: `texty-monsignore.md`, when present. Preserve wording exactly except corrections explicitly authorized in section 7 of the prompt. Until that source is available, use only copy present in the DOCX/prompt and mark missing content `[DOPLNIT: …]`.
- Photos, logo, and fonts: original files in `NEW_ASSETS/`. Treat them as read-only: never edit, rename, or delete originals. Derived exports belong in a separate generated-assets folder.

Do not invent facts or copy. Where required content is absent, show `[DOPLNIT: …]` and add a matching entry to `TODO.md`.

## Visual direction

Build a light, airy, image-led site inspired by Arabesque. Large authentic dance photos lead the page; use varied scale and placement with generous whitespace. Keep text on light backgrounds except the hero overlay. Do not brighten dark theatre photos with filters. Use a restrained hover shift/zoom and gentle scroll reveal only where it supports the content; support `prefers-reduced-motion`.

### Fonts

- `Now Light`: large headings only; avoid below roughly 28 px.
- `DM Sans`: navigation, body text, controls, tables; body 17–18 px, line-height 1.6–1.7, line length around 65–70 characters.
- `Oooh Baby`: short decorative mottos or quotes only, never long copy.
- Self-host WOFF2 with `@font-face`, `font-display: swap`, Latin and Latin-ext subsets. Verify Czech diacritics. If a font lacks glyphs, record it in `TODO.md`; do not fake glyphs.

### Palette and contrast

Palette tokens: `--brand-wine: #B66463`, `--brand-powder: #F5C1C5`, `--brand-sage: #CEDDC0`, `--brand-olive: #C2AA63`, `--brand-lavender: #CBD2FF`, `--brand-ochre: #CC9445`.

Neutral/accessibility tokens: `--c-text: #2B1A1A`, `--c-wine-dark: #7A3B3A`, `--c-bg: #FBF6F0`, `--c-white: #FFFFFF`. Palette pastels are surfaces and photo backdrops, not body text. Use dark text for small text and controls; white on wine only for sufficiently large text. Verify normal text contrast at 4.5:1 or higher.

Use `data-mood="wine|powder|sage|olive|lavender|ochre|dark"` to set `--c-surface`, `--c-accent`, and `--c-logo`. Current mood assignments are provisional; track approval in `TODO.md`.

### Components and content

Use existing Vite files and reusable block patterns; do not migrate to a new framework or separate HTML pages. Keep content in editable markup/data rather than embedding it in CSS. Use the approved sequence and build three large course groups: youth/adults, Mix Dance Energy/Harmony, and VitaDance 65+.

The Home hero has three rotating images with a fixed, accessible text structure, a 5–6 second interval, pause on hover, and no autoplay under reduced motion. Course photos reveal their title on hover and show it by default on touch screens. Keep testimonial content hidden until approved quotations are supplied.

Children's courses, Tiny Tutus, and Tanec PLUS are discontinued and must not appear. The primary DOCX includes a summer-school block in its structure, while the round-2 prompt says the summer school is paused. Keep its planned position visible in the structure plan, but do not add or rewrite its content until that scope conflict is resolved in `TODO.md`. Therapy is also paused; preserve its current skeleton without adding content.

## Existing implementation map

- `index.html`: header/navigation, Home, footer.
- `src/pages.js`: hash-routed subpages and reusable templates.
- `src/main.js`: routing and interactive behavior.
- `src/style.css`: CSS custom properties and Tailwind `@apply` components.
- `tailwind.config.js`: Tailwind theme tokens and font families.
- `assets/`: current image set. New originals should be kept under `NEW_ASSETS/` when supplied.

## Round-2 workflow

1. Audit the current code against sections 2, 2a, 2b, and 9. Do not change the visual implementation before the plan is approved.
2. Maintain `PLAN.md`, `TODO.md`, and `CHANGELOG.md` as concise project records. Keep the source text file if supplied.
3. After approval, implement in order: tokens/fonts/moods/logo; global typography; Home; three course groups; one representative course detail.
4. Build and verify the site at 360, 768, 1280, and 1920 px. Check reduced motion, image use, contrast, and no horizontal overflow. Target Lighthouse Performance ≥85 and Accessibility ≥95 on mobile.
5. After each substantial step, record 2–3 lines in `CHANGELOG.md` and deploy to the supplied test host only through the available project deployment flow. Capture desktop and mobile screenshots for Home, Courses, and the sample detail. Stop after review materials are ready; do not continue to other pages before visual approval.

Do not change hosting architecture to satisfy clean-URL requirements without an explicit technical plan. The current site uses hash routing; any SEO URL/deployment mismatch must be recorded in `TODO.md` rather than silently changing routing.

## Validation

```sh
npm run build
npm run dev
```

Keep `NEW_ASSETS/` originals untouched. Never commit generated `dist/` output unless the repository's deployment process explicitly requires it.

