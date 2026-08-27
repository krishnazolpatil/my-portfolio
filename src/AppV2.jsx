import { useState, useEffect, useRef, useCallback, memo, Component } from "react";
import { X, Mail, ArrowUpRight, ChevronRight, ChevronLeft, Play, Download,
         Linkedin, Github, Twitter, Instagram,
         Sparkles, Wrench, Chrome } from "lucide-react";
import { PROJECTS, ARCHIVE, BUILT, PROCESS } from "./data.js";
import MoltenMetal from "./MoltenMetal.jsx";

/* ─────────────────────────────────────────────────────────
   v2 — STREAMING. The portfolio as an OTT platform: a
   cinematic billboard for the flagship, then rows of
   posters that scale open on hover, rank numerals on the
   headline row, and a nav that goes from transparent to
   solid as you scroll.

   Sky-cyan (#00A8E1) carries interaction over a deep blue-black
   ground. Cyan is too light to hold white text, so filled buttons
   use dark ink. Contrast holds AA against #0F171E: txt 15.7:1 ·
   mid 8.5:1 · dim 5.2:1 · accent 6.6:1 · ink on the fill 6.6:1.
───────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "quests", label: "Side projects" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/krishnazolpatil/", Icon: Linkedin },
  { label: "GitHub", href: "https://github.com/krishnazolpatil", Icon: Github },
  { label: "X (Twitter)", href: "https://x.com/krishnazolpatil", Icon: Twitter },
  { label: "Instagram", href: "https://instagram.com/krishna.ux", Icon: Instagram },
];

const MAILTO = "mailto:krishna.zolpatil@gmail.com?subject=Hello%20Krishna%20-%20via%20krishnazolpatil.com";

/* Side-flagged projects sit in the Side projects row but keep their case study,
   so they open the full sheet rather than the lighter tool sheet. */
const WORK = PROJECTS.filter(p => !p.side);
const SIDE = PROJECTS.filter(p => p.side);

