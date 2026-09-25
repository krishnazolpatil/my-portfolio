import { useState, useEffect, useLayoutEffect, useRef, useCallback,
         useContext, createContext, memo, Component } from "react";
import { ArrowUpRight, ArrowRight, ArrowLeft, Download } from "lucide-react";
import { PROJECTS, ARCHIVE, BUILT, ABOUT_POINTS, WORKING_WITH_ME, SHOT_HINTS, SHOT_CAPS } from "./data.js";

/* ─────────────────────────────────────────────────────────
   v5 — THE SHEET. v4's content and structure, reset as print.

   Where v4 was cream ink on a pine ground ruled into cells, v5 is
   a sheet of warm paper: near-black ink, hairline rules framing
   the page and dividing every section, and the old pine kept as
   the single accent. Headings sit left and the matter they head
   sits right, so a long case study reads as a run of spreads.

   Three fonts, one job each: Instrument Sans for headings,
   EB Garamond for anything read at length, JetBrains Mono for
   labels. v4 stays in AppV3.jsx; main.jsx picks between them.
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

/* `opt` links drop off the bar on a phone, where the name needs the room. */
const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "side", label: "Side projects", opt: true },
  { id: "with-me", label: "Working with me", opt: true },
  { id: "contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://www.linkedin.com/in/krishnazolpatil/", label: "LinkedIn" },
  { href: "https://github.com/krishnazolpatil", label: "GitHub" },
  { href: "https://x.com/krishnazolpatil", label: "X" },
  { href: "https://instagram.com/krishna.ux", label: "Instagram" },
];

