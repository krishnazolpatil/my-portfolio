/* ── Site flags ──────────────────────────────────────────
   COMING_SOON parks the LIVE site on the holding page while the
   portfolio is still being built. It never applies to `npm run dev`,
   so local iteration always shows the real site.

   Flip to false and redeploy to put the portfolio back live.

   Escape hatch on the live site: append ?preview to any URL —
   https://krishnazolpatil.com/?preview
───────────────────────────────────────────────────────── */
const COMING_SOON = false;

const isPreview = () =>
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("preview");

/* import.meta.env.DEV is true only under the Vite dev server. */
export const showComingSoon = () =>
  COMING_SOON && !import.meta.env.DEV && !isPreview();

/* ── Case-study pictures ─────────────────────────────────
   Which set of pictures the case studies (and their cards and poster on
   the homepage) draw from. The hero portrait, peeps and logos are not
   part of this; they always show.

     "archive"      the site as it was when the archive was taken:
                    public/archive/naya and public/archive/work, a frozen
                    copy of every picture that shipped on 2026-09-28.
     "placeholder"  no screenshots, figures or clips at all; every one is
                    a labelled slot that names the file to drop in.
     "new"          public/naya and public/work as they are now, so a
                    picture replaced or added there is the new version.

   Escape hatch on any build: append ?pictures=archive (or placeholder,
   or new) to the URL — https://krishnazolpatil.com/?pictures=archive
───────────────────────────────────────────────────────── */
const PICTURES = "placeholder";

const PICTURE_MODES = ["archive", "placeholder", "new"];

export const pictureMode = () => {
  if (typeof window !== "undefined") {
    const q = new URLSearchParams(window.location.search).get("pictures");
    if (PICTURE_MODES.includes(q)) return q;
  }
  return PICTURES;
};
