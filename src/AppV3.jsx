import { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo,
         memo, Component } from "react";
import { X, Mail, ArrowUpRight, ArrowRight, Download,
         Layers, Hammer, Workflow,
         Linkedin, Github, Twitter, Instagram } from "lucide-react";
import { PROJECTS, ARCHIVE, BUILT, PROCESS } from "./data.js";
import ShapeGrid from "./ShapeGrid.jsx";

/* ─────────────────────────────────────────────────────────
   v4 — THE GRID. A fresh concept, not a restyle of v3.

   Where v3 was a dark cinematic billboard with soft radii and
   a glowing accent, v4 is flat, drawn and square: a pine-green
   ground ruled into cells, cream ink on top, and not one
   rounded corner anywhere. Nothing glows; edges do the work.

   Two colours carry it — the green ground and cream ink — with
   near-black reserved for the hover cell and for depth. Two
   fonts, per the v3 typography fix: Inter Tight sets headings,
   Inter sets text.

   Cream on green holds 5.4:1, dim cream 4.6:1, and the cream
   button inverts to green ink at 12:1.
───────────────────────────────────────────────────────── */

const MAILTO = "mailto:krishna.zolpatil@gmail.com";
const WORK = PROJECTS.filter(p => !p.side && !p.archived);
/* Every project here is the same four years at the same company. Two of them
   are the case studies — the workflow platform and the estimation product,
   which grew alongside each other and meet at the end. The rest are examples
   of the work, and read as parts of it rather than as rivals. */
const LEADS = WORK.filter(p => p.feature);
const REST = WORK.filter(p => !p.feature);
/* A piece whose parent is not itself a case study would otherwise vanish
   from the page, so anything unclaimed is collected rather than dropped. */
const ORPHANS = REST.filter(p => !LEADS.some(l => l.id === p.partOf));
const SIDE = PROJECTS.filter(p => p.side);

const NAV_LINKS = [
  { id: "work", label: "Work", Icon: Layers },
  { id: "side", label: "Side projects", Icon: Hammer },
  { id: "process", label: "Process", Icon: Workflow },
  { id: "contact", label: "Contact", Icon: Mail },
];

const SOCIALS = [
  { href: "https://www.linkedin.com/in/krishnazolpatil/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com/krishnazolpatil", label: "GitHub", Icon: Github },
  { href: "https://x.com/krishnazolpatil", label: "X", Icon: Twitter },
  { href: "https://instagram.com/krishna.ux", label: "Instagram", Icon: Instagram },
];