const Styles = memo(() => (
  <style>{`
    /* Three families, each with one job, kept in step with the Google Fonts
       link in index.html: the grotesque sets headings, the serif sets anything
       read for more than a line, and the mono sets labels. Sans everywhere
       made the long case studies hard going; the serif is there for them. */
    :root { --font-display:'Instrument Sans',system-ui,-apple-system,'Segoe UI',sans-serif;
            --font-read:'EB Garamond','Iowan Old Style',Georgia,serif;
            --font-mono:'JetBrains Mono',ui-monospace,'SF Mono',Menlo,monospace; }

    html { scroll-behavior:smooth; overflow-x:clip; scroll-padding-top:calc(var(--nav,64px) + 20px); }
    html, body { background:#FCFBF6; }
    body { font-family:var(--font-display); -webkit-font-smoothing:antialiased; overflow-x:clip; }

    .v5 {
      --paper:#FCFBF6;      /* the ground */
      --paper-2:#F5F3EC;    /* well: shots, the "before" cell */
      --ink:#141412;        /* primary ink */
      --ink-2:#57544D;      /* secondary ink, 7:1 on paper */
      --ink-3:#8F8B82;      /* trim only, never body text */
      --accent:#2D634C;     /* the old site's pine, kept as the one colour */
      --line:rgba(20,20,18,0.14);
      --line-2:rgba(20,20,18,0.08);

      --nav:64px;
      --gut:clamp(20px,5vw,92px);
      --measure:34rem;

      background:var(--paper); color:var(--ink); min-height:100vh;
      font-size:16px; line-height:1.5;
    }
    .v5 *, .v5 *::before, .v5 *::after { box-sizing:border-box; margin:0; padding:0; }
    .v5 img, .v5 svg { display:block; max-width:100%; }
    :where(.v5 a) { text-decoration:none; color:inherit; }
    :where(.v5 button) { font-family:inherit; font-size:inherit; cursor:pointer;
                         background:none; border:none; color:inherit; }
    .v5 ::selection { background:var(--ink); color:var(--paper); }
    .v5 :focus-visible { outline:2px solid var(--accent); outline-offset:2px; }

    /* The page is a framed sheet: two hairlines run its full height and every
       section is ruled off from the next. The lines do the work colour and
       cards did before. */
    .v5-page { width:min(1728px, 100% - 48px); margin:0 auto; border-inline:1px solid var(--line);
               min-height:100vh; opacity:0; transition:opacity 0.4s ease; }
    .v5.ready .v5-page { opacity:1; }

    /* Mono, small, uppercase, tracked: every label on the site is this. */
    .v5-k, .v5-navlink, .v5-mark-role, .v5-crumb, .v5-sec-note, .v5-feature-eyebrow,
    .v5-card-tag, .v5-sheet-tag, .v5-col-k,
    .v5-next-k, .v5-day-n, .v5-head-facts, .v5-fig span {
      font-family:var(--font-mono); font-size:0.72rem; font-weight:400;
      letter-spacing:0.08em; text-transform:uppercase; color:var(--ink-2); }

    /* ── Buttons ── */
    .v5-btn { display:inline-flex; align-items:center; justify-content:center; gap:10px;
              height:46px; padding:0 22px; border:1px solid var(--ink);
              font-size:0.92rem; font-weight:500; white-space:nowrap;
              transition:background 0.18s, color 0.18s; }
    .v5-btn svg { width:17px; height:17px; }
    .v5-btn-solid { background:var(--ink); color:var(--paper); }
    .v5-btn-solid:hover { background:var(--accent); border-color:var(--accent); }
    .v5-btn-ghost:hover { background:var(--ink); color:var(--paper); }

    /* ── Nav: one ruled bar ── */
    .v5-nav { position:sticky; top:0; z-index:300; height:var(--nav);
              display:flex; align-items:center; justify-content:space-between; gap:20px;
              padding:0 var(--gut); background:var(--paper);
              border-bottom:1px solid var(--line); }
    .v5-mark { display:flex; align-items:center; gap:14px; min-width:0; }
    .v5-mark-name { font-size:0.82rem; font-weight:600; letter-spacing:0.04em;
                    text-transform:uppercase; white-space:nowrap; }
    .v5-dot { width:5px; height:5px; background:var(--accent); flex-shrink:0; }
    .v5-mark-role { white-space:nowrap; }
    .v5-navlinks { align-self:stretch; display:flex; align-items:center; gap:clamp(16px,2.6vw,38px); }
    .v5-navlink { white-space:nowrap; transition:color 0.16s; }
    .v5-navlink:hover { color:var(--ink); text-decoration:underline; text-underline-offset:5px; }

    /* ── Hero ── */
    /* A greeting, not a tagline: the name set as large as the sheet allows,
       with the photo standing in the middle of the sentence. The ground
       changes tone along the line the words sit on, so the lower half reads
       as a table the notes are laid out on. */
    .v5-hero { --hp:clamp(44px,8vh,96px); --ph:clamp(170px,21vw,310px);
               padding:var(--hp) var(--gut) clamp(40px,7vh,80px);
               background:linear-gradient(var(--paper) calc(var(--hp) + var(--ph) * 0.62),
                                          var(--paper-2) 0); }
    .v5-hello { display:flex; align-items:center; justify-content:center;
                gap:clamp(14px,2.4vw,40px); font-family:var(--font-read); font-weight:500;
                font-size:clamp(3rem,8vw,7.4rem); line-height:0.8; letter-spacing:-0.045em;
                white-space:nowrap; }
    .v5-hero-photo { width:var(--ph); height:var(--ph); flex-shrink:0;
                     object-fit:cover; object-position:33% 26%; }
    /* Four plain facts instead of one sentence about myself, each on its own
       card. Set in the label face: they are captions to the greeting. */
    .v5-about { list-style:none; display:grid; grid-template-columns:repeat(4,minmax(0,1fr));
                gap:clamp(10px,1.4vw,20px); margin-top:clamp(28px,5vh,56px); }
    .v5-about li strong { display:block; margin-top:8px; font-weight:700; color:var(--ink); }
    .v5-about li strong a { color:inherit; text-decoration:underline;
                            text-decoration-color:var(--accent); text-decoration-thickness:1.5px;
                            text-underline-offset:4px; }
    .v5-about li strong a:hover { color:var(--accent); }
    /* The sentence starts at the top of the card and the bold line ends at
       its bottom; the space between is the card's. */
    .v5-about li > span { display:flex; flex-direction:column; justify-content:space-between;
                          flex:1 1 auto; }
    .v5-about li { display:flex; align-items:stretch; min-height:clamp(120px,14vw,190px);
                   padding:clamp(14px,1.6vw,22px); background:var(--paper);
                   font-family:var(--font-mono); font-size:0.74rem; line-height:1.65;
                   letter-spacing:0.05em; text-transform:uppercase; color:var(--ink); }
    .v5-hero-actions { display:flex; flex-wrap:wrap; justify-content:center; gap:12px;
                       margin-top:clamp(24px,4vh,44px); }

    /* ── Sections: ruled off, heading left, matter right ── */
    .v5-sec { padding:clamp(44px,7vh,92px) var(--gut); border-top:1px solid var(--line); }
    /* The note is set above its title as an eyebrow, though it follows it in
       the markup so the heading is still read first. */
    .v5-sec-head { display:flex; flex-direction:column; gap:14px;
                   margin-bottom:clamp(26px,4vh,44px); }
    .v5-sec-note { order:-1; }
    .v5-sec-title { font-weight:500; font-size:clamp(1.7rem,3vw,2.7rem);
                    letter-spacing:-0.04em; line-height:1.05; }

    /* ── The lead case studies ── */
    .v5-feature { display:block; width:100%; text-align:left; border:1px solid var(--line);
                  transition:border-color 0.2s; margin-bottom:clamp(26px,4vh,44px); }
    .v5-feature:hover { border-color:var(--ink); }
    .v5-feature-main { display:grid; grid-template-columns:minmax(0,1fr); align-items:center;
                       gap:clamp(20px,3vw,48px); padding:clamp(24px,3.4vw,48px); }
    .v5-feature-main.shot { grid-template-columns:minmax(0,1.1fr) minmax(0,0.9fr); }
    /* The poster shows the whole image, never a crop of it: the box takes the
       text column's height and the image sits inside it at its own ratio. */
    .v5-feature-poster { align-self:stretch; min-height:180px; max-height:420px; overflow:hidden;
                         border:1px solid var(--line-2); background:var(--paper-2); }
    .v5-feature-poster img { width:100%; height:100%; object-fit:contain;
                             object-position:center; transition:transform 0.4s ease; }
    .v5-feature:hover .v5-feature-poster img { transform:scale(1.02); }
    .v5-feature-eyebrow { display:block; }
    .v5-feature-t { display:block; margin-top:clamp(12px,1.8vh,20px); font-weight:500;
                    font-size:clamp(1.9rem,3.8vw,3.2rem); line-height:1.03;
                    letter-spacing:-0.045em; text-wrap:balance; }
    .v5-feature-d { display:block; margin-top:clamp(12px,1.8vh,20px); max-width:36rem;
                    font-family:var(--font-read); font-size:clamp(1.1rem,1.2vw,1.22rem);
                    line-height:1.45; color:var(--ink-2); }
    .v5-feature-cta { display:inline-flex; align-items:center; gap:8px;
                      margin-top:clamp(18px,2.4vh,26px); font-size:0.9rem; font-weight:500;
                      text-decoration:underline; text-underline-offset:5px;
                      text-decoration-color:var(--ink-3); }
    .v5-feature-cta svg { width:16px; height:16px; transition:transform 0.2s; }
    .v5-feature:hover .v5-feature-cta svg { transform:translateX(3px); }

    /* Column count rides in as a custom property so the stacking rule at
       760px can still win over it. */
    .v5-figs { display:grid; grid-template-columns:repeat(var(--n,3),minmax(0,1fr));
               border-top:1px solid var(--line); }
    .v5-fig { padding:clamp(16px,2.2vw,26px) clamp(18px,2.6vw,32px); }
    .v5-fig + .v5-fig { border-left:1px solid var(--line); }
    .v5-fig b { display:block; font-weight:500; font-size:clamp(1.8rem,3vw,2.7rem);
                line-height:1; letter-spacing:-0.05em; font-variant-numeric:tabular-nums; }
    .v5-fig span { display:block; margin-top:9px; line-height:1.45; }

    .v5-study + .v5-study { margin-top:clamp(34px,5vh,64px); }
    .v5-subhead { display:flex; align-items:baseline; justify-content:space-between;
                  gap:16px; flex-wrap:wrap; margin-bottom:clamp(14px,2vh,22px); }
    .v5-subhead h3 { font-weight:500; font-size:clamp(1.05rem,1.6vw,1.35rem); letter-spacing:-0.03em; }

    /* ── Cards ── */
    .v5-grid-work { display:grid; gap:clamp(14px,1.8vw,24px);
                    grid-template-columns:repeat(auto-fill, minmax(min(280px,100%), 1fr)); }
    .v5-card { display:block; width:100%; text-align:left; border:1px solid var(--line);
               transition:border-color 0.2s; }
    .v5-card:hover { border-color:var(--ink); }
    .v5-shot { position:relative; aspect-ratio:1/1; overflow:hidden;
               border-bottom:1px solid var(--line); background:var(--paper-2); }
    .v5-shot img { width:100%; height:100%; object-fit:cover; object-position:top center;
                   transition:transform 0.4s ease; }
    .v5-card:hover .v5-shot img { transform:scale(1.02); }
    /* Side projects are ~1.83:1 screenshots; cropped square they showed a band
       of toolbar, so they are matted whole instead. */
    .v5-shot-wide { padding:clamp(14px,2vw,24px); }
    .v5-shot-wide img { object-fit:contain; object-position:center; }
    .v5-shot-none { position:absolute; inset:0; display:flex; align-items:center;
                    justify-content:center; padding:clamp(16px,2.4vw,28px); }
    .v5-shot-none b { font-weight:500; font-size:clamp(1.45rem,2.5vw,2rem); line-height:1.08;
                      letter-spacing:-0.04em; color:var(--ink-2); text-wrap:balance;
                      text-align:center; }
    .v5-card-foot { display:grid; grid-template-columns:minmax(0,1fr) auto;
                    align-items:baseline; gap:6px 12px; padding:16px 18px 18px; }
    .v5-card-t { grid-column:1/-1; font-size:1.08rem; font-weight:500;
                 letter-spacing:-0.025em; line-height:1.25; }
    /* Two lines' worth of room either way, so a row keeps one baseline. */
    .v5-card-s { grid-column:1/-1; font-family:var(--font-read); font-size:1.05rem;
                 line-height:1.35; min-height:2.7em; color:var(--ink-2); }
    .v5-card-arrow { width:17px; height:17px; color:var(--ink-2); transition:transform 0.2s; }
    .v5-card:hover .v5-card-arrow { transform:translate(2px,-2px); }

    /* ── Working with me: said, not tabulated ──
       It was a numbered ledger of five claims. It is a person talking now:
       the name of the section in the hero's own serif, a photo under it, and
       what it is like in the first person down the right. */
    .v5-with { display:grid; grid-template-columns:minmax(0,0.85fr) minmax(0,1.15fr);
               gap:clamp(28px,5vw,88px); align-items:start;
               padding:clamp(56px,10vh,130px) var(--gut); border-top:1px solid var(--line); }
    .v5-with-t { margin-top:16px; font-family:var(--font-read); font-weight:500;
                 font-size:clamp(2.7rem,5.6vw,4.8rem); line-height:0.98;
                 letter-spacing:-0.045em; text-transform:lowercase; }
    .v5-with-head { display:flex; align-items:flex-end; gap:clamp(12px,2vw,28px); }
    .v5-with-head .v5-peep { width:clamp(64px,7vw,96px); margin-bottom:6px; }
    .v5-with-photo { display:block; width:min(100%,340px); aspect-ratio:1; object-fit:cover;
                     margin-top:clamp(32px,6vh,72px); }
    .v5-with-say { display:grid; gap:clamp(18px,2.6vh,26px); max-width:35rem;
                   padding-top:clamp(0px,3vh,34px); }
    .v5-with-say p { font-family:var(--font-read); font-size:clamp(1.12rem,1.35vw,1.26rem);
                     line-height:1.5; color:var(--ink-2); }
    .v5-with-say b { font-weight:500; color:var(--ink); }
    /* The one line to leave with. */
    .v5-with-say p.mark b { text-decoration:underline; text-decoration-color:var(--accent);
                            text-decoration-thickness:1.5px; text-underline-offset:5px; }
    .v5-proof { display:inline; padding:0; font:inherit; color:var(--ink);
                text-decoration:underline; text-underline-offset:4px;
                text-decoration-color:var(--ink-3); white-space:nowrap; }
    .v5-proof:hover { color:var(--accent); text-decoration-color:var(--accent); }
    .v5-proof svg { display:inline-block; width:13px; height:13px; vertical-align:-1px; }

    /* ── Footer: a signature ── */
    .v5-foot { border-top:1px solid var(--line); }
    /* The signature closes every page, the studies included: a tinted band
       with a scalloped top, the name as a wordmark, the ways to reach me
       either side of it as plain words. */
    .v5-band { position:relative; background:var(--paper-2);
               padding:clamp(56px,10vh,120px) var(--gut) clamp(24px,4vh,40px); }
    .v5-band::before { content:""; position:absolute; left:0; right:0; bottom:100%; height:14px;
                       background:radial-gradient(circle at 14px 14px, var(--paper-2) 13.5px, transparent 14px)
                                  0 0/28px 14px repeat-x; }
    /* Sits on the scalloped edge, feet over the band. */
    /* A ledge of its own above the scallop, so the sitter never lands on a
       link. The ledge is paper; the band's edge is what it sits on. */
    .v5-band-ledge { position:relative; height:200px; }
    .v5-band-ledge .v5-peep { position:absolute; left:calc(50% - 210px); bottom:-26px; width:120px; }
    .v5-band-row { display:grid; grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);
                   gap:clamp(16px,3vw,48px); align-items:center; }
    .v5-band-say { display:grid; gap:10px; justify-items:start; }
    .v5-band-row a { font-family:var(--font-read); font-size:1.08rem; color:var(--ink-2); }
    .v5-band-row a:hover { color:var(--accent); text-decoration:underline; text-underline-offset:5px; }
    .v5-wordmark { font-family:var(--font-read); font-weight:500; line-height:0.9;
                   font-size:clamp(3rem,8vw,6.6rem); letter-spacing:-0.05em; color:var(--accent); }
    .v5-socials { display:flex; flex-wrap:wrap; gap:6px 22px; justify-content:flex-end; }
    .v5-foot-fine { display:flex; flex-wrap:wrap; gap:10px 24px; justify-content:space-between;
                    margin-top:clamp(48px,9vh,110px);
                    font-family:var(--font-mono); font-size:0.7rem; line-height:1.7;
                    letter-spacing:0.04em; color:var(--ink-2); }

    /* ── A case study page ── */
    .v5-sheet { --bar:48px; }
    /* The breadcrumb bar pins under the nav. Two sticky things hang off its
       height: the contents rail below it, and where a jump has to land. */
    .v5-sheet-bar { position:sticky; top:var(--nav); z-index:3; height:var(--bar);
                    display:flex; align-items:center; justify-content:space-between; gap:16px;
                    padding:0 var(--gut); background:var(--paper);
                    border-bottom:1px solid var(--line); }
    .v5-crumb { display:flex; align-items:center; gap:12px; min-width:0; white-space:nowrap; }
    .v5-crumb a:hover { color:var(--ink); text-decoration:underline; text-underline-offset:5px; }
    .v5-crumb b { font-weight:400; color:var(--ink); overflow:hidden; text-overflow:ellipsis; }
    /* How far through you are, riding the bar's bottom rule. */
    .v5-sheet-prog { position:absolute; left:0; right:0; bottom:-1px; height:2px;
                     background:var(--accent); transform:scaleX(var(--p,0));
                     transform-origin:0 50%; transition:transform 0.1s linear; }

    /* Title left, facts right, ruled between — the opening spread. */
    .v5-head { display:grid; grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);
               border-bottom:1px solid var(--line); }
    .v5-head-main { padding:clamp(44px,9vh,112px) clamp(20px,3vw,48px)
                    clamp(40px,8vh,96px) var(--gut); }
    .v5-sheet-h1 { font-weight:500; font-size:clamp(2.3rem,5.4vw,5rem); line-height:1.02;
                   letter-spacing:-0.05em; text-wrap:balance; }
    .v5-sheet-short { margin-top:clamp(16px,2.4vh,26px); max-width:30rem;
                      font-family:var(--font-read); font-size:clamp(1.15rem,1.4vw,1.4rem);
                      line-height:1.4; color:var(--ink-2); }
    .v5-head-side { border-left:1px solid var(--line); display:grid;
                    grid-template-rows:1fr 1fr; }
    .v5-head-facts { display:flex; flex-direction:column; justify-content:center; gap:14px;
                     padding:clamp(22px,3vw,40px); line-height:1.5; }
    .v5-head-facts + .v5-head-facts { border-top:1px solid var(--line); }
    .v5-head-award { color:var(--accent); text-decoration:underline;
                     text-decoration-color:var(--accent); text-decoration-thickness:1px;
                     text-underline-offset:4px; }
    .v5-head-award:hover { color:var(--ink); }
    .v5-head-award svg { display:inline; width:11px; height:11px; vertical-align:-1px; }

    /* The study is set into the page rather than out to its rules: one
       measure, centred, with paper either side. There is no contents rail —
       a column of nine labels beside the story was the first thing that
       made this read as a document rather than something being told. */
    .v5-sheet-body { --inset:max(var(--gut), calc((100% - 1040px) / 2));
                     --lead:clamp(84px,15vh,160px);
                     /* How far a plate sits proud of the text either side. The
                        line under a plate steps back in by the same amount, so
                        every caption starts on the text edge. */
                     --proud:clamp(0px,3vw,40px);
                     padding:0 0 clamp(40px,6vh,72px); min-width:0; }
    .v5-sheet-body > * { padding-inline:var(--inset); }
    .v5-sheet-link { margin-top:clamp(36px,6vh,64px); }

    /* The opener is the one spread still ruled to the page edge, so the story
       arrives in the same frame as the title above it: the same column split
       as the head, so its rule continues the head's rule; the heading and
       the picture in the wide cell, the telling in the narrow one, a rule
       between each beat. */
    .v5-story { display:block; border-bottom:1px solid var(--line); }
    .v5-story h3 { padding:clamp(36px,6vh,64px) 0 clamp(24px,4vh,40px);
                   max-width:22ch;
                   font-weight:500; font-size:clamp(2rem,4vw,3.4rem); line-height:1.05;
                   letter-spacing:-0.04em; text-wrap:balance; }
    /* Peeps. Hand-drawn people from Open Peeps, set in the site's ink, and
       never boxed: they stand on rules, lean on headings and sit on the
       footer, the way the reference's characters do. */
    .v5-peep { display:block; height:auto; pointer-events:none; user-select:none; }
    /* The row is at least as tall as the peep, so it stands on the rule
       beneath the line instead of climbing into the beat above. */
    .v5-story-row.has-peep { --peep-h:clamp(150px,20vh,220px); position:relative;
                             min-height:calc(var(--peep-h) + 6px);
                             padding-right:clamp(140px,26%,260px); }
    .v5-story-row .v5-peep { position:absolute; right:0; bottom:0;
                             height:var(--peep-h); width:auto; }
    .v5-block .v5-peep-h { margin-top:clamp(20px,4vh,40px); width:clamp(120px,40%,190px); }
    .v5-block.pivot { position:relative; }
    .v5-block.pivot .v5-peep { position:absolute; right:clamp(0px,6%,80px); bottom:-8px;
                               width:clamp(110px,14%,180px); }
    /* The opener's picture is the first thing after the title: one wide
       image across the whole measure, the product at its best, before a
       word of the problem. The telling runs beneath it in one column. */
    .v5-story-fig { margin:0 calc(-1 * var(--proud)) clamp(28px,5vh,56px); }
    .v5-story-fig img { display:block; width:100%; height:auto; border-radius:10px; }
    .v5-story-fig.plate { padding:clamp(12px,1.6vw,22px); background:var(--paper-2); }
    .v5-story-fig.plate img { border:1px solid var(--line-2); border-radius:0; }
    .v5-fig-h:not(.plate) img { display:block; width:100%; height:auto; mix-blend-mode:multiply; }
    /* Any chapter can carry one, set in the heading column beneath the
       question; a sketch sits on the paper, a screenshot on a plate. */
    .v5-fig-h { margin-top:clamp(24px,4vh,44px); max-width:26rem; }
    .v5-fig-h.plate { padding:clamp(10px,1.4vw,18px); background:var(--paper-2); }
    .v5-fig-h.plate img { border:1px solid var(--line-2); background:#fff; }
    .v5-fig-h figcaption { margin-top:10px; font-family:var(--font-mono); font-size:0.68rem;
                           letter-spacing:0.06em; text-transform:uppercase; color:var(--ink-3); }
    /* A figure marked wide leaves the heading column and takes the
       measure on the same plate as the screens, so a slide with small
       type is read and not squinted at. */
    .v5-fig-w { grid-column:1/-1; margin:clamp(12px,3vh,28px) calc(-1 * var(--proud)) 0; }
    .v5-fig-w img { display:block; width:100%; height:auto; padding:clamp(12px,1.6vw,24px);
                    border:1px solid var(--line-2); border-radius:12px; background:#fff; }
    .v5-fig-w figcaption { margin-top:10px; padding:0 var(--proud); font-family:var(--font-mono);
                           font-size:0.68rem; letter-spacing:0.06em; text-transform:uppercase;
                           color:var(--ink-3); }
    .v5-story-c { border-top:1px solid var(--line); }
    .v5-story-row { padding:clamp(24px,4vh,40px) 0; }
    .v5-story-row + .v5-story-row { border-top:1px solid var(--line); }
    .v5-story-row p, .v5-pairs { font-family:var(--font-read); font-size:1.2rem; line-height:1.45; }
    .v5-story-row p { max-width:34rem; color:var(--ink-2); }
    .v5-story-row p + p { margin-top:14px; }
    .v5-story-row p.say, .v5-pairs b { font-weight:600; color:var(--ink); }
    /* Each beat is two lines: what you know, then what it costs you. Three
       beats sit side by side across the measure, so the count reads as one
       row of consequences rather than a stack. */
    .v5-pairs { display:grid; grid-template-columns:repeat(3,minmax(0,1fr));
                gap:clamp(20px,3vh,28px) clamp(24px,4vw,56px); }
    .v5-pair b, .v5-pair span { display:block; }
    .v5-pair span { margin-top:6px; color:var(--ink-2); }

    /* A chapter: the question on the left, the answer on the right. Chapters
       are joined by a thread rather than fenced off by rules, so fifteen of
       them read as one walk instead of fifteen boxes. */
    .v5-block { position:relative; display:grid;
                grid-template-columns:minmax(0,0.85fr) minmax(0,1.15fr);
                gap:clamp(20px,3vh,32px) clamp(32px,5vw,72px); align-items:start;
                padding-top:var(--lead);
                scroll-margin-top:calc(var(--nav) + var(--bar)); }
    .v5-block::before { content:""; position:absolute; left:var(--inset); top:clamp(20px,4vh,40px);
                        width:1px; height:calc(var(--lead) - clamp(20px,4vh,40px) - 30px);
                        background:var(--line-2); }
    .v5-block::after { content:""; position:absolute; left:calc(var(--inset) - 1.5px);
                       top:calc(var(--lead) - 32px); width:4px; height:4px; border-radius:50%;
                       background:var(--line-2); }
    .v5-story + .v5-block::before, .v5-story + .v5-block::after { display:none; }
    .v5-block h3 { font-weight:500; font-size:clamp(1.7rem,3vw,2.5rem); line-height:1.1;
                   letter-spacing:-0.04em; text-wrap:balance; }
    .v5-block-c > :first-child { margin-top:0; }
    /* Set small and narrow on purpose: short lines, read in a breath. */
    .v5-block p { margin-top:14px; max-width:24rem; font-family:var(--font-read);
                  font-size:1.08rem; line-height:1.5; color:var(--ink-2); }
    .v5-block-c > p:first-child { margin-top:6px; color:var(--ink); }
    /* A chapter can point somewhere once: the link sits under the body in
       the caption's underline, the arrow saying it leaves the site. */
    .v5-block-link a { color:var(--ink); text-decoration:underline;
                       text-decoration-color:var(--accent); text-decoration-thickness:1.5px;
                       text-underline-offset:4px; }
    .v5-block-link a:hover { color:var(--accent); }
    .v5-block-link a svg { display:inline; width:12px; height:12px; vertical-align:-1px; margin-left:2px; }
    .v5-block.role h3::before { content:"★"; margin-right:0.45em; color:var(--accent);
                                font-size:0.72em; vertical-align:0.12em; }
    /* A pivot is the study turning to face you: one statement, given the
       whole measure and nothing beside it. */
    .v5-block.pivot { grid-template-columns:minmax(0,1fr); --lead:clamp(110px,20vh,210px); }
    .v5-block.pivot h3 { max-width:21ch; margin-left:clamp(0px,14%,160px);
                         font-size:clamp(1.9rem,3.5vw,2.9rem); line-height:1.14; }
    .v5-block.pivot p { margin:clamp(28px,5vh,52px) 0 0 clamp(0px,14%,160px); max-width:21rem;
                        color:var(--ink-2); }
    .v5-block.pivot::before, .v5-block.pivot::after { left:calc(var(--inset) + min(14%,160px)); }
    .v5-list { margin-top:6px; display:grid; gap:12px; }
    .v5-list li { list-style:none; display:grid; grid-template-columns:auto 1fr; gap:14px;
                  max-width:26rem; font-family:var(--font-read); font-size:1.08rem;
                  line-height:1.45; color:var(--ink-2); }
    .v5-list li::before { content:""; width:5px; height:5px; margin-top:0.66em;
                          background:var(--accent); }

    /* Before/after, points and the timeline are one construction: columns on
       open paper, a small key over each. They were ruled cells; the rules
       said "table" about things that are sentences. */
    .v5-cols { margin-top:clamp(28px,5vh,48px); display:grid;
               gap:clamp(24px,4vh,36px) clamp(20px,2.6vw,40px);
               grid-template-columns:repeat(var(--n,3),minmax(0,1fr)); }
    /* More than three will not fit the answer column, so they take the measure. */
    .v5-cols.wide { grid-column:1/-1; margin-top:clamp(12px,3vh,28px); }
    /* Past four, the columns wrap to three a row: six steps in one row would
       leave each too narrow for a sentence. */
    .v5-cols.many { grid-template-columns:repeat(3,minmax(0,1fr)); }
    .v5-cols.wide .v5-col-b { max-width:26rem; }
    /* Two columns across the measure take the chapter's own split and gap,
       so the second one starts where the answer column starts. */
    .v5-cols.wide.two { grid-template-columns:minmax(0,0.85fr) minmax(0,1.15fr);
                        column-gap:clamp(32px,5vw,72px); }
    .v5-col-n { display:grid; place-items:center; width:26px; height:26px;
                background:var(--paper-2); font-family:var(--font-mono); font-size:0.68rem;
                color:var(--ink-2); }
    .v5-col-k { display:block; }
    .v5-col.to .v5-col-k { color:var(--accent); }
    .v5-col-t { display:block; margin-top:16px; font-size:0.9rem; font-weight:600;
                letter-spacing:-0.012em; }
    .v5-col-b { display:block; margin-top:7px; font-family:var(--font-read);
                font-size:1.02rem; line-height:1.45; color:var(--ink-2); }
    .v5-col-k + .v5-col-b { margin-top:12px; }
    .v5-col.to .v5-col-b { color:var(--ink); }
    .v5-quote { max-width:24rem; font-weight:500; font-size:clamp(1.25rem,1.9vw,1.6rem);
                line-height:1.25; letter-spacing:-0.035em; text-wrap:balance; }
    .v5-quote + p { margin-top:22px; color:var(--ink-2) !important; }

    /* Screens sit on a matte well across the whole measure, the way a plate
       does, a little proud of the text either side. */
    .v5-shots { grid-column:1/-1; display:grid; gap:clamp(12px,1.6vw,20px);
                margin:clamp(24px,5vh,56px) calc(-1 * var(--proud)) 0;
                grid-template-columns:repeat(auto-fit, minmax(min(420px,100%), 1fr)); }
    /* A clip sits on the same plate as the screens and plays itself, muted,
       on a loop. The note under it says whose it is and where it went. */
    .v5-clip { grid-column:1/-1; margin:clamp(24px,5vh,56px) calc(-1 * var(--proud)) 0; }
    .v5-clip video { display:block; width:100%; height:auto; aspect-ratio:16/10;
                     object-fit:contain; padding:clamp(12px,1.6vw,24px);
                     border:1px solid var(--line-2); border-radius:12px; background:#fff; }
    .v5-clip figcaption { display:flex; flex-wrap:wrap; gap:6px 18px; align-items:baseline;
                          margin-top:14px; padding:0 var(--proud);
                          font-family:var(--font-read); font-size:1.02rem;
                          line-height:1.45; color:var(--ink-2); }
    .v5-clip figcaption a { color:var(--ink); text-decoration:underline;
                            text-decoration-color:var(--accent); text-decoration-thickness:1.5px;
                            text-underline-offset:4px; white-space:nowrap; }
    .v5-clip figcaption a:hover { color:var(--accent); }
    .v5-clip figcaption a svg { width:12px; height:12px; vertical-align:-1px; margin-left:2px; }
    /* The Naya study is written ahead of its screenshots; a plate with
       nothing on it takes itself off the page. */
    .v5-shots:not(:has(img, .v5-shot-ph)) { display:none; }
    /* Every picture opens in a viewer. The button is the image's own shape. */
    .v5-zoom { display:block; width:100%; padding:0; border:0; background:none;
               cursor:zoom-in; }
    .v5-zoom img { display:block; }
    .v5-lb { position:fixed; inset:0; z-index:50; display:grid; place-items:center;
             background:rgba(20,20,18,0.92); cursor:zoom-out; overflow:auto;
             padding:clamp(16px,3vw,40px); }
    .v5-lb img { display:block; max-width:min(1600px,100%); max-height:calc(100vh - 2*clamp(16px,3vw,40px));
                 width:auto; height:auto; cursor:zoom-in; }
    /* Zoomed, the picture goes to its own size and the box scrolls. */
    .v5-lb.in { place-items:start; }
    .v5-lb.in img { max-width:none; max-height:none; cursor:zoom-out; }
    .v5-lb-x { position:fixed; top:14px; right:14px; width:40px; height:40px; display:grid;
               place-items:center; border:1px solid rgba(255,255,255,0.3); background:none;
               color:#fff; font-family:var(--font-mono); font-size:0.8rem; cursor:pointer; }
    .v5-shot-ph { display:grid; place-content:center; gap:10px; aspect-ratio:16/10;
                  min-height:200px; padding:16px; border:1px dashed var(--ink-3);
                  text-align:center; }
    .v5-shot-ph b { font-family:var(--font-mono); font-size:0.68rem; font-weight:400;
                    letter-spacing:0.08em; text-transform:uppercase; color:var(--ink-3); }
    .v5-shot-ph em { max-width:30rem; font-family:var(--font-read); font-style:normal;
                     font-size:1.1rem; line-height:1.4; color:var(--ink); }
    .v5-shot-ph code { font-family:var(--font-mono); font-size:0.74rem; color:var(--ink-2); }
    /* Every screen on a plate is the same shape: a 16:10 card, white inside
       its edge so nothing runs to the border, corners softened. A capture
       taller than the card (a whole landing page) shows its top and no more;
       anything else sits whole in the middle. */
    .v5-shots { align-items:start; }
    .v5-shots .v5-zoom { align-self:start; }
    .v5-shots img { width:100%; height:auto; aspect-ratio:16/10; object-fit:contain;
                    object-position:center; padding:clamp(12px,1.6vw,24px);
                    border:1px solid var(--line-2); border-radius:12px; background:#fff; }
    .v5-shots img.v5-tall { object-fit:cover; object-position:top; }
    /* A panorama takes the whole row and keeps its own shape rather than
       sitting small in a card. */
    .v5-shots .v5-wide { grid-column:1/-1; }
    .v5-shots .v5-wide img { aspect-ratio:auto; }
    .v5-shot-f { margin:0; min-width:0; }
    .v5-shot-f figcaption { margin-top:10px; padding:0 var(--proud); font-family:var(--font-read);
                            font-size:0.98rem; line-height:1.4; color:var(--ink-2); }

    .v5-days { display:grid; margin-top:16px; border-top:1px solid var(--line); }
    .v5-day { list-style:none; display:grid;
              grid-template-columns:78px minmax(0,150px) minmax(0,1fr);
              gap:6px 18px; align-items:baseline; padding:14px 0;
              border-bottom:1px solid var(--line); }
    .v5-day.loop { box-shadow:inset 2px 0 0 var(--accent); padding-left:14px; }
    .v5-day-t { font-size:0.98rem; font-weight:600; letter-spacing:-0.015em; }
    .v5-day-b { font-family:var(--font-read); font-size:1.08rem; line-height:1.42; color:var(--ink-2); }

    /* The page's last line: back to the list, or on to the next study. */
    .v5-next { display:flex; flex-wrap:wrap; align-items:flex-end; justify-content:space-between;
               gap:20px; margin-top:clamp(44px,8vh,96px); padding-top:28px;
               border-top:1px solid var(--line); }
    .v5-next svg { width:16px; height:16px; }
    .v5-next-back { display:inline-flex; align-items:center; gap:8px; font-size:0.9rem;
                    font-weight:500; color:var(--ink-2); }
    .v5-next-back:hover { color:var(--ink); }
    .v5-next-go { display:grid; gap:6px; text-align:right; }
    .v5-next-t { display:inline-flex; align-items:center; gap:10px; font-weight:500;
                 font-size:clamp(1.3rem,2.4vw,2rem); letter-spacing:-0.04em; }
    .v5-next-go:hover .v5-next-t { color:var(--accent); }

    /* ── Responsive ── */
    @media (max-width:1080px) {
      .v5-grid-work { grid-template-columns:repeat(auto-fill, minmax(min(240px,100%), 1fr)); }
    }
    @media (max-width:920px) {
      .v5-band-ledge { display:none; }
      .v5-about { grid-template-columns:repeat(2,minmax(0,1fr)); }
      .v5-head { grid-template-columns:1fr; }
      .v5-head-side { border-left:0; border-top:1px solid var(--line);
                      grid-template-rows:none; grid-template-columns:1fr 1fr; }
      .v5-head-facts + .v5-head-facts { border-top:0; border-left:1px solid var(--line); }
      .v5-head-facts { padding:20px var(--gut); }
      .v5-with { grid-template-columns:minmax(0,1fr); }
    }
    @media (max-width:760px) {
      .v5-page { width:100%; border-inline:0; }
      .v5-mark-role, .v5-dot { display:none; }
      .v5-feature-main.shot { grid-template-columns:minmax(0,1fr); }
      .v5-figs { grid-template-columns:minmax(0,1fr); }
      .v5-fig + .v5-fig { border-left:0; border-top:1px solid var(--line); }
      .v5-block { grid-template-columns:minmax(0,1fr); }
      .v5-story-fig { margin-bottom:clamp(24px,5vh,40px); }
      .v5-pairs { grid-template-columns:minmax(0,1fr); }
      .v5-block.pivot .v5-peep { display:none; }
      .v5-story-row.has-peep { padding-right:0; padding-bottom:150px; }
      .v5-story-row .v5-peep { right:0; height:140px; }
      .v5-block.pivot h3, .v5-block.pivot p { margin-left:0; }
      .v5-block.pivot::before, .v5-block.pivot::after { left:var(--inset); }
      .v5-sheet-body { --proud:0px; }
      .v5-cols { grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr)); }
      .v5-band-row { grid-template-columns:minmax(0,1fr); justify-items:start; }
      .v5-wordmark { order:-1; }
      .v5-socials { justify-content:flex-start; }
      .v5-hero-actions .v5-btn { flex:1 1 auto; }
      /* No room for the sentence on one line, so it stacks around the photo. */
      .v5-hero { background:var(--paper); }
      .v5-hello { flex-direction:column; align-items:flex-start; gap:18px;
                  font-size:clamp(3.2rem,17vw,5.4rem); }
      .v5-about li { min-height:0; background:var(--paper-2); }
      .v5-day { grid-template-columns:70px minmax(0,1fr); }
      .v5-day-b { grid-column:2; }
    }
    @media (max-width:560px) {
      /* Name plus four links overflows a phone; the sections are one scroll
         away, so only the way to the work and the resume stay. */
      .v5-navlink.opt { display:none; }
      .v5-about { grid-template-columns:minmax(0,1fr); }
      .v5-head-side { grid-template-columns:1fr; }
      .v5-head-facts + .v5-head-facts { border-left:0; border-top:1px solid var(--line); }
    }
    @media (prefers-reduced-motion:reduce) {
      .v5-sheet-prog { transition:none; }
      .v5-page { transition:none; }
      html { scroll-behavior:auto; }
    }
    /* Resume is the one thing a recruiter looks for, so it gets the bar's
       end cell to itself. */
    .v5-navcta { align-self:stretch; display:flex; align-items:center; gap:10px;
                 margin-right:calc(var(--gut) * -1); padding:0 clamp(18px,2.6vw,40px);
                 background:var(--paper-2); border-left:1px solid var(--line);
                 color:var(--ink); }
    .v5-navcta svg { width:14px; height:14px; }
    .v5-navcta:hover { background:var(--ink); color:var(--paper); text-decoration:none; }
  `}</style>
));

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(err, info) { console.error("[Portfolio v5]", err, info.componentStack); }
  render() {
    if (this.state.failed) return (
      <div style={{ padding: 40, color: "#141412", background: "#FCFBF6", minHeight: "100vh" }}>
        This section could not be displayed.
      </div>
    );
    return this.props.children;
  }
}