const Styles = memo(() => (
  <style>{`
    html, body { background:#0F171E; }
    /* The floating nav overlaps whatever an anchor lands on, so jumps stop
       short of it rather than tucking the section title underneath. */
    html { scroll-behavior:smooth; overflow-x:clip; scroll-padding-top:96px; }
    /* Two families, no more: Inter Tight sets every heading, Inter sets every
       run of text. Both are declared once here so a third can't creep in.
       They must stay in step with the Google Fonts link in index.html — when
       they drifted apart, headings silently fell back to Helvetica while body
       copy fell back to system SF, which read as three different typefaces. */
    :root { --font-sans:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;
            --font-display:'Inter Tight','Inter',system-ui,-apple-system,sans-serif; }

    body { font-family:var(--font-sans);
           -webkit-font-smoothing:antialiased; overflow-x:clip; }

    .ott {
      --bg:#0F171E; --raise:#1A252F; --raise-2:#22303B; --well:#131C24;
      --line:rgba(255,255,255,0.09); --line-2:rgba(255,255,255,0.055);
      --txt:#F2F6F9; --mid:#A7B4BF; --dim:#7C8B98;
      --acc:#00A8E1; --acc-text:#00A8E1; --acc-fill:#00A8E1; --acc-ink:#0A1219;
      --acc-soft:rgba(0,168,225,0.15); --acc-line:rgba(0,168,225,0.46);
      --r-sm:6px; --r-md:10px; --r-lg:14px;
      --gut:clamp(18px,3.6vw,58px);
      /* Content column grows with the display, then centres. A fixed 1640px cap
         left a 2560px screen mostly empty. */
      --maxw:clamp(1180px, 86vw, 2040px);
      --edge:max(var(--gut), calc((100vw - var(--maxw)) / 2));
      /* isolation makes .ott the stacking context, so the fixed molten layer
         at z-index:-1 paints above this background but under all content. */
      background:var(--bg); color:var(--txt); min-height:100vh; position:relative;
      isolation:isolate; font-size:16px; line-height:1.5;
    }
    .ott *, .ott *::before, .ott *::after { box-sizing:border-box; margin:0; padding:0; }
    .ott img, .ott svg { display:block; max-width:100%; }
    :where(.ott a) { text-decoration:none; color:inherit; }
    :where(.ott button) { font-family:inherit; font-size:inherit; cursor:pointer;
                          background:none; border:none; color:inherit; }
    .ott ::selection { background:var(--acc-soft); color:var(--txt); }
    .ott :focus-visible { outline:2px solid var(--acc-text); outline-offset:3px; border-radius:6px; }
    .ott ::-webkit-scrollbar { width:10px; height:10px; }
    .ott ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.11); border-radius:99px;
                                     border:3px solid var(--bg); }

    .ott-page { opacity:0; transition:opacity 0.5s ease; }
    .ott.ready .ott-page { opacity:1; }

    /* ── Buttons ── */
    .ott-btn { display:inline-flex; align-items:center; justify-content:center; gap:9px;
               height:46px; padding:0 24px; border-radius:999px; font-size:0.95rem;
               font-weight:600; white-space:nowrap;
               transition:background 0.2s, border-color 0.2s, color 0.2s, transform 0.18s; }
    .ott-btn:active { transform:translateY(1px); }
    .ott-btn svg { width:18px; height:18px; }
    .ott-btn-primary { background:var(--acc-fill); color:var(--acc-ink);
                       box-shadow:0 1px 0 rgba(255,255,255,0.18) inset, 0 8px 24px -10px rgba(0,168,225,0.5); }
    .ott-btn-primary:hover { background:#33BEEA; }
    .ott-btn-glass { background:rgba(120,130,150,0.28); color:var(--txt);
                     backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); }
    .ott-btn-glass:hover { background:rgba(140,150,170,0.4); }
    .ott-btn-sm { height:38px; padding:0 16px; font-size:0.86rem; }

    /* ── Nav: a floating island, not a full-width bar ── */
    /* Glass from the start. The old top-down gradient faded to nothing partway
       down the bar, so over bright artwork it ended in a hard horizontal seam —
       a blur has no edge to show. Detached from the top edge, the island is
       ringed rather than underlined, and depth comes from a shadow. */
    .ott-nav { position:fixed; top:clamp(10px,1.6vh,20px); z-index:300;
               left:var(--edge); right:var(--edge);
               display:flex; align-items:center;
               justify-content:space-between; gap:22px; padding:11px 12px 11px 16px;
               border-radius:999px;
               background:rgba(15,23,30,0.52);
               backdrop-filter:blur(18px) saturate(165%);
               -webkit-backdrop-filter:blur(18px) saturate(165%);
               border:1px solid rgba(255,255,255,0.09);
               box-shadow:0 18px 44px -20px rgba(0,0,0,0.85);
               transition:background 0.35s ease, border-color 0.35s ease,
                          box-shadow 0.35s ease; }
    .ott-nav.solid { background:rgba(15,23,30,0.82); border-color:var(--line);
                     box-shadow:0 22px 52px -20px rgba(0,0,0,0.95); }
    /* Safari and Firefox without backdrop-filter fall back to a solid bar rather
       than a translucent one you can read the page through. */
    @supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))) {
      .ott-nav { background:rgba(15,23,30,0.93); }
    }
    .ott-navleft { display:flex; align-items:center; gap:clamp(14px,2.4vw,34px); min-width:0; }
    .ott-mark { display:flex; align-items:center; gap:9px; flex-shrink:0; }
    .ott-mark img { width:30px; height:30px; border-radius:50%; object-fit:cover;
                    object-position:33% 28%; flex-shrink:0;
                    border:1px solid var(--line-2); }
    .ott-mark span { font-size:1.02rem; font-weight:650; letter-spacing:-0.02em; white-space:nowrap; }
    .ott-navlinks { display:flex; align-items:center; gap:3px; }
    .ott-navlink { position:relative; padding:8px 14px; border-radius:999px;
                   font-size:0.88rem; font-weight:450; color:var(--mid);
                   transition:color 0.18s, background 0.18s; }
    .ott-navlink:hover { color:var(--txt); background:rgba(255,255,255,0.06); }
    .ott-navlink.on { color:var(--txt); font-weight:550; }
    .ott-navlink.on::after { content:""; position:absolute; left:14px; right:14px; bottom:2px;
                             height:2px; border-radius:2px; background:var(--acc); }
    .ott-navright { display:flex; align-items:center; gap:10px; flex-shrink:0; }
    .ott-avail { display:inline-flex; align-items:center; gap:7px; font-size:0.82rem; color:var(--mid);
                 white-space:nowrap; }
    .ott-avail i { width:6px; height:6px; border-radius:50%; background:#34D399;
                   box-shadow:0 0 0 3px rgba(52,211,153,0.16); flex-shrink:0; }
    .ott-linkbtn { font-size:0.88rem; font-weight:450; color:var(--mid); padding:8px 14px;
                   border-radius:999px; transition:color 0.18s, background 0.18s; }
    .ott-linkbtn:hover { color:var(--txt); background:rgba(255,255,255,0.06); }
    .ott-cv { position:relative; }
    .ott-menu { position:absolute; top:calc(100% + 9px); right:0; min-width:250px; z-index:310;
                padding:6px; border-radius:var(--r-md); background:var(--raise-2);
                border:1px solid var(--line); box-shadow:0 26px 60px -20px rgba(0,0,0,0.9);
                animation:pop 0.18s cubic-bezier(0.23,1,0.32,1) both; }
    .ott-menu a { display:flex; flex-direction:column; gap:2px; padding:10px 12px;
                  border-radius:var(--r-sm); font-size:0.88rem; font-weight:500; transition:background 0.15s; }
    .ott-menu a:hover { background:rgba(255,255,255,0.07); }
    .ott-menu span { font-size:0.76rem; font-weight:400; color:var(--dim); }
    @keyframes pop { from{opacity:0; transform:translateY(-6px);} to{opacity:1; transform:none;} }

    /* ── Billboard ── */
    /* Centred hero: the copy sits on the mid-axis over the site backdrop, so
       the hero closes up around the type instead of holding height for art. */
    .ott-bb { position:relative; display:flex; justify-content:center;
              padding:clamp(122px,19vh,186px) var(--edge) clamp(44px,8vh,76px);
              overflow:hidden; }
    /* Site-wide molten backdrop: fixed behind the whole page. The cyan wash is
       baked underneath the canvas so a browser without WebGL2 still gets a
       composed ground instead of flat ink. */
    .ott-molten-bg { position:fixed; inset:0; z-index:-1; pointer-events:none; }
    .ott-molten-bg::before { content:""; position:absolute; inset:0; background:
        radial-gradient(620px 460px at 74% 14%, rgba(0,168,225,0.22), transparent 68%),
        radial-gradient(560px 440px at 4% 90%, rgba(0,168,225,0.08), transparent 72%); }
    /* 900px is wide enough that the headline breaks to two lines and narrow
       enough that it can never collapse to one, at any size in the clamp. */
    .ott-bb-body { position:relative; z-index:2; max-width:min(900px, 92%);
                   margin-inline:auto; text-align:center; }
    /* The face sits high and left of centre in the source frame, so the circular
       crop is pulled off-centre to land the face inside the ring. */
    .ott-bb-photo { width:clamp(84px,8.4vw,120px); height:clamp(84px,8.4vw,120px);
                    margin:0 auto clamp(18px,2.4vh,26px);
                    border-radius:50%; object-fit:cover; object-position:33% 28%;
                    border:1px solid rgba(255,255,255,0.16);
                    box-shadow:0 20px 44px -20px rgba(0,0,0,0.9),
                               0 0 0 6px rgba(0,168,225,0.10); }
    .ott-bb-hi { display:block; margin-bottom:clamp(10px,1.4vh,16px);
                 font-size:clamp(1rem,1.15vw,1.22rem); font-weight:550;
                 letter-spacing:-0.012em; color:var(--acc-text);
                 text-shadow:0 1px 18px rgba(0,0,0,0.55); }
    .ott-bb-title { font-family:var(--font-display); font-weight:600;
                    font-size:clamp(2.5rem,5.6vw,5.6rem); line-height:0.98; letter-spacing:-0.042em;
                    text-wrap:balance; }
    .ott-bb-desc { margin-top:20px; max-width:44ch; margin-inline:auto;
                   font-size:clamp(1rem,1.2vw,1.3rem);
                   line-height:1.62; color:#D2D8E4; text-shadow:0 1px 20px rgba(0,0,0,0.6); }
    .ott-bb-actions { display:flex; flex-wrap:wrap; justify-content:center;
                      gap:11px; margin-top:28px; }

    /* ── Rows ── */
    .ott-rows { position:relative; z-index:3; margin-top:clamp(-90px,-7vh,-40px); padding-bottom:20px; }
    .ott-row { position:relative; }
    .ott-row-head { display:flex; align-items:baseline; gap:12px; padding:0 var(--edge);
                    margin-bottom:2px; }
    .ott-row-title { font-family:var(--font-display); font-size:clamp(1.05rem,1.5vw,1.6rem);
                     font-weight:600; letter-spacing:-0.025em; }
    .ott-row-sub { font-size:0.86rem; color:var(--dim); opacity:0; transform:translateX(-6px);
                   transition:opacity 0.3s, transform 0.3s; white-space:nowrap; }
    .ott-row:hover .ott-row-sub { opacity:1; transform:none; }
    /* Vertical padding is what lets a hovered poster scale past the row bounds. */
    /* scroll-padding keeps the first card on the same line as the row title:
       without it, snapping and scroll-into-view both land a card flush against
       the viewport and eat the edge gutter. */
    .ott-track { display:flex; gap:9px; overflow-x:auto; overscroll-behavior-x:contain;
                 scrollbar-width:none; padding:34px var(--edge) 62px;
                 scroll-snap-type:x proximity; scroll-padding-inline-start:var(--edge); }
    .ott-track::-webkit-scrollbar { display:none; }

    .ott-arrow { position:absolute; top:34px; bottom:62px; width:clamp(34px,4vw,56px); z-index:30;
                 display:flex; align-items:center; justify-content:center; color:var(--txt);
                 background:rgba(15,23,30,0.6); opacity:0; transition:opacity 0.25s, background 0.2s; }
    .ott-arrow:hover { background:rgba(15,23,30,0.82); }
    .ott-arrow:disabled { display:none; }
    .ott-arrow.l { left:0; border-radius:0 6px 6px 0; }
    .ott-arrow.r { right:0; border-radius:6px 0 0 6px; }
    .ott-row:hover .ott-arrow, .ott-arrow:focus-visible { opacity:1; }
    .ott-arrow svg { width:26px; height:26px; }

    /* ── Poster: square tile, title set into the art ── */
    .ott-card { flex:1 0 clamp(150px,13.5vw,260px); max-width:370px; scroll-snap-align:start; position:relative;
                display:block; width:100%; text-align:left;
                transition:transform 0.34s cubic-bezier(0.23,1,0.32,1); }
    .ott-poster { position:relative; aspect-ratio:1/1; overflow:hidden; border-radius:var(--r-md);
                  border:1px solid var(--line-2);
                  background:radial-gradient(130% 62% at 70% 96%, rgba(0,168,225,0.32), transparent 66%),
                             linear-gradient(168deg, #1D2E3A 0%, #0E151B 100%);
                  transition:border-color 0.3s, box-shadow 0.3s; }
    /* The shot fills the whole poster — a half-height band left the bottom of
       the card reading as dead space. The ::after gradient carries the title. */
    .ott-key { position:absolute; inset:0; overflow:hidden;
               transition:transform 0.55s cubic-bezier(0.23,1,0.32,1); }
    .ott-key img, .ott-key svg { width:100%; height:100%; object-fit:cover; object-position:top center; }
    /* The placeholder is layered under the shot, never beside it. */
    .ott-skel { position:absolute; left:0; top:0; width:100%; height:100%; }
    .ott-art { display:block; position:relative; z-index:1; transition:opacity 0.4s ease; }
    /* Full-bleed art means the title can land on a bright white screenshot, so
       the foot of the tile is darkened hard enough to hold white type there.
       It must outrank .ott-art's z-index:1, or the image paints over the scrim
       and the title is left sitting on bare white. */
    .ott-poster::after { content:""; position:absolute; inset:0; pointer-events:none; z-index:2;
                         background:linear-gradient(180deg, transparent 40%, rgba(10,16,21,0.62) 68%,
                                    rgba(10,16,21,0.93)); }
    /* Title lives in the art, Apple-TV style — nothing beneath the card. */
    .ott-poster-title { position:absolute; left:14px; right:14px; bottom:13px; z-index:3;
                        text-align:center;
                        font-family:var(--font-display);
                        font-size:clamp(0.95rem,0.85vw,1.2rem); font-weight:600;
                        letter-spacing:-0.022em; line-height:1.2;
                        text-shadow:0 2px 16px rgba(0,0,0,0.75); }

    @media (hover:hover) and (pointer:fine) {
      /* Grow from the left edge, not the centre — a centre-origin scale pushes
         the first card of a row out past the gutter it is aligned to. */
      .ott-card { transform-origin:left center; }
      .ott-card:hover, .ott-card:focus-visible { transform:translateY(-6px) scale(1.045); z-index:20; }
      .ott-card:hover .ott-poster, .ott-card:focus-visible .ott-poster {
        border-color:var(--acc-line); box-shadow:0 26px 56px -22px rgba(0,0,0,0.95); }
      .ott-card:hover .ott-key, .ott-card:focus-visible .ott-key { transform:scale(1.04); }
      .ott-card-wide:hover .ott-key, .ott-card-wide:focus-visible .ott-key { transform:scale(1.05); }
    }

    /* Side projects are landscape: the screenshots are landscape, so they fill
       the tile flat instead of being composed as tilted portrait key art. */
    .ott-card-wide { flex:1 0 clamp(240px,22vw,430px); max-width:560px; }
    .ott-card-wide .ott-poster { aspect-ratio:16/9; }
    .ott-card-wide .ott-key img, .ott-card-wide .ott-key svg { object-position:top left; }

    /* Key art for posters with nothing to photograph — numeral over the gradient. */
    .ott-tile { position:absolute; inset:0; display:flex; flex-direction:column;
                align-items:center; justify-content:center; gap:10px; padding:18px; }
    .ott-tile b { font-family:var(--font-display); font-size:3.2rem; font-weight:600;
                  letter-spacing:-0.06em; color:rgba(255,255,255,0.26); line-height:1; }
    .ott-tile span { font-size:0.9rem; font-weight:600; letter-spacing:-0.015em; line-height:1.3;
                     text-align:center; color:#DCE6ED; }

    /* ── Process: chapter track ── */
    .ott-tl-sec { padding:clamp(26px,4vh,48px) var(--edge) clamp(12px,2vh,26px); }
    .ott-tl-sec .ott-row-head { padding:0; margin-bottom:clamp(28px,4.4vh,46px); }
    .ott-tl { position:relative; display:grid; grid-template-columns:repeat(var(--n),1fr);
              list-style:none; }
    /* Rail runs node-centre to node-centre; the node is 28px, so 14px inset. */
    .ott-tl-rail, .ott-tl-fill { position:absolute; top:13px; left:14px;
                                 right:calc(100% / var(--n) - 14px); height:2px;
                                 border-radius:2px; }
    .ott-tl-rail { background:rgba(255,255,255,0.11); }
    .ott-tl-fill { background:linear-gradient(90deg, var(--acc), rgba(0,168,225,0.3));
                   transform:scaleX(0); transform-origin:left;
                   transition:transform 1.5s cubic-bezier(0.4,0,0.2,1); }
    .ott-tl.in .ott-tl-fill { transform:scaleX(1); }
    .ott-tl-step { position:relative; padding-right:clamp(14px,2.2vw,32px); }
    .ott-tl-node { position:relative; z-index:2; display:flex; align-items:center;
                   justify-content:center; width:28px; height:28px; border-radius:50%;
                   margin-bottom:20px; background:var(--bg);
                   border:2px solid rgba(255,255,255,0.18); font-size:0.66rem; font-weight:700;
                   color:var(--mid); font-family:var(--font-display);
                   transition:background 0.3s, border-color 0.3s, color 0.3s, transform 0.3s; }
    .ott-tl-step:hover .ott-tl-node { background:var(--acc); border-color:var(--acc);
                                      color:var(--acc-ink); transform:scale(1.14); }
    .ott-tl-title { font-family:var(--font-display); font-size:1rem; font-weight:600;
                    letter-spacing:-0.02em; line-height:1.28; }
    .ott-tl-desc { margin-top:9px; font-size:0.86rem; line-height:1.56; color:var(--mid); }

    /* ── Contact ── */
    .ott-contact { padding:clamp(56px,9vh,110px) var(--edge) clamp(46px,7vh,84px); }
    .ott-panel { position:relative; max-width:1120px; margin:0 auto; overflow:hidden;
                 border-radius:var(--r-lg);
                 border:1px solid var(--line); padding:clamp(34px,5vw,66px); text-align:center;
                 background:
                   radial-gradient(700px 380px at 50% -10%, rgba(0,168,225,0.22), transparent 68%),
                   linear-gradient(180deg, var(--raise-2), var(--raise)); }
    .ott-panel h2 { font-family:var(--font-display); font-weight:700;
                    font-size:clamp(1.9rem,4.2vw,3rem); letter-spacing:-0.035em; line-height:1.06; }
    .ott-panel p { margin:18px auto 0; max-width:46ch; font-size:1rem; line-height:1.68; color:var(--mid); }
    .ott-panel-actions { display:flex; flex-wrap:wrap; justify-content:center; gap:11px; margin-top:30px; }
    .ott-panel-mail { margin-top:22px; font-size:0.92rem; color:var(--mid); }
    .ott-panel-mail a { color:var(--acc-text); }
    .ott-panel-mail a:hover { text-decoration:underline; }

    .ott-socials { display:flex; justify-content:center; gap:10px; margin-top:26px; }
    .ott-social { display:flex; align-items:center; justify-content:center; width:46px; height:46px;
                  border-radius:50%; border:1px solid var(--line); color:var(--mid);
                  background:rgba(255,255,255,0.045);
                  transition:color 0.2s, border-color 0.2s, background 0.2s, transform 0.25s; }
    .ott-social:hover { color:var(--acc-ink); background:var(--acc-fill);
                        border-color:var(--acc-fill); transform:translateY(-2px); }
    .ott-social svg { width:19px; height:19px; }

    /* ── Footer ── */
    .ott-foot { border-top:1px solid var(--line-2); background:#0A1017;
                padding:clamp(40px,6vw,60px) var(--edge) clamp(32px,5vw,46px); }
    .ott-foot-top { display:flex; justify-content:space-between; gap:44px; flex-wrap:wrap; }
    .ott-foot-name { font-size:1.16rem; font-weight:650; letter-spacing:-0.02em; }
    .ott-foot-tag { margin-top:10px; font-size:0.9rem; color:var(--mid); max-width:34ch; line-height:1.6; }
    .ott-foot-cols { display:flex; gap:clamp(40px,7vw,84px); }
    .ott-foot-col { display:flex; flex-direction:column; gap:11px; align-items:flex-start; }
    .ott-foot-lbl { font-size:0.78rem; font-weight:600; margin-bottom:3px; }
    .ott-foot-col a { font-size:0.9rem; color:var(--mid); transition:color 0.18s; }
    .ott-foot-col a:hover { color:var(--txt); }
    .ott-foot-bottom { margin:clamp(34px,5vh,50px) 0 0; padding-top:20px;
                       border-top:1px solid var(--line-2); display:flex; justify-content:space-between;
                       gap:12px; flex-wrap:wrap; font-size:0.82rem; color:var(--dim); }

    /* ── Sheets ── */
    .ott-backdrop { position:fixed; inset:0; z-index:400; display:flex; align-items:center;
                    justify-content:center; padding:clamp(12px,3vw,32px); background:rgba(4,5,8,0.76);
                    backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
                    animation:fade 0.18s ease both; }
    @keyframes fade { from{opacity:0;} to{opacity:1;} }
    .ott-sheet { width:100%; max-width:min(1180px, 94vw); max-height:94vh; display:flex; flex-direction:column;
                 overflow:hidden; border-radius:var(--r-lg); background:var(--raise);
                 border:1px solid var(--line); box-shadow:0 50px 130px -40px rgba(0,0,0,0.95);
                 animation:sheet 0.3s cubic-bezier(0.23,1,0.32,1) both; }
    @keyframes sheet { from{opacity:0; transform:translateY(18px) scale(0.99);} to{opacity:1; transform:none;} }
    /* Capped so the artwork frames the story instead of eating the sheet. */
    /* The artwork lives inside the scroller so it simply scrolls away. Collapsing
       it as a flex sibling fought the scroll position: shrinking the hero grew the
       viewport, which clamped scrollTop, which re-expanded the hero. */
    /* Height, never aspect-ratio: a ratio *plus* max-height makes the browser
       re-derive the width from the clamped height, so the hero shrank to
       290 × 16/7 ≈ 660px and sat in the corner of an 1180px sheet. */
    /* The hero earns its height by carrying the title instead of handing it to a
       separate bar underneath — that block cost 68px on every sheet. */
    .ott-sheet-hero { position:relative; height:min(23vh, 210px);
                      overflow:hidden; background:var(--well); }
    /* One scrim, and it has to sit above the shot: the img is position:relative
       z-index:1, so a pseudo-element without its own z-index paints behind it. */
    .ott-sheet-hero::before { content:""; position:absolute; inset:0; z-index:2; pointer-events:none;
                              background:linear-gradient(180deg, transparent 18%, rgba(18,26,34,0.82) 78%, var(--raise)); }
    .ott-sheet-hero img, .ott-sheet-hero svg { width:100%; height:100%; object-fit:cover;
                                               object-position:top center; }
    .ott-sheet-htitle { position:absolute; z-index:4; left:clamp(22px,4vw,38px); right:64px; bottom:14px;
                        font-family:var(--font-display);
                        font-size:clamp(1.3rem,2.6vw,1.8rem); font-weight:600;
                        letter-spacing:-0.03em; line-height:1.15; color:#fff;
                        text-shadow:0 1px 12px rgba(0,0,0,0.55); }
    /* The case sheet opens on the writing, not on a screenshot — the work has
       its own shots further down where they carry an argument. */
    .ott-sheet-h2 { padding-right:52px; font-family:var(--font-display);
                    font-size:clamp(1.45rem,3vw,2.05rem); font-weight:600;
                    letter-spacing:-0.035em; line-height:1.12; color:var(--txt); }
    .ott-close { position:absolute; top:14px; right:14px; z-index:20; display:flex; padding:9px;
                 border-radius:50%; color:var(--txt); background:rgba(15,23,30,0.7);
                 transition:background 0.18s; }
    .ott-close:hover { background:rgba(15,23,30,0.95); }
    .ott-sheet-bar { position:sticky; top:0; z-index:6; display:flex; align-items:center;
                     min-height:68px; padding:12px clamp(22px,4vw,38px);
                     background:var(--raise); border-bottom:1px solid var(--line); }
    .ott-sheet-bar h2 { font-family:var(--font-display);
                        font-size:clamp(1.15rem,2.2vw,1.55rem); font-weight:600;
                        letter-spacing:-0.03em; line-height:1.2; padding-right:48px; }
    .ott-sheet-body { padding:clamp(20px,3.4vw,32px) clamp(22px,4vw,38px) clamp(28px,4vw,40px); }
    .ott-sheet-scroll { flex:1; min-height:0; overflow-y:auto; }
    .ott-sheet-meta { margin-top:2px; display:flex; flex-wrap:wrap; align-items:center; gap:8px 13px;
                      font-size:0.86rem; color:var(--dim); }
    .ott-sheet-meta b { color:#79E3A8; font-weight:650; }

    /* Tabs ride at the top of the scroll container so the writing is one glance
       away, not one scroll — and they stay put once you are inside a part. */
    .ott-tabs { position:sticky; top:0; z-index:6; display:flex; flex-wrap:wrap; gap:8px;
                margin:20px calc(-1 * clamp(22px,4vw,38px)) 0;
                padding:11px clamp(22px,4vw,38px);
                background:var(--raise); border-bottom:1px solid var(--line); }
    .ott-stack { margin-top:11px; display:flex; flex-wrap:wrap; gap:6px; }
    .ott-stack span { display:inline-flex; align-items:center; gap:6px;
                      padding:4px 11px 4px 9px; border-radius:999px; border:1px solid var(--line);
                      background:var(--well); font-size:0.76rem; color:#D8E1E8; white-space:nowrap; }
    .ott-stack-i { width:13px; height:13px; flex:0 0 auto; color:var(--accent); }

    /* Process runs across the sheet, one column per step, so a week of work
       reads in a glance instead of scrolling. Feedback steps are marked in
       accent because the loop is the point, not a footnote. */
    .ott-proc { margin-top:22px; }
    .ott-proc-team { margin-top:26px; padding-top:16px; border-top:1px solid var(--line);
                     font-size:0.84rem; color:var(--dim); }
    .ott-proc-team b { color:var(--txt); font-weight:600; }
    .ott-proc-steps { margin-top:15px; display:grid; gap:18px 16px;
                      grid-template-columns:repeat(auto-fit, minmax(158px, 1fr)); }
    .ott-proc-step { position:relative; padding-top:19px; }
    .ott-proc-step::before { content:""; position:absolute; top:5px; left:0; right:-16px;
                             height:1px; background:var(--line); }
    .ott-proc-step:last-child::before { right:0; }
    .ott-proc-step::after { content:""; position:absolute; top:1px; left:0; width:9px; height:9px;
                            border-radius:50%; background:var(--well);
                            border:1.5px solid rgba(255,255,255,0.28); }
    .ott-proc-step.loop::after { background:var(--accent); border-color:var(--accent); }
    /* Was monospace — a third family for one date stamp. The wide tracking
       and caps carry the same stamped feel without it. */
    .ott-proc-day { font-size:0.64rem; font-weight:550;
                    letter-spacing:0.14em; text-transform:uppercase; color:var(--dim); }
    .ott-proc-step.loop .ott-proc-day { color:var(--accent); }
    .ott-proc-t { margin-top:4px; font-size:0.9rem; font-weight:600; letter-spacing:-0.01em; color:var(--txt); }
    .ott-proc-b { margin-top:4px; font-size:0.8rem; line-height:1.5; color:var(--dim); }
    .ott-gal { display:flex; gap:12px; margin:22px 0 4px; overflow-x:auto; scroll-snap-type:x mandatory;
               -webkit-overflow-scrolling:touch; scrollbar-width:none; }
    .ott-gal::-webkit-scrollbar { display:none; }
    .ott-gal img { flex:0 0 100%; width:100%; border:1px solid var(--line);
                   border-radius:var(--r-md); scroll-snap-align:center; }
    .ott-block { margin-top:24px; }
    .ott-block h3 { font-size:0.82rem; font-weight:650; color:var(--acc-text); margin-bottom:9px; }
    .ott-block p { font-size:0.95rem; line-height:1.72; color:#D8E1E8; }
    .ott-rule { height:1px; background:var(--line); margin:26px 0 0; }
    .ott-out { display:flex; flex-direction:column; gap:10px; }
    .ott-out p { position:relative; padding-left:20px; font-size:0.92rem; line-height:1.6; color:#D8E1E8; }
    .ott-out p::before { content:""; position:absolute; left:0; top:0.58em; width:7px; height:7px;
                         border-radius:2px; background:var(--acc); }

    /* ── Case study: parts and sections ── */
    .ott-sheet-syn { margin-top:14px; font-size:0.98rem; line-height:1.6; color:#D8E1E8; font-weight:400; }
    .ott-sheet-try { margin-top:14px; }
    .ott-sheet-try a { display:inline-flex; align-items:center; gap:6px; padding:9px 15px;
      border-radius:999px; border:1px solid rgba(0,168,225,0.42); background:rgba(0,168,225,0.10);
      color:#7FD8F5; font-size:0.86rem; font-weight:600; text-decoration:none;
      transition:background 0.2s, border-color 0.2s, color 0.2s; }
    .ott-sheet-try a:hover { background:rgba(0,168,225,0.19); border-color:rgba(0,168,225,0.7); color:#B6E9FB; }
    .ott-sheet-try svg { width:15px; height:15px; }
    .ott-eps-head { display:flex; align-items:center; justify-content:space-between; gap:14px;
                    flex-wrap:wrap; margin-top:30px; padding-top:24px; border-top:1px solid var(--line); }
    .ott-eps-head h3 { font-family:var(--font-display); font-size:1.14rem; font-weight:600; letter-spacing:-0.02em; }
    .ott-seasons { display:flex; gap:6px; flex-wrap:wrap; }
    .ott-season { padding:7px 15px; border-radius:99px; font-size:0.84rem; font-weight:500;
                  color:var(--mid); border:1px solid var(--line);
                  transition:color 0.18s, background 0.18s, border-color 0.18s; }
    .ott-season:hover { color:var(--txt); border-color:rgba(255,255,255,0.26); }
    .ott-season.on { background:var(--acc-fill); border-color:var(--acc-fill); color:var(--acc-ink); }
    .ott-season-note { margin-top:12px; font-size:0.84rem; color:var(--dim); }
    .ott-eps { margin-top:10px; }
    .ott-ep { display:grid; grid-template-columns:30px 1fr; gap:18px; align-items:start;
              padding:16px 10px; border-bottom:1px solid var(--line-2); border-radius:10px;
              transition:background 0.2s; }
    .ott-ep:last-child { border-bottom:none; }
    .ott-ep:hover { background:rgba(255,255,255,0.04); }
    .ott-ep-n { font-family:var(--font-display); font-size:1.1rem; font-weight:500; color:var(--dim);
                text-align:center; padding-top:3px; }
    .ott-ep-title { font-size:0.98rem; font-weight:600; letter-spacing:-0.015em; line-height:1.35; }
    /* align-items:start, or a grid row sizes to its tallest shot and every
       shorter one shows a slab of tile background beneath it. */
    .ott-ep-shots { margin-top:16px; display:grid; gap:12px; align-items:start; }
    /* Full-page UI shots need real width — two up, not a contact sheet. The
       min() matters: a bare minmax(400px,1fr) floor cannot shrink below 400px,
       so on a phone the tracks overflowed and .ott-sheet's overflow:hidden
       clipped every shot out of sight. min(400px,100%) collapses to one column. */
    .ott-ep-shots.multi { grid-template-columns:repeat(auto-fit, minmax(min(400px, 100%), 1fr)); }
    /* The tile hugs the shot. Capping its height cropped the bottom off a
       full-page capture, which is the part worth seeing. */
    .ott-ep-shot { position:relative; border-radius:var(--r-md); overflow:hidden;
                   border:1px solid var(--line); background:var(--well); }
    .ott-ep-shot img { display:block; width:100%; height:auto; }
    .ott-ep-body { margin-top:8px; font-size:0.91rem; line-height:1.66; color:#D8E1E8; }
    @media (max-width:640px) {
      .ott-ep { grid-template-columns:24px 1fr; gap:12px; }
      /* 12px to the window on phones. --edge derives from --gut, whose clamp
         floor was 18px, so the override goes on --gut and --edge follows. */
      .ott { --gut:12px; }
      /* Card padding on top of a 12px inset read as a wide margin on a 390px
         screen and left the shots ~300px wide. */
      .ott-sheet-body { padding:18px 14px 26px; }
      .ott-sheet-bar { padding:12px 14px; }
    }

    /* ── Confetti ── */
    .ott-confetti { position:fixed; inset:0; z-index:500; pointer-events:none; overflow:hidden; }
    .ott-confetti i { position:absolute; top:-4vh; display:block; animation:fall ease-in forwards; }
    @keyframes fall { to { transform:translateY(112vh) rotate(680deg); } }

    /* ── Responsive ── */
    /* Tablet: nav sheds its status line. */
    @media (max-width:1080px) {
      .ott-avail { display:none; }
    }
    @media (max-width:920px) {
      .ott-navlinks { display:none; }
      /* Six columns of 12-word copy stop working here — go vertical. */
      .ott-tl { grid-template-columns:1fr; }
      .ott-tl-rail, .ott-tl-fill { top:14px; bottom:14px; left:13px; right:auto;
                                   width:2px; height:auto; }
      .ott-tl-fill { transform:scaleY(0); transform-origin:top; }
      .ott-tl.in .ott-tl-fill { transform:scaleY(1); }
      .ott-tl-step { display:grid; grid-template-columns:28px 1fr; column-gap:18px;
                     padding:0 0 26px; }
      .ott-tl-step:last-child { padding-bottom:0; }
      .ott-tl-node { margin-bottom:0; }
      .ott-tl-title, .ott-tl-desc { grid-column:2; }
      .ott-tl-desc { max-width:56ch; }
    }
    @media (max-width:760px) {
      .ott-bb { padding-top:104px; padding-bottom:clamp(34px,6vh,56px); }
      .ott-brand-hide { display:none; }
      .ott-mark span { display:none; }
      .ott-btn { height:44px; padding:0 18px; font-size:0.9rem; }
      .ott-btn-sm { height:36px; padding:0 13px; font-size:0.82rem; }
      .ott-bb-actions .ott-btn { flex:1 1 auto; }
      .ott-track { padding:22px var(--edge) 34px; }
      .ott-arrow { display:none; }
      .ott-panel-actions .ott-btn { width:100%; }
      .ott-rows { margin-top:12px; }
      .ott-card { flex:0 0 44vw; max-width:none; }
      .ott-card-wide { flex:0 0 72vw; max-width:none; }
      .ott-poster-title { font-size:0.9rem; left:11px; right:11px; bottom:11px; }
      .ott-sheet { max-height:96vh; border-radius:var(--r-md); }
      .ott-sheet-hero { height:26vh; }
      .ott-socials { gap:8px; }
      .ott-social { width:42px; height:42px; }
      .ott-foot-top { flex-direction:column; }
      .ott-foot-bottom { flex-direction:column; gap:7px; }
    }
    @media (max-width:430px) {
      .ott-card { flex:0 0 62vw; max-width:none; }
      .ott-card-wide { flex:0 0 84vw; max-width:none; }
      .ott-navright { gap:6px; }
    }

    @media (prefers-reduced-motion:reduce) {
      .ott, .ott * { animation-duration:0.01ms !important; animation-iteration-count:1 !important;
                     transition-duration:0.01ms !important; scroll-behavior:auto !important; }
      .ott-card:hover, .ott-card:focus-visible { transform:none !important; }
      .ott-tl-fill { transform:none !important; }
    }
  `}</style>
));

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { crashed: false }; }
  static getDerivedStateFromError() { return { crashed: true }; }
  componentDidCatch(err, info) { console.error("[Portfolio v2]", err, info.componentStack); }
  render() {
    if (this.state.crashed) return (
      <div style={{ padding: 24, color: "#A7B4BF", background: "#0F171E", minHeight: "100vh" }}>
        This section could not be displayed.
      </div>
    );
    return this.props.children;
  }
}

