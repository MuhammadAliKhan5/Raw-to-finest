# Raw to Finess — website

Four-page site (Home, Portfolio, Pricing, Video Edits) for a graphic
design / video editing / web design / brand strategy agency. React 19 +
Tailwind CSS v4 + Framer Motion + GSAP/ScrollTrigger + Lenis + WebGL.

## Run it

```
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # serve the production build locally
```

## Structure

- `src/components/` — `LandingPage.jsx`, `PortfolioPage.jsx`,
  `PricingPage.jsx`, `VideoEditsPage.jsx` (the four pages), plus
  `SiteChrome.jsx` (header/footer, cursor, magnetic buttons, 3D tilt,
  spotlight glow, reveal/stagger helpers, Lenis smooth scroll, booking
  modal) and `GlobalStyles.jsx` (fonts, palette, keyframes/utilities).
- `src/components/effects/` — `GLBackground.jsx` (`AuroraBackground`,
  a WebGL noise/aurora shader behind every hero), `ImageDistort.jsx`
  (`RawFinestImage`, the raw→finest hover image: WebGL liquid dissolve
  + chromatic split, falling back to a plain `<img>` if WebGL or the
  texture load fails for any reason), `GsapKit.jsx`
  (`GsapCharReveal`, `GsapMarquee`, `GsapHorizontalScroll`,
  `GsapClipReveal`), and `glUtils.js` (shared WebGL helpers).
- `src/main.jsx` — router shell: `BrowserRouter`, lazy-loaded routes
  per page, `AnimatePresence` page transitions, scroll-to-top on
  navigation.

## What changed in this pass

- `src/components/effects/*` were referenced by every page but either
  missing or (as uploaded this round) depending on `gsap`,
  `@react-three/fiber` and `three` that weren't in `package.json`, so
  the project couldn't install/build. Replaced with a dependency-light
  implementation (plain WebGL, no Three.js) that only needed `gsap`
  added — already reviewed and bug-fixed in an earlier pass (texture
  orientation, a Tailwind class conflict, an alpha-blending mismatch,
  and a horizontal-scroll distance bug).
- The effects folder was also sitting at `src/effects/`, one level
  above where every page's `./effects/...` import actually looks
  (`src/components/effects/`) — moved to match.
- `src/main.jsx` was independently re-running smooth scroll, the grain
  overlay, and a first-visit preloader that `PageTransition` (used by
  every page) and `LandingPage.jsx` already handle — on `/` this meant
  two competing Lenis instances and two stacked grain layers. Trimmed
  main.jsx back to routing only.
- Removed `src/App.jsx`, an earlier scaffold entry point no longer
  referenced by `index.html` (which loads `src/main.jsx` directly).
- **Fixed a severe scroll-lag bug in `RawFinestImage`**: its WebGL
  render loop was drawing every frame forever from mount, with no
  check for whether the image was actually on screen (unlike
  `AuroraBackground`, which already paused correctly off-screen).
  Portfolio mounts up to 6 of these at once — most of them below the
  fold — so that was up to 6-7 real-time shaders running full-tilt
  continuously regardless of visibility, which is what made the site
  feel like it couldn't scroll. It now only draws while its own
  `IntersectionObserver` reports it's in the viewport, and no longer
  requests antialiasing (pure GPU cost for a rectangular quad with no
  edges to smooth).

## Notes

- All WebGL effects check `prefers-reduced-motion` and gracefully
  degrade (static frame / plain `<img>` / native scroll).
- `RawFinestImage` loads images with `crossOrigin="anonymous"`; if a
  source host doesn't send permissive CORS headers, the texture upload
  is caught and it falls back to a plain `<img>` automatically.
- `EMAILJS_*` keys used by the booking modal live in `SiteChrome.jsx`
  — swap them for your own if these aren't live.
- `vercel.json` already has the SPA rewrite needed for client-side
  routing on Vercel.