/* A project cell. A missing screenshot falls back to the numeral rather than
   leaving an empty frame — see the v3 note on the loading skeleton. */
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
   nothing today and to pictures later without touching this file. On the
   dev server a missing one is a labelled slot instead, naming the file to
   drop in; the built site never shows the slots. */
/* One viewer for the whole site. A click on any picture opens it to fit the
   window; a click on it there goes to its own size, scrolled to where you
   clicked; Escape or the backdrop closes it. */
const LightboxCtx = createContext(() => {});
const useLightbox = () => useContext(LightboxCtx);

const Lightbox = memo(function Lightbox({ shot, onClose }) {
  /* Zoom is keyed to the picture, so a new one always opens fitted. */
  const [zoom, setZoom] = useState({ src: null, on: false });
  const zoomed = zoom.on && zoom.src === shot?.src;
  const box = useRef(null);
  useEffect(() => {
    if (!shot) return;
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [shot, onClose]);
  if (!shot) return null;
  const toggle = e => {
    e.stopPropagation();
    const img = e.currentTarget;
    const rx = (e.clientX - img.getBoundingClientRect().left) / img.clientWidth;
    const ry = (e.clientY - img.getBoundingClientRect().top) / img.clientHeight;
    setZoom({ src: shot.src, on: !zoomed });
    if (!zoomed) requestAnimationFrame(() => {
      const el = box.current; if (!el) return;
      el.scrollLeft = rx * el.scrollWidth - el.clientWidth / 2;
      el.scrollTop = ry * el.scrollHeight - el.clientHeight / 2;
    });
  };
  return (
    <div className={`v5-lb${zoomed ? " in" : ""}`} ref={box} onClick={onClose}
      role="dialog" aria-modal="true" aria-label={shot.alt || "Image"}>
      <img src={shot.src} alt={shot.alt || ""} onClick={toggle} />
      <button type="button" className="v5-lb-x" onClick={onClose} aria-label="Close">ESC</button>
    </div>
  );
});

/* The empty slot on the dev server: what to capture, then where to put it. */
const Slot = memo(function Slot({ src, what, hint }) {
  const h = hint || SHOT_HINTS[src];
  return (
    <span className="v5-shot-ph" aria-hidden="true">
      <b>Add {what}</b>
      {h && <em>{h}</em>}
      <code>public{src}</code>
    </span>
  );
});

/* The card behind a screen takes its colour from the screen. A picture with
   one colour running round its edge sits on exactly that colour, so the
   card and the picture read as one. A white-edged capture, or one with no
   edge at all, sits on a pastel in the tone of Naya's Estimation lavender,
   or a deep one in the tone of its navy, whichever suits how light it is;
   the family rotates with the card's place in the row so neighbours differ. */
const CARD_LIGHT = ["#dbdcfb", "#d6efe3", "#fbe4d7", "#d9ebfb", "#f6eecf", "#f9dde7"];
const CARD_DARK = ["#17182a", "#182620", "#2a1a20", "#1b2331", "#27201a", "#221a2c"];
function cardColor(source, i = 0) {
  try {
    const c = document.createElement("canvas"); c.width = 32; c.height = 32;
    const x = c.getContext("2d", { willReadFrequently: true });
    x.drawImage(source, 0, 0, 32, 32);
    const d = x.getImageData(0, 0, 32, 32).data;
    const px = (i, j) => { const k = (j * 32 + i) * 4; return [d[k], d[k + 1], d[k + 2], d[k + 3]]; };
    const edge = [px(0, 0), px(31, 0), px(0, 31), px(31, 31), px(16, 0), px(16, 31), px(0, 16), px(31, 16)];
    const near = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) < 30;
    const uniform = edge.every(p => p[3] > 250 && near(p, edge[0]));
    const white = edge[0][0] > 240 && edge[0][1] > 240 && edge[0][2] > 240;
    if (uniform && !white) return `rgb(${edge[0][0]},${edge[0][1]},${edge[0][2]})`;
    let sum = 0, n = 0;
    for (let k = 0; k < d.length; k += 4) if (d[k + 3] > 128) { sum += 0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2]; n++; }
    const set = n && sum / n < 110 ? CARD_DARK : CARD_LIGHT;
    return set[i % set.length];
  } catch { return null; }
}

