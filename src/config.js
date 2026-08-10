/* ── Site flags ──────────────────────────────────────────
   COMING_SOON parks the LIVE site on the holding page while the
   portfolio is still being built. It never applies to `npm run dev`,
   so local iteration always shows the real site.

   Flip to false and redeploy to put the portfolio back live.

   Escape hatch on the live site: append ?preview to any URL —
   https://krishnazolpatil.com/?preview
───────────────────────────────────────────────────────── */
const COMING_SOON = true;

const isPreview = () =>
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("preview");

/* import.meta.env.DEV is true only under the Vite dev server. */
export const showComingSoon = () =>
  COMING_SOON && !import.meta.env.DEV && !isPreview();