/* Abstract product surface for anything without a screenshot. */
const SkeletonUI = memo(function SkeletonUI() {
  return (
    <svg className="ott-skel" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="ottsk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00A8E1" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#00A8E1" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="#0F1219" />
      <rect x="0" y="0" width="140" height="360" fill="#151922" />
      <rect x="140" y="0" width="1" height="360" fill="#212836" />
      <rect x="20" y="24" width="62" height="9" rx="4.5" fill="#2C3446" />
      <rect x="20" y="58" width="98" height="8" rx="4" fill="#1F2634" />
      <rect x="20" y="82" width="80" height="8" rx="4" fill="#1F2634" />
      <rect x="12" y="104" width="116" height="26" rx="7" fill="#182031" />
      <rect x="20" y="113" width="70" height="8" rx="4" fill="#2C3446" />
      <rect x="20" y="146" width="90" height="8" rx="4" fill="#1F2634" />
      <rect x="172" y="26" width="124" height="10" rx="5" fill="#2C3446" />
      <rect x="172" y="50" width="180" height="8" rx="4" fill="#1C2331" />
      <rect x="172" y="84" width="200" height="120" rx="12" fill="#151A25" stroke="#232A39" />
      <rect x="192" y="106" width="92" height="8" rx="4" fill="#262E3D" />
      <rect x="192" y="126" width="136" height="7" rx="3.5" fill="#1D2431" />
      <rect x="192" y="144" width="112" height="7" rx="3.5" fill="#1D2431" />
      <rect x="392" y="84" width="200" height="120" rx="12" fill="url(#ottsk)" stroke="#125570" />
      <rect x="412" y="106" width="80" height="8" rx="4" fill="#7FD8F5" fillOpacity="0.55" />
      <rect x="412" y="126" width="136" height="7" rx="3.5" fill="#7FD8F5" fillOpacity="0.24" />
      <rect x="412" y="144" width="108" height="7" rx="3.5" fill="#7FD8F5" fillOpacity="0.24" />
      <rect x="172" y="224" width="420" height="112" rx="12" fill="#151A25" stroke="#232A39" />
      <rect x="192" y="246" width="104" height="8" rx="4" fill="#262E3D" />
      <rect x="192" y="272" width="378" height="7" rx="3.5" fill="#1D2431" />
      <rect x="192" y="292" width="316" height="7" rx="3.5" fill="#1D2431" />
    </svg>
  );
});