/* A picture that opens in the viewer. */
const Zoomable = memo(function Zoomable({ src, alt, attach, fail, className, i = 0 }) {
  const open = useLightbox();
  return (
    <button type="button" className={`v5-zoom${className ? ` ${className}` : ""}`}
      onClick={() => open({ src, alt })} aria-label={alt ? `${alt} (open larger)` : "Open larger"}>
      <img ref={attach} src={src} alt={alt} loading="lazy" onError={fail}
        onLoad={e => {
          const el = e.currentTarget;
          if (el.naturalHeight > el.naturalWidth) el.classList.add("v5-tall");
          if (el.naturalWidth > el.naturalHeight * 1.9) (el.closest(".v5-shot-f") || el.closest(".v5-zoom"))?.classList.add("v5-wide");
          if (el.closest(".v5-shots, .v5-fig-w")) { const bg = cardColor(el, i); if (bg) el.style.background = bg; }
        }} />
    </button>
  );
});

/* A screen and the line under it that says what it is. */
/* A shot is a path, or { src, wide } when a slide should take the whole
   row regardless of its shape: a dense diagram reads at the measure and
   not in a half-width card. */
const Shot = memo(function Shot({ src, alt, i, wide }) {
  const [missing, attach, fail] = useMissing();
  if (missing) return import.meta.env.DEV ? <Slot src={src} what="screenshot" /> : null;
  const cap = SHOT_CAPS[src];
  return (
    <figure className={`v5-shot-f${wide ? " v5-wide" : ""}`}>
      <Zoomable src={src} alt={alt || cap || ""} attach={attach} fail={fail} i={i} />
      {cap && <figcaption>{cap}</figcaption>}
    </figure>
  );
});