const Styles = memo(() => (
  <style>{`
    /* Two families only — kept in step with the Google Fonts link in
       index.html. See the v3 note: when they drifted apart, headings fell
       back to Helvetica and body copy to system SF. */
    :root { --font-sans:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;
            --font-display:'Inter Tight','Inter',system-ui,-apple-system,sans-serif; }

    /* Beside a rail an anchor lands clear; only the stacked top bar overlaps
       what it jumps to, so the offset is restored at that breakpoint. */
    html { scroll-behavior:smooth; overflow-x:clip; scroll-padding-top:28px; }
    html, body { background:#2D634C; }
    body { font-family:var(--font-sans); -webkit-font-smoothing:antialiased;
           overflow-x:clip; }

    .v4 {
      --green:#2D634C;      /* the ground */
      --green-2:#24523F;    /* raised panel */
      --green-3:#1C4232;    /* well */
      --ink:#0F241C;        /* hover cell, deepest surface */
      --cream:#F0E9D9;      /* primary ink */
      --cream-2:#DCD3BF;    /* secondary ink, holds 4.6:1 */
      --cream-3:#A9A08B;    /* trim only, never body text */
      --line:rgba(240,233,217,0.22);
      --line-2:rgba(240,233,217,0.11);

      /* The nav is a rail down the left, so the content sits in the space
         beside it and gutters off its own edges rather than centring in the
         viewport — centring on 100vw would ignore the rail and push the page
         off balance. */
      /* The rail costs 68px at rest and only borrows the rest on hover, over
         the page rather than beside it — so labels are available without the
         layout paying for them or shifting when they appear. */
      --rail:88px;
      --rail-gap:clamp(10px,1.4vh,18px);
      --gut:clamp(16px,2.8vw,46px);
      --edge:var(--gut);

      background:var(--green); color:var(--cream); min-height:100vh;
      position:relative; isolation:isolate;
      font-size:16px; line-height:1.5;
    }
    .v4 *, .v4 *::before, .v4 *::after { box-sizing:border-box; margin:0; padding:0; }
    .v4 img, .v4 svg { display:block; max-width:100%; }
    :where(.v4 a) { text-decoration:none; color:inherit; }
    :where(.v4 button) { font-family:inherit; font-size:inherit; cursor:pointer;
                         background:none; border:none; color:inherit; }
    .v4 ::selection { background:var(--cream); color:var(--ink); }
    .v4 :focus-visible { outline:2px solid var(--cream); outline-offset:2px; }

    /* The ruled ground. Fixed behind everything; .v4 is the stacking context
       so z-index:-1 sits above the flat green fill but under all content. */
    .v4-grid { position:fixed; inset:0; z-index:-1; pointer-events:none; }

    .v4-page { opacity:0; transition:opacity 0.45s ease;
               padding-left:calc(var(--rail) + var(--rail-gap) * 2); }
    .v4.ready .v4-page { opacity:1; }

    /* ── Buttons: square, no exceptions ── */
    .v4-btn { display:inline-flex; align-items:center; justify-content:center; gap:10px;
              height:50px; padding:0 24px; border-radius:0; font-size:0.95rem;
              font-weight:600; white-space:nowrap; border:1px solid var(--cream);
              transition:background 0.18s, color 0.18s, transform 0.14s; }
    .v4-btn svg { width:18px; height:18px; }
    .v4-btn:active { transform:translateY(1px); }
    .v4-btn-solid { background:var(--cream); color:var(--ink); }
    .v4-btn-solid:hover { background:#FFFFFF; }
    .v4-btn-ghost { background:transparent; color:var(--cream); }
    .v4-btn-ghost:hover { background:var(--cream); color:var(--ink); }
    .v4-btn-sm { height:40px; padding:0 16px; font-size:0.86rem; }

    /* ── Nav: a floating rail down the left, square-cornered ── */
    /* Detached from the edges but with no radius — it reads as one more cell
       lifted off the grid rather than a bar welded to the side. */
    .v4-nav { position:fixed; z-index:300;
              top:var(--rail-gap); bottom:var(--rail-gap); left:var(--rail-gap);
              width:var(--rail); overflow-x:hidden; overflow-y:auto;
              display:flex; flex-direction:column; align-items:center;
              justify-content:space-between;
              gap:24px; padding:12px 0; border-radius:0;
              background:rgba(28,66,50,0.72);
              backdrop-filter:blur(14px) saturate(150%);
              -webkit-backdrop-filter:blur(14px) saturate(150%);
              border:1px solid var(--line);
              box-shadow:0 18px 44px -22px rgba(9,22,17,0.9);
              transition:background 0.3s ease, box-shadow 0.3s ease; }
    /* Scrolled, the island firms up in the same green rather than switching to
       ink. Going dark changed its hue and value at once, which read as a
       different object appearing; it only needs to stay legible over whatever
       passes beneath, and the border and shadow already hold it off the page. */
    .v4-nav.solid { background:rgba(28,66,50,0.9);
                    box-shadow:0 22px 52px -22px rgba(9,22,17,0.95); }
    @supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))) {
      .v4-nav { background:rgba(25,60,45,0.97); }
    }
    /* The links sit up under the mark, not adrift in the middle of the rail —
       only Resume is pushed to the foot. */
    .v4-navtop { display:flex; flex-direction:column; align-items:stretch; gap:18px; }
    /* Square avatar, not a circle — the face sits high and left in the frame. */
    .v4-mark { display:flex; align-items:center; justify-content:center; }
    .v4-mark img { width:36px; height:36px; border-radius:0; object-fit:cover;
                   object-position:33% 28%; border:1px solid var(--line); flex-shrink:0; }
    /* Icon over its own word. The label is always there, so the glyph is
       support rather than something to decode — and nothing has to unfold on
       hover to tell you where a link goes. */
    .v4-navlinks { display:flex; flex-direction:column; align-items:stretch; gap:2px; }
    .v4-navlink { display:flex; flex-direction:column; align-items:center; gap:6px;
                  padding:12px 5px; border-radius:0; text-align:center;
                  font-size:0.68rem; font-weight:550; letter-spacing:0.03em;
                  line-height:1.25; color:var(--cream-2);
                  transition:color 0.16s, background 0.16s; }
    /* Small and drawn thin. At 21px with Lucide's default 2px stroke the glyph
       outweighed its own word, which reads as an icon nav that happens to have
       captions; the word is the label and the icon is the aid. */
    .v4-navlink svg { width:17px; height:17px; flex:0 0 auto; stroke-width:1.6; }
    .v4-navlink:hover { color:var(--ink); background:var(--cream); }
    .v4-navlink.on { color:var(--cream); font-weight:650;
                     box-shadow:inset 2px 0 0 var(--cream); }
    .v4-navlink.on:hover { color:var(--ink); }
    /* Resume stays on the rail because it is the one thing a recruiter looks
       for; everything else the rail used to carry lives in the footer. */
    /* Sized down and outlined rather than filled. At the links' proportions a
       solid cream block carried far more weight than they did, so the rail
       ended on a slab. The fill arrives on hover, where it belongs. */
    .v4-railbtn { display:flex; flex-direction:column; align-items:center; gap:5px;
                  padding:9px 5px; border-radius:0;
                  background:transparent; color:var(--cream); text-align:center;
                  font-size:0.62rem; font-weight:600; letter-spacing:0.03em;
                  line-height:1.25; border:1px solid var(--line);
                  transition:background 0.18s, color 0.18s, border-color 0.18s; }
    .v4-railbtn svg { width:15px; height:15px; flex:0 0 auto; stroke-width:1.6; }
    .v4-railbtn:hover { background:var(--cream); color:var(--ink);
                        border-color:var(--cream); }

    /* ── Hero ── */
    /* No tall top inset: the rail is beside the page, not over it. */
    .v4-hero { padding:clamp(48px,9vh,110px) var(--edge) clamp(56px,9vh,104px); }
    .v4-hero-inner { display:grid; grid-template-columns:auto 1fr; gap:clamp(20px,3vw,40px);
                     align-items:start; }
    /* The square is measured to the text column's height in JS so it lands
       exactly on the buttons — see useHeroPhotoSize. This clamp is what shows
       before that measurement lands, on stacked layouts, and if there is no
       ResizeObserver. */
    .v4-hero-photo { width:clamp(160px,20vw,300px); aspect-ratio:1/1; height:auto;
                     border-radius:0; object-fit:cover; object-position:33% 26%;
                     border:1px solid var(--line); }
    .v4-hi { display:block; font-size:clamp(0.95rem,1.1vw,1.15rem); font-weight:550;
             letter-spacing:0.02em; color:var(--cream-2); margin-bottom:clamp(10px,1.4vh,16px); }
    .v4-title { font-family:var(--font-display); font-weight:600;
                font-size:clamp(2.4rem,6.4vw,6rem); line-height:0.96;
                letter-spacing:-0.04em; text-wrap:balance; max-width:16ch; }
    .v4-lede { margin-top:clamp(16px,2.2vh,26px); max-width:52ch;
               font-size:clamp(1rem,1.15vw,1.22rem); line-height:1.6; color:var(--cream-2); }
    .v4-hero-actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:clamp(22px,3vh,34px); }

    /* ── Section furniture ── */
    .v4-sec { padding:clamp(40px,6vh,80px) var(--edge); }
    /* No rules on the ruled ground: the background grid already draws
       horizontals, and a second set at a different pitch and weight reads as
       two grids fighting. Borders here are reserved for objects — cards,
       buttons, the sheet — not for dividing open space. */
    .v4-sec-head { display:flex; align-items:baseline; justify-content:space-between;
                   gap:16px; flex-wrap:wrap;
                   margin-bottom:clamp(22px,3vh,34px); }
    .v4-sec-title { font-family:var(--font-display); font-weight:600;
                    font-size:clamp(1.5rem,2.6vw,2.4rem); letter-spacing:-0.03em; }
    .v4-sec-note { font-size:0.86rem; color:var(--cream-3); letter-spacing:0.06em;
                   text-transform:uppercase; font-weight:550; }

    /* ── The lead: one platform, then the pieces of it ──────────────────
       Every project in the grid below came out of the same four-year job,
       so seven equal squares were claiming seven unrelated projects. The
       lead states the true shape once, and it has to do it on type alone:
       it is the only project with no screenshot to stand on.

       Same object as a card, one step louder — the ink ground a card only
       reaches on hover, and a warm trim edge where a card gets the dim
       rule, leaving full cream free as the hover state. */
    .v4-feature { position:relative; display:block; width:100%; text-align:left;
                  border:1px solid var(--cream-3); border-radius:0;
                  background:var(--ink);
                  transition:border-color 0.2s, transform 0.2s;
                  margin-bottom:clamp(26px,4.2vh,48px); }
    .v4-feature:hover { border-color:var(--cream); transform:translateY(-3px); }
    /* One column when the study has no poster — there is no single
       screenshot of four years — and two when it has one, so a picture gets
       used where it exists instead of being faked where it doesn't. */
    .v4-feature-main { display:grid; grid-template-columns:minmax(0,1fr);
                       align-items:center; gap:clamp(18px,2.8vw,40px);
                       padding:clamp(22px,3.2vw,44px); }
    .v4-feature-main.shot { grid-template-columns:minmax(0,1.1fr) minmax(0,0.9fr); }
    .v4-feature-poster { align-self:stretch; min-height:180px;
                         border:1px solid var(--line-2); background:var(--green-3);
                         overflow:hidden; }
    .v4-feature-poster img { width:100%; height:100%; object-fit:cover;
                             object-position:top center; transition:transform 0.4s ease; }
    .v4-feature:hover .v4-feature-poster img { transform:scale(1.03); }
    .v4-feature-eyebrow { display:block; font-size:0.78rem; font-weight:600;
                          letter-spacing:0.12em; text-transform:uppercase;
                          color:var(--cream-3); }
    .v4-feature-t { display:block;
                    font-family:var(--font-display); font-weight:600;
                    font-size:clamp(1.9rem,4.2vw,3.4rem); line-height:1.02;
                    letter-spacing:-0.04em; text-wrap:balance;
                    margin-top:clamp(10px,1.6vh,18px); }
    .v4-feature-d { display:block; margin-top:clamp(12px,1.8vh,20px); max-width:58ch;
                    font-size:clamp(0.95rem,1.05vw,1.1rem); line-height:1.6;
                    color:var(--cream-2); }
    .v4-feature-cta { display:inline-flex; align-items:center; gap:8px;
                      margin-top:clamp(16px,2.2vh,24px); white-space:nowrap;
                      font-size:0.86rem; font-weight:600; color:var(--cream); }
    .v4-feature-cta svg { width:16px; height:16px; flex-shrink:0;
                          transition:transform 0.2s; }
    .v4-feature:hover .v4-feature-cta svg { transform:translateX(3px); }

    /* A ruled ledger along the bottom edge — the device the process section
       uses further down. 200+ then 5 then 1: the row narrows as you read
       it, which is the argument the case study makes. */
    /* Column count rides in as a custom property rather than an inline
       grid-template, so the stacking rule at 760px can still win. */
    .v4-figs { display:grid; grid-template-columns:repeat(var(--n,3),1fr);
               border-top:1px solid var(--line); }
    .v4-fig { padding:clamp(15px,2.2vw,26px) clamp(16px,2.4vw,28px); }
    .v4-fig + .v4-fig { border-left:1px solid var(--line); }
    .v4-fig b { display:block; font-family:var(--font-display); font-weight:600;
                font-size:clamp(1.8rem,3.2vw,2.9rem); line-height:1;
                letter-spacing:-0.05em; font-variant-numeric:tabular-nums; }
    .v4-fig span { display:block; margin-top:7px; font-size:0.84rem;
                   line-height:1.35; color:var(--cream-3); }

    /* Two case studies on one page need air between them, or the second
       lead reads as another row of the first one's grid. */
    .v4-study + .v4-study { margin-top:clamp(38px,6vh,76px); }

    /* Lighter than a section head — the grid under it is still part of
       "My work at Naya Studio", not a new section. */
    .v4-subhead { display:flex; align-items:baseline; justify-content:space-between;
                  gap:16px; flex-wrap:wrap; margin-bottom:clamp(14px,2vh,22px); }
    .v4-subhead h3 { font-family:var(--font-display); font-weight:600;
                     font-size:clamp(1.05rem,1.6vw,1.35rem); letter-spacing:-0.025em; }

    /* ── Work: a grid of square cells ── */
    .v4-grid-work { display:grid; gap:clamp(12px,1.6vw,20px);
                    grid-template-columns:repeat(auto-fill, minmax(min(280px,100%), 1fr)); }
    .v4-card { position:relative; display:block; width:100%; text-align:left;
               border:1px solid var(--line); border-radius:0; background:var(--green-2);
               transition:background 0.2s, border-color 0.2s, transform 0.2s; }
    .v4-card:hover { background:var(--ink); border-color:var(--cream); transform:translateY(-3px); }
    .v4-shot { position:relative; aspect-ratio:1/1; overflow:hidden;
               border-bottom:1px solid var(--line-2); background:var(--green-3); }
    .v4-shot img { width:100%; height:100%; object-fit:cover; object-position:top center;
                   transition:opacity 0.35s ease, transform 0.4s ease; }
    .v4-card:hover .v4-shot img { transform:scale(1.03); }
    /* Side projects and tools are ~1.83:1 screenshots. Cropped square from the
       top they showed a band of toolbar and read as empty tiles, so they are
       matted whole instead of cropped. */
    .v4-shot-wide { padding:clamp(14px,2vw,24px); background:var(--ink); }
    .v4-shot-wide img { object-fit:contain; object-position:center;
                        border:1px solid var(--line-2); }
    /* No screenshot: the cell sets its own name large, which is the rule
       from the Homebase redesign in this very portfolio — a project with
       no imagery yet should still look like something. The old numeral was
       drawn in --line at 22%, which is what made those tiles read as dead
       frames rather than as covers. */
    .v4-shot-none { position:absolute; inset:0; display:flex;
                    align-items:center; justify-content:center;
                    padding:clamp(16px,2.4vw,28px); }
    .v4-shot-none b { font-family:var(--font-display); font-weight:600;
                      font-size:clamp(1.45rem,2.5vw,2rem); line-height:1.08;
                      letter-spacing:-0.035em; color:var(--cream-2);
                      text-wrap:balance; text-align:center; }
    /* Kind, then name, then the sentence. A grid of names — "Homebase",
       "Design System" — tells a stranger nothing, and the person reading
       this is scanning six cells before deciding to open one.

       The number that used to sit here said less than the kind does: these
       six are areas of one platform, not a sequence, so counting them was
       structure pretending to be information. */
    .v4-card-foot { display:grid; grid-template-columns:minmax(0,1fr) auto;
                    align-items:baseline; gap:4px 12px; padding:14px 16px; }
    .v4-card-tag { font-size:0.72rem; font-weight:600; letter-spacing:0.1em;
                   text-transform:uppercase; color:var(--cream-3); }
    .v4-card-t { grid-column:1/-1; font-family:var(--font-display); font-size:1.05rem;
                 font-weight:600; letter-spacing:-0.02em; line-height:1.25; }
    /* Two lines' worth of room whether the sentence needs them or not, so a
       row of cards keeps one baseline and one bottom margin instead of
       shuffling by a line. */
    .v4-card-s { grid-column:1/-1; font-size:0.85rem; line-height:1.45;
                 min-height:2.9em; color:var(--cream-2); }
    .v4-card-arrow { width:17px; height:17px; flex-shrink:0; color:var(--cream-2);
                     transition:transform 0.2s, color 0.2s; }
    .v4-card:hover .v4-card-arrow { transform:translate(2px,-2px); color:var(--cream); }

    /* ── Process: a ruled ledger, numbered ── */
    .v4-proc { display:grid; gap:2px; }
    /* Rows separate by their own filled block on hover and by rhythm at rest,
       rather than by rules that would cross the background grid. */
    .v4-proc-row { display:grid; grid-template-columns:64px minmax(0,1fr) minmax(0,1.5fr);
                   gap:clamp(12px,2vw,28px); align-items:baseline;
                   padding:clamp(14px,2.2vh,22px) 14px;
                   transition:background 0.18s; }
    .v4-proc-row:hover { background:rgba(15,36,28,0.4); }
    .v4-proc-n { font-size:0.78rem; font-weight:600; letter-spacing:0.12em;
                 color:var(--cream-3); }
    .v4-proc-t { font-family:var(--font-display); font-size:clamp(1rem,1.4vw,1.25rem);
                 font-weight:600; letter-spacing:-0.02em; }
    .v4-proc-d { font-size:0.94rem; line-height:1.6; color:var(--cream-2); }

    /* ── Contact ── */
    /* The footer is the last page of the site, so it is set like one. Held to
       64ch it stacked in the first third and left half the sheet empty; the
       statement now takes the full measure at display size, and the small
       matter splits to both edges instead of trailing under it.
       The socials sit on the same line as the buttons, hard right: that gives
       them an edge and a row to align to, which is what they lacked when they
       floated in the top right of a two-column grid. */
    .v4-contact { display:grid; gap:clamp(26px,4.6vh,54px); }
    .v4-contact-t { font-family:var(--font-display); font-weight:600;
                    font-size:clamp(1.9rem,7vw,6.8rem); line-height:0.97;
                    letter-spacing:-0.042em; text-wrap:balance; max-width:22ch; }
    .v4-contact-row { display:grid; grid-template-columns:minmax(0,1fr) auto;
                      gap:clamp(24px,4vw,64px); align-items:end; }
    .v4-contact-say { min-width:0; }
    .v4-contact-d { max-width:44ch; font-size:1.02rem; line-height:1.62;
                    color:var(--cream-2); }
    .v4-contact-actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:26px; }
    .v4-socials { display:flex; flex-wrap:wrap; gap:10px; justify-content:flex-end; }
    .v4-social { display:grid; place-items:center; width:48px; height:48px; border-radius:0;
                 border:1px solid var(--line); color:var(--cream-2);
                 transition:background 0.18s, color 0.18s, border-color 0.18s; }
    .v4-social:hover { background:var(--cream); color:var(--ink); border-color:var(--cream); }
    .v4-social svg { width:19px; height:19px; }

    /* ── Footer ── */
    /* A sheet of paper laid on the grid: a cream wash thin enough that the
       ruled ground still reads through it, with a grain so it sits as a
       surface rather than a flat tint. The change in tone is its own edge —
       no rule needed, and none wanted on this ground.
       The grain is a background-image, not a ::before: an absolutely
       positioned pseudo-element paints above static text, which would put the
       noise on top of the type. */
    .v4-foot { margin-top:clamp(40px,7vh,90px);
               padding:clamp(40px,7vh,86px) var(--edge) clamp(30px,5vh,52px);
               background-color:rgba(240,233,217,0.055);
               background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23p)' opacity='0.07'/%3E%3C/svg%3E"); }
    /* Small print sits off the bottom of the same sheet — separated by space
       and weight, since this ground takes no rules. */
    .v4-foot-fine { display:flex; flex-wrap:wrap; gap:10px 24px; align-items:baseline;
                    justify-content:space-between;
                    margin-top:clamp(38px,6vh,72px);
                    font-size:0.82rem; line-height:1.6; color:var(--cream-2); }

    /* ── Case study sheet ── */
    /* Flat ink, no blur: the ground is a drawn grid, and blurring it turns a
       crisp ruled page into mush behind the sheet. Opacity does the covering. */
    .v4-scrim { position:fixed; inset:0; z-index:400; background:rgba(9,22,17,0.93);
                display:flex; align-items:center; justify-content:center;
                padding:clamp(12px,4vh,52px) clamp(12px,3vw,32px); overflow:hidden;
                animation:v4fade 0.26s ease; transition:opacity 0.24s ease; }
    /* On the way out the ground clears before the sheet has finished
       shrinking, so the card is uncovered as it arrives back. */
    .v4-scrim.out { opacity:0; }
    @keyframes v4fade { from { opacity:0; } to { opacity:1; } }
    /* The sheet scrolls, not the scrim. While the scrim scrolled, its padding
       sat above the sticky bar and case-study art showed through that gap. */
    .v4-sheet { position:relative; width:min(1080px,100%); max-height:100%;
                overflow-y:auto; overscroll-behavior:contain; border-radius:0;
                background:var(--green); border:1px solid var(--cream);
                will-change:transform; }
    /* Only when there is no card to grow from — a deep link, or reduced
       motion — does the sheet arrive on its own. */
    .v4-sheet.plain { animation:v4rise 0.26s cubic-bezier(0.23,1,0.32,1); }
    @keyframes v4rise { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
    /* The frame carries the movement; its contents cross-fade across it.
       Scaling a rectangle to the card's footprint stretches every line of type
       inside it, and hiding that for a fifth of a second costs less than
       counter-scaling each child. */
    .v4-sheet-bar, .v4-sheet-body { transition:opacity 0.22s ease; }
    .v4-sheet.hush .v4-sheet-bar, .v4-sheet.hush .v4-sheet-body { opacity:0; }
    .v4-sheet-bar { position:sticky; top:0; z-index:2; display:flex; align-items:center;
                    justify-content:space-between; gap:16px; padding:14px 16px 14px 22px;
                    background:var(--ink); border-bottom:1px solid var(--line); }
    .v4-sheet-bar h2 { font-family:var(--font-display); font-size:1.05rem; font-weight:600;
                       letter-spacing:-0.02em; min-width:0; overflow:hidden;
                       text-overflow:ellipsis; white-space:nowrap; }
    .v4-close { display:grid; place-items:center; width:38px; height:38px; border-radius:0;
                border:1px solid var(--line); color:var(--cream); flex-shrink:0;
                transition:background 0.16s, color 0.16s; }
    .v4-close:hover { background:var(--cream); color:var(--ink); }
    .v4-close svg { width:18px; height:18px; }
    .v4-sheet-body { padding:clamp(20px,3.4vw,36px); }
    .v4-sheet-tag { font-size:0.78rem; font-weight:600; letter-spacing:0.1em;
                    text-transform:uppercase; color:var(--cream-3); }
    .v4-sheet-h1 { margin-top:8px; font-family:var(--font-display); font-weight:600;
                   font-size:clamp(1.7rem,3.4vw,2.8rem); line-height:1.04;
                   letter-spacing:-0.035em; text-wrap:balance; }
    .v4-sheet-short { margin-top:12px; max-width:60ch; font-size:1.05rem; line-height:1.6;
                      color:var(--cream-2); }
    .v4-meta { display:grid; gap:0; margin-top:26px; border-top:1px solid var(--line-2);
               grid-template-columns:repeat(auto-fit, minmax(min(190px,100%), 1fr)); }
    .v4-meta div { padding:12px 14px 12px 0; border-bottom:1px solid var(--line-2); }
    .v4-meta dt { font-size:0.74rem; font-weight:600; letter-spacing:0.1em;
                  text-transform:uppercase; color:var(--cream-3); }
    .v4-meta dd { margin-top:5px; font-size:0.92rem; line-height:1.5; color:var(--cream); }
    .v4-block { margin-top:30px; }
    .v4-block h3 { font-family:var(--font-display); font-size:1.15rem; font-weight:600;
                   letter-spacing:-0.02em; padding-bottom:10px;
                   border-bottom:1px solid var(--line); }
    .v4-block p { margin-top:14px; max-width:74ch; font-size:0.97rem; line-height:1.7;
                  color:var(--cream-2); }
    .v4-list { margin-top:14px; display:grid; gap:10px; }
    .v4-list li { list-style:none; display:grid; grid-template-columns:auto 1fr; gap:12px;
                  font-size:0.97rem; line-height:1.62; color:var(--cream-2); }
    .v4-list li::before { content:""; width:8px; height:8px; margin-top:8px;
                          background:var(--cream); flex-shrink:0; }
    .v4-shots { margin-top:16px; display:grid; gap:12px;
                grid-template-columns:repeat(auto-fit, minmax(min(320px,100%), 1fr)); }
    .v4-shots img { width:100%; height:auto; border:1px solid var(--line-2); border-radius:0;
                    background:var(--green-3); }
    .v4-sheet-link { margin-top:20px; }
    /* Day-by-day process. Steps the data flags as looping are the ones that
       iterate — marked with a cream edge rather than a rule, since a rule here
       would read as a divider between days. */
    .v4-days { display:grid; gap:2px; margin-top:14px; }
    .v4-day { list-style:none; display:grid;
              grid-template-columns:78px minmax(0,160px) minmax(0,1fr);
              gap:8px 18px; align-items:baseline; padding:13px 15px;
              background:rgba(15,36,28,0.3); }
    .v4-day.loop { background:rgba(240,233,217,0.06);
                   box-shadow:inset 2px 0 0 var(--cream); }
    .v4-day-n { font-size:0.72rem; font-weight:600; letter-spacing:0.1em;
                text-transform:uppercase; color:var(--cream-2); }
    .v4-day-t { font-family:var(--font-display); font-size:0.98rem; font-weight:600;
                letter-spacing:-0.015em; color:var(--cream); }
    .v4-day-b { font-size:0.92rem; line-height:1.6; color:var(--cream-2); }
    @media (max-width:760px) {
      .v4-day { grid-template-columns:70px minmax(0,1fr); }
      .v4-day-b { grid-column:2; }
    }

    .v4-stack { margin-top:16px; display:flex; flex-wrap:wrap; gap:8px; }
    .v4-stack span { display:inline-flex; align-items:center; padding:6px 12px;
                     border:1px solid var(--line); border-radius:0; font-size:0.82rem;
                     color:var(--cream-2); }

    /* ── Responsive ── */
    @media (max-width:1080px) {
      .v4-grid-work { grid-template-columns:repeat(auto-fill, minmax(min(240px,100%), 1fr)); }
    }
    /* Under 920px a rail would eat the page, so the nav lies back down as a
       top island and the content reclaims the full width. */
    @media (max-width:920px) {
      html { scroll-padding-top:104px; }
      .v4-nav { flex-direction:row; align-items:center; justify-content:space-between;
                top:clamp(8px,1.4vh,16px); bottom:auto;
                left:var(--gut); right:var(--gut); width:auto;
                overflow:visible; padding:9px 9px 9px 12px; gap:14px; }
      /* Lying down there is width to spare, so icon and word sit side by side. */
      .v4-navtop { flex-direction:row; align-items:center; gap:14px; }
      .v4-navlinks { flex-direction:row; align-items:center; gap:2px; }
      .v4-navlink, .v4-railbtn { flex-direction:row; gap:9px; white-space:nowrap;
                                 font-size:0.84rem; letter-spacing:0.01em; }
      .v4-navlink { padding:9px 12px; }
      .v4-navlink.on { box-shadow:inset 0 -2px 0 var(--cream); }
      .v4-railbtn { padding:10px 15px; }
      .v4-page { padding-left:0; }
      .v4-hero { padding-top:clamp(112px,17vh,168px); }
      .v4-hero-inner { grid-template-columns:1fr; }
      .v4-proc-row { grid-template-columns:48px 1fr; }
      .v4-proc-d { grid-column:2; }
      /* The poster drops below the prose rather than squeezing the headline
         into a column too narrow for its measure. */
      .v4-feature-main.shot { grid-template-columns:1fr; }
      .v4-feature-poster { min-height:0; aspect-ratio:16/10; }
      .v4-contact-row { grid-template-columns:1fr; align-items:start; }
      .v4-socials { justify-content:flex-start; }
    }
    @media (max-width:760px) {
      .v4-navlinks { display:none; }
      .v4-btn { height:46px; padding:0 18px; font-size:0.9rem; }
      .v4-btn-sm { height:38px; padding:0 13px; font-size:0.82rem; }
      .v4-hero-actions .v4-btn { flex:1 1 auto; }
      .v4-title { max-width:none; }
      /* Three figures across a phone leaves each one a word wide, so the
         ledger stands up and the rules turn with it. */
      .v4-figs { grid-template-columns:1fr; }
      .v4-fig + .v4-fig { border-left:0; border-top:1px solid var(--line); }
    }
    @media (prefers-reduced-motion:reduce) {
      .v4-card:hover, .v4-feature:hover { transform:none; }
      .v4-scrim, .v4-sheet { animation:none; }
      .v4-sheet-bar, .v4-sheet-body { transition:none; }
      html { scroll-behavior:auto; }
    }
  `}</style>
));

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(err, info) { console.error("[Portfolio v4]", err, info.componentStack); }
  render() {
    if (this.state.failed) return (
      <div style={{ padding: 40, color: "#F0E9D9", background: "#2D634C", minHeight: "100vh" }}>
        This section could not be displayed.
      </div>
    );
    return this.props.children;
  }
}