/* The skeleton sits behind the shot rather than in place of it. Swapping the
   image out with `display:none` deadlocked it: an image with no layout box
   never enters the viewport, so a lazy image never starts loading, so onLoad
   never fires and the skeleton stayed up forever. Fading over it keeps the
   image in flow. */
/* Marks for the "Designed with" chips, monochrome so the row reads as one set
   rather than a strip of clashing brand colours at 14px. Vercel and Figma are
   their real geometry; the others use a role glyph, since no honest redraw of
   those marks survives being shrunk this far. */
const ToolIcon = memo(function ToolIcon({ name }) {
  const k = name.toLowerCase();
  if (k.includes("vercel")) return (
    <svg className="ott-stack-i" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5 22.5 21.5H1.5Z" fill="currentColor" />
    </svg>
  );
  if (k.includes("figma")) return (
    <svg className="ott-stack-i" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 1H8.5a3.5 3.5 0 0 0 0 7H12Z" />
      <path d="M12 1h3.5a3.5 3.5 0 0 1 0 7H12Z" />
      <path d="M12 8H8.5a3.5 3.5 0 0 0 0 7H12Z" />
      <circle cx="15.5" cy="11.5" r="3.5" />
      <circle cx="8.5" cy="18.5" r="3.5" />
    </svg>
  );
  if (k.includes("claude")) return (
    <svg className="ott-stack-i" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" fill="#D97757"
        d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z" />
    </svg>
  );
  if (k.includes("antigravity")) return (
    <img className="ott-stack-i" src="/logos/antigravity.png" alt="" aria-hidden="true" />
  );
  if (k.includes("ai studio") || k.includes("gemini")) return <Sparkles className="ott-stack-i" aria-hidden="true" />;
  if (k.includes("chrome")) return <Chrome className="ott-stack-i" aria-hidden="true" />;
  return <Wrench className="ott-stack-i" aria-hidden="true" />;
});