/* The drawn span was a third device for a fact that reads perfectly well as a
   line. It keeps the only part of the drawing that carried information — the
   length, which the string gives as two dates and never as a duration. */
const YEARS = /(\d{4})\s*[–—-]\s*(\d{2,4})/;
const Span = memo(function Span({ timeline }) {
  const m = timeline.match(YEARS);
  if (!m) return <span>{timeline}</span>;
  const to = m[2].length === 2 ? m[1].slice(0, 2) + m[2] : m[2];
  return (
    <span>
      {timeline} &middot; {Number(to) - Number(m[1])} years
    </span>
  );
});

const Card = memo(function Card({ id, tag, title, short, wide, foot, onOpen }) {
  const [missing, attach, fail] = useMissing();
  return (
    <button type="button" className="v5-card"
      onClick={onOpen}>
      <div className={`v5-shot${wide ? " v5-shot-wide" : ""}`}>
        {missing ? (
          <div className="v5-shot-none"><b>{title}</b></div>
        ) : (
          <img ref={attach} src={`/work/${id}.png`} alt={`${title} screenshot`}
            loading="lazy" onError={fail} />
        )}
      </div>
      <div className="v5-card-foot">
        <span className="v5-card-tag">{tag}</span>
        {foot}
        <span className="v5-card-t">{title}</span>
        {short && <span className="v5-card-s">{short}</span>}
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
    <button type="button" className="v5-feature"
      aria-label={`${title} — read the case study`}
      onClick={onOpen}>
      <div className={`v5-feature-main${missing ? "" : " shot"}`}>
        <div>
          <span className="v5-feature-eyebrow">{role} &middot; {timeline}</span>
          {/* A span, not a heading: the cards set their titles the same way,
              and a heading sealed inside a button is not reachable as one. */}
          <span className="v5-feature-t">{title}</span>
          <span className="v5-feature-d">{lede || short}</span>
          <span className="v5-feature-cta">Read the case study <ArrowRight /></span>
        </div>
        {!missing && (
          <div className="v5-feature-poster">
            <img ref={attach} src={`/work/${id}.png`} alt="" loading="lazy"
              onError={fail} />
          </div>
        )}
      </div>
      {figures.length > 0 && (
        <div className="v5-figs" style={{ "--n": figures.length }}>
          {figures.map(f => (
            <div className="v5-fig" key={f.l}><b>{f.v}</b><span>{f.l}</span></div>
          ))}
        </div>
      )}
    </button>
  );
});