/* A project cell. A missing screenshot falls back to the numeral rather than
   leaving an empty frame — see the v3 note on the loading skeleton. */
/* Where a thing is standing, as a plain object — a DOMRect read later would
   be a rect of whatever the element has become. */
const rectOf = el => {
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
};

/* A cached image can finish decoding before React attaches onLoad, so settle
   it on attach rather than waiting for an event that has already fired. */
const useMissing = () => {
  const [missing, setMissing] = useState(false);
  const attach = useCallback(el => {
    if (el?.complete && !el.naturalWidth) setMissing(true);
  }, []);
  return [missing, attach, () => setMissing(true)];
};

/* A case-study shot that takes itself off the page when the file is not
   there, rather than leaving the browser's broken-image frame. The Naya
   study is written ahead of its screenshots, so its paths resolve to
   nothing today and to pictures later without touching this file. */
const Shot = memo(function Shot({ src, alt }) {
  const [missing, attach, fail] = useMissing();
  if (missing) return null;
  return <img ref={attach} src={src} alt={alt} loading="lazy" onError={fail} />;
});

const Card = memo(function Card({ id, tag, title, short, wide, foot, onOpen }) {
  const [missing, attach, fail] = useMissing();
  return (
    <button type="button" className="v4-card"
      onClick={e => onOpen(rectOf(e.currentTarget))}>
      <div className={`v4-shot${wide ? " v4-shot-wide" : ""}`}>
        {missing ? (
          <div className="v4-shot-none"><b>{title}</b></div>
        ) : (
          <img ref={attach} src={`/work/${id}.png`} alt={`${title} screenshot`}
            loading="lazy" onError={fail} />
        )}
      </div>
      <div className="v4-card-foot">
        <span className="v4-card-tag">{tag}</span>
        {foot}
        <span className="v4-card-t">{title}</span>
        {short && <span className="v4-card-s">{short}</span>}
      </div>
    </button>
  );
});

