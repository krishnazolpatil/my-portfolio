import { useState, useEffect, useRef, useCallback, memo, Component } from "react";
import { X, Mail, ChevronRight, LayoutGrid, FileText, Workflow, Gamepad2, ArrowUpRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   v3 — warm editorial. Playfair Display serif display type
   with italic accents, Spline Sans body, stone paper
   surfaces, teal accent, wide-tracked uppercase labels.
   Cards driven by real product screenshots in public/work/.
───────────────────────────────────────────────────────── */

const Styles = memo(() => (
  <style>{`
    :root { --accent:#0D9488; --ink:#1A1A1A; }

    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    html  { scroll-behavior:smooth; font-size:16px; overflow-x:clip; }
    html, body { background:#FAF9F6; }
    body  { font-family:'Spline Sans','Inter',sans-serif; -webkit-font-smoothing:antialiased; overflow-x:clip; }
    img   { display:block; max-width:100%; }
    a     { text-decoration:none; color:inherit; }
    button{ font-family:inherit; cursor:pointer; background:none; border:none; color:inherit; }
    .f    { font-family:'Playfair Display',Georgia,serif; font-weight:600; letter-spacing:-0.01em; }
    .m    { font-family:'Spline Sans',sans-serif; text-transform:uppercase; letter-spacing:0.18em; font-weight:500; }

    /* ReactBits FadeContent pattern — subtle blur-fade, barely-there lift */
    @keyframes fadeUp  { from{opacity:0;transform:translateY(8px);filter:blur(5px);}
                         to{opacity:1;transform:translateY(0);filter:blur(0);} }
    @keyframes fadeIn  { from{opacity:0;} to{opacity:1;} }
    @keyframes modalIn { from{opacity:0;transform:translateY(18px) scale(0.98);} to{opacity:1;transform:none;} }
    @keyframes blink   { 0%,100%{opacity:1;} 50%{opacity:0.2;} }
    /* ── Ambient background: two slow-drifting warm/teal washes ── */
    .bg { position:fixed; inset:0; z-index:0; pointer-events:none; overflow:hidden; }
    .bg i { position:absolute; display:block; border-radius:50%; will-change:transform; }
    .bg i:nth-child(1) { width:54vmax; height:54vmax; left:-20vmax; top:-22vmax;
                         background:radial-gradient(circle, rgba(13,148,136,0.10), transparent 62%);
                         animation:drift1 36s ease-in-out infinite alternate; }
    .bg i:nth-child(2) { width:48vmax; height:48vmax; right:-18vmax; bottom:-20vmax;
                         background:radial-gradient(circle, rgba(196,164,110,0.14), transparent 62%);
                         animation:drift2 44s ease-in-out infinite alternate; }
    @keyframes drift1 { to{ transform:translate(8vmax, 6vmax); } }
    @keyframes drift2 { to{ transform:translate(-7vmax, -5vmax); } }
    .bg-canvas { position:fixed; inset:0; z-index:0; pointer-events:none; }

    /* ── Custom cursor: teal dot + trailing ring (fine pointers only) ── */
    @media (hover:hover) and (pointer:fine) {
      html, body, a, button { cursor:none; }
      .cur-dot, .cur-ring { position:fixed; left:0; top:0; z-index:500; pointer-events:none;
                            border-radius:50%; opacity:0; }
      .cur-dot { width:6px; height:6px; background:var(--accent); }
      .cur-ring { width:30px; height:30px; border:1.5px solid rgba(13,148,136,0.3);
                  transition:width 0.25s ease, height 0.25s ease, border-color 0.25s ease; }
      .cur-ring.on { width:42px; height:42px; border-color:rgba(13,148,136,0.5); }
    }
    @media not ((hover:hover) and (pointer:fine)) { .cur-dot, .cur-ring { display:none; } }

    /* ── Opening: centered name badge; the page "scrolls" up with it as the
         badge glides to the top and expands into the full navbar.
         boot = assets still loading, everything hidden ── */
    .boot .nav, .boot .dock, .boot .content { opacity:0; }
    /* badge is BIGGER via real layout (avatar, type, padding), not transform scale —
       so size, width and position all interpolate in the same pipeline as one motion */
    .pre .nav { top:calc(50% - 40px); max-width:300px;
                padding:14px 16px 14px 18px;
                animation:introPop 0.65s cubic-bezier(0.23,1,0.32,1) both; }
    .pre .nav-avatar { width:52px; height:52px; }
    .pre .nav-title { font-size:1.15rem; }
    .pre .nav-meta { font-size:0.66rem; }
    .ready .nav { transition:top 1.15s cubic-bezier(0.65,0,0.35,1),
                             max-width 1.15s cubic-bezier(0.65,0,0.35,1),
                             padding 1.15s cubic-bezier(0.65,0,0.35,1); }
    .ready .nav-avatar { transition:width 1.15s cubic-bezier(0.65,0,0.35,1),
                                    height 1.15s cubic-bezier(0.65,0,0.35,1); }
    .ready .nav-title, .ready .nav-meta { transition:font-size 1.15s cubic-bezier(0.65,0,0.35,1); }
    /* solid pill while it travels — backdrop blur on a moving element is what lags */
    .pre .nav, .ready:not(.settled) .nav { background:var(--surface);
                backdrop-filter:none; -webkit-backdrop-filter:none; }
    @keyframes introPop { from{opacity:0; transform:translateX(-50%) scale(0.94);}
                          to{opacity:1; transform:translateX(-50%) scale(1);} }
    .pre .nav-right { display:none; }
    .ready .nav-right { animation:fadeIn 0.4s ease 1.15s both; }
    .pre .dock, .pre .content { opacity:0; }
    /* dock keeps its own keyframes: fadeUp's fill would clobber translateX(-50%) */
    .ready .dock { animation:dockUp 0.6s cubic-bezier(0.23,1,0.32,1) 1.35s both; }
    @keyframes dockUp { from{opacity:0; transform:translate(-50%, 10px);}
                        to{opacity:1; transform:translate(-50%, 0);} }
    .ready .content { animation:settleUp 1.15s cubic-bezier(0.65,0,0.35,1) both; }
    .ready:not(.settled) .content { will-change:transform; }
    @keyframes settleUp { from{opacity:0.3; transform:translateY(44vh);}
                          55%{opacity:1;}
                          to{opacity:1; transform:translateY(0);} }
    @media (prefers-reduced-motion:reduce){
      .page, .page * { animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
    }

    ::selection { background:var(--accent); color:#fff; }
    ::-webkit-scrollbar { width:4px; }
    ::-webkit-scrollbar-thumb { background:#8884; border-radius:4px; }

    .page { min-height:100vh; transition:background 0.3s, color 0.3s; position:relative; }
    .content { position:relative; z-index:2; }
    .wrap { max-width:1020px; margin:0 auto; padding:0 clamp(16px,4vw,40px); }

    /* ── Surfaces ── */
    .glass { background:var(--surface); border:1px solid var(--bdr-c); border-radius:20px;
             box-shadow:0 1px 2px rgba(0,0,0,0.04); }

    /* ── Floating nav (the one true blur, like apple.com) ── */
    .nav { position:fixed; top:14px; left:50%; transform:translateX(-50%); z-index:100;
           width:min(980px, calc(100% - 24px)); max-width:980px; display:flex; align-items:center;
           justify-content:space-between; gap:12px; padding:9px 10px 9px 14px; border-radius:100px;
           background:var(--nav-bg); border:1px solid var(--bdr-c);
           backdrop-filter:blur(20px) saturate(180%); -webkit-backdrop-filter:blur(20px) saturate(180%);
           box-shadow:0 8px 30px -18px rgba(0,0,0,0.25); }
    .nav-name { display:flex; align-items:center; gap:11px; min-width:0; }
    .nav-avatar { width:34px; height:34px; border-radius:50%; object-fit:cover; flex-shrink:0; }
    .nav-title { font-size:0.9rem; font-weight:600; letter-spacing:-0.01em; white-space:nowrap; }
    .nav-meta  { font-size:0.6rem; margin-top:1px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .nav-right { display:flex; align-items:center; gap:10px; flex-shrink:0; }
    .nav-status { font-size:0.62rem; letter-spacing:0.03em; display:flex; align-items:center; gap:7px;
                  padding:8px 13px; border:1px solid var(--bdr-c); border-radius:100px; }
    .nav-status i { width:6px; height:6px; border-radius:50%; background:#30D158;
                    animation:blink 2.4s ease-in-out infinite; flex-shrink:0; }
    .st-short { display:none; }
    .cv-wrap { position:relative; }
    .cv-menu { position:absolute; top:calc(100% + 12px); right:0; min-width:230px;
               background:var(--surface); border:1px solid var(--bdr-c); border-radius:16px;
               box-shadow:0 20px 50px -20px rgba(0,0,0,0.25); padding:6px;
               animation:fadeUp 0.25s cubic-bezier(0.23,1,0.32,1) both; }
    .cv-item { display:flex; flex-direction:column; gap:1px; padding:10px 13px; border-radius:11px;
               font-size:0.78rem; font-weight:550; transition:background 0.15s; }
    .cv-item:hover { background:var(--media); }
    .cv-hint { font-size:0.62rem; font-weight:400; color:var(--mid); }
    .nav-mail { display:inline-flex; align-items:center; gap:7px; padding:9px 16px;
                border-radius:100px; font-size:0.74rem; font-weight:600; color:#fff;
                background:var(--accent); transition:transform 0.3s cubic-bezier(0.23,1,0.32,1), filter 0.2s; }
    .nav-mail:hover { transform:scale(1.04); filter:brightness(1.1); }

    /* ── Bottom dock: paper pill, teal puck, tracked labels ── */
    .dock { display:flex; position:fixed; bottom:max(16px, env(safe-area-inset-bottom)); left:50%;
            transform:translateX(-50%); z-index:110; align-items:center; gap:10px; }
    .dock-bar { display:flex; gap:2px; padding:7px; border-radius:100px; position:relative;
                background:var(--surface); border:1px solid var(--bdr-c);
                box-shadow:0 18px 44px -18px rgba(28,25,23,0.25); }
    /* teal puck that flows between active tabs */
    .dock-glow { position:absolute; top:7px; bottom:7px; left:0; border-radius:100px;
                 background:rgba(13,148,136,0.09);
                 box-shadow:inset 0 0 0 1px rgba(13,148,136,0.16);
                 transition:transform 0.6s cubic-bezier(0.34,1.3,0.3,1),
                            width 0.6s cubic-bezier(0.34,1.3,0.3,1), opacity 0.25s ease;
                 will-change:transform, width; pointer-events:none; }
    .dock-item { display:flex; flex-direction:column; align-items:center; gap:4px;
                 padding:9px 15px; border-radius:100px; font-size:0.5rem; font-weight:600;
                 letter-spacing:0.12em; text-transform:uppercase; color:var(--mid);
                 position:relative; z-index:1; transition:color 0.3s; }
    .dock-item svg { width:17px; height:17px; }
    .dock-item.on { color:var(--accent); }
    .dock-fab { width:58px; height:58px; border-radius:50%; display:flex; align-items:center;
                justify-content:center; color:#fff; background:var(--accent);
                box-shadow:0 14px 40px -16px rgba(0,0,0,0.4);
                transition:transform 0.3s cubic-bezier(0.23,1,0.32,1); }
    .dock-fab:hover { transform:scale(1.06); }
    .dock-fab.on { transform:scale(1.08);
                   box-shadow:0 0 0 3px rgba(255,255,255,0.9), 0 0 0 4.5px rgba(0,0,0,0.25),
                              0 14px 40px -16px rgba(0,0,0,0.4); }
    .dock-fab svg { width:20px; height:20px; }
    .dock-cv .cv-menu { top:auto; bottom:calc(100% + 18px); right:auto; left:50%; margin-left:-115px; }

    /* ── Hero: centered, editorial ── */
    .hero { padding-top:clamp(120px,16vh,180px); text-align:center; }
    .hero-eyebrow { font-size:0.62rem; letter-spacing:0.32em; color:var(--accent);
                    display:block; margin-bottom:22px; }
    .h1 { font-family:'Playfair Display',Georgia,serif; font-weight:600;
          font-size:clamp(2.6rem,7vw,5.1rem); line-height:1.08; letter-spacing:-0.015em; }
    .h1 .line { display:block; padding-bottom:0.14em; margin-bottom:-0.14em; }
    .h1 em { font-style:italic; font-weight:500; color:var(--accent); }
    .lede { margin:24px auto 0; max-width:44ch; font-size:clamp(1rem,1.4vw,1.14rem);
            line-height:1.7; font-weight:300; }
    .hero-cta { display:flex; justify-content:center; gap:12px; margin-top:30px; flex-wrap:wrap; }
    .cta { display:inline-flex; align-items:center; gap:8px; padding:13px 26px; border-radius:100px;
           font-size:0.88rem; font-weight:600;
           transition:transform 0.3s cubic-bezier(0.23,1,0.32,1), filter 0.2s, border-color 0.2s, color 0.2s; }
    .cta:hover { transform:scale(1.04); }
    .cta-fill { background:var(--accent); color:#fff; }
    .cta-fill:hover { filter:brightness(1.1); }
    .cta-line { border:1px solid var(--bdr-c); background:var(--surface); color:var(--txt-c); }
    .cta-line:hover { border-color:var(--accent); color:var(--accent); }

    /* hero product shot — appears automatically once /work/hero.png exists */
    .hero-shot { margin:clamp(40px,7vh,64px) auto 0; max-width:880px; border-radius:24px;
                 border:1px solid var(--bdr-c); overflow:hidden; background:var(--surface);
                 box-shadow:0 40px 80px -40px rgba(0,0,0,0.25); }
    .hero-shot img { width:100%; display:block; }


    /* ── Section heads ── */
    section { scroll-margin-top:88px; }
    .sec-head { display:flex; justify-content:space-between; align-items:baseline; gap:12px;
                flex-wrap:wrap; margin:clamp(56px,9vh,88px) 0 18px; }
    .sec-kicker { display:block; font-size:0.56rem; letter-spacing:0.3em; color:var(--accent);
                  margin-bottom:10px; }
    .sec-title { font-size:1.6rem; font-weight:600; letter-spacing:-0.01em; }
    .sec-title em { font-style:italic; font-weight:500; color:var(--accent); }
    .sec-sub { font-size:0.58rem; letter-spacing:0.22em; }

    /* ── Work: bento grid ── */
    .cards { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
    .bcell { display:flex; }
    .b-big  { grid-column:span 2; grid-row:span 2; }
    .b-tall { grid-row:span 2; }
    .b-wide { grid-column:span 3; }
    .card { overflow:hidden; text-align:left; padding:0; display:flex; flex-direction:column;
            flex:1; transition:transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s; }
    .card:hover { transform:translateY(-3px);
                  box-shadow:0 14px 34px -16px rgba(0,0,0,0.18); }
    .card-media { height:190px; display:flex; align-items:center; justify-content:center;
                  color:var(--sub); border-bottom:1px solid var(--bdr-c);
                  background:var(--media); overflow:hidden; flex-shrink:0; }
    .b-big .card-media { height:340px; }
    .b-tall .card-media { height:280px; }
    .b-wide .card-media { height:230px; }
    .shot { width:100%; height:100%; object-fit:cover; object-position:top center; }
    .card-body { padding:17px 20px 19px; display:flex; flex-direction:column; gap:7px; flex:1; }
    .card-top { display:flex; align-items:center; justify-content:space-between; gap:10px; }
    .card-n { font-size:0.56rem; letter-spacing:0.22em; color:var(--accent); display:block; margin-bottom:2px; }
    .card-title { font-family:'Playfair Display',Georgia,serif; font-size:1.22rem; font-weight:600; letter-spacing:-0.01em; }
    .card-desc { font-size:0.8rem; line-height:1.6; font-weight:300; }
    .card-tags { display:flex; gap:7px; margin-top:auto; padding-top:10px; flex-wrap:wrap; }
    .tag { font-size:0.56rem; letter-spacing:0.12em; text-transform:uppercase; padding:5px 11px; border-radius:100px; }
    .tag-hot { background:rgba(13,148,136,0.08); color:var(--accent); }
    .tag-dim { border:1px solid var(--bdr-c); color:var(--mid); }
    .card-arrow { color:var(--sub); flex-shrink:0; transition:transform 0.3s, color 0.2s; }
    .card:hover .card-arrow { transform:translateX(3px); color:var(--accent); }
    .also { padding:18px 4px 0; font-size:0.8rem; line-height:1.8; max-width:72ch; }
    .also b { font-weight:600; }

    /* ── Process: numbered ledger, typography over boxes ── */
    .steps { border-top:1px solid var(--bdr-c); }
    .step { display:grid; grid-template-columns:72px 250px 1fr; gap:20px; align-items:baseline;
            padding:21px 6px; border-bottom:1px solid var(--bdr-c); }
    .step-n { font-family:'Playfair Display',Georgia,serif; font-style:italic; font-weight:500;
              font-size:1.35rem; color:var(--accent); }
    .step-t { font-family:'Playfair Display',Georgia,serif; font-size:1.12rem; font-weight:600; }
    .step-d { font-size:0.82rem; line-height:1.6; color:var(--mid); font-weight:300; }
    @media(max-width:700px){
      .step { grid-template-columns:44px 1fr; }
      .step-d { grid-column:2; margin-top:2px; }
    }

    /* ── Built: grouped glass list ── */
    .list { overflow:hidden; }
    .lrow { display:grid; grid-template-columns:210px 1fr auto; gap:16px; align-items:center;
            padding:17px 22px; border-bottom:1px solid var(--bdr-c); }
    .lrow:last-child { border-bottom:none; }
    .lrow-head { display:flex; align-items:center; gap:12px; min-width:0; }
    a.lrow, button.lrow { transition:background 0.2s; }
    a.lrow:hover, button.lrow:hover { background:var(--media); }
    .lrow-ext { width:13px; height:13px; color:var(--sub); margin-left:6px;
                vertical-align:-2px; display:inline; }
    .lrow-thumb { width:44px; height:44px; border-radius:11px; object-fit:cover;
                  object-position:top center; border:1px solid var(--bdr-c); flex-shrink:0; }
    .confetti { position:fixed; inset:0; z-index:400; pointer-events:none; overflow:hidden; }
    .confetti i { position:absolute; top:-3vh; display:block;
                  animation:confetti-fall ease-in forwards; }
    @keyframes confetti-fall { to { transform:translateY(110vh) rotate(680deg); } }
    .lrow-name { font-family:'Playfair Display',Georgia,serif; font-size:1.02rem; font-weight:600; }
    .lrow-desc { font-size:0.78rem; line-height:1.6; font-weight:300; }
    .lrow-kind { font-size:0.54rem; letter-spacing:0.18em; text-transform:uppercase; white-space:nowrap; }

    /* ── Contact CTA: plain centered statement, no card chrome ── */
    .foot { margin:clamp(80px,13vh,140px) 0 clamp(72px,11vh,120px); text-align:center; }
    .foot-kicker { font-size:0.6rem; letter-spacing:0.3em; color:var(--accent);
                   display:block; margin-bottom:20px; }
    .foot-rule { height:1px; background:var(--bdr-c); border:none;
                 margin:clamp(36px,6vh,56px) auto clamp(26px,4vh,40px); }
    .foot-title { font-family:'Playfair Display',Georgia,serif; font-size:clamp(1.9rem,4.6vw,3.1rem);
                  font-weight:600; letter-spacing:-0.01em; line-height:1.15; }
    .foot-title em { font-style:italic; font-weight:500; color:var(--accent); }
    .foot-note { margin:16px auto 0; max-width:46ch; font-size:0.9rem; line-height:1.7;
                 color:var(--mid); }
    .foot-actions { display:flex; align-items:center; justify-content:center; gap:14px;
                    flex-wrap:wrap; margin-top:28px; }
    .mail-btn { display:inline-flex; align-items:center; gap:9px; padding:13px 24px;
                border-radius:100px; font-size:0.85rem; font-weight:600; color:#fff;
                background:var(--accent); transition:transform 0.3s cubic-bezier(0.23,1,0.32,1), filter 0.2s; }
    .mail-btn:hover { transform:scale(1.03); filter:brightness(1.1); }
    /* ── Footer: full-bleed, brand left, link columns right, clock bar ── */
    .foot2 { border-top:1px solid var(--bdr-c); background:var(--surface);
             margin-top:clamp(40px,6vh,64px); }
    .foot2 .wrap { padding-top:clamp(44px,7vw,72px); padding-bottom:130px; }
    .foot2-top { display:flex; justify-content:space-between; gap:44px; flex-wrap:wrap; }
    .foot2-logo { font-size:clamp(1.5rem,2.6vw,1.9rem); font-weight:600; }
    .foot2-logo em { font-style:italic; font-weight:500; color:var(--accent); }
    .foot2-tag { margin-top:14px; font-size:0.86rem; color:var(--mid); font-weight:300; }
    .foot2-cols { display:flex; gap:clamp(44px,8vw,96px); }
    .foot2-col { display:flex; flex-direction:column; gap:13px; align-items:flex-start; }
    .foot2-lbl { font-size:0.54rem; letter-spacing:0.22em; color:var(--sub); margin-bottom:5px; }
    .foot2-col a { font-size:0.88rem; font-weight:500; transition:color 0.2s; }
    .foot2-col a:hover { color:var(--accent); }
    .foot2-rule { border:none; height:1px; background:var(--bdr-c);
                  margin:clamp(40px,6vh,60px) 0 24px; }
    .foot2-bottom { display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;
                    font-size:0.56rem; color:var(--sub); }

    /* ── Modal: glass sheet ── */
    .backdrop { position:fixed; inset:0; z-index:200; display:flex; align-items:center;
                justify-content:center; padding:clamp(12px,3vw,32px);
                background:rgba(8,8,10,0.45); backdrop-filter:blur(18px) saturate(150%);
                -webkit-backdrop-filter:blur(18px) saturate(150%);
                animation:fadeIn 0.22s ease both; }
    .modal { width:100%; max-width:880px; max-height:88vh; display:flex; flex-direction:column;
             overflow:hidden; border-radius:26px; border:1px solid var(--bdr-c);
             box-shadow:0 40px 100px -30px rgba(0,0,0,0.5);
             animation:modalIn 0.32s cubic-bezier(0.23,1,0.32,1) both; }
    .modal-nav { display:flex; align-items:center; justify-content:space-between; gap:14px;
                 padding:13px 16px 13px 24px; border-bottom:1px solid var(--bdr-c); flex-shrink:0; }
    .modal-nav-title { font-size:0.85rem; font-weight:600; letter-spacing:-0.01em;
                       white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .modal-scroll { overflow-y:auto; padding:clamp(20px,4vw,36px) clamp(22px,4vw,40px); }
    .modal-top { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; }
    .modal-tag { font-size:0.56rem; letter-spacing:0.16em; text-transform:uppercase;
                 color:var(--accent); display:inline-block; margin-bottom:10px;
                 background:rgba(13,148,136,0.08); padding:5px 11px; border-radius:100px; }
    .modal-title { font-size:clamp(1.5rem,3.4vw,2.1rem); letter-spacing:-0.01em; line-height:1.15; }
    .modal-close { display:flex; padding:9px; border-radius:50%; background:rgba(0,0,0,0.06);
                   opacity:0.85; transition:opacity 0.2s, transform 0.3s; flex-shrink:0; }
    .modal-close:hover { opacity:1; transform:rotate(90deg); }
    .modal-meta { font-size:0.62rem; letter-spacing:0.05em; margin-top:14px; line-height:1.9; }
    .modal-vig { height:clamp(220px,34vw,360px); margin:20px 0 24px; border:1px solid var(--bdr-c);
                 border-radius:16px; display:flex; align-items:center; justify-content:center;
                 color:var(--sub); overflow:hidden; background:var(--media); }
    .gal { display:flex; gap:10px; margin:20px 0 24px; overflow-x:auto;
           scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch;
           scrollbar-width:none; }
    .gal::-webkit-scrollbar { display:none; }
    .gal img { width:100%; flex:0 0 100%; border-radius:16px;
               border:1px solid var(--bdr-c); scroll-snap-align:center; }
    .modal-rule { height:1px; margin:22px 0; }
    .modal-sec { margin-bottom:22px; }
    .modal-lbl { font-size:0.56rem; letter-spacing:0.14em; text-transform:uppercase;
                 color:var(--accent); display:block; margin-bottom:8px; }
    .modal-body { font-size:0.86rem; line-height:1.75; font-weight:400; }
    .modal-out { display:flex; flex-direction:column; gap:8px; }
    .modal-out p { font-size:0.82rem; line-height:1.6; padding-left:16px; position:relative; }
    .modal-out p::before { content:""; position:absolute; left:0; top:0.62em; width:5px; height:5px;
                 border-radius:50%; background:var(--accent); }

    /* ── Responsive ── */
    @media(max-width:860px){
      .cards { grid-template-columns:1fr; }
      .b-big, .b-tall, .b-wide { grid-column:auto; grid-row:auto; }
      .b-big .card-media, .b-tall .card-media, .b-wide .card-media { height:190px; }
      .lrow { grid-template-columns:1fr; gap:5px; padding:15px 18px; }
      .lrow-kind { display:none; }
    }
    @media(max-width:767px){
      .nav { width:min(980px, calc(100% - 28px)); padding:8px 8px 8px 12px; }
      .nav-meta { font-size:0.52rem; }
      .nav-status { padding:7px 11px; font-size:0.56rem; }
      .st-long { display:none; }
      .st-short { display:inline; }
      .hero { padding-top:104px; }
      .foot2-top { flex-direction:column; }
      .foot2-bottom { flex-direction:column; gap:6px; }
    }
  `}</style>
));

const SEO = memo(function SEO() {
  useEffect(() => {
    let el = document.querySelector('meta[name="theme-color"]');
    if (!el) { el = document.createElement("meta"); el.name = "theme-color"; document.head.appendChild(el); }
    el.content = "#FAF9F6";
  }, []);
  return null;
});

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { crashed: false }; }
  static getDerivedStateFromError() { return { crashed: true }; }
  componentDidCatch(err, info) { console.error("[Portfolio]", err, info.componentStack); }
  render() {
    if (this.state.crashed) return this.props.fallback || (
      <div style={{ padding: 24, color: "#787470", fontSize: "0.8rem" }}>⚠ This section could not be displayed.</div>
    );
    return this.props.children;
  }
}