/* A case-study block renders by the kind it declares. An undeclared block is
   still a paragraph, so nothing has to be converted before it will render.
   `body` is one paragraph or a list of short ones. */
/* "iF" and "TEDx" are those brands' own casing, and the small caps labels
   would set them as IF and TEDX. The brand keeps its case; the rest of the
   line keeps the label's. */
const BRANDS = /(\biF\b|TEDx)/;
const Brand = ({ text }) => (
  <span>
    {text.split(BRANDS).map((t, i) =>
      BRANDS.test(t) ? <span key={i} style={{ textTransform: "none" }}>{t}</span> : t)}
  </span>
);

/* An outbound label with its arrow: the last word and the arrow are one
   unbreakable unit, so the arrow never wraps onto a line of its own. */
const NoOrphan = ({ text }) => {
  const i = text.lastIndexOf(" ");
  return (
    <>
      {i > 0 ? <Brand text={text.slice(0, i + 1)} /> : ""}
      <span style={{ whiteSpace: "nowrap" }}>
        {i > 0 ? text.slice(i + 1) : text} <ArrowUpRight aria-hidden="true" />
      </span>
    </>
  );
};

const paras = body => (Array.isArray(body) ? body : body ? [body] : []);

const Cols = memo(function Cols({ items, wide = items.length > 3 }) {
  return (
    <div className={`v5-cols${wide ? " wide" : ""}${items.length === 2 ? " two" : ""}${items.length > 4 ? " many" : ""}`}
      style={{ "--n": items.length }}>
      {items.map((it, i) => (
        <div className={`v5-col${it.to ? " to" : ""}`} key={`${it.t || it.k}-${i}`}>
          {it.k ? <span className="v5-col-k">{it.k}</span>
                : <b className="v5-col-n">{i + 1}</b>}
          {it.t && <span className="v5-col-t">{it.t}</span>}
          <span className="v5-col-b">{it.b}</span>
        </div>
      ))}
    </div>
  );
});

/* A figure is { src, cap?, plate? }. A missing file takes the figure off
   the page in production and leaves a labelled slot on the dev server. */
/* A peep is a name in /peeps; the file is the character, composed once. */
const Peep = memo(function Peep({ name, className }) {
  if (!name) return null;
  return <img className={`v5-peep${className ? ` ${className}` : ""}`}
    src={`/peeps/${name}.svg`} alt="" aria-hidden="true" loading="lazy" />;
});

const Fig = memo(function Fig({ fig, className }) {
  const [missing, attach, fail] = useMissing();
  if (!fig?.src) return null;
  if (missing) return import.meta.env.DEV ? (
    <figure className={className}><Slot src={fig.src} what="figure" hint={fig.alt} /></figure>
  ) : null;
  return (
    <figure className={`${className}${fig.plate ? " plate" : ""}`}>
      <Zoomable src={fig.src} alt={fig.alt || ""} attach={attach} fail={fail} />
      {fig.cap && <figcaption>{fig.cap}</figcaption>}
    </figure>
  );
});

/* A clip is { src, poster?, note?, link?: { href, label } }. A chapter with
   more than one hands over a list and they stack, each on its own plate. */
const Clip = memo(function Clip({ clip }) {
  if (Array.isArray(clip)) return clip.map((c, i) => <OneClip key={c.src} clip={c} i={i} />);
  return <OneClip clip={clip} />;
});