/* The lead cell. It carries the same click contract as a card — hand the
   sheet the rect it grew from — but states the platform rather than
   previewing it, because there is no screenshot of four years. */
const Feature = memo(function Feature({ project, onOpen }) {
  const { id, role, timeline, title, lede, short, figures = [] } = project;
  const [missing, attach, fail] = useMissing();
  return (
    <button type="button" className="v4-feature"
      aria-label={`${title} — read the case study`}
      onClick={e => onOpen(rectOf(e.currentTarget))}>
      <div className={`v4-feature-main${missing ? "" : " shot"}`}>
        <div>
          <span className="v4-feature-eyebrow">{role} &middot; {timeline}</span>
          {/* A span, not a heading: the cards set their titles the same way,
              and a heading sealed inside a button is not reachable as one. */}
          <span className="v4-feature-t">{title}</span>
          <span className="v4-feature-d">{lede || short}</span>
          <span className="v4-feature-cta">Read the case study <ArrowRight /></span>
        </div>
        {!missing && (
          <div className="v4-feature-poster">
            <img ref={attach} src={`/work/${id}.png`} alt="" loading="lazy"
              onError={fail} />
          </div>
        )}
      </div>
      {figures.length > 0 && (
        <div className="v4-figs" style={{ "--n": figures.length }}>
          {figures.map(f => (
            <div className="v4-fig" key={f.l}><b>{f.v}</b><span>{f.l}</span></div>
          ))}
        </div>
      )}
    </button>
  );
});