const Art = memo(function Art({ src, alt, onMissing }) {
  const [state, setState] = useState("loading");
  /* A cached image can finish decoding before React attaches onLoad, so settle
     it on attach rather than waiting for an event that has already fired. */
  const attach = useCallback(el => {
    if (el?.complete) setState(el.naturalWidth ? "ok" : "error");
  }, []);
  useEffect(() => { if (state === "error") onMissing?.(); }, [state, onMissing]);
  return (
    <>
      {state !== "ok" && <SkeletonUI />}
      <img ref={attach} src={src} alt={alt} loading="lazy" className="ott-art"
        style={{ opacity: state === "ok" ? 1 : 0 }}
        onLoad={() => setState("ok")} onError={() => setState("error")} />
    </>
  );
});

const CONFETTI = ["#00A8E1", "#7FD8F5", "#34D399", "#F2F6F9", "#F59E0B"];
const Confetti = memo(function Confetti({ onDone }) {
  const [pieces] = useState(() => Array.from({ length: 84 }, () => ({
    left: Math.random() * 100, size: 6 + Math.random() * 8,
    delay: Math.random() * 0.5, dur: 2.2 + Math.random() * 1.5,
    color: CONFETTI[Math.floor(Math.random() * CONFETTI.length)],
    round: Math.random() > 0.6, tilt: Math.random() * 360,
  })));
  useEffect(() => {
    const t = setTimeout(onDone, 4200);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="ott-confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <i key={i} style={{
          left: `${p.left}vw`, width: p.size, height: p.size * (p.round ? 1 : 0.4),
          background: p.color, borderRadius: p.round ? "50%" : 2,
          animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
          transform: `rotate(${p.tilt}deg)`,
        }} />
      ))}
    </div>
  );
});