const OneClip = memo(function OneClip({ clip, i = 0 }) {
  const [missing, setMissing] = useState(false);
  const [bg, setBg] = useState(null);
  /* The poster arrives before the first frame does, so the card takes its
     colour from the poster and the frame only confirms it. */
  useEffect(() => {
    if (!clip?.poster) return;
    const im = new Image();
    const done = () => { const c = cardColor(im, i); if (c) setBg(c); };
    im.onload = done; im.src = clip.poster;
    if (im.complete && im.naturalWidth) done();
  }, [clip?.poster, i]);
  if (!clip?.src) return null;
  /* Like a shot: a clip whose file is not there yet leaves the page in
     production and a labelled slot on the dev server. */
  if (missing) return import.meta.env.DEV ? (
    <figure className="v5-clip"><Slot src={clip.src} what="clip" hint={clip.alt} /></figure>
  ) : null;
  return (
    <figure className="v5-clip">
      {/* React sets muted as a property, not an attribute, and browsers only
          autoplay what is muted in the markup; the ref makes sure of it. */}
      <video ref={el => { if (el) { el.muted = true; el.defaultMuted = true; } }}
        src={clip.src} poster={clip.poster} autoPlay muted loop playsInline
        preload="metadata" aria-label={clip.alt || ""} onError={() => setMissing(true)}
        style={bg ? { background: bg } : undefined}
        onLoadedData={e => { const c = cardColor(e.currentTarget, i); if (c) setBg(c); }} />
      {(clip.note || clip.link) && (
        <figcaption>
          {clip.note && <span>{clip.note}</span>}
          {clip.link && (
            <a href={clip.link.href} target="_blank" rel="noopener noreferrer">
              {clip.link.label} <ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </figcaption>
      )}
    </figure>
  );
});

const Block = memo(function Block({ block, shots }) {
  const { kind, label, body, before, after, points, steps, quote,
          lead, sub, pairs, close, figure, clip, peep, link } = block;

  /* The opener: a scene, then what you know against what it costs you. */
  if (kind === "story") return (
    <div className="v5-story">
      <h3>{label}</h3>
      <Fig fig={figure} className="v5-story-fig" />
      <div className="v5-story-c">
        <div className="v5-story-row">
          <p className="say">{lead}</p>
          {sub && <p>{sub}</p>}
        </div>
        {pairs?.length > 0 && (
          <div className="v5-story-row">
            <div className="v5-pairs">
              {pairs.map((pr, i) => (
                <div className="v5-pair" key={i}><b>{pr.a}</b><span>{pr.b}</span></div>
              ))}
            </div>
          </div>
        )}
        {close && (
          <div className={`v5-story-row${peep ? " has-peep" : ""}`}>
            <p className="say">{close}</p>
            <Peep name={peep} />
          </div>
        )}
      </div>
    </div>
  );

  const cols =
    kind === "points" ? points :
    kind === "timeline" ? steps?.map(st => ({ k: st.y, t: st.t, b: st.b })) :
    kind === "beforeAfter" ? [{ k: "Before", b: before }, { k: "After", b: after, to: true }] :
    null;
  /* Columns take the whole measure when they would not fit the answer
     column, and also when nothing sits under the question: a chapter with
     no figure or drawing on the left would otherwise leave that column
     empty while three points squeeze into the right. */
  const figUnder = figure && !figure.wide;
  const wide = cols?.length > 3 || (cols?.length > 0 && !figUnder && !peep);

  return (
    <div className={`v5-block${kind === "role" || kind === "pivot" ? ` ${kind}` : ""}`}>
      <div>
        <h3>{label}</h3>
        {kind !== "pivot" && figUnder && <Fig fig={figure} className="v5-fig-h" />}
        {kind !== "pivot" && <Peep name={peep} className="v5-peep-h" />}
      </div>
      {kind === "pivot" && <Peep name={peep} />}

      {kind === "pivot" ? paras(body).map(t => <p key={t}>{t}</p>) : (
        <div className="v5-block-c">
          {kind === "quote" && <blockquote className="v5-quote">{quote}</blockquote>}
          {paras(body).map(t => <p key={t}>{t}</p>)}
          {link && (
            <p className="v5-block-link">
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <NoOrphan text={link.label} />
              </a>
            </p>
          )}
          {cols?.length > 0 && !wide && <Cols items={cols} />}
        </div>
      )}
      {figure?.wide && <Fig fig={figure} className="v5-fig-w" />}
      {wide && <Cols items={cols} wide />}

      <Clip clip={clip} />
      {shots.length > 0 && (
        <div className="v5-shots">
          {shots.map((x, i) => {
            const sh = typeof x === "string" ? { src: x } : x;
            return <Shot key={sh.src} src={sh.src} wide={sh.wide} alt="" i={i} />;
          })}
        </div>
      )}
    </div>
  );
});

/* The second photo is a file drop: /working-with-me.jpg if it is there, the
   hero's portrait until it is. */
const WithPhoto = memo(function WithPhoto() {
  const [src, setSrc] = useState("/working-with-me.jpg");
  return <img className="v5-with-photo" src={src} alt="Krishna Zolpatil" loading="lazy"
    onError={() => setSrc(cur => (cur === "/about-photo.jpg" ? cur : "/about-photo.jpg"))} />;
});

const Band = memo(function Band() {
  return (
    <>
    <div className="v5-band-ledge" aria-hidden="true"><Peep name="sitback" /></div>
    <div className="v5-band">
      <div className="v5-band-row">
        <div className="v5-band-say">
          <span className="v5-k">Open to senior product design roles</span>
          <a href={MAILTO}>{MAILTO.replace("mailto:", "")}</a>
        </div>
        <span className="v5-wordmark" aria-hidden="true">krishna.ux</span>
        <div className="v5-socials">
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label.toLowerCase()}
            </a>
          ))}
        </div>
      </div>
      <div className="v5-foot-fine">
        <span>Also shipped: {ARCHIVE}</span>
        <span>© {new Date().getFullYear()} Krishna Zolpatil</span>
      </div>
    </div>
    </>
  );
});