/* Reveal-on-scroll removed (was buggy) — F is now a plain wrapper.
   Scroll feel comes from the velocity motion blur instead. */
const F = memo(function F({ children, className = "", style = {} }) {
  return <div className={className} style={style}>{children}</div>;
});

/* ── DATA ── */

const PROJECTS = [
  {
    id: "workflow-builder", n: "01", tag: "AI · Flagship", title: "AI Workflow Builder",
    short: "Composable AI workflows teams can trust. Zero to one.",
    role: "Senior Product Designer", timeline: "Naya Studio · ongoing", team: "Founders · Engineering · Me",
    overview: "Naya helps product teams take ideas to production. The Workflow Builder brings AI into that journey. Teams set up intelligent, repeatable workflows instead of managing every step by hand. I owned the design end to end, from early framing with the founders to prototypes and handoff.",
    outcomes: ["Shipped as a flagship AI capability of the platform", "Template-first design made workflows reusable across teams", "Click-through code prototypes replaced static mocks in reviews"],
    caseStudy: [
      { label: "Problem", body: "Teams ran their product process manually. Repetitive setup, scattered steps, and no way to reuse what worked. AI could automate much of it, but only if people could see and trust what it was doing." },
      { label: "Constraints", body: "Startup pace, no long research runway, and AI capabilities that kept evolving while we designed. The design had to flex as the models improved, without re-teaching users." },
      { label: "Solution", body: "A builder organised around templates and progressive disclosure: start from a proven workflow, preview what the AI will do before it does it, and step in at any point. Complexity is available when you want it and hidden when you don't." },
      { label: "Interaction highlights", body: "Prototypes were built in working code with Claude, so the team reviewed real behaviour — transitions, empty states, and AI 'thinking' states — instead of imagining them from static frames." },
    ],
  },
  {
    id: "estimation-ai", n: "02", tag: "AI Platform", title: "Estimation AI",
    short: "Days of cost estimation, done in minutes.",
    role: "Senior Product Designer", timeline: "Naya Studio · ongoing", team: "Founders · Engineering · Me",
    overview: "Manufacturing teams spend days building cost estimates by hand. Estimation AI automates that. But automation is worthless if buyers can't defend the numbers, so the real design problem was making AI output legible, auditable, and safe to act on.",
    outcomes: ["Estimates that took days now take minutes", "An explainability layer makes every AI output auditable", "Designed AI states end to end: thinking, partial, failed, done"],
    caseStudy: [
      { label: "Problem", body: "Cost estimation was slow, manual, and locked in experts' heads. An AI could produce estimates fast, but a number without a trail is a number nobody signs off on." },
      { label: "Constraints", body: "Agentic AI output is probabilistic and sometimes wrong. The design had to make confidence, sources, and assumptions visible without burying users in noise, and hold up in front of B2B buyers." },
      { label: "Solution", body: "An explainability-first layout: every estimate can be unfolded into how it was built. The inputs, the assumptions, the parts the AI is less sure about. Editing an assumption recalculates transparently, keeping the human in charge." },
      { label: "Interaction highlights", body: "Careful state design for the agentic flow: what 'working' looks like, how partial results stream in, and how uncertainty is shown honestly instead of hidden behind a spinner." },
    ],
  },
  {
    id: "homebase", n: "03", tag: "Core Product", title: "Projects & Homebase Redesign",
    short: "The surface every user starts their day on.",
    role: "Senior Product Designer", timeline: "Naya Studio", team: "Founders · Engineering · Me",
    overview: "The home surface had grown feature by feature until it read like a control panel. Every user lands here every day, so the redesign focused on one question: what needs your attention right now?",
    outcomes: ["Simplified the most-used surface in the product", "Progressive disclosure replaced a wall of competing actions", "Set the visual foundation that later features built on"],
    caseStudy: [
      { label: "Problem", body: "Years of shipped features had accumulated on one screen. Users were overwhelmed by density, new users couldn't find a starting point, and everything shouted at the same volume." },
      { label: "Constraints", body: "This is the product's busiest surface. A redesign couldn't break muscle memory for existing users or stall the roadmap while it happened. It had to land incrementally." },
      { label: "Solution", body: "A hierarchy built around 'what needs you now': primary actions surfaced, secondary ones a click away, and intelligent defaults doing the choosing when the user hasn't. Navigation was consolidated and statuses made scannable." },
      { label: "Interaction highlights", body: "Motion carries the mental model. Panels reveal in place instead of navigating away, and status changes animate so cause and effect stay connected." },
    ],
  },
  {
    id: "sharing", n: "04", tag: "Collaboration", title: "Group Sharing & Nested Groups",
    short: "Complex permissions made predictable.",
    role: "Senior Product Designer", timeline: "Naya Studio", team: "Founders · Engineering · Me",
    overview: "Sharing started flat and all-or-nothing. But real teams are messy: clients, contractors, sub-teams inside teams. Nested groups solve the org problem and create a UX problem, inheritance. This project was about making 'who can see what' obvious before you hit share.",
    outcomes: ["Made permission inheritance predictable, not scary", "One sharing model scaled from individuals to nested orgs", "Shipped across web and mobile"],
    caseStudy: [
      { label: "Problem", body: "Flat sharing forced workarounds: duplicated projects, over-shared links, and no way to give a client a clean, limited view. Nesting groups fixes the structure but makes permissions cascade, which users find hard to predict." },
      { label: "Constraints", body: "The model had to be explainable in one screen, work identically on mobile, and never produce a 'wait, who can see this?' moment. Engineering needed rules simple enough to enforce consistently." },
      { label: "Solution", body: "A mental model of clear ownership plus inheritance you can preview: before confirming, the UI shows exactly who gains access and through which group. Defaults are conservative. Nothing becomes more public without an explicit choice." },
      { label: "Interaction highlights", body: "The share dialog resolves group chains live as you type, and micro-interactions confirm each permission change. Small moments that turn a scary model into a routine one." },
    ],
  },
  {
    id: "design-system", n: "05", tag: "Foundations", title: "Design System",
    short: "One source of truth, in Figma and in code.",
    role: "Senior Product Designer", timeline: "Naya Studio · ongoing", team: "Design · Engineering",
    overview: "Shipping fast erodes consistency. Every rushed feature drifts a little. The design system is the counterweight: tokens, components, and documented patterns that make the right thing the easy thing, in Figma and in code.",
    outcomes: ["One source of truth shared by design and front-end", "Keeps AI-assisted prototyping on-brand by default", "Makes quality repeatable at startup pace"],
    caseStudy: [
      { label: "Problem", body: "At startup pace, design and code drift apart: three button variants, four greys that are almost the same, and every new feature reinventing patterns that already existed." },
      { label: "Constraints", body: "A system for a small team can't demand ceremony. It has to be lighter to use than to ignore, and it has to serve two consumers at once: designers in Figma and components in code." },
      { label: "Solution", body: "Tokenised foundations — primitives and tokens created with the dev team in Storybook — a component library mirrored between Figma and the codebase, and short pattern docs. Because the system lives in code too, design and dev stay in sync, and AI-assisted prototypes inherit it automatically. On-brand output by default." },
      { label: "Interaction highlights", body: "Motion and micro-interaction standards are part of the system: durations, easings, and feedback patterns. So 'feels right' is documented, not tribal knowledge." },
    ],
  },
  {
    id: "monetisation", n: "06", tag: "Monetisation", title: "Subscriptions, Teams & Stripe",
    short: "Subscriptions and payments, designed for trust.",
    role: "Senior Product Designer", timeline: "Naya Studio", team: "Founders · Engineering · Me",
    overview: "Enabling monetisation required designing for trust. Every step, from plan selection to payment confirmation, needed to feel safe, clear, and frictionless.",
    outcomes: ["Launched subscriptions, teams and per-seat pricing", "Every billing edge case mapped with engineering before build", "Checkout designed for trust at every step"],
    caseStudy: [
      { label: "Problem", body: "The product needed to start charging: plans, team seats, upgrades, and billing, without making early users feel like they'd hit a wall of paywalls." },
      { label: "Constraints", body: "Payments have no room for ambiguity. Every edge case (failed cards, seat changes mid-cycle, downgrades with data) had to be designed, not discovered in support tickets." },
      { label: "Solution", body: "A checkout and billing flow that explains itself: what you're paying, what changes, and what happens next, with upgrade paths placed where the need arises instead of behind a pricing page." },
      { label: "Interaction highlights", body: "Edge cases were mapped with engineering as flows, not tickets, so error and recovery states shipped with the feature instead of after it." },
    ],
  },
];