/* One row primitive: heading, edge arrows that appear on row hover, snap track.
   Arrow state is written to the DOM so scrolling never re-renders the row. */
const Row = memo(function Row({ id, title, sub, children }) {
  const trackRef = useRef(null), lRef = useRef(null), rRef = useRef(null);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (lRef.current) lRef.current.disabled = el.scrollLeft <= 2;
    if (rRef.current) rRef.current.disabled = el.scrollLeft >= max - 2;
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; sync(); }); };
    sync();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sync]);

  const nudge = useCallback((dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.82, behavior: "smooth" });
  }, []);

  return (
    <section id={id} className="ott-row" aria-label={title}>
      <div className="ott-row-head">
        <h2 className="ott-row-title">{title}</h2>
        {sub && <span className="ott-row-sub">{sub}</span>}
      </div>
      <button ref={lRef} className="ott-arrow l" onClick={() => nudge(-1)} aria-label={`Scroll ${title} left`}>
        <ChevronLeft />
      </button>
      <div className="ott-track" ref={trackRef} tabIndex={0} role="group"
        aria-label={`${title} — scroll horizontally`}>
        {children}
      </div>
      <button ref={rRef} className="ott-arrow r" onClick={() => nudge(1)} aria-label={`Scroll ${title} right`}>
        <ChevronRight />
      </button>
    </section>
  );
});

/* One poster: composed key art with the title set into it. Nothing sits below
   the card — the artwork is the whole card. */
const Poster = memo(function Poster({ src, alt, name, wide, n, tag, onOpen }) {
  /* A project with no screenshot swaps to the numeral tile — the loading
     skeleton left up forever reads as a broken page, not as key art. */
  const [missing, setMissing] = useState(false);
  const onMissing = useCallback(() => setMissing(true), []);
  return (
    <button type="button" className={`ott-card${wide ? " ott-card-wide" : ""}`} onClick={onOpen}>
      <div className="ott-poster">
        {missing ? (
          <div className="ott-tile"><b>{n || name.charAt(0)}</b>{tag && <span>{tag}</span>}</div>
        ) : (
          <div className="ott-key"><Art src={src} alt={alt} onMissing={onMissing} /></div>
        )}
        <p className="ott-poster-title">{name}</p>
      </div>
    </button>
  );
});

/* Process as a chapter track: nodes on a rail that fills once it scrolls into
   view, horizontal on desktop and stacked vertically on narrow screens. */