const Section = memo(function Section({ id, title, note, children }) {
  return (
    <section id={id} className="v5-sec" aria-label={title}>
      <div className="v5-sec-head">
        <h2 className="v5-sec-title">{title}</h2>
        {note && <span className="v5-sec-note">{note}</span>}
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

/* ── A case study is a page ────────────────────────────────────────────────
   It was a sheet grown over the home page, which made a fifteen-part document
   behave like a preview: no address, no back button, a scroll inside a
   scroll. Now each study has its own address (#/work/<id>) and the window
   does the scrolling. Hash routes rather than paths, because the site is on
   static hosting with no rewrite to catch a deep link. */
const Page = memo(function Page({ project, next }) {
  /* The bar names what is being read and says how much of it is left,
     measured off the window's scroll. */
  const barRef = useRef(null);
  const headRef = useRef(null);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const onScroll = () => {
      const run = document.documentElement.scrollHeight - window.innerHeight;
      /* A study short enough not to scroll shows no progress at all, rather
         than a full bar claiming you have finished something. */
      bar.style.setProperty("--p", String(run > 8 ? Math.min(1, window.scrollY / run) : 0));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [project]);

  const shotsOf = block => (block.shots || []).filter(Boolean);


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

  /* What shipped closes the study rather than opening it: the reader is
     told a story first and shown the receipt after. A study that ends on a
     reflection keeps that as its last word, so the list goes in before it. */
  const impact = project.outcomes?.length > 0 && (
    <div className="v5-block" key="impact">
      <h3>{isLead ? "What shipped" : "Impact"}</h3>
      <div className="v5-block-c">
        <ul className="v5-list">
          {project.outcomes.map((o, i) => <Outcome key={i} item={o} />)}
        </ul>
      </div>
    </div>
  );
  const chapters = shown.map((block, i) => (
    <Block key={`${block.label}-${i}`} block={block} shots={shotsOf(block)} />
  ));
  if (impact) {
    const last = shown[shown.length - 1];
    chapters.splice(last?.kind === "quote" ? chapters.length - 1 : chapters.length, 0, impact);
  }

  /* Who it was made with and in what, as two more lines among the facts.
     They were a rack of icons under the title; next to a story they read as
     a dashboard, and "Me" is not news on my own portfolio. */
  const team = (project.team || "").split("·").map(t => t.trim())
    .filter(t => t && !/^me$/i.test(t));

  return (
    <article className="v5-sheet" aria-label={project.title}>
        <div className="v5-sheet-bar" ref={barRef}>
          <nav className="v5-crumb" aria-label="Breadcrumb">
            <a href="#work">Home</a><span aria-hidden="true">/</span>
            <b aria-current="page">{project.title}</b>
          </nav>
          <span className="v5-sheet-prog" aria-hidden="true" />
        </div>

        <header className="v5-head">
          <div className="v5-head-main">
            <h1 className="v5-sheet-h1" ref={headRef}>{project.title}</h1>
            {project.short && <p className="v5-sheet-short">{project.short}</p>}
          </div>
          <div className="v5-head-side">
            <div className="v5-head-facts">
              {project.role && <span>{project.role}</span>}
              {project.timeline && <Span timeline={project.timeline} />}
              {project.duration && <span>{project.duration}</span>}
              {project.award && (
                <span>
                  <a className="v5-head-award" href={project.award.href}
                    target="_blank" rel="noopener noreferrer">
                    <NoOrphan text={project.award.label} />
                  </a>
                </span>
              )}
            </div>
            <div className="v5-head-facts">
              <span>{project.tag}</span>
              {team.length > 0 && <span>With {team.join(" · ")}</span>}
              {project.stack?.length > 0 && <span>{project.stack.join(" · ")}</span>}
            </div>
          </div>
        </header>

        <div className="v5-sheet-body">
          {chapters}

          {project.href && (
            <div className="v5-sheet-link">
              <a className="v5-btn v5-btn-solid" href={project.href}
                target="_blank" rel="noopener noreferrer">
                {project.hrefLabel || "Visit"} <ArrowUpRight />
              </a>
            </div>
          )}

          {/* A page ends by saying where to go, which a sheet never had to. */}
          <div className="v5-next">
            <a className="v5-next-back" href="#work">
              <ArrowLeft aria-hidden="true" /> All work
            </a>
            {next && (
              <a className="v5-next-go" href={`#/work/${next.id}`}>
                <span className="v5-next-k">Next</span>
                <span className="v5-next-t">{next.title} <ArrowRight aria-hidden="true" /></span>
              </a>
            )}
          </div>
        </div>
    </article>
  );
});

/* An internal tool is one paragraph, but it opens the same way everything
   else does, so it is handed to the page in a project's shape. */
const asProject = b => ({
  id: b.slug, title: b.name, tag: b.kind, short: b.desc,
  caseStudy: [{ label: "About", body: b.about, shots: [] }],
});

/* #/work/<id> is a page; anything else is the home page and its anchors. */
const routeOf = () => {
  const m = typeof window !== "undefined" && window.location.hash.match(/^#\/work\/([\w-]+)/);
  return m ? m[1] : null;
};

export default function AppV3() {
  const [ready, setReady] = useState(false);
  const [shot, setShot] = useState(null);
  const closeShot = useCallback(() => setShot(null), []);
  const [route, setRoute] = useState(routeOf);
  /* Where the home page was left, so coming back lands on the card that was
     opened rather than at the top. */
  const left = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const on = () => setRoute(routeOf());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const openProject = useCallback(id => {
    left.current = window.scrollY;
    window.location.hash = `#/work/${id}`;
  }, []);

  /* A page opens at its top; home reopens where it was left, or at the
     section the hash names when it was reached from a link instead. */
  useLayoutEffect(() => {
    const jumpTo = top => window.scrollTo({ top, behavior: "instant" });
    if (route) { jumpTo(0); return; }
    const id = window.location.hash.slice(1);
    const el = id && !id.startsWith("/") ? document.getElementById(id) : null;
    if (left.current != null && (!el || id === "work")) jumpTo(left.current);
    else if (el) el.scrollIntoView({ behavior: "instant" });
    left.current = null;
  }, [route]);

  const tool = route ? BUILT.find(b => b.slug === route) : null;
  const current = route
    ? PROJECTS.find(p => p.id === route) || (tool && asProject(tool)) : null;
  /* Next runs through the case studies only, and wraps. */
  const next = current && LEADS.length > 1
    ? LEADS[(LEADS.findIndex(l => l.id === current.id) + 1) % LEADS.length] : null;

  return (
    <ErrorBoundary>
    <LightboxCtx.Provider value={setShot}>
    <Lightbox shot={shot} onClose={closeShot} />
      <Styles />
      <div className={`v5${ready ? " ready" : ""}`}>

        <div className="v5-page">
        <header className="v5-nav">
          <a href="#top" className="v5-mark" aria-label="Krishna Zolpatil — home">
            <span className="v5-mark-name">Krishna Zolpatil</span>
            <i className="v5-dot" aria-hidden="true" />
            <span className="v5-mark-role">Senior Product Designer</span>
          </a>
          <nav className="v5-navlinks" aria-label="Sections">
            {NAV_LINKS.map(l => (
              <a key={l.id} href={`#${l.id}`}
                className={`v5-navlink${l.opt ? " opt" : ""}`}>{l.label}</a>
            ))}
            <a className="v5-navlink v5-navcta" href="/resume.pdf"
              download="Krishna-Zolpatil-Resume.pdf">
              Resume <Download aria-hidden="true" />
            </a>
          </nav>
        </header>

          {current ? <>
            <main id="top"><Page key={current.id} project={current} next={next} /></main>
            <footer className="v5-foot"><Band /></footer>
          </> : <>
          <main id="top">

            <section className="v5-hero" aria-label="Introduction">
              <h1 className="v5-hello" aria-label="Hey, I’m Krishna">
                <span aria-hidden="true">hey,</span>
                <img className="v5-hero-photo" src="/about-photo.jpg"
                  alt="" width="310" height="310" />
                <span aria-hidden="true">i&rsquo;m krishna</span>
              </h1>
              <ul className="v5-about">
                {ABOUT_POINTS.map(pt => typeof pt === "string"
                  ? <li key={pt}><Brand text={pt} /></li>
                  : <li key={pt.t}><span><Brand text={pt.t} /><strong>
                      {pt.href ? <a href={pt.href}><Brand text={pt.b} /></a> : <Brand text={pt.b} />}
                    </strong></span></li>)}
              </ul>
              <div className="v5-hero-actions">
                <a href="#work" className="v5-btn v5-btn-solid">
                  View the work <ArrowRight />
                </a>
                <a href="/resume.pdf" download="Krishna-Zolpatil-Resume.pdf"
                  className="v5-btn v5-btn-ghost">
                  <Download /> Resume
                </a>
              </div>
            </section>

            <Section id="work" title="My work at Naya Studio" note="Two case studies, four years">
              {/* Each case study keeps its own pieces under it. Laid out flat,
                  Homebase and Group Sharing read as rival projects; they are
                  areas of the platform above them. */}
              {LEADS.map(lead => {
                const parts = REST.filter(p => p.partOf === lead.id);
                return (
                  <div className="v5-study" key={lead.id}>
                    <Feature project={lead} onOpen={() => openProject(lead.id)} />
                    {parts.length > 0 && (
                      <>
                        <div className="v5-subhead">
                          <h3>Inside it</h3>
                          <span className="v5-sec-note">{parts.length} areas, up close</span>
                        </div>
                        <div className="v5-grid-work">
                          {parts.map(p => (
                            <Card key={p.id} id={p.id} tag={p.tag} title={p.title}
                              short={p.short} onOpen={() => openProject(p.id)} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
              {ORPHANS.length > 0 && (
                <div className="v5-study">
                  <div className="v5-subhead">
                    <h3>Also at Naya</h3>
                    <span className="v5-sec-note">{ORPHANS.length} more</span>
                  </div>
                  <div className="v5-grid-work">
                    {ORPHANS.map(p => (
                      <Card key={p.id} id={p.id} tag={p.tag} title={p.title}
                        short={p.short} onOpen={() => openProject(p.id)} />
                    ))}
                  </div>
                </div>
              )}
            </Section>

            <Section id="side" title="Side projects" note="Shipped solo">
              <div className="v5-grid-work">
                {SIDE.map(p => (
                  <Card key={p.id} id={p.id} tag={p.tag} title={p.title} wide
                    short={p.short} onOpen={() => openProject(p.id)} />
                ))}
                {BUILT.map(b => (
                  <Card key={b.slug} id={b.slug} tag={b.kind} title={b.name} wide
                    short={b.desc} foot={<ArrowUpRight className="v5-card-arrow" />}
                    onOpen={() => openProject(b.slug)} />
                ))}
              </div>
            </Section>

            <section id="with-me" className="v5-with" aria-label="Working with me">
              <div>
                <span className="v5-k">What it&rsquo;s like</span>
                <div className="v5-with-head">
                  <h2 className="v5-with-t">Working with me</h2>
                  <Peep name="walk" />
                </div>
                <WithPhoto />
              </div>
              <div className="v5-with-say">
                {WORKING_WITH_ME.map(s => (
                  <p key={s.t} className={s.mark ? "mark" : undefined}>
                    <b>{s.t}</b> {s.d}
                    {s.proof && <>{" "}
                      <button type="button" className="v5-proof"
                        onClick={() => openProject(s.proof)}>
                        {s.label} <ArrowRight aria-hidden="true" />
                      </button></>}
                    {s.href && <>{" "}
                      <a className="v5-proof" href={s.href}>
                        {s.label} <ArrowRight aria-hidden="true" />
                      </a></>}
                  </p>
                ))}
              </div>
            </section>

          </main>

          {/* One footer. The ask and the signature were two closings stacked
              on each other; the signature carries the ask as its first line. */}
          <footer className="v5-foot" id="contact">
            <Band />
          </footer>
          </>}
        </div>
      </div>
    </LightboxCtx.Provider>
    </ErrorBoundary>
  );
}