const ARCHIVE = "Saved Views · Comments · Notifications · Onboarding · Mobile PM";

/* Bento spans by project order: flagship 2×2, tall, three standard, full-width. */
const BENTO = ["b-big", "b-tall", "", "", "", "b-wide"];


const BUILT = [
  {
    slug: "yoink", name: "Yoink", kind: "Chrome extension",
    href: "https://chromewebstore.google.com/detail/yoink/lecfomokhlobahfkpojglfcigbbdckia",
    desc: "Pastes any website into Figma as editable layers.",
    about: "Rebuilding UI in Figma by hand is slow. Yoink captures any website — layout, text, images — and pastes it into Figma as fully editable layers instead of flat screenshots. Free forever, open source (MIT), 100% offline. Built solo as a Chrome extension, and actively used by designers today.",
    gallery: [1, 2, 3, 4, 5].map(i => `/work/yoink-${i}.png`),
  },
  {
    slug: "email-signature-generator", name: "Email Signature Generator", kind: "Internal tool",
    desc: "Replaced a three-week, three-person manual process.",
    about: "Getting a branded email signature used to take three weeks and three people across design, dev and marketing — and still ended in manual copy-paste. This tool replaced all of that: type your name, hit copy, paste into Gmail. Everyone at the company gets an on-brand signature, animated logo included, fully self-serve.",
  },
  {
    slug: "qr-code-builder", name: "QR Code Builder", kind: "Internal tool",
    desc: "On-brand QR codes, self-serve for the whole company.",
    about: "Custom, on-brand QR codes for business cards and print — generated self-serve by anyone in the company, ready to share. Designed and built end to end.",
  },
];