const Timeline = memo(function Timeline() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { el.classList.add("in"); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id="process" className="ott-tl-sec" aria-label="Process">
      <div className="ott-row-head">
        <h2 className="ott-row-title">Process</h2>
      </div>
      <ol className="ott-tl" ref={ref} style={{ "--n": PROCESS.length }}>
        <span className="ott-tl-rail" aria-hidden="true" />
        <span className="ott-tl-fill" aria-hidden="true" />
        {PROCESS.map((s, i) => (
          <li key={s.t} className="ott-tl-step">
            <span className="ott-tl-node" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <p className="ott-tl-title">{s.t}</p>
            <p className="ott-tl-desc">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
});

function useSheet(onClose) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);

    /* Lock the page behind the sheet. body alone isn't enough — the scroll
       container is <html> — and compensating for the vanished scrollbar keeps
       the layout from jumping sideways as it locks. */
    const root = document.documentElement;
    const prev = { root: root.style.overflow, body: document.body.style.overflow,
                   pad: document.body.style.paddingRight };
    const gap = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = prev.root;
      document.body.style.overflow = prev.body;
      document.body.style.paddingRight = prev.pad;
    };
  }, [onClose]);
}

/* A case study splits into three parts: the discovery work, the design work,
   and the results. Each part holds a few sections of plain-language writing. */
function buildSeasons(p) {
  /* Section screenshots are picked up by filename — drop
     public/work/<project-id>-<section>.png in and it appears; if the file
     isn't there the figure removes itself on error. */
  const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  /* Setup claims the framing sections and Craft takes everything left over.
     Matching Craft on its own keyword list instead meant a new section in
     data.js that fit neither pattern vanished from the sheet without a word. */
  const FRAMING = /problem|constraint|research/i;
  const pick = (test) => p.caseStudy.filter(test)
    .map(s => ({ title: s.label, body: s.body,
                 shots: s.shots || [s.shot || `/work/${p.id}-${slug(s.label)}.png`] }));
  return [
    {
      /* Why before what: the problem opens the part, and the overview — which
         says where it landed — closes it, so the sheet stops answering a
         question it hasn't asked yet. */
      key: "setup", name: "Setup", tagline: "Framing the problem",
      eps: [...pick(s => FRAMING.test(s.label)),
            { title: "Context", body: p.overview, shots: [`/work/${p.id}.png`] }],
    },
    { key: "craft", name: "Craft", tagline: "Designing the answer", eps: pick(s => !FRAMING.test(s.label)) },
    {
      key: "result", name: "Result", tagline: "What shipped",
      eps: p.outcomes.map(o => typeof o === "string"
        ? { title: o, shots: [] }
        : { title: o.text, shots: o.shots || [] }),
    },
  ].filter(s => s.eps.length);
}