/* Match the hero photo to the height of the text beside it, so the square ends
   level with the buttons at any width.

   This is only safe because the headline is capped at 16ch and the lede at
   52ch: the text wraps to its own measure rather than to whatever width the
   photo leaves over, so growing the photo does not make the text taller. Were
   that not true, photo → narrower text → taller text → bigger photo would
   feed back on itself and never settle. The size cap and the 2px deadband are
   belt and braces against exactly that. */
function useHeroPhotoSize(textRef) {
  const [size, setSize] = useState(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    /* Stacked, the photo has no column to match, so CSS takes it back. */
    const stacked = window.matchMedia("(max-width:920px)");

    const sync = () => {
      if (stacked.matches) { setSize(null); return; }
      /* Never take more than a third of the row. Past that the headline is
         squeezed below its 16ch measure and starts wrapping to the column
         instead — which is the condition that would restart the feedback. */
      const room = el.parentElement ? el.parentElement.offsetWidth * 0.34 : Infinity;
      const next = Math.round(Math.min(el.offsetHeight, room, 620));
      setSize(prev => (prev !== null && Math.abs(prev - next) < 2 ? prev : next));
    };

    const ro = new ResizeObserver(sync);
    ro.observe(el);
    stacked.addEventListener("change", sync);
    sync();

    return () => {
      ro.disconnect();
      stacked.removeEventListener("change", sync);
    };
  }, [textRef]);

  return size;
}

