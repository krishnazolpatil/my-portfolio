import { memo } from "react";

const Styles = memo(() => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

    :root {
      --accent-bg: #0000FF;
      --accent-fg: #0000FF;
    }
    /* In dark contexts, use off-white for text — maximum contrast, clean legibility */
    .page-dark {
      --accent-fg: #E8E4DE; /* warm off-white — 16:1+ on #0A0A0A */
      --accent-bg: #0000FF;
    }
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    html  { scroll-behavior:smooth; font-size:16px; overflow-x:hidden; }
    body  { font-family:'DM Sans',sans-serif; -webkit-font-smoothing:antialiased; overflow-x:hidden; }
    img   { display:block; max-width:100%; }
    a     { text-decoration:none; }
    button{ font-family:'DM Sans',sans-serif; cursor:pointer; }
    .f    { font-family:'Fraunces',serif; }

    /* ── Animations ── */
    @keyframes fadeUp  { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }
    @keyframes pulse   { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.4;transform:scale(0.85);} }
    @keyframes fadeIn  { from{opacity:0;}to{opacity:1;} }
    @keyframes pageIn  { from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);} }
    @keyframes pageOut { from{opacity:1;}to{opacity:0;transform:translateY(-6px);} }
    .fu { animation:fadeUp 0.6s ease both; }
    .fi { animation:fadeIn 0.35s ease both; }
    .page-enter { animation:pageIn 0.35s ease both; }
    .page-exit  { animation:pageOut 0.2s ease both; pointer-events:none; }
    .bk { animation:pulse 2.4s ease-in-out infinite; display:inline-block; width:6px; height:6px; border-radius:50%; background:#22C55E; box-shadow:0 0 6px #22C55E66; }
    .mq { animation:marq 28s linear infinite; display:flex; width:max-content; }
    ::selection { background:#0000FF22; }
    ::-webkit-scrollbar { width:4px; }
    ::-webkit-scrollbar-thumb { background:#333; border-radius:4px; }

    /* ── Core layout ── */
    .page      { min-height:100vh; overflow-x:clip; transition:background 0.3s, color 0.3s; }
    .wrap      { width:100%; max-width:1200px; margin:0 auto; box-sizing:border-box;
                 padding-left:clamp(16px,5vw,64px);
                 padding-right:clamp(16px,5vw,64px); }
    .wrap > *  { min-width:0; }
    .sec       { padding-top:clamp(52px,8vw,96px); padding-bottom:clamp(52px,8vw,96px); }
    .sec-sm    { padding-top:clamp(36px,5vw,56px); padding-bottom:clamp(36px,5vw,56px); }

    /* ── Nav ── */
    .nav       { position:fixed; top:0; left:0; right:0; z-index:100; height:56px;
                 display:flex; align-items:center; backdrop-filter:blur(18px); }
    .nav-inner { display:flex; align-items:center; justify-content:space-between; height:100%; }
    .nav-logo  { background:none; border:none; font-family:'Fraunces',serif; font-size:1rem;
                 letter-spacing:-0.01em; cursor:pointer; }
    .nav-links { display:flex; align-items:center; gap:24px; }
    .nav-link  { background:none; border:none; font-size:0.78rem; cursor:pointer;
                 text-transform:capitalize; letter-spacing:0.01em; transition:color 0.2s; }
    .nav-div   { width:1px; height:16px; }
    .nav-icon-btn { width:32px; height:32px; border-radius:50%; border:1px solid transparent;
                    background:none; display:flex; align-items:center; justify-content:center;
                    transition:border-color 0.2s, color 0.2s; }
    .nav-icon-btn:hover { border-color:var(--accent-fg); color:var(--accent-fg); }
    .nav-cta   { border:none; border-radius:100px; padding:7px 18px; font-size:0.76rem;
                 font-weight:500; background:#0000FF; color:#fff; transition:opacity 0.2s; }
    .nav-cta:hover { opacity:0.8; }
    .nav-mobile{ display:none; align-items:center; gap:8px; }
    .nav-mob-icon { width:30px; height:30px; border-radius:50%; background:none;
                    display:flex; align-items:center; justify-content:center; }
    .nav-mob-menu { background:none; border:none; display:flex; padding:4px; }
    .mob-dropdown  { position:fixed; top:56px; left:0; right:0; z-index:99; }
    .mob-dropdown-inner { display:flex; flex-direction:column; gap:16px;
                          padding-top:20px; padding-bottom:20px; }
    .mob-nav-link  { background:none; border:none; font-size:0.95rem; text-align:left;
                     text-transform:capitalize; }
    .mob-cta       { background:#0000FF; color:#fff; border:none; border-radius:100px;
                     padding:9px 18px; width:fit-content; font-size:0.82rem; }

    /* ── Hero ── */
    .hero-wrap    { padding-top:120px; padding-bottom:64px; }
    .hero-top     { display:flex; flex-direction:column; align-items:center; text-align:center;
                    max-width:780px; margin:0 auto; }
    .hero-badge   { display:inline-flex; align-items:center; gap:7px; border-radius:100px;
                    padding:4px 12px; margin-bottom:28px; border:1px solid transparent; }
    .hero-badge-txt { font-size:0.65rem; letter-spacing:0.1em; text-transform:uppercase; }
    .hero-h1      { font-weight:400; line-height:1.05; letter-spacing:-0.03em; margin-bottom:20px; }
    .hero-sub     { line-height:1.8; font-weight:300; margin-bottom:36px; max-width:520px; }
    .hero-btns    { display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }
    .hero-slideshow { margin-top:56px; }
    .btn-primary  { border:none; border-radius:100px; padding:12px 24px; font-size:0.875rem;
                    font-weight:500; display:flex; align-items:center; gap:8px; transition:opacity 0.2s; }
    .btn-primary:hover { opacity:0.8; }
    .btn-outline  { background:none; border-radius:100px; padding:12px 24px; font-size:0.875rem;
                    border:1px solid transparent; transition:border-color 0.2s; }
    .btn-outline:hover { border-color:var(--accent-fg)!important; }

    /* ── Stats ── */
    .stats-row    { display:grid; grid-template-columns:repeat(3,1fr); gap:24px;
                    border-top:1px solid transparent; margin-top:64px; padding-top:36px; }
    .stat-item    { display:flex; flex-direction:column; align-items:center; text-align:center; }
    .stat-n       { font-size:2.8rem; line-height:1; margin-bottom:5px; }
    .stat-l       { font-size:0.68rem; text-transform:uppercase; letter-spacing:0.1em; }

    /* ── Logo grid ── */
    .logo-band    { border-top:1px solid transparent; border-bottom:1px solid transparent;
                    width:100%; }
    .logo-section { padding-top:clamp(32px,5vw,56px); padding-bottom:clamp(32px,5vw,56px); }
    .logo-label   { font-size:0.62rem; text-transform:uppercase; letter-spacing:0.14em;
                    margin-bottom:24px; display:block; }
    .logo-grid    { display:grid; grid-template-columns:repeat(5,1fr); gap:12px;
                    width:100%; box-sizing:border-box; }
    .logo-item    { border-radius:12px; border:1px solid transparent; padding:16px 12px;
                    display:flex; align-items:center; justify-content:center;
                    min-width:0; overflow:hidden;
                    transition:border-color 0.2s; }
    .logo-item:hover { border-color:var(--accent-fg); opacity:0.8; }
    .logo-name    { font-size:0.7rem; letter-spacing:0.12em; text-transform:uppercase;
                    font-weight:500; min-width:0; white-space:nowrap;
                    overflow:hidden; text-overflow:ellipsis; }

    @media(max-width:767px){
      .logo-grid  { grid-template-columns:repeat(3,1fr); gap:8px; }
    }
    @media(max-width:479px){
      .logo-grid  { grid-template-columns:repeat(2,1fr); gap:8px; }
      .logo-item  { padding:14px 10px; }
    }

    /* ── Section labels ── */
    .sec-label    { font-size:0.65rem; text-transform:uppercase; letter-spacing:0.14em;
                    color:var(--accent-fg); margin-bottom:10px; display:block; }
    .sec-title    { font-family:'Fraunces',serif; font-weight:400; letter-spacing:-0.025em; line-height:1.1;
                      white-space:nowrap; overflow:visible; }
    .sec-head     { display:flex; justify-content:space-between; align-items:flex-end;
                    margin-bottom:48px; flex-wrap:wrap; gap:16px; }
    .sec-sub      { line-height:1.7; font-weight:300; max-width:280px; }

    /* ── Cards ── */
    .card         { border-radius:18px; border:1px solid transparent; }
    .card-hover   { transition:transform 0.22s, border-color 0.22s; }
    .card-hover:hover { transform:translateY(-4px); }
    .card-sm      { border-radius:12px; border:1px solid transparent; }

    /* ── Project grid ── */
    .g-proj       { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; align-items:stretch; }
    .proj-img-hero { aspect-ratio:21/9!important; }
    .proj-img     { width:100%; height:260px; position:relative; overflow:hidden;
                    display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .proj-img-overlay { position:absolute; inset:0; }
    .proj-img-icon{ width:44px; height:44px; border-radius:11px; display:flex;
                    align-items:center; justify-content:center; margin-bottom:8px; }
    .proj-img-placeholder { position:relative; z-index:1; display:flex; flex-direction:column;
                            align-items:center; }
    .proj-badge   { position:absolute; top:12px; left:12px; }
    .proj-num     { position:absolute; top:12px; right:12px; font-size:0.6rem; }
    .proj-info    { padding:20px 22px 22px; }
    .proj-title   { font-size:0.95rem; font-weight:500; letter-spacing:-0.01em;
                    margin-bottom:6px; line-height:1.3; }
    .proj-desc    { font-size:0.78rem; line-height:1.6; font-weight:300; margin-bottom:14px; }
    .proj-foot    { display:flex; justify-content:space-between; align-items:center;
                    flex-wrap:wrap; gap:8px; }
    .proj-chips   { display:flex; gap:5px; flex-wrap:wrap; }
    .chip         { font-size:0.64rem; border:1px solid transparent; padding:3px 10px; border-radius:100px; }
    .proj-view    { font-size:0.72rem; color:var(--accent-fg); display:flex; align-items:center;
                    gap:3px; font-weight:500; }

    /* ── Skills grid ── */
    .g-sk         { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; align-items:stretch; }
    .skill-card   { border-radius:18px; border:1px solid transparent; padding:24px;
                    display:flex; flex-direction:column; height:100%; min-height:160px;
                    transition:border-color 0.2s, transform 0.2s; }
    .skill-card:hover { transform:translateY(-3px); border-color:var(--accent-fg)!important; }
    .skill-icon   { width:34px; height:34px; border-radius:8px; display:flex; align-items:center;
                    justify-content:center; margin-bottom:12px; color:var(--accent-fg); }
    .skill-name   { font-size:0.88rem; font-weight:500; letter-spacing:-0.01em; margin-bottom:10px; }
    .skill-tags   { display:flex; flex-wrap:wrap; gap:5px; margin-top:auto; }
    .skill-tag    { font-size:0.65rem; padding:3px 8px; border-radius:100px; }

    /* ── About ── */
    .about-unified  { border-radius:20px; border:1px solid transparent; overflow:hidden; }
    .about-layout   { display:grid; grid-template-columns:1.1fr 1fr; }
    .about-photo    { position:relative; overflow:hidden; min-height:580px;
                      border-right:1px solid transparent; }
    .about-photo-inner { width:100%; height:100%; display:flex; flex-direction:column;
                         align-items:center; justify-content:center; }
    .about-photo-txt { font-size:0.72rem; letter-spacing:0.08em; text-transform:uppercase;
                       text-align:center; padding:0 20px; }
    .about-photo-sub { font-size:0.62rem; display:block; margin-top:4px; }
    .about-photo-wm  { font-family:'Fraunces',serif; position:absolute; bottom:16px; right:16px;
                       font-size:3.5rem; line-height:1; color:currentColor; opacity:0.06; }
    .about-photo-label { position:absolute; bottom:16px; left:16px; font-size:0.6rem;
                         letter-spacing:0.1em; text-transform:uppercase; }
    .about-content  { display:flex; flex-direction:column; padding:36px; border-left:1px solid transparent; }
    .about-bio      { flex:1; }
    .about-avatar   { width:40px; height:40px; border-radius:50%; display:flex; align-items:center;
                      justify-content:center; margin-bottom:20px; }
    .about-name     { font-family:'Fraunces',serif; font-size:clamp(1.4rem,2.2vw,1.9rem); font-weight:400;
                      letter-spacing:-0.03em; line-height:1.1; margin-bottom:14px; }
    .about-body     { line-height:1.85; font-weight:300; margin-bottom:12px; }
    .about-sub      { line-height:1.8; font-weight:300; }
    .about-stats    { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:24px;
                      padding-top:24px; border-top:1px solid transparent; }
    .about-stat-n   { font-size:1.6rem; line-height:1; color:var(--accent-fg); font-family:'Fraunces',serif; }
    .about-stat-l   { font-size:0.68rem; margin-top:4px; }
    .about-hobbies  { margin-top:24px; padding-top:24px; border-top:1px solid transparent; }
    .about-quote    { margin-top:20px; padding:20px 0 0; position:relative; }
    .about-quote-mark { font-family:'Fraunces',serif; font-size:4rem; line-height:0.6;
                        position:absolute; top:24px; left:0; opacity:0.12; font-style:italic; }
    .about-quote-text { font-family:'Fraunces',serif; font-size:clamp(0.95rem,1.3vw,1.1rem);
                        font-style:italic; font-weight:300; line-height:1.7;
                        letter-spacing:-0.01em; padding-left:20px; }
    .about-quote-attr { font-size:0.62rem; text-transform:uppercase; letter-spacing:0.12em;
                        margin-top:10px; padding-left:20px; }
    .about-hobbies-label { font-size:0.6rem; text-transform:uppercase; letter-spacing:0.12em;
                           margin-bottom:14px; display:flex; align-items:center; gap:7px; }
    .media-card   { border-radius:18px; border:1px solid transparent; padding:28px 32px; }
    .media-head   { display:flex; align-items:center; gap:8px; margin-bottom:22px; }
    .media-title  { font-size:0.88rem; font-weight:500; }
    .slide-img    { width:100%; aspect-ratio:16/9; display:flex; align-items:center;
                    justify-content:center; position:relative; }
    .slide-emoji  { font-size:4rem; opacity:0.12; }
    .slide-hint   { position:absolute; bottom:12px; left:14px; font-size:0.6rem; letter-spacing:0.06em; }
    .slide-caption{ padding:14px 18px; display:flex; justify-content:space-between; align-items:center; }
    .slide-type   { font-size:0.6rem; text-transform:uppercase; letter-spacing:0.1em;
                    color:var(--accent-fg); display:block; margin-bottom:3px; }
    .slide-label  { font-family:'Fraunces',serif; font-size:1rem; line-height:1; }
    .slide-sub    { font-size:0.75rem; font-weight:300; }

    /* ── Slideshow controls ── */
    .slide-controls { display:flex; align-items:center; justify-content:space-between; margin-top:16px; }
    .slide-dots     { display:flex; gap:5px; }
    .slide-dot      { height:5px; border-radius:100px; border:none; cursor:pointer; transition:all 0.3s; padding:0; }
    .slide-arrows   { display:flex; gap:6px; }
    .slide-arrow    { width:30px; height:30px; border-radius:50%; border:1px solid transparent;
                      background:none; display:flex; align-items:center; justify-content:center;
                      cursor:pointer; transition:border-color 0.2s, color 0.2s; }
    .slide-arrow:hover { border-color:var(--accent-fg)!important; color:var(--accent-fg)!important; }

    /* ── Resources ── */
    .g3           { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
    .res-card     { border-radius:18px; border:1px solid transparent; padding:26px;
                    height:100%; display:flex; flex-direction:column;
                    transition:border-color 0.2s, transform 0.2s; }
    .res-card:hover { transform:translateY(-4px); border-color:var(--accent-fg)!important; }
    .res-icon     { width:34px; height:34px; border-radius:8px; display:flex; align-items:center;
                    justify-content:center; margin-bottom:16px; color:var(--accent-fg); }
    .res-type     { font-size:0.6rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:6px; }
    .res-name     { font-size:0.88rem; font-weight:500; letter-spacing:-0.01em; margin-bottom:7px; }
    .res-desc     { font-size:0.78rem; line-height:1.65; font-weight:300; flex:1; margin-bottom:18px; }
    .res-cta      { display:inline-flex; align-items:center; gap:5px; font-size:0.76rem;
                    color:var(--accent-fg); font-weight:500; }
    .res-list     { display:flex; flex-direction:column; border:1px solid transparent;
                    border-radius:18px; overflow:hidden; }
    .res-row      { display:flex; align-items:center; justify-content:space-between;
                    padding:22px 28px; border-bottom:1px solid transparent;
                    transition:background 0.2s; text-decoration:none; gap:16px; }
    .res-row:last-child { border-bottom:none; }
    .res-row:hover .res-row-name { color:var(--accent-fg); }
    .res-row-left { display:flex; align-items:center; gap:16px; min-width:0; }
    .res-row-icon { width:36px; height:36px; border-radius:9px; display:flex; align-items:center;
                    justify-content:center; flex-shrink:0; }
    .res-row-type { font-size:0.58rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:3px; }
    .res-row-name { font-size:0.92rem; font-weight:500; letter-spacing:-0.01em; transition:color 0.2s; }
    .res-row-cta  { display:inline-flex; align-items:center; gap:5px; font-size:0.75rem;
                    font-weight:500; flex-shrink:0; white-space:nowrap; }

    /* ── Contact ── */
    .contact-sec  { position:relative; overflow:hidden; }
    .contact-glow { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
                    width:min(700px,90vw); height:min(700px,90vw); pointer-events:none; }
    .contact-line-t { height:1px; }
    .contact-line-b { height:1px; }
    .contact-inner{ text-align:center; position:relative;
                    padding-top:clamp(64px,10vw,112px); padding-bottom:clamp(64px,10vw,128px); }
    .contact-badge{ display:inline-flex; align-items:center; gap:7px; border:1px solid transparent;
                    border-radius:100px; padding:5px 14px; margin-bottom:28px; }
    .contact-badge-txt { font-size:0.65rem; letter-spacing:0.1em; text-transform:uppercase; }
    .contact-h2   { font-weight:400; letter-spacing:-0.04em; line-height:1.0; margin-bottom:24px;
                    font-size:clamp(2.4rem,7vw,6rem); }
    .contact-sub  { line-height:1.8; max-width:420px; margin:0 auto 44px; font-weight:300; }
    .contact-email{ display:inline-flex; align-items:center; gap:10px; padding:15px 32px;
                    border-radius:100px; font-size:0.95rem; font-weight:500; margin-bottom:40px;
                    color:#fff; transition:opacity 0.2s, transform 0.2s; }
    .contact-email:hover { opacity:0.88; transform:translateY(-2px); }
    .socials      { display:flex; justify-content:center; gap:8px; flex-wrap:wrap; }
    .social-link  { display:inline-flex; align-items:center; gap:6px; border:1px solid transparent;
                    border-radius:100px; padding:8px 16px; font-size:0.76rem;
                    transition:border-color 0.2s, color 0.2s; }
    .social-link:hover { border-color:var(--accent-fg)!important; }

    /* ── Footer ── */
    .footer       { display:flex; justify-content:space-between; align-items:center;
                    flex-wrap:wrap; gap:10px; padding-top:20px; padding-bottom:20px; }
    .footer-name  { font-size:0.88rem; font-style:italic; }
    .footer-copy  { font-size:0.68rem; }

    /* ── Back to top ── */
    .back-top     { position:fixed; bottom:24px; right:24px; z-index:50; width:38px; height:38px;
                    border-radius:50%; background:#0000FF; border:none; display:flex;
                    align-items:center; justify-content:center;
                    box-shadow:0 4px 24px #0000FF60; transition:transform 0.2s; }
    .back-top:hover { transform:translateY(-2px); }

    /* ── Project page ── */
    .proj-page    { min-height:100vh; will-change:opacity; }
    .proj-topbar  { position:sticky; top:0; z-index:50; height:52px; display:flex;
                    align-items:center; padding-left:clamp(16px,5vw,48px);
                    padding-right:clamp(16px,5vw,48px); backdrop-filter:blur(16px);
                    border-bottom:1px solid transparent; }
    .proj-back-btn{ display:flex; align-items:center; gap:7px; background:none;
                    border:1px solid transparent; border-radius:100px; padding:6px 14px;
                    font-size:0.78rem; transition:border-color 0.2s, color 0.2s; }
    .proj-back-btn:hover { border-color:var(--accent-fg)!important; }
    .proj-hero    { min-height:320px; display:flex; align-items:flex-end;
                    padding:clamp(36px,6vw,56px) clamp(16px,5vw,48px) 40px;
                    border-bottom:1px solid transparent; }
    .proj-hero-inner { max-width:860px; width:100%; margin:0 auto; }
    .proj-hero-tag{ font-size:0.65rem; text-transform:uppercase; letter-spacing:0.12em;
                    color:var(--accent-fg); display:block; margin-bottom:10px; }
    .proj-hero-h1 { font-weight:400; line-height:1.1; letter-spacing:-0.025em; margin-bottom:14px;
                    font-size:clamp(1.8rem,5vw,3.5rem); }
    .proj-hero-desc { font-size:0.95rem; font-weight:300; max-width:540px; line-height:1.7; }
    .proj-meta    { border-bottom:1px solid transparent; }
    .proj-meta-inner { max-width:860px; margin:0 auto; padding:20px clamp(16px,5vw,48px);
                       display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
    .proj-meta-label { font-size:0.62rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:4px; }
    .proj-meta-val{ font-size:0.85rem; }
    .proj-body    { max-width:860px; margin:0 auto;
                    padding:clamp(36px,6vw,56px) clamp(16px,5vw,48px); }
    .proj-hero-img{ width:100%; aspect-ratio:16/9; border-radius:14px; border:1px solid transparent;
                    display:flex; align-items:center; justify-content:center;
                    margin-bottom:48px; overflow:hidden; }
    .proj-section { margin-bottom:48px; }
    .proj-section-label { font-size:0.65rem; text-transform:uppercase; letter-spacing:0.14em;
                          color:var(--accent-fg); margin-bottom:12px; display:block; }
    .proj-overview{ font-size:1rem; line-height:1.85; font-weight:300; max-width:660px; }
    .proj-divider { height:1px; margin-bottom:48px; }
    .outcomes-list{ display:flex; flex-direction:column; gap:10px; }
    .outcome-item { display:flex; align-items:center; gap:12px; border-radius:10px;
                    border:1px solid transparent; padding:16px 20px; }
    .outcome-dot  { width:5px; height:5px; border-radius:50%; background:var(--accent-fg);
                    flex-shrink:0; display:inline-block; }
    .outcome-txt  { font-size:0.88rem; }
    .case-block   { margin-bottom:40px; }
    .case-placeholder { border-radius:10px; border:1px solid transparent;
                        padding:28px; border-style:dashed; }
    .case-placeholder p { font-size:0.82rem; font-style:italic; }
    .screens-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:48px; }
    .screen-item  { aspect-ratio:4/3; border-radius:10px; border:1px solid transparent;
                    display:flex; align-items:center; justify-content:center; border-style:dashed; }
    .screen-item p{ font-size:0.72rem; }
    .proj-footer  { padding-top:24px; border-top:1px solid transparent; }

    /* ── Tag pill ── */
    .tag  { font-size:0.62rem; padding:2px 10px; border-radius:100px; letter-spacing:0.07em;
            text-transform:uppercase; border:1px solid transparent; white-space:nowrap; }
    .tag-accent { font-size:0.58rem; color:var(--accent-fg); background:color-mix(in srgb, var(--accent-fg) 12%, transparent); border-color:color-mix(in srgb, var(--accent-fg) 25%, transparent); }

    /* ── Icon box ── */
    .icon-box     { display:flex; align-items:center; justify-content:center;
                    border-radius:12px; color:var(--accent-fg); }
    .icon-box-sm  { width:44px; height:44px; border-radius:11px; }

    /* ── Typography ── */
    .h-xl { font-size:clamp(2rem, 5.5vw, 5.5rem); }
    .h-lg { font-size:clamp(1.7rem, 3.5vw, 3rem); }
    .body { font-size:clamp(0.9rem, 1.2vw, 1rem); }
    .small{ font-size:clamp(0.8rem, 1vw, 0.875rem); }
    .txt-accent { color:var(--accent-fg); }
    .txt-accent-fg { color:var(--accent-fg); }
    .txt-italic { font-style:italic; }


    /* ── Custom Cursor ── */
    * { cursor: none !important; }
    .cursor-dot  { position:fixed; top:0; left:0; width:6px; height:6px; border-radius:50%;
                   pointer-events:none; z-index:99999; transform:translate(-50%,-50%);
                   transition:width 0.2s ease, height 0.2s ease, opacity 0.2s ease,
                               background 0.2s ease; will-change:transform; }
    .cursor-ring { position:fixed; top:0; left:0; width:36px; height:36px; border-radius:50%;
                   border:1.5px solid transparent; pointer-events:none; z-index:99998;
                   transform:translate(-50%,-50%);
                   transition:width 0.35s cubic-bezier(0.23,1,0.32,1),
                               height 0.35s cubic-bezier(0.23,1,0.32,1),
                               border-color 0.25s ease, opacity 0.25s ease,
                               background 0.3s ease;
                   will-change:transform; }
    .cursor-dot.hovering  { width:8px; height:8px; }
    .cursor-ring.hovering { width:52px; height:52px; }
    .cursor-dot.clicking  { width:4px; height:4px; opacity:0.6; }
    .cursor-ring.clicking { width:28px; height:28px; }
    .cursor-dot.hidden    { opacity:0; }
    .cursor-ring.hidden   { opacity:0; }

    /* ── Available badge ── */
    .avail-dot-wrap { display:inline-flex; align-items:center; gap:7px; border-radius:100px;
                      padding:4px 12px; margin-bottom:28px; border:1px solid transparent; }

    /* ── Slideshow hero card ── */
    .slide-card   { border-radius:14px; border:1px solid transparent; overflow:hidden;
                    cursor:pointer; transition:border-color 0.2s, transform 0.2s; }
    .slide-card:hover { transform:translateY(-2px); }
    .slide-info   { padding:14px 18px; display:flex; align-items:center;
                    justify-content:space-between; gap:12px; }
    .slide-info-text { min-width:0; }
    .slide-info-title { font-size:0.88rem; font-weight:500; letter-spacing:-0.01em;
                        white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .slide-info-sub   { font-size:0.72rem; font-weight:300; margin-top:2px;
                        white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .slide-arrow-btn  { width:30px; height:30px; border-radius:50%; display:flex;
                        align-items:center; justify-content:center; flex-shrink:0; }

    /* ── md: 768–1023 ── */
    @media(max-width:1023px){
      .g-proj { grid-template-columns:1fr 1fr; gap:16px; }
      .g-sk   { grid-template-columns:1fr 1fr; }
    }

    /* ── sm: 480–767 ── */
    @media(max-width:767px){
      .nav-links  { display:none!important; }
      .nav-mobile { display:flex!important; }
      .about-grid { grid-template-columns:1fr; }
      .g-proj     { grid-template-columns:1fr; gap:14px; }
      .g3         { grid-template-columns:1fr; gap:12px; }
      .g-sk       { grid-template-columns:1fr 1fr; gap:10px; }
      .screens-grid { grid-template-columns:1fr; }
      .stats-row  { grid-template-columns:repeat(3,1fr); gap:12px; margin-top:40px; padding-top:28px; }
      .proj-meta-inner { grid-template-columns:1fr; gap:16px; }
      .sec-head   { flex-direction:column; align-items:flex-start; gap:10px; margin-bottom:32px; }
      .sec-sub    { max-width:100%; }
      .about-card { padding:24px; }
      .media-card { padding:20px; }
      .hero-wrap  { padding-top:80px; padding-bottom:40px; }
      .hero-sub   { max-width:100%; margin-bottom:28px; }
      .proj-img-hero { aspect-ratio:16/9!important; }
      .contact-inner { padding-top:64px; padding-bottom:72px; }
      .about-layout   { grid-template-columns:1fr; }
      .about-photo    { min-height:260px; order:-1; border-right:0!important; }
      .about-content  { border-left:0!important; border-top:1px solid transparent; padding:24px; }
      .about-stats    { grid-template-columns:1fr 1fr; }
    }

    /* ── xs: <480 (iPhone 15 = 390px) ── */
    @media(max-width:479px){
      .g-sk       { grid-template-columns:1fr; gap:10px; }
      .g3         { grid-template-columns:1fr; gap:10px; }
      .stats-row  { grid-template-columns:1fr 1fr; gap:10px; margin-top:32px; padding-top:24px; }
      .stat-n     { font-size:2rem; }
      .stat-l     { font-size:0.62rem; }
      .hero-btns  { flex-direction:column; gap:8px; }
      .btn-primary, .btn-outline { width:100%; justify-content:center; }
      .avail-dot-wrap { margin-bottom:20px; }
      .hero-h1    { margin-bottom:16px; }
      .hero-wrap  { padding-top:72px; padding-bottom:32px; }
      .about-card { padding:20px; }
      .about-stats { grid-template-columns:1fr 1fr; gap:8px; margin-top:20px; }
      .media-card { padding:16px; }
      .proj-info  { padding:16px 16px 18px; }
      .proj-title { font-size:0.9rem; }
      .skill-card { padding:18px; }
      .res-card   { padding:20px; }
      .outcome-item { padding:12px 14px; }
      .slide-caption { flex-direction:column; align-items:flex-start; gap:4px; padding:12px 14px; }
      .contact-badge { margin-bottom:20px; }
      .socials    { gap:6px; }
      .social-link { padding:7px 12px; font-size:0.72rem; }
      .footer     { flex-direction:column; align-items:flex-start; gap:6px; }
      .back-top   { bottom:16px; right:16px; }
      .proj-topbar { padding-left:16px; padding-right:16px; }
      .proj-hero  { padding-left:16px; padding-right:16px; }
      .proj-hero-img { border-radius:10px; margin-bottom:32px; }
      .proj-section { margin-bottom:32px; }
      .proj-divider { margin-bottom:32px; }
      .case-block { margin-bottom:28px; }
    }

    /* ── viewport meta safety — prevents zoom on input focus ── */
    @media(max-width:390px){
      .h-xl { font-size:2rem; }
      .h-lg { font-size:1.6rem; }
      .wrap { padding-left:16px; padding-right:16px; }
    }

    /* ── Dark mode enhancements ── */
    .page-dark .dark-glow-card:hover {
      border-color: rgba(232,228,222,0.2) !important;
      box-shadow: 0 0 24px rgba(232,228,222,0.04), 0 2px 8px rgba(0,0,0,0.4);
    }
    .page-dark .skill-card:hover {
      border-color: rgba(232,228,222,0.2) !important;
      box-shadow: 0 0 16px rgba(232,228,222,0.04);
    }
    .page-dark .card-hover:hover {
      border-color: rgba(232,228,222,0.18) !important;
      box-shadow: 0 0 24px rgba(232,228,222,0.04), 0 2px 12px rgba(0,0,0,0.5);
    }
    .page-dark .res-card:hover {
      border-color: rgba(232,228,222,0.2) !important;
      box-shadow: 0 0 16px rgba(232,228,222,0.04);
    }
    /* Contact email button glow */
    .contact-email-glow {
      box-shadow: 0 6px 28px rgba(0,0,255,0.18), 0 1px 4px rgba(0,0,255,0.06);
    }
    .page-dark .contact-email-glow {
      box-shadow: 0 4px 16px rgba(0,0,0,0.35);
    }
    /* Back to top glow */
    .page-dark .back-top {
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
  `}</style>
));

export default Styles;