const CaseSheet = memo(function CaseSheet({ p, onClose }) {
  useSheet(onClose);
  const [season, setSeason] = useState(0);
  const seasons = p ? buildSeasons(p) : [];
  /* Process is a part rather than a header block — as a header it pushed the
     writing a full screen down. */
  const tabs = p?.process?.length
    ? [...seasons, { key: "process", name: "Process", tagline: "How it ran", process: p.process }]
    : seasons;
  const current = tabs[Math.min(season, tabs.length - 1)];
  if (!p) return null;
  return (
    <div className="ott-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={p.title}>
      <div className="ott-sheet" onClick={e => e.stopPropagation()}>
        <button className="ott-close" onClick={onClose} aria-label="Close">
          <X style={{ width: 17, height: 17 }} />
        </button>
        <div className="ott-sheet-scroll">
          <div className="ott-sheet-body">
          <h2 className="ott-sheet-h2">{p.title}</h2>
          <p className="ott-sheet-syn" style={{ marginTop: 8 }}>{p.short}</p>
          <p className="ott-sheet-meta">
            <b>Shipped</b><span>{p.timeline}</span><span>·</span><span>{p.role}</span>
            {p.duration && <><span>·</span><span>{p.duration}</span></>}
          </p>
          {p.stack?.length > 0 && (
            <div className="ott-stack">
              {p.stack.map(s => <span key={s}><ToolIcon name={s} />{s}</span>)}
            </div>
          )}
          {p.href && (
            <p className="ott-sheet-try">
              <a href={p.href} target="_blank" rel="noopener noreferrer">
                {p.hrefLabel || "Try it"} <ArrowUpRight />
              </a>
            </p>
          )}

          <div className="ott-tabs" role="tablist" aria-label="Case study parts">
            {tabs.map((s, i) => (
              <button key={s.key} role="tab" aria-selected={i === season}
                className={`ott-season${i === season ? " on" : ""}`}
                onClick={() => setSeason(i)}>
                {s.name}
              </button>
            ))}
          </div>
          <p className="ott-season-note">
            {current.tagline} · {current.process ? current.process.length : current.eps.length} sections
          </p>

          {current.process ? (
            <div className="ott-proc">
              <div className="ott-proc-steps">
                {current.process.map(s => (
                  <div key={s.t} className={`ott-proc-step${s.loop ? " loop" : ""}`}>
                    <p className="ott-proc-day">{s.day}</p>
                    <p className="ott-proc-t">{s.t}</p>
                    <p className="ott-proc-b">{s.b}</p>
                  </div>
                ))}
              </div>
              <p className="ott-proc-team"><b>Team</b> — {p.team}</p>
            </div>
          ) : (
          <div className="ott-eps">
            {current.eps.map((e, i) => (
              <div key={e.title} className="ott-ep">
                <span className="ott-ep-n" aria-hidden="true">{i + 1}</span>
                <div>
                  <p className="ott-ep-title">{e.title}</p>
                  {e.body && <p className="ott-ep-body">{e.body}</p>}
                  {e.shots?.length > 0 && (
                    <div className={`ott-ep-shots${e.shots.length > 1 ? " multi" : ""}`}>
                      {e.shots.map((src, n) => (
                        <figure key={src} className="ott-ep-shot">
                          <img src={src} loading="lazy"
                            alt={e.shots.length > 1
                              ? `${p.title} — ${e.title}, ${n + 1} of ${e.shots.length}`
                              : `${p.title} — ${e.title}`}
                            onError={ev => { ev.currentTarget.parentElement.style.display = "none"; }} />
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
});

const ToolSheet = memo(function ToolSheet({ t, onClose }) {
  useSheet(onClose);
  if (!t) return null;
  return (
    <div className="ott-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={t.name}>
      <div className="ott-sheet" style={{ maxWidth: "min(960px, 94vw)" }}
        onClick={e => e.stopPropagation()}>
        <button className="ott-close" onClick={onClose} aria-label="Close">
          <X style={{ width: 17, height: 17 }} />
        </button>
        <div className="ott-sheet-scroll">
          <div className="ott-sheet-hero">
            <Art src={`/work/${t.slug}.png`} alt={`${t.name} screenshot`} />
            <h2 className="ott-sheet-htitle">{t.name}</h2>
          </div>
          <div className="ott-sheet-body">
          <p className="ott-sheet-meta" style={{ marginTop: 0 }}><b>Built solo</b><span>{t.kind}</span></p>
          {/* One image treatment for every side project — a gallery when there are
              several shots, the single screenshot in the same frame when there is one. */}
          <div className="ott-gal" aria-label={t.gallery ? `${t.name} screenshots — swipe` : undefined}>
            {(t.gallery || [`/work/${t.slug}.png`]).map((src, i, all) => (
              <img key={src} src={src}
                alt={all.length > 1
                  ? `${t.name} screenshot ${i + 1} of ${all.length}`
                  : `${t.name} screenshot`} />
            ))}
          </div>
          <div className="ott-block">
            <h3>Overview</h3>
            <p>{t.about}</p>
          </div>
          {t.href && (
            <a className="ott-btn ott-btn-primary" style={{ marginTop: 24 }} href={t.href}
              target="_blank" rel="noopener noreferrer">
              Get it on the Chrome Web Store <ArrowUpRight />
            </a>
          )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default function PortfolioV2() {
  const [ready, setReady] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(null);
  const [tool, setTool] = useState(null);
  const [cvOpen, setCvOpen] = useState(false);
  const [activeSec, setActiveSec] = useState("work");
  const [bursts, setBursts] = useState([]);


  useEffect(() => {
    const href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;600;700&family=Inter+Tight:wght@600;700;800&display=swap";
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet"; link.href = href;
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const el = document.querySelector('meta[name="theme-color"]');
    const prev = el?.content;
    if (el) el.content = "#0F171E";
    return () => { if (el && prev) el.content = prev; };
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let t, cancelled = false;
    const cap = new Promise(r => { t = setTimeout(r, 1200); });
    Promise.race([document.fonts?.ready ?? Promise.resolve(), cap])
      .then(() => { if (!cancelled) setReady(true); });
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  /* Nav goes solid once the billboard starts leaving. */
  useEffect(() => {
    let raf = 0;
    const read = () => { raf = 0; setSolid(window.scrollY > 40); };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach(e => { if (e.isIntersecting) setActiveSec(e.target.id); }),
      { rootMargin: "-20% 0px -60% 0px" }
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!cvOpen) return;
    const onDown = (e) => { if (!e.target.closest(".ott-cv")) setCvOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setCvOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [cvOpen]);

  const closeCase = useCallback(() => setOpen(null), []);
  const closeTool = useCallback(() => setTool(null), []);
  const proj = open ? PROJECTS.find(p => p.id === open) : null;

  return (
    <ErrorBoundary>
      <Styles />
      <div className={`ott${ready ? " ready" : ""}`}>

        <div className="ott-molten-bg" aria-hidden="true">
          <MoltenMetal color1="#0B3B52" color2="#00A8E1" color3="#DFF4FF"
            speed={0.3} mouseStrength={0.18} opacity={0.6} />
        </div>

        <header className={`ott-nav${solid ? " solid" : ""}`}>
          <div className="ott-navleft">
            <a href="#top" className="ott-mark">
              <img src="/about-photo.jpg" alt="" width="30" height="30" />
              <span>Krishna Zolpatil</span>
            </a>
            <nav className="ott-navlinks" aria-label="Sections">
              {NAV_LINKS.map(({ id, label }) => (
                <a key={id} href={`#${id}`} onClick={() => setActiveSec(id)}
                  className={`ott-navlink${activeSec === id ? " on" : ""}`}>{label}</a>
              ))}
            </nav>
          </div>
          <div className="ott-navright">
            <span className="ott-avail"><i />Available for work</span>
            <div className="ott-cv">
              <button className="ott-linkbtn" onClick={() => setCvOpen(o => !o)}
                aria-haspopup="menu" aria-expanded={cvOpen}>Resume</button>
              {cvOpen && (
                <div className="ott-menu" role="menu">
                  <a role="menuitem" href="/resume.pdf" target="_blank" rel="noopener noreferrer"
                    onClick={() => setCvOpen(false)}>
                    Preview<span>Opens in a new tab</span>
                  </a>
                  <a role="menuitem" href="/resume.pdf" download="Krishna-Zolpatil-Resume.pdf"
                    onClick={() => setCvOpen(false)}>
                    Download PDF<span>For applications</span>
                  </a>
                  <a role="menuitem" href="/resume.md" target="_blank" rel="noopener noreferrer"
                    onClick={() => setCvOpen(false)}>
                    Markdown<span>Paste into Claude or ChatGPT</span>
                  </a>
                </div>
              )}
            </div>
            <a className="ott-btn ott-btn-primary ott-btn-sm" href={MAILTO}>
              <Mail /> Get in touch
            </a>
          </div>
        </header>

        <div className="ott-page">
          <main id="top">

            {/* ── Billboard ── */}
            <section className="ott-bb" aria-label="Introduction">
              <div className="ott-bb-body">
                <img className="ott-bb-photo" src="/about-photo.jpg"
                  alt="Krishna Zolpatil" width="120" height="120" />
                <span className="ott-bb-hi">Hi, I&rsquo;m Krishna</span>
                <h1 className="ott-bb-title">I design AI products people can trust.</h1>
                <p className="ott-bb-desc">Four years at Naya Studio. 200+ features shipped.</p>
                <div className="ott-bb-actions">
                  <a href="#work" className="ott-btn ott-btn-primary"><Play /> View the work</a>
                  <a href="/resume.pdf" download="Krishna-Zolpatil-Resume.pdf" className="ott-btn ott-btn-glass">
                    <Download /> Resume
                  </a>
                </div>
              </div>
            </section>

            {/* ── Rows ── */}
            <div className="ott-rows">
              <Row id="work" title="Selected work">
                {WORK.map(p => (
                  <Poster key={p.id}
                    src={`/work/${p.id}.png`} alt={`${p.title} screenshot`}
                    name={p.title} n={p.n} tag={p.tag}
                    onOpen={() => setOpen(p.id)}
                  />
                ))}
              </Row>

              <Row id="quests" title="Side projects">
                {SIDE.map(p => (
                  <Poster key={p.id}
                    src={`/work/${p.id}.png`} alt={`${p.title} screenshot`}
                    name={p.title} wide n={p.n} tag={p.tag}
                    onOpen={() => setOpen(p.id)}
                  />
                ))}
                {BUILT.map(b => (
                  <Poster key={b.slug}
                    src={`/work/${b.slug}.png`} alt={`${b.name} screenshot`}
                    name={b.name} wide
                    onOpen={() => setTool(b)}
                  />
                ))}
                <button type="button" className="ott-card ott-card-wide" title="🤫"
                  onClick={() => setBursts(b => [...b, b.length ? b[b.length - 1] + 1 : 1])}>
                  <div className="ott-poster">
                    <div className="ott-tile"><b>KZ</b></div>
                    <p className="ott-poster-title">This website</p>
                  </div>
                </button>
              </Row>

            </div>

            <Timeline />

            {/* ── Contact ── */}
            <section id="contact" className="ott-contact" aria-label="Contact">
              <div className="ott-panel">
                <h2>Have an AI product to design?</h2>
                <p>Open to senior roles, remote worldwide.</p>
                <div className="ott-panel-actions">
                  <a className="ott-btn ott-btn-primary" href={MAILTO}><Mail /> Get in touch</a>
                </div>
                <div className="ott-socials">
                  {SOCIALS.map(s => (
                    <a key={s.label} className="ott-social" href={s.href} title={s.label} aria-label={s.label}
                      target="_blank" rel="noopener noreferrer"><s.Icon /></a>
                  ))}
                </div>
              </div>
            </section>
          </main>

          <footer className="ott-foot">
            <div className="ott-foot-top">
              <div>
                <p className="ott-foot-name">Krishna Zolpatil</p>
                <p className="ott-foot-tag">Senior Product Designer, AI SaaS. Remote, worldwide.</p>
              </div>
              <div className="ott-foot-cols">
                <div className="ott-foot-col">
                  <span className="ott-foot-lbl">Browse</span>
                  <a href="#work">Work</a>
                  <a href="#quests">Side projects</a>
                  <a href="#process">Process</a>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
                </div>
                <div className="ott-foot-col">
                  <span className="ott-foot-lbl">Connect</span>
                  <a href={MAILTO}>Email</a>
                  <a href="https://www.linkedin.com/in/krishnazolpatil/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://github.com/krishnazolpatil" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href="https://instagram.com/krishna.ux" target="_blank" rel="noopener noreferrer">Instagram</a>
                  <a href="https://x.com/krishnazolpatil" target="_blank" rel="noopener noreferrer">Twitter / X</a>
                </div>
              </div>
            </div>
            <div className="ott-foot-bottom">
              <span>© 2026 Krishna Zolpatil</span>
              <span>Designed and built in Mumbai</span>
            </div>
          </footer>
        </div>

        {bursts.map(id => (
          <Confetti key={id} onDone={() => setBursts(b => b.filter(x => x !== id))} />
        ))}
        {tool && <ToolSheet t={tool} onClose={closeTool} />}
        {proj && <CaseSheet p={proj} onClose={closeCase} />}
      </div>
    </ErrorBoundary>
  );
}