/* Product screenshots only — no placeholders. A card's image area
   appears once public/work/<project-id>.png exists; hero uses hero.png. */
const Shot = memo(function Shot({ p, className = "card-media" }) {
  const [state, setState] = useState("loading");
  if (state === "error") return null;
  return (
    <div className={className} style={state === "ok" ? undefined : { display: "none" }}>
      <img className="shot" src={`/work/${p.id}.png`} alt={`${p.title} — product screenshot`}
        onLoad={() => setState("ok")} onError={() => setState("error")} />
    </div>
  );
});

const Thumb = memo(function Thumb({ slug, alt }) {
  const [state, setState] = useState("loading");
  if (state === "error") return null;
  return (
    <img className="lrow-thumb" style={state === "ok" ? undefined : { display: "none" }}
      src={`/work/${slug}.png`} alt={alt}
      onLoad={() => setState("ok")} onError={() => setState("error")} />
  );
});

const HeroShot = memo(function HeroShot() {
  const [state, setState] = useState("loading");
  if (state === "error") return null;
  return (
    <div className="hero-shot" style={state === "ok" ? undefined : { display: "none" }}>
      <img src="/work/hero.png" alt="Product work by Krishna Zolpatil"
        onLoad={() => setState("ok")} onError={() => setState("error")} />
    </div>
  );
});