const Section = memo(function Section({ id, title, note, children }) {
  return (
    <section id={id} className="v4-sec" aria-label={title}>
      <div className="v4-sec-head">
        <h2 className="v4-sec-title">{title}</h2>
        {note && <span className="v4-sec-note">{note}</span>}
      </div>
      {children}
    </section>
  );
});

/* Outcomes are either a plain string or { text, shots }. */
const Outcome = memo(function Outcome({ item }) {
  const text = typeof item === "string" ? item : item.text;
  return <li>{text}</li>;
});

/* ── The sheet is the card, grown ──────────────────────────────────────────
   A panel that fades in over the page reads as a second object arriving from
   somewhere else. Handed the rect of the card that was clicked, the sheet
   instead starts life scaled and translated onto that card and releases to
   its own size, so the click and what follows are one movement.

   FLIP, not width/height: the sheet holds a whole case study, and animating
   its box would relayout that on every frame. Transform is composited and
   costs nothing per frame — the price is a stretched interior, which the
   contents' cross-fade covers.

   Closing runs the same move backwards and only then tells the parent to
   unmount, so the sheet is back on its card before it disappears. */
const GROW_MS = 420;
const SHRINK_MS = 260;

const stillness = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion:reduce)").matches;

function useGrowFrom(origin, onClose) {
  const ref = useRef(null);
  const box = useRef(null);
  const spent = useRef(false);
  const plain = useMemo(() => !origin || stillness(), [origin]);
  /* Nothing to grow from means nothing to hide: the contents are up from the
     first frame, and only the growing sheet starts them hushed. */
  const [shown, setShown] = useState(plain);
  const [closing, setClosing] = useState(false);

  /* The sheet's own rect, measured untransformed. Taken once: the page behind
     is locked while the sheet is open, so the card stays where it was and the
     same pair of rects serves both directions. */
  const onto = useCallback(() => {
    const r = box.current;
    if (!r || !origin || !r.width || !r.height) return null;
    return `translate(${origin.left - r.left}px, ${origin.top - r.top}px)` +
           ` scale(${origin.width / r.width}, ${origin.height / r.height})`;
  }, [origin]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    /* Clear first, then measure: StrictMode runs this twice in development,
       and the second pass would otherwise measure the first pass's transform. */
    el.style.transition = "none";
    el.style.transform = "none";
    box.current = el.getBoundingClientRect();
    if (plain) return;
    const from = onto();
    if (from) {
      el.style.transformOrigin = "top left";
      el.style.transform = from;
      el.getBoundingClientRect();        /* flush the start frame */
    }
    const id = requestAnimationFrame(() => {
      if (from) el.style.transition = `transform ${GROW_MS}ms cubic-bezier(0.22,1,0.36,1)`;
      el.style.transform = "none";
      setShown(true);
    });
    return () => cancelAnimationFrame(id);
  }, [plain, onto]);

  const close = useCallback(() => {
    if (spent.current) return;
    spent.current = true;
    const el = ref.current;
    const back = plain ? null : onto();
    if (!el || !back) { onClose(); return; }
    setShown(false);
    setClosing(true);
    el.style.transition = `transform ${SHRINK_MS}ms cubic-bezier(0.4,0,0.2,1)`;
    el.style.transform = back;
    /* transitionend can be missed — a background tab, a transform that
       resolves to no change — so a timer backs it up. */
    let called = false;
    const finish = () => { if (called) return; called = true; onClose(); };
    el.addEventListener("transitionend", finish, { once: true });
    setTimeout(finish, SHRINK_MS + 140);
  }, [plain, onto, onClose]);

  return { ref, close, closing, cls: `v4-sheet${plain ? " plain" : ""}${shown ? "" : " hush"}` };
}