/* ── Background particles: slow dust motes in teal and warm sand ── */
const Particles = memo(function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = ref.current, ctx = cv.getContext("2d");
    let w, h, raf;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const N = Math.max(26, Math.min(64, Math.floor(w / 26)));
    const P = Array.from({ length: N }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: 0.8 + Math.random() * 1.7,
      vy: 0.06 + Math.random() * 0.16,
      ph: Math.random() * Math.PI * 2,
      sw: 6 + Math.random() * 14,
      teal: Math.random() < 0.35,
      o: 0.25 + Math.random() * 0.5,
    }));
    let t = 0;
    const step = () => {
      t += 0.006;
      ctx.clearRect(0, 0, w, h);
      for (const p of P) {
        p.y -= p.vy;
        if (p.y < -8) { p.y = h + 8; p.x = Math.random() * w; }
        const x = p.x + Math.sin(t + p.ph) * p.sw;
        ctx.beginPath();
        ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.teal
          ? `rgba(13,148,136,${(0.4 * p.o).toFixed(3)})`
          : `rgba(163,132,92,${(0.45 * p.o).toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="bg-canvas" aria-hidden="true" />;
});

/* ── Scroll motion blur: vertical-only gaussian scaled by scroll velocity ── */
const ScrollBlur = memo(function ScrollBlur() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const blurEl = document.getElementById("scrollblur-g");
    const content = document.querySelector(".content");
    if (!blurEl || !content) return;
    let last = window.scrollY, b = 0, raf, active = false;
    const loop = () => {
      const y = window.scrollY;
      const target = Math.min(Math.abs(y - last) * 0.1, 6);
      last = y;
      b += (target - b) * (target > b ? 0.35 : 0.16);
      if (b > 0.08) {
        blurEl.setAttribute("stdDeviation", `0 ${b.toFixed(2)}`);
        if (!active) { content.style.filter = "url(#scrollblur)"; active = true; }
      } else if (active) { content.style.filter = ""; active = false; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); content.style.filter = ""; };
  }, []);
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <filter id="scrollblur" x="-5%" y="-5%" width="110%" height="110%">
        <feGaussianBlur id="scrollblur-g" in="SourceGraphic" stdDeviation="0 0" />
      </filter>
    </svg>
  );
});

/* ── Custom cursor: teal dot follows exactly, ring trails with lerp ── */
const Cursor = memo(function Cursor() {
  const dotRef = useRef(null), ringRef = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const dot = dotRef.current, ring = ringRef.current;
    let x = -100, y = -100, rx = -100, ry = -100, raf, shown = false;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; dot.style.opacity = 1; ring.style.opacity = 1; rx = x; ry = y; }
      dot.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      ring.classList.toggle("on", !!e.target.closest?.("a, button, [role='button']"));
    };
    const out = () => { shown = false; dot.style.opacity = 0; ring.style.opacity = 0; };
    const loop = () => {
      rx += (x - rx) * 0.14; ry += (y - ry) * 0.14;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", out);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", out);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div ref={dotRef} className="cur-dot" aria-hidden="true" />
      <div ref={ringRef} className="cur-ring" aria-hidden="true" />
    </>
  );
});

/* ── Confetti easter egg (clicking "This website") ── */
const CONFETTI_COLORS = ["#0A84FF", "#30D158", "#FFD60A", "#FF9F0A", "#FF375F", "#BF5AF2"];
const Confetti = memo(function Confetti({ onDone }) {
  const [pieces] = useState(() => Array.from({ length: 90 }, () => ({
    left: Math.random() * 100,
    size: 7 + Math.random() * 8,
    delay: Math.random() * 0.5,
    dur: 2.2 + Math.random() * 1.5,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    round: Math.random() > 0.5,
    tilt: Math.random() * 360,
  })));
  useEffect(() => {
    const t = setTimeout(onDone, 4200);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <i key={i} style={{
          left: `${p.left}vw`, width: p.size, height: p.size * (p.round ? 1 : 0.45),
          background: p.color, borderRadius: p.round ? "50%" : 2,
          animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
          transform: `rotate(${p.tilt}deg)`,
        }} />
      ))}
    </div>
  );
});

/* ── Tool sheet: screenshot + description, same chrome as case studies ── */
const ToolModal = memo(function ToolModal({ t, onClose, T }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  if (!t) return null;
  return (
    <div className="backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={t.name}>
      <div className="modal" style={{ background: T.sheet, color: T.txt, maxWidth: 640 }}
        onClick={e => e.stopPropagation()}>
        <div className="modal-nav">
          <span className="modal-nav-title">{t.name}</span>
          <button className="modal-close" onClick={onClose} aria-label="Close"><X style={{ width: 16, height: 16 }} /></button>
        </div>
        <div className="modal-scroll">
          <span className="modal-tag">{t.kind}</span>
          <h2 className="f modal-title">{t.name}</h2>
          {t.gallery ? (
            <div className="gal" aria-label={`${t.name} screenshots — swipe`}>
              {t.gallery.map((src, i) => (
                <img key={src} src={src} alt={`${t.name} screenshot ${i + 1} of ${t.gallery.length}`} />
              ))}
            </div>
          ) : (
            <Shot p={{ id: t.slug, title: t.name }} className="modal-vig" />
          )}
          <div className="modal-sec" style={{ marginBottom: 0 }}>
            <span className="modal-lbl">Overview</span>
            <p className="modal-body">{t.about}</p>
          </div>
          {t.href && (
            <a className="cta cta-fill" style={{ marginTop: 22 }} href={t.href} target="_blank" rel="noopener noreferrer">
              Get it on the Chrome Web Store
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

/* ── Case study sheet ── */
const CaseModal = memo(function CaseModal({ p, onClose, T }) {
  const { bdr, txt, mid, sheet } = T;
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  if (!p) return null;
  return (
    <div className="backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={p.title}>
      <div className="modal" style={{ background: sheet, color: txt }}
        onClick={e => e.stopPropagation()}>
        <div className="modal-nav">
          <span className="modal-nav-title">{p.title}</span>
          <button className="modal-close" onClick={onClose} aria-label="Close"><X style={{ width: 16, height: 16 }} /></button>
        </div>
        <div className="modal-scroll">
        <div className="modal-top">
          <div>
            <span className="modal-tag">{p.tag}</span>
            <h2 className="f modal-title">{p.title}</h2>
          </div>
        </div>
        <p className="m modal-meta" style={{ color: mid }}>{p.role} · {p.timeline} · {p.team}</p>
        <Shot p={p} className="modal-vig" />
        <div className="modal-sec">
          <span className="modal-lbl">Overview</span>
          <p className="modal-body">{p.overview}</p>
        </div>
        {p.caseStudy.map(s => (
          <div key={s.label} className="modal-sec">
            <span className="modal-lbl">{s.label}</span>
            <p className="modal-body">{s.body}</p>
          </div>
        ))}
        <div className="modal-rule" style={{ background: bdr }} />
        <div className="modal-sec" style={{ marginBottom: 0 }}>
          <span className="modal-lbl">Outcomes</span>
          <div className="modal-out">
            {p.outcomes.map((o, i) => <p key={i}>{o}</p>)}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
});

const T = {
  bg: "#FAF9F6", txt: "#1A1A1A", mid: "#57534E", sub: "#A8A29E",
  bdr: "rgba(28,25,23,0.09)", surface: "#FFFFFF", media: "#F5F0EB",
  navBg: "rgba(250,249,246,0.78)", sheet: "#FFFFFF", accent: "#0D9488",
};

export default function Portfolio() {
  const [open, setOpen] = useState(null);
  const [cvOpen, setCvOpen] = useState(false);
  const [activeSec, setActiveSec] = useState("");
  const [glow, setGlow] = useState({ x: 0, w: 0, on: false });
  const barRef = useRef(null);
  const [now, setNow] = useState(() => new Date());
  const [tool, setTool] = useState(null);
  const [bursts, setBursts] = useState([]);
  const [boot, setBoot] = useState(true);
  const [ready, setReady] = useState(false);
  const [settled, setSettled] = useState(false);
  const { bg, bdr, txt, mid, sub } = T;

  // Fresh loads always start at the top — drop any #hash and browser scroll memory
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  }, []);

  // Opening sequence starts only once fonts + avatar are in (capped at 2.5s),
  // so the reveal never shows a half-loaded page.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setBoot(false); setReady(true); setSettled(true); return; }
    let t1, t2, cancelled = false;
    const begin = () => {
      if (cancelled) return;
      setBoot(false);
      t1 = setTimeout(() => setReady(true), 1000);
      t2 = setTimeout(() => setSettled(true), 2500);
    };
    const cap = new Promise(r => setTimeout(r, 2500));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const avatar = new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = "/about-photo.jpg"; });
    Promise.race([Promise.all([fonts, avatar]), cap]).then(begin);
    return () => { cancelled = true; clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // No scrolling until the navbar has fully landed
  useEffect(() => {
    document.body.style.overflow = settled ? "" : "hidden";
  }, [settled]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const ist = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
  const nyc = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => { es.forEach(e => { if (e.isIntersecting) setActiveSec(e.target.id); }); },
      { rootMargin: "-20% 0px -55% 0px" }
    );
    ["work", "process", "tools", "contact"].forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Slide the liquid-glass puck to the active tab (resume wins while its menu is open)
  const activeTab = cvOpen ? "resume" : activeSec;
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const update = () => {
      const el = bar.querySelector(`[data-tab="${activeTab}"]`);
      if (!el) { setGlow(g => ({ ...g, on: false })); return; }
      const r = el.getBoundingClientRect(), br = bar.getBoundingClientRect();
      setGlow({ x: r.left - br.left, w: r.width, on: true });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeTab]);

  useEffect(() => {
    if (!cvOpen) return;
    const onDown = (e) => { if (!e.target.closest(".cv-wrap")) setCvOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setCvOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [cvOpen]);

  const cvMenu = (
    <div className="cv-menu" role="menu">
      <a className="cv-item" role="menuitem" href="/resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setCvOpen(false)}>
        Preview<span className="cv-hint">opens in a new tab</span>
      </a>
      <a className="cv-item" role="menuitem" href="/resume.pdf" download="Krishna-Zolpatil-Resume.pdf" onClick={() => setCvOpen(false)}>
        Download PDF<span className="cv-hint">for applications</span>
      </a>
      <a className="cv-item" role="menuitem" href="/resume.md" target="_blank" rel="noopener noreferrer" onClick={() => setCvOpen(false)}>
        Markdown<span className="cv-hint">paste into Claude / AI</span>
      </a>
    </div>
  );

  const closeCase = useCallback(() => setOpen(null), []);
  const proj = open ? PROJECTS.find(p => p.id === open) : null;

  return (
    <ErrorBoundary>
      <Styles />
      <SEO />
      <div className={`page ${boot ? "boot" : ready ? "ready" : "pre"}${settled ? " settled" : ""}`}
        style={{
          background: bg, color: txt,
          "--paper": bg, "--mid": mid, "--sub": sub, "--bdr-c": bdr,
          "--surface": T.surface, "--media": T.media, "--nav-bg": T.navBg,
          "--accent": T.accent, "--txt-c": txt,
        }}>

        {/* ── Ambient background: drifting washes + dust motes ── */}
        <div className="bg" aria-hidden="true"><i /><i /></div>
        <Particles />

        {/* ── Floating nav ── */}
        <header className="nav">
          <div className="nav-name">
            <img src="/about-photo.jpg" alt="Krishna Zolpatil" className="nav-avatar" />
            <div>
              <p className="nav-title">Krishna Zolpatil</p>
              <p className="m nav-meta" style={{ color: mid }}>Senior Product Designer</p>
            </div>
          </div>
          <div className="nav-right">
            <span className="m nav-status" style={{ color: mid }}>
              <i /><span className="st-long">open to senior remote roles</span><span className="st-short">open to roles</span>
            </span>
          </div>
        </header>

        {/* ── Mobile bottom dock (iOS tab-bar style) ── */}
        <nav className="dock" aria-label="Quick actions">
          <div className="dock-bar" ref={barRef}>
            <div className="dock-glow" aria-hidden="true"
              style={{ transform: `translateX(${glow.x}px)`, width: glow.w, opacity: glow.on ? 1 : 0 }} />
            <a href="#work" data-tab="work" onClick={() => setActiveSec("work")}
              className={`dock-item ${activeTab === "work" ? "on" : ""}`}>
              <LayoutGrid /> Work
            </a>
            <a href="#process" data-tab="process" onClick={() => setActiveSec("process")}
              className={`dock-item ${activeTab === "process" ? "on" : ""}`}>
              <Workflow /> Process
            </a>
            <a href="#tools" data-tab="tools" onClick={() => setActiveSec("tools")}
              className={`dock-item ${activeTab === "tools" ? "on" : ""}`}>
              <Gamepad2 /> Quests
            </a>
            <div className="cv-wrap dock-cv">
              <button data-tab="resume" className={`dock-item ${cvOpen ? "on" : ""}`} onClick={() => setCvOpen(o => !o)}
                aria-haspopup="menu" aria-expanded={cvOpen}>
                <FileText /> Resume
              </button>
              {cvOpen && cvMenu}
            </div>
          </div>
          <a href="mailto:krishna.zolpatil@gmail.com?subject=Hello%20Krishna%20-%20via%20krishnazolpatil.com"
            aria-label="Email me" title="Email me"
            className={`dock-fab ${activeTab === "contact" ? "on" : ""}`}>
            <Mail />
          </a>
        </nav>

        <div className="content">
          <div className="wrap">

            {/* ── Hero ── */}
            <section className="hero" aria-label="Introduction">
              <span className="m hero-eyebrow">Senior Product Designer · AI SaaS</span>
              <h1 className="h1">
                <span className="line"><span>I design AI products</span></span>
                <span className="line"><span><em>people can trust.</em></span></span>
              </h1>
              <F d={220}>
                <p className="lede" style={{ color: mid }}>
                  Four years in AI SaaS — agentic UX, design systems,
                  and prototyping in code with Claude.
                  At Naya Studio, 200+ features shipped.
                </p>
              </F>
              <F d={320}>
                <div className="hero-cta">
                  <a href="#work" className="cta cta-fill">View my work</a>
                  <a href="#contact" className="cta cta-line">Get in touch</a>
                </div>
              </F>
              <F d={140}>
                <HeroShot />
              </F>
            </section>

            {/* ── Work: app-style cards ── */}
            <section id="work" aria-label="Selected work">
              <F>
                <div className="sec-head">
                  <div>
                    <span className="m sec-kicker">Chapter 01</span>
                    <h2 className="f sec-title">Selected work</h2>
                  </div>
                  <span className="m sec-sub" style={{ color: mid }}>Naya Studio · 2022 → 2026</span>
                </div>
              </F>
              <div className="cards">
                {PROJECTS.map((p, i) => (
                  <F key={p.id} d={(i % 3) * 80} className={`bcell ${BENTO[i] || ""}`}>
                    <button className="glass card" style={{ color: txt, width: "100%" }} onClick={() => setOpen(p.id)}>
                      <Shot p={p} />
                      <div className="card-body">
                        <span className="m card-n">{p.n}</span>
                        <div className="card-top">
                          <p className="card-title">{p.title}</p>
                          <ChevronRight className="card-arrow" style={{ width: 16, height: 16 }} />
                        </div>
                        <p className="card-desc" style={{ color: mid }}>{p.short}</p>
                        <div className="card-tags">
                          <span className="tag tag-hot">{p.tag}</span>
                        </div>
                      </div>
                    </button>
                  </F>
                ))}
              </div>
              <F d={80}>
                <p className="also" style={{ color: mid }}>
                  <b style={{ color: txt }}>+ 194 more shipped</b> — {ARCHIVE}…
                </p>
              </F>
            </section>

            {/* ── Process ── */}
            <section id="process" aria-label="How I work">
              <F>
                <div className="sec-head">
                  <div>
                    <span className="m sec-kicker">Chapter 02</span>
                    <h2 className="f sec-title">How a feature comes to life</h2>
                  </div>
                  <span className="m sec-sub" style={{ color: mid }}>the same journey · 200+ times</span>
                </div>
              </F>
              <div className="steps">
                {[
                  { t: "It starts with a question", d: "Product strategy with founders — roadmap prioritisation, grounded in user insights." },
                  { t: "Then it goes on paper", d: "Problem, scope and success metrics in a PRD. Stakeholder alignment before pixels." },
                  { t: "I study who's solved it", d: "UX research and competitive analysis across the products that got it right." },
                  { t: "Sketches become software", d: "User flows, wireframes, interaction design — then high-fidelity prototypes in working code." },
                  { t: "Engineers take the baton", d: "Design specs, developer handoff and design QA, with a running preview to build from." },
                  { t: "And we listen, always", d: "Usability testing and cross-functional feedback between every stage — iterate, ship, repeat." },
                ].map((s, i) => (
                  <div key={s.t} className="step">
                    <span className="step-n">0{i + 1}</span>
                    <p className="step-t">{s.t}</p>
                    <p className="step-d">{s.d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Built ── */}
            <section id="tools" aria-label="Tools I built">
              <F>
                <div className="sec-head">
                  <div>
                    <span className="m sec-kicker">Chapter 03</span>
                    <h2 className="f sec-title">Side quests</h2>
                  </div>
                  <span className="m sec-sub" style={{ color: mid }}>built solo · end to end</span>
                </div>
              </F>
              <F d={90}>
              <div className="glass list">
                {BUILT.map(b => {
                  const external = b.href && !b.about;
                  const Row = external ? "a" : "button";
                  const rowProps = external
                    ? { href: b.href, target: "_blank", rel: "noopener noreferrer" }
                    : { type: "button", onClick: () => setTool(b) };
                  return (
                    <Row key={b.name} className="lrow" style={{ width: "100%", textAlign: "left" }} {...rowProps}>
                      <div className="lrow-head">
                        <Thumb slug={b.slug} alt={`${b.name} — screenshot`} />
                        <p className="lrow-name">
                          {b.name}
                          {b.href && <ArrowUpRight className="lrow-ext" aria-hidden="true" />}
                        </p>
                      </div>
                      <p className="lrow-desc" style={{ color: mid }}>{b.desc}</p>
                      <span className="m lrow-kind" style={{ color: sub }}>{b.kind}</span>
                    </Row>
                  );
                })}
                <button type="button" className="lrow" style={{ width: "100%", textAlign: "left" }}
                  onClick={() => setBursts(b => [...b, b.length ? b[b.length - 1] + 1 : 1])} title="🤫">
                  <p className="lrow-name">This website</p>
                  <p className="lrow-desc" style={{ color: mid }}>Designed and built end to end — React + Claude.</p>
                  <span className="m lrow-kind" style={{ color: sub }}>krishnazolpatil.com</span>
                </button>
              </div>
              </F>
            </section>

            {/* ── Contact CTA ── */}
            <section className="foot" id="contact" aria-label="Contact">
              <span className="m foot-kicker">Chapter 04 · the next one</span>
              <h2 className="foot-title">Have an AI product to design?<br /><em>Let's talk.</em></h2>
              <p className="foot-note">
                Open to senior roles, remote worldwide. I reply within a day.
              </p>
              <div className="foot-actions">
                <a href="mailto:krishna.zolpatil@gmail.com?subject=Hello%20Krishna%20-%20via%20krishnazolpatil.com" className="mail-btn">
                  <Mail style={{ width: 15, height: 15 }} /> krishna.zolpatil@gmail.com
                </a>
              </div>
            </section>

          </div>

          {/* ── Footer: full-bleed ── */}
          <footer className="foot2">
            <div className="wrap">
              <div className="foot2-top">
                <div className="foot2-brand">
                  <h2 className="f foot2-logo">Krishna Zolpatil<em>.</em></h2>
                  <p className="foot2-tag">Senior Product Designer · AI SaaS · remote, worldwide.</p>
                </div>
                <div className="foot2-cols">
                  <div className="foot2-col">
                    <span className="m foot2-lbl">Explore</span>
                    <a href="#work">Work</a>
                    <a href="#process">Process</a>
                    <a href="#tools">Tools</a>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
                  </div>
                  <div className="foot2-col">
                    <span className="m foot2-lbl">Connect</span>
                    <a href="mailto:krishna.zolpatil@gmail.com?subject=Hello%20Krishna%20-%20via%20krishnazolpatil.com">Email</a>
                    <a href="https://www.linkedin.com/in/krishnazolpatil/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://github.com/krishnazolpatil" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://instagram.com/krishna.ux" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://x.com/krishnazolpatil" target="_blank" rel="noopener noreferrer">Twitter / X</a>
                  </div>
                </div>
              </div>
              <hr className="foot2-rule" />
              <div className="m foot2-bottom">
                <span>© 2026 Krishna Zolpatil. All rights reserved.</span>
                <span>Handcrafted with ♥ — React + Claude</span>
                <span>MUM {ist} · NYC {nyc}</span>
              </div>
            </div>
          </footer>
        </div>

        <Cursor />
        <ScrollBlur />
        {bursts.map(id => (
          <Confetti key={id} onDone={() => setBursts(b => b.filter(x => x !== id))} />
        ))}
        {tool && <ToolModal t={tool} onClose={() => setTool(null)} T={T} />}
        {proj && <CaseModal p={proj} onClose={closeCase} T={T} />}
      </div>
    </ErrorBoundary>
  );
}