const Sheet = memo(function Sheet({ project, origin, onClose }) {
  const { ref, close, closing, cls } = useGrowFrom(origin, onClose);

  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    /* Lock the page behind the sheet, and restore exactly what was there —
       the page may already have had an overflow set. Locked, the card that
       opened this keeps its place, which is what the sheet grows back to. */
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [close, ref]);

  const shotsOf = block => (block.shots || []).filter(Boolean);
  const outcomeShots = (project.outcomes || [])
    .flatMap(o => (typeof o === "string" ? [] : o.shots || []));

  /* Naya is the case study; the rest are examples of the work — what the
     problem was, what shipped, what it changed. The fuller blocks stay in
     data.js untouched: this decides what to show, not what to keep, so a
     constraint or an interaction note can come back by flipping a flag
     rather than by being rewritten. */
  const isLead = !!project.feature;
  const blocks = project.caseStudy || [];
  const shown = isLead ? blocks : [...new Set([
    blocks.find(b => /^problem/i.test(b.label)),
    /* The design system tells its resolution as a run of named moves and
       never labels one "Solution", so its closing block stands in — in a
       narrative sequence, the last block is the resolution. */
    blocks.find(b => /^solution/i.test(b.label)) || blocks[blocks.length - 1],
  ])].filter(Boolean);

  /* Same list either way; only its billing changes. Leading a four-year
     platform study, outcomes are the hook. Closing a short example, they
     are the point. */
  const impact = project.outcomes?.length > 0 && (
    <div className="v4-block">
      <h3>{isLead ? "Outcomes" : "Impact"}</h3>
      <ul className="v4-list">
        {project.outcomes.map((o, i) => <Outcome key={i} item={o} />)}
      </ul>
      {outcomeShots.length > 0 && (
        <div className="v4-shots">
          {outcomeShots.map(src => <Shot key={src} src={src} alt="" />)}
        </div>
      )}
    </div>
  );

  return (
    <div className={`v4-scrim${closing ? " out" : ""}`} onClick={close} role="presentation">
      <div className={cls} role="dialog" aria-modal="true"
        aria-label={project.title} tabIndex={-1} ref={ref}
        onClick={e => e.stopPropagation()}>
        <div className="v4-sheet-bar">
          <h2>{project.title}</h2>
          <button className="v4-close" onClick={close} aria-label="Close case study">
            <X />
          </button>
        </div>

        <div className="v4-sheet-body">
          <span className="v4-sheet-tag">{project.tag}</span>
          <h3 className="v4-sheet-h1">{project.title}</h3>
          {project.short && <p className="v4-sheet-short">{project.short}</p>}

          <dl className="v4-meta">
            {project.role && <div><dt>Role</dt><dd>{project.role}</dd></div>}
            {project.timeline && <div><dt>Timeline</dt><dd>{project.timeline}</dd></div>}
            {project.duration && <div><dt>Duration</dt><dd>{project.duration}</dd></div>}
            {project.team && <div><dt>Team</dt><dd>{project.team}</dd></div>}
          </dl>

          {project.stack?.length > 0 && (
            <div className="v4-stack">
              {project.stack.map(s => <span key={s}>{s}</span>)}
            </div>
          )}

          {project.href && (
            <div className="v4-sheet-link">
              <a className="v4-btn v4-btn-solid" href={project.href}
                target="_blank" rel="noopener noreferrer">
                {project.hrefLabel || "Visit"} <ArrowUpRight />
              </a>
            </div>
          )}

          {/* What came of it, before how it was made. Whoever opens the lead
              is deciding in the first screenful whether to keep reading, and
              the line above already says what the thing is. */}
          {isLead && impact}

          {isLead && project.overview && (
            <div className="v4-block">
              <h3>Overview</h3>
              <p>{project.overview}</p>
            </div>
          )}

          {isLead && project.process?.length > 0 && (
            <div className="v4-block">
              <h3>Process</h3>
              <ol className="v4-days">
                {project.process.map((s, i) => (
                  <li key={`${s.day}-${i}`} className={`v4-day${s.loop ? " loop" : ""}`}>
                    <span className="v4-day-n">{s.day}</span>
                    <span className="v4-day-t">{s.t}</span>
                    <span className="v4-day-b">{s.b}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {shown.map((block, i) => (
            <div className="v4-block" key={`${block.label}-${i}`}>
              <h3>{block.label}</h3>
              <p>{block.body}</p>
              {shotsOf(block).length > 0 && (
                <div className="v4-shots">
                  {shotsOf(block).map(src => <Shot key={src} src={src} alt="" />)}
                </div>
              )}
            </div>
          ))}

          {!isLead && impact}
        </div>
      </div>
    </div>
  );
});

const ToolSheet = memo(function ToolSheet({ tool, origin, onClose }) {
  const { ref, close, closing, cls } = useGrowFrom(origin, onClose);
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [close, ref]);

  return (
    <div className={`v4-scrim${closing ? " out" : ""}`} onClick={close} role="presentation">
      <div className={cls} role="dialog" aria-modal="true" aria-label={tool.name}
        tabIndex={-1} ref={ref} onClick={e => e.stopPropagation()}>
        <div className="v4-sheet-bar">
          <h2>{tool.name}</h2>
          <button className="v4-close" onClick={close} aria-label="Close">
            <X />
          </button>
        </div>
        <div className="v4-sheet-body">
          <span className="v4-sheet-tag">{tool.kind}</span>
          <h3 className="v4-sheet-h1">{tool.name}</h3>
          <p className="v4-sheet-short">{tool.desc}</p>
          <div className="v4-block">
            <h3>About</h3>
            <p>{tool.about}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function AppV3() {
  const [ready, setReady] = useState(false);
  const [solid, setSolid] = useState(false);
  const [activeSec, setActiveSec] = useState("work");
  const [open, setOpen] = useState(null);
  const [tool, setTool] = useState(null);
  /* Where the sheet came from, so it knows where to go back to. */
  const [origin, setOrigin] = useState(null);
  const heroTextRef = useRef(null);
  const photoSize = useHeroPhotoSize(heroTextRef);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setSolid(window.scrollY > 24);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const openProject = useCallback((id, from) => { setOrigin(from); setOpen(id); }, []);
  const openTool = useCallback((b, from) => { setOrigin(from); setTool(b); }, []);
  const closeProject = useCallback(() => setOpen(null), []);
  const closeTool = useCallback(() => setTool(null), []);

  const current = open ? PROJECTS.find(p => p.id === open) : null;

  return (
    <ErrorBoundary>
      <Styles />
      <div className={`v4${ready ? " ready" : ""}`}>

        <div className="v4-grid" aria-hidden="true">
          {/* A translucent wash rather than a solid ink cell — at full opacity
              the square read as a black hole punched in the ground. */}
          <ShapeGrid direction="down" speed={0.35} squareSize={52}
            borderColor="rgba(240,233,217,0.10)" hoverFillColor="rgba(15,36,28,0.38)" />
        </div>

        <header className={`v4-nav${solid ? " solid" : ""}`}>
          <div className="v4-navtop">
            <a href="#top" className="v4-mark" aria-label="Krishna Zolpatil">
              <img src="/about-photo.jpg" alt="" width="36" height="36" />
            </a>
            <nav className="v4-navlinks" aria-label="Sections">
              {NAV_LINKS.map(l => (
                <a key={l.id} href={`#${l.id}`} onClick={() => setActiveSec(l.id)}
                  className={`v4-navlink${activeSec === l.id ? " on" : ""}`}>
                  <l.Icon aria-hidden="true" />
                  <span>{l.label}</span>
                </a>
              ))}
            </nav>
          </div>
          <a className="v4-railbtn" href="/resume.pdf"
            download="Krishna-Zolpatil-Resume.pdf">
            <Download aria-hidden="true" />
            <span>Resume</span>
          </a>
        </header>

        <div className="v4-page">
          <main id="top">

            <section className="v4-hero" aria-label="Introduction">
              <div className="v4-hero-inner">
                <img className="v4-hero-photo" src="/about-photo.jpg"
                  alt="Krishna Zolpatil" width="300" height="300"
                  style={photoSize ? { width: photoSize, height: photoSize } : undefined} />
                <div ref={heroTextRef}>
                  <span className="v4-hi">Hi, I&rsquo;m Krishna</span>
                  <h1 className="v4-title">I design AI products people can trust.</h1>
                  <p className="v4-lede">
                    Senior Product Designer at Naya Studio &mdash; a digital platform for
                    physical products. Four years, 200+ shipped features. I design in
                    Figma and build the prototypes in code.
                  </p>
                  <div className="v4-hero-actions">
                    <a href="#work" className="v4-btn v4-btn-solid">
                      View the work <ArrowRight />
                    </a>
                    <a href="/resume.pdf" download="Krishna-Zolpatil-Resume.pdf"
                      className="v4-btn v4-btn-ghost">
                      <Download /> Resume
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <Section id="work" title="My work at Naya Studio" note="Two case studies, four years">
              {/* Each case study keeps its own pieces under it. Laid out flat,
                  Homebase and Group Sharing read as rival projects; they are
                  areas of the platform above them. */}
              {LEADS.map(lead => {
                const parts = REST.filter(p => p.partOf === lead.id);
                return (
                  <div className="v4-study" key={lead.id}>
                    <Feature project={lead} onOpen={r => openProject(lead.id, r)} />
                    {parts.length > 0 && (
                      <>
                        <div className="v4-subhead">
                          <h3>Inside it</h3>
                          <span className="v4-sec-note">{parts.length} areas, up close</span>
                        </div>
                        <div className="v4-grid-work">
                          {parts.map(p => (
                            <Card key={p.id} id={p.id} tag={p.tag} title={p.title}
                              short={p.short} onOpen={r => openProject(p.id, r)} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
              {ORPHANS.length > 0 && (
                <div className="v4-study">
                  <div className="v4-subhead">
                    <h3>Also at Naya</h3>
                    <span className="v4-sec-note">{ORPHANS.length} more</span>
                  </div>
                  <div className="v4-grid-work">
                    {ORPHANS.map(p => (
                      <Card key={p.id} id={p.id} tag={p.tag} title={p.title}
                        short={p.short} onOpen={r => openProject(p.id, r)} />
                    ))}
                  </div>
                </div>
              )}
            </Section>

            <Section id="side" title="Side projects" note="Shipped solo">
              <div className="v4-grid-work">
                {SIDE.map(p => (
                  <Card key={p.id} id={p.id} tag={p.tag} title={p.title} wide
                    short={p.short} onOpen={r => openProject(p.id, r)} />
                ))}
                {BUILT.map(b => (
                  <Card key={b.slug} id={b.slug} tag={b.kind} title={b.name} wide
                    short={b.desc} foot={<ArrowUpRight className="v4-card-arrow" />}
                    onOpen={r => openTool(b, r)} />
                ))}
              </div>
            </Section>

            <Section id="process" title="How I work" note="Six steps, on repeat">
              <div className="v4-proc">
                {PROCESS.map((s, i) => (
                  <div className="v4-proc-row" key={s.t}>
                    <span className="v4-proc-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="v4-proc-t">{s.t}</span>
                    <span className="v4-proc-d">{s.d}</span>
                  </div>
                ))}
              </div>
            </Section>

          </main>

          {/* The footer is the contact block — they were the same request
              twice, once as a section and once as small print. */}
          <footer className="v4-foot" id="contact">
            <div className="v4-sec-head">
              <h2 className="v4-sec-title">Get in touch</h2>
              <span className="v4-sec-note">Available for work</span>
            </div>
            <div className="v4-contact">
              <p className="v4-contact-t">Let&rsquo;s build something people trust.</p>
              <div className="v4-contact-row">
                <div className="v4-contact-say">
                  <p className="v4-contact-d">
                    I&rsquo;m open to senior product design roles. If you&rsquo;re working
                    on something hard and want it to feel simple, I&rsquo;d like to hear
                    about it.
                  </p>
                  <div className="v4-contact-actions">
                    <a className="v4-btn v4-btn-solid" href={MAILTO}>
                      <Mail /> Email me
                    </a>
                    <a className="v4-btn v4-btn-ghost" href="/resume.pdf"
                      download="Krishna-Zolpatil-Resume.pdf">
                      <Download /> Resume
                    </a>
                  </div>
                </div>
                <div className="v4-socials">
                  {SOCIALS.map(s => (
                    <a key={s.label} className="v4-social" href={s.href} aria-label={s.label}
                      target="_blank" rel="noopener noreferrer">
                      <s.Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="v4-foot-fine">
              <span>Also shipped: {ARCHIVE}</span>
              <span>© {new Date().getFullYear()} Krishna Zolpatil</span>
            </div>
          </footer>
        </div>

        {current && <Sheet project={current} origin={origin} onClose={closeProject} />}
        {tool && <ToolSheet tool={tool} origin={origin} onClose={closeTool} />}
      </div>
    </ErrorBoundary>
  );
}
