import { useState, useEffect, useRef, useCallback, useMemo, memo, Component } from "react";
import {
  Sun, Moon, ArrowRight, ArrowUpRight, ArrowLeft,
  Linkedin, Github, Instagram, Twitter, Mail, FileText,
  Zap, MessageSquare, CreditCard, Bot, Globe, Palette,
  Brain, MousePointer, Lightbulb, Layers, Menu, X,
  ChevronUp, Sparkles, ChevronLeft, ChevronRight,
  Aperture, Clapperboard, ExternalLink
} from "lucide-react";

const A = "#0000FF"; // brand primary-500

/* ─────────────────────────────────────────────────────────
   ALL STYLES IN CSS — no layout/spacing in inline styles.
   Only dynamic theme colors stay inline (they depend on JS state).
───────────────────────────────────────────────────────── */
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


    /* ── Custom Cursor — desktop/mouse only ── */
    @media (hover: hover) and (pointer: fine) {
      * { cursor: none !important; }
    }
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
    /* On touch/coarse-pointer devices, hide cursor elements entirely */
    @media (hover: none), (pointer: coarse) {
      .cursor-dot, .cursor-ring { display:none !important; }
    }

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


const Cursor = memo(function Cursor({ dark }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ring = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const raf = useRef(null);
  const hovering = useRef(false);
  const clicking = useRef(false);
  // Only enable on true pointer devices, not touch screens
  const isTouch = useRef(typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches);

  useEffect(() => {
    // Don't run cursor logic on touch devices
    if (isTouch.current) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      dot.style.transform = `translate(calc(${pos.current.x}px - 50%), calc(${pos.current.y}px - 50%))`;
      ringEl.style.transform = `translate(calc(${ring.current.x}px - 50%), calc(${ring.current.y}px - 50%))`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const onMove = (e) => { pos.current.x = e.clientX; pos.current.y = e.clientY; };

    const onEnter = (e) => {
      const t = e.target.closest('a,button,[data-cursor]');
      if (t) { hovering.current = true; dot.classList.add('hovering'); ringEl.classList.add('hovering'); }
    };
    const onLeave = (e) => {
      const t = e.target.closest('a,button,[data-cursor]');
      if (t) { hovering.current = false; dot.classList.remove('hovering'); ringEl.classList.remove('hovering'); }
    };
    const onDown = () => { clicking.current = true; dot.classList.add('clicking'); ringEl.classList.add('clicking'); };
    const onUp = () => { clicking.current = false; dot.classList.remove('clicking'); ringEl.classList.remove('clicking'); };
    const onOut = () => { dot.classList.add('hidden'); ringEl.classList.add('hidden'); };
    const onIn = () => { dot.classList.remove('hidden'); ringEl.classList.remove('hidden'); };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onEnter, { passive: true });
    window.addEventListener('mouseout', onLeave, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });
    document.addEventListener('mouseleave', onOut);
    document.addEventListener('mouseenter', onIn);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onEnter);
      window.removeEventListener('mouseout', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onOut);
      document.removeEventListener('mouseenter', onIn);
    };
  }, []);

  // Don't render cursor elements on touch devices
  if (isTouch.current) return null;

  const dotColor = dark ? '#EDEAE6' : '#18140E';
  const ringColor = dark ? 'rgba(237,234,230,0.35)' : 'rgba(24,20,14,0.2)';

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ background: dotColor }} />
      <div ref={ringRef} className="cursor-ring" style={{ borderColor: ringColor }} />
    </>
  );
});


const SEO = memo(function SEO({ page, dark }) {
  useEffect(() => {
    const isProject = page && page !== null;
    const title = isProject
      ? `${page.title} — Krishna Zolpatil, Product Designer`
      : "Krishna Zolpatil — Product Designer based in Mumbai, India";
    const desc = isProject
      ? page.desc
      : "Product designer based in Mumbai, India. I design SaaS tools, AI platforms, and zero-to-one digital products with care and craft.";
    const url = "https://krishnazolpatil.com";
    const img = `${url}/og-image.jpg`;

    // Title
    document.title = title;

    const setMeta = (sel, attr, val) => {
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      el.setAttribute(attr, val);
    };

    // Core meta
    setMeta('meta[name="description"]', "name", "description");
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[name="keywords"]', "name", "keywords");
    setMeta('meta[name="keywords"]', "content", "product designer India, UX designer Mumbai, SaaS design, AI product design, UI designer India, portfolio, Krishna Zolpatil");
    setMeta('meta[name="author"]', "name", "author");
    setMeta('meta[name="author"]', "content", "Krishna Zolpatil");
    setMeta('meta[name="robots"]', "name", "robots");
    setMeta('meta[name="robots"]', "content", "index, follow");
    setMeta('meta[name="theme-color"]', "name", "theme-color");
    setMeta('meta[name="theme-color"]', "content", dark ? "#0A0A0A" : "#F9F7F4");

    // Geo meta
    setMeta('meta[name="geo.region"]', "name", "geo.region");
    setMeta('meta[name="geo.region"]', "content", "IN-MH");
    setMeta('meta[name="geo.placename"]', "name", "geo.placename");
    setMeta('meta[name="geo.placename"]', "content", "Mumbai, Maharashtra, India");
    setMeta('meta[name="geo.position"]', "name", "geo.position");
    setMeta('meta[name="geo.position"]', "content", "19.0760;72.8777");
    setMeta('meta[name="ICBM"]', "name", "ICBM");
    setMeta('meta[name="ICBM"]', "content", "19.0760, 72.8777");

    // Open Graph
    setMeta('meta[property="og:type"]', "property", "og:type");
    setMeta('meta[property="og:type"]', "content", isProject ? "article" : "website");
    setMeta('meta[property="og:title"]', "property", "og:title");
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "property", "og:description");
    setMeta('meta[property="og:description"]', "content", desc);
    setMeta('meta[property="og:url"]', "property", "og:url");
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "property", "og:image");
    setMeta('meta[property="og:image"]', "content", img);
    setMeta('meta[property="og:locale"]', "property", "og:locale");
    setMeta('meta[property="og:locale"]', "content", "en_IN");
    setMeta('meta[property="og:site_name"]', "property", "og:site_name");
    setMeta('meta[property="og:site_name"]', "content", "Krishna Zolpatil");

    // Twitter Card
    setMeta('meta[name="twitter:card"]', "name", "twitter:card");
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title");
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description");
    setMeta('meta[name="twitter:description"]', "content", desc);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image");
    setMeta('meta[name="twitter:image"]', "content", img);
    setMeta('meta[name="twitter:creator"]', "name", "twitter:creator");
    setMeta('meta[name="twitter:creator"]', "content", "@krishnazolpatil");

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = url;

    // JSON-LD structured data
    const schema = isProject ? {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": page.title,
      "description": page.desc,
      "author": { "@type": "Person", "name": "Krishna Zolpatil", "url": url },
    } : {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Krishna Zolpatil",
      "jobTitle": "Product Designer",
      "url": url,
      "email": "krishna.zolpatil@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://www.linkedin.com/in/krishnazolpatil/",
        "https://github.com/krishnazolpatil",
        "https://x.com/krishnazolpatil",
        "https://instagram.com/krishna.ux"
      ],
      "knowsAbout": ["Product Design", "UX Design", "SaaS", "AI Product Design", "Design Systems"],
    };

    let ld = document.querySelector('#ld-json');
    if (!ld) { ld = document.createElement("script"); ld.type = "application/ld+json"; ld.id = "ld-json"; document.head.appendChild(ld); }
    ld.textContent = JSON.stringify(schema);

  }, [page, dark]);

  return null;
});

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { crashed: false }; }
  static getDerivedStateFromError() { return { crashed: true }; }
  componentDidCatch(err, info) { console.error("[Portfolio]", err, info.componentStack); }
  render() {
    if (this.state.crashed) return this.props.fallback || (
      <div className="wrap" style={{ paddingTop: 24, paddingBottom: 24, color: "#787470", fontSize: "0.8rem" }}>
        ⚠ This section could not be displayed.
      </div>
    );
    return this.props.children;
  }
}

function useFade() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); o.disconnect(); } },
      { threshold: 0.07, rootMargin: "0px 0px -24px 0px" }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, on];
}

const F = memo(function F({ children, d = 0, className = "", style = {} }) {
  const [ref, on] = useFade();
  return (
    <div ref={ref} style={{ animationDelay: `${d}ms`, opacity: on ? undefined : 0, ...style }}
      className={`${on ? "fu" : ""} ${className}`}>{children}</div>
  )
});

/* ── DATA ── */


const PROJECTS = [
  { id: "workflow", n: "01", tag: "Workflow Tool", title: "Workflow Tool — Home & Action Page", short: "Redesigning the core dashboard to reduce friction through progressive disclosure.", desc: "Redesigned the core home dashboard and action page, reducing friction and improving task discovery through progressive disclosure and intelligent defaults.", chips: ["UX Research", "Dashboard Design", "IA"], Icon: Zap, role: "Senior Product Designer", timeline: "8 weeks", team: "1 Designer · 2 Eng · 1 PM", outcomes: ["Reduced time-to-first-action by 40%", "Increased daily active usage by 22%", "Simplified navigation from 9 items to 4"], overview: "This project focused on simplifying the most-used surface of a workflow tool — the home dashboard. Users were overwhelmed by the density of actions and struggled to find what mattered most." },
  { id: "comments", n: "02", tag: "Collaboration", title: "Comments Feature", short: "In-context commenting enabling real-time team collaboration.", desc: "Designed an in-context commenting system enabling real-time collaboration — focused on thread clarity, notification design, and feeling native to the product.", chips: ["Feature Design", "Interaction Design", "Prototyping"], Icon: MessageSquare, role: "Senior Product Designer", timeline: "5 weeks", team: "1 Designer · 1 Eng · 1 PM", outcomes: ["Eliminated 60% of Slack back-and-forth", "Reduced review cycle time by 35%", "Adopted by 80% of teams in month one"], overview: "Teams needed a way to discuss work without leaving the product. The comments feature brought conversation into context — directly on the objects that matter." },
  { id: "monetisation", n: "03", tag: "Monetisation", title: "Subscriptions, Teams & Stripe", short: "End-to-end UX for subscriptions, team management and Stripe payments.", desc: "Led UX and UI for subscriptions, team management, and Stripe integration. Mapped payment flows, upgrade paths, and billing edge cases with engineers.", chips: ["SaaS UX", "Payment Flows", "Dev Collab"], Icon: CreditCard, role: "Senior Product Designer", timeline: "12 weeks", team: "1 Designer · 3 Eng · 1 PM", outcomes: ["94% checkout completion rate", "Reduced billing support tickets by 50%", "Launched subscriptions, teams and per-seat pricing"], overview: "Enabling monetisation required designing for trust. Every step — from plan selection to payment confirmation — needed to feel safe, clear, and frictionless." },
  { id: "ai-platform", n: "04", tag: "AI Platform", title: "Agentic AI for Manufacturing Estimates", short: "UX for an AI platform automating cost estimation in manufacturing.", desc: "UX and UI for an agentic AI platform automating manufacturing cost estimation. Designed for trust, transparency, and AI output legibility using Google Stitch & AI Studio.", chips: ["AI/ML UX", "Google Stitch", "B2B SaaS"], Icon: Bot, role: "Senior Product Designer", timeline: "10 weeks", team: "1 Designer · 4 Eng · 1 PM", outcomes: ["Estimate time from days to minutes", "Designed explainability layer for AI outputs", "Shipped with Google Stitch + AI Studio"], overview: "Manufacturing teams spend weeks on cost estimates manually. This agentic AI platform automates the process — but the UX challenge was making AI outputs feel trustworthy and auditable." },
  { id: "landing", n: "05", tag: "Marketing", title: "Landing Page Design", short: "Conversion-focused landing page with a full redesign iteration.", desc: "Designed a conversion-focused landing page then led a full redesign iteration — balancing storytelling with hierarchy and clear CTAs.", chips: ["Landing Page", "Visual Design", "Brand"], Icon: Globe, role: "Senior Product Designer", timeline: "3 weeks", team: "1 Designer · 1 Eng", outcomes: ["Increased conversion rate by 38%", "Reduced bounce rate by 25%", "Improved above-the-fold clarity"], overview: "The original landing page wasn't converting. A full audit revealed misaligned messaging, weak hierarchy, and a CTA buried below the fold. The redesign addressed all three." },
];

const SKILLS = [
  { Icon: Palette, name: "Visual Design", tags: ["Figma", "Design Systems", "Typography", "Color Theory"] },
  { Icon: Brain, name: "UX Research", tags: ["User Interviews", "Usability Testing", "Journey Mapping"] },
  { Icon: MousePointer, name: "Interaction Design", tags: ["Prototyping", "Micro-interactions", "Motion"] },
  { Icon: Lightbulb, name: "Product Thinking", tags: ["Roadmapping", "Prioritisation", "Dev Handoff"] },
  { Icon: Bot, name: "AI Product Design", tags: ["AI UX", "Google AI Studio", "Agent Design"] },
  { Icon: Layers, name: "Design Systems", tags: ["Component Libraries", "Tokens", "Docs"] },
];

const RESOURCES = [
  { Icon: ExternalLink, type: "Figma Community", name: "Free Design Assets", desc: "UI kits, icon sets, and design system components for the community.", cta: "Open in Figma", href: "#" },
  { Icon: Sparkles, type: "Writing", name: "Design Thinking & Notes", desc: "Essays on product design, AI UX, craft, and what makes things good.", cta: "Read articles", href: "#" },
];

const MEDIA = [
  { type: "photo", emoji: "📷", label: "Street, Mumbai", caption: "Finding geometry in chaos" },
  { type: "photo", emoji: "🌅", label: "Golden Hour", caption: "Light that lasts 10 minutes" },
  { type: "video", emoji: "🎬", label: "Short Film", caption: "Visual essays in motion" },
  { type: "photo", emoji: "🏙️", label: "Architecture", caption: "Lines, shadows, structure" },
  { type: "video", emoji: "📽️", label: "Product Reel", caption: "Design in motion" },
];

const Slideshow = memo(function Slideshow({ items, dark, T, renderItem, interval = 4000 }) {
  const { bdr, mid } = T;
  const [idx, setIdx] = useState(0);
  const [vis, setVis] = useState(true);
  const mounted = useRef(true);
  const fadeTimer = useRef(null);
  const len = items.length;

  useEffect(() => { mounted.current = true; return () => { mounted.current = false; clearTimeout(fadeTimer.current); }; }, []);

  const go = useCallback((n) => {
    setVis(false);
    clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => { if (mounted.current) { setIdx(n); setVis(true); } }, 180);
  }, []);

  const prev = useCallback(() => { const n = (idx - 1 + len) % len; go(n); setIdx(n); }, [go, idx, len]);
  const next = useCallback(() => { const n = (idx + 1) % len; go(n); setIdx(n); }, [go, idx, len]);

  useEffect(() => {
    const t = setInterval(() => {
      if (mounted.current) setIdx(cur => { const n = (cur + 1) % len; go(n); return n; });
    }, interval);
    return () => clearInterval(t);
  }, [go, interval, len]);

  return (
    <ErrorBoundary>
      <div>
        <div style={{ opacity: vis ? 1 : 0, transition: "opacity 0.18s ease" }}>
          {renderItem(items[idx], idx)}
        </div>
        <div className="slide-controls">
          <div className="slide-dots">
            {items.map((_, k) => (
              <button key={k} onClick={() => go(k)} className="slide-dot"
                style={{ width: k === idx ? 24 : 5, background: dark ? "#2A2A2A" : "#DDD9D2", overflow: "hidden", position: "relative" }}>
                {k === idx && (
                  <span style={{
                    position: "absolute", inset: 0, background: dark ? "#EDEAE6" : "#18140E",
                    animation: `dotProgress ${interval}ms linear forwards`,
                    transformOrigin: "left center"
                  }} />
                )}
              </button>
            ))}
          </div>
          <div className="slide-arrows">
            {[{ fn: prev, Ic: ChevronLeft }, { fn: next, Ic: ChevronRight }].map(({ fn, Ic }, k) => (
              <button key={k} onClick={fn} className="slide-arrow"
                style={{ borderColor: bdr, color: mid }}>
                <Ic style={{ width: 13, height: 13 }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
});

const ProjectPage = memo(function ProjectPage({ p, dark, onBack, T, exiting }) {
  const { bg, bg2, bdr, txt, mid, sub } = T;
  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!p) return (
    <div className="wrap" style={{ paddingTop: 48, paddingBottom: 48, color: mid, fontSize: "0.9rem" }}>
      Project not found.{" "}
      <button onClick={onBack} style={{ color: "var(--accent-fg)", background: "none", border: "none", cursor: "pointer" }}>Go back</button>
    </div>
  );

  return (
    <div className={`proj-page ${exiting ? "page-exit" : "page-enter"}`} style={{ background: bg, color: txt }}>

      <div className="proj-topbar" style={{ background: dark ? "rgba(10,10,10,0.92)" : "rgba(249,247,244,0.92)", borderBottomColor: bdr }}>
        <button onClick={onBack} className="proj-back-btn" style={{ borderColor: bdr, color: mid }}>
          <ArrowLeft style={{ width: 12, height: 12 }} /> Back to portfolio
        </button>
      </div>

      <div className="proj-hero" style={{ background: `linear-gradient(145deg,${dark ? "#111" : "#EEE"} 0%,${bg} 100%)`, borderBottomColor: bdr }}>
        <div className="proj-hero-inner">
          <span className="proj-hero-tag">{p.tag}</span>
          <h1 className="f proj-hero-h1" style={{ color: txt }}>{p.title}</h1>
          <p className="proj-hero-desc" style={{ color: mid }}>{p.desc}</p>
        </div>
      </div>

      <div className="proj-meta" style={{ background: bg2, borderBottomColor: bdr }}>
        <div className="proj-meta-inner">
          {[["Role", p.role], ["Timeline", p.timeline], ["Team", p.team]].map(([k, v]) => (
            <div key={k}>
              <p className="proj-meta-label" style={{ color: mid }}>{k}</p>
              <p className="proj-meta-val" style={{ color: txt }}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="proj-body">
        <div className="proj-hero-img" style={{ background: dark ? "#111" : "#EEE", borderColor: bdr }}>
          <p style={{ fontSize: "0.75rem", color: mid, letterSpacing: "0.08em" }}>Project hero image — replace me</p>
        </div>

        <div className="proj-section">
          <span className="proj-section-label">Overview</span>
          <p className="proj-overview" style={{ color: txt }}>{p.overview}</p>
        </div>

        <div className="proj-divider" style={{ background: bdr }} />

        <div className="proj-section">
          <span className="proj-section-label">Outcomes</span>
          <div className="outcomes-list">
            {p.outcomes.map((o, i) => (
              <div key={i} className="outcome-item" style={{ background: bg2, borderColor: bdr }}>
                <span className="outcome-dot" />
                <span className="outcome-txt" style={{ color: txt }}>{o}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="proj-divider" style={{ background: bdr }} />

        {["Problem", "Process", "Solution", "Learnings"].map(s => (
          <div key={s} className="case-block">
            <span className="proj-section-label">{s}</span>
            <div className="case-placeholder" style={{ background: bg2, borderColor: bdr }}>
              <p style={{ color: mid }}>✏️ Edit this into your {s.toLowerCase()} section.</p>
            </div>
          </div>
        ))}

        <span className="proj-section-label">Screens & Artefacts</span>
        <div className="screens-grid">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="screen-item" style={{ background: bg2, borderColor: bdr }}>
              <p style={{ color: sub }}>Screen {n}</p>
            </div>
          ))}
        </div>

        <div className="proj-footer" style={{ borderTopColor: bdr }}>
          <button onClick={onBack} className="proj-back-btn" style={{ borderColor: bdr, color: mid }}>
            <ArrowLeft style={{ width: 12, height: 12 }} /> Back to portfolio
          </button>
        </div>
      </div>
    </div>
  );
});

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [menu, setMenu] = useState(false);
  const [topBtn, setTop] = useState(false);
  const [page, setPage] = useState(null);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let ticking = false;
    const fn = () => { if (!ticking) { requestAnimationFrame(() => { setTop(window.scrollY > 400); ticking = false; }); ticking = true; } };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const fn = () => setMenu(false);
    window.addEventListener("scroll", fn, { once: true, passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [menu]);

  const T = useMemo(() => ({
    bg: dark ? "#0A0A0A" : "#F9F7F4",
    bg2: dark ? "#111111" : "#F1EEE9",
    bg3: dark ? "#171717" : "#E8E4DE",
    bdr: dark ? "#202020" : "#DDD9D2",
    txt: dark ? "#EDEAE6" : "#18140E",
    mid: dark ? "#787470" : "#6A635A",
    sub: dark ? "#383430" : "#C2BDB6",
  }), [dark]);
  const { bg, bg2, bg3, bdr, txt, mid, sub } = T;

  const scrollTo = useCallback((id) => { setMenu(false); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 40); }, []);
  const goTop = useCallback(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);
  const toggleDark = useCallback(() => setDark(d => !d), []);
  const openPage = useCallback((id) => {
    document.body.style.background = dark ? "#0A0A0A" : "#F9F7F4";
    setExiting(true);
    setTimeout(() => { setPage(id); setExiting(false); window.scrollTo(0, 0); }, 220);
  }, [dark]);
  const closePage = useCallback(() => {
    document.body.style.background = dark ? "#0A0A0A" : "#F9F7F4";
    setExiting(true);
    setTimeout(() => { setPage(null); setExiting(false); window.scrollTo(0, 0); }, 220);
  }, [dark]);

  if (page) {
    const proj = PROJECTS.find(p => p.id === page);
    return (
      <ErrorBoundary>
        <><Styles /><SEO page={proj} dark={dark} /><Cursor dark={dark} /><ProjectPage p={proj} dark={dark} onBack={closePage} T={T} exiting={exiting} /></>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <>
        <Styles />
        <SEO page={null} dark={dark} />
        <Cursor dark={dark} />
        <div className={`page ${dark ? "page-dark" : ""} ${exiting ? "page-exit" : ""}`} style={{ background: bg, color: txt }}>

          {/* ══ NAV ══ */}
          <nav className="nav wrap" style={{ background: dark ? "rgba(10,10,10,0.92)" : "rgba(249,247,244,0.92)", borderBottom: `1px solid ${bdr}` }}>
            <div className="nav-inner" style={{ width: "100%" }}>
              <button className="nav-logo f" style={{ color: txt }} onClick={goTop}>Krishna Zolpatil</button>

              <div className="nav-links">
                {["projects", "skills", "about", "resources"].map(l => (
                  <button key={l} className="nav-link" style={{ color: mid }}
                    onMouseEnter={e => e.target.style.color = txt}
                    onMouseLeave={e => e.target.style.color = mid}
                    onClick={() => scrollTo(l)}>{l}</button>
                ))}
                <span className="nav-div" style={{ background: bdr }} />
                <button className="nav-icon-btn" style={{ borderColor: bdr, color: mid }} onClick={toggleDark}>
                  {dark ? <Sun style={{ width: 13, height: 13 }} /> : <Moon style={{ width: 13, height: 13 }} />}
                </button>
                <button className="nav-cta" onClick={() => scrollTo("contact")}>Say hello →</button>
              </div>

              <div className="nav-mobile">
                <button className="nav-mob-icon nav-icon-btn" style={{ borderColor: bdr, color: mid }} onClick={toggleDark}>
                  {dark ? <Sun style={{ width: 12, height: 12 }} /> : <Moon style={{ width: 12, height: 12 }} />}
                </button>
                <button className="nav-mob-menu" style={{ color: txt }} onClick={() => setMenu(!menu)}>
                  {menu ? <X style={{ width: 18, height: 18 }} /> : <Menu style={{ width: 18, height: 18 }} />}
                </button>
              </div>
            </div>
          </nav>

          {menu && (
            <div className="mob-dropdown" style={{ background: bg, borderBottom: `1px solid ${bdr}` }}>
              <div className="wrap mob-dropdown-inner">
                {["projects", "skills", "about", "resources"].map(l => (
                  <button key={l} className="mob-nav-link" style={{ color: mid }} onClick={() => scrollTo(l)}>{l}</button>
                ))}
                <button className="mob-cta" onClick={() => scrollTo("contact")}>Say hello →</button>
              </div>
            </div>
          )}

          {/* ══ HERO ══ */}
          <div className="wrap hero-wrap">
            {/* Centered text block */}
            <div className="hero-top">
              <F>
                <div className="avail-dot-wrap" style={{ background: bg2, borderColor: bdr }}>
                  <span className="bk" />
                  <span className="hero-badge-txt" style={{ color: mid }}>Available for opportunities</span>
                </div>
              </F>
              <F d={60}>
                <h1 className="f h-xl hero-h1" style={{ color: txt }}>
                  Designing products<br /><span style={{ fontStyle: "italic" }} className="txt-accent-fg">people love to use.</span>
                </h1>
              </F>
              <F d={130}>
                <p className="body hero-sub" style={{ color: mid }}>
                  I'm Krishna, a product designer focused on craft, clarity, and shipping things that actually work. SaaS tools, AI platforms, zero-to-one products.
                </p>
              </F>
              <F d={190}>
                <div className="hero-btns">
                  <button className="btn-primary" style={{ background: txt, color: bg }} onClick={() => scrollTo("projects")}>
                    View my work <ArrowRight style={{ width: 14, height: 14 }} />
                  </button>
                  <button className="btn-outline" style={{ color: txt, borderColor: bdr }} onClick={() => scrollTo("contact")}>
                    Get in touch
                  </button>
                </div>
              </F>
            </div>

            <F d={240}>
              <div className="stats-row" style={{ borderTopColor: bdr }}>
                {[["4+", "Years shipping product"], ["300+", "Designs shipped"], ["10+", "AI-powered tools designed"]].map(([n, l]) => (
                  <div key={l} className="stat-item">
                    <p className="f stat-n" style={{ color: txt }}>{n}</p>
                    <p className="stat-l" style={{ color: mid }}>{l}</p>
                  </div>
                ))}
              </div>
            </F>
          </div>



          {/* ══ PROJECTS ══ */}
          <section id="projects" aria-label="Selected Projects">
            <div className="wrap sec">
              <F>
                <div className="sec-head">
                  <div>
                    <span className="sec-label">Selected work</span>
                  </div>
                  <p className="small sec-sub" style={{ color: mid }}>End-to-end design — zero-to-one features to full platform redesigns.</p>
                </div>
              </F>
              <div className="g-proj">
                {PROJECTS.map((p, i) => (
                  <F key={p.id} d={i * 50}>
                    <div className="card card-hover dark-glow-card" style={{ background: bg2, borderColor: bdr, overflow: "hidden", cursor: "pointer" }}
                      onClick={() => openPage(p.id)}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = dark ? "rgba(232,228,222,0.22)" : "rgba(24,20,14,0.18)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = bdr; }}>
                      <div className="proj-img" style={{ background: dark ? "#151515" : "#E8E4DE" }}>
                        <div className="proj-img-overlay" style={{ background: `radial-gradient(circle at 25% 55%, ${A}12 0%, transparent 55%)` }} />
                        <div className="proj-img-overlay" style={{ backgroundImage: `linear-gradient(${A}04 1px,transparent 1px),linear-gradient(90deg,${A}04 1px,transparent 1px)`, backgroundSize: "28px 28px" }} />
                        <div className="proj-img-placeholder" style={{ zIndex: 1 }}>
                          <div className="icon-box icon-box-sm" style={{ background: A + "18", border: `1px solid ${A}28` }}>
                            <p.Icon style={{ width: 16, height: 16 }} />
                          </div>
                          <span style={{ fontSize: "0.58rem", color: mid, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 8 }}>Replace with project image</span>
                        </div>
                        <span className="proj-badge tag" style={{ background: bg3, color: mid, borderColor: bdr }}>{p.tag}</span>
                        <span className="proj-num" style={{ color: sub }}>{p.n}</span>
                      </div>
                      <div className="proj-info">
                        <h3 className="proj-title" style={{ color: txt }}>{p.title}</h3>
                        <p className="proj-desc" style={{ color: mid }}>{p.short}</p>
                        <div className="proj-foot">
                          <div className="proj-chips">
                            {p.chips.map(c => <span key={c} className="chip" style={{ borderColor: bdr, color: mid }}>{c}</span>)}
                          </div>
                          <span className="proj-view">View <ArrowUpRight style={{ width: 11, height: 11 }} /></span>
                        </div>
                      </div>
                    </div>
                  </F>
                ))}
              </div>
            </div>
          </section>

          {/* ══ SKILLS ══ */}
          <section id="skills" aria-label="Skills and expertise" style={{ background: bg2, borderTop: `1px solid ${bdr}`, borderBottom: `1px solid ${bdr}` }}>
            <div className="wrap sec">
              <F>
                <span className="sec-label">What I bring</span>
                <h2 className="f h-lg sec-title" style={{ color: txt, marginBottom: 44 }}>Skills &amp; <span className="txt-italic">craft</span></h2>
              </F>
              <div className="g-sk">
                {SKILLS.map((s, i) => (
                  <F key={s.name} d={i * 45}>
                    <div className="skill-card" style={{ background: bg3, borderColor: bdr }}>
                      <div className="skill-icon" style={{ background: A + "14" }}><s.Icon style={{ width: 16, height: 16 }} /></div>
                      <p className="skill-name" style={{ color: txt }}>{s.name}</p>
                      <div className="skill-tags">
                        {s.tags.map(t => <span key={t} className="skill-tag" style={{ background: dark ? "#1C1C1C" : "#E0DCD6", color: mid }}>{t}</span>)}
                      </div>
                    </div>
                  </F>
                ))}
              </div>
            </div>
          </section>

          {/* ══ ABOUT ══ */}
          <section id="about" aria-label="About Krishna Zolpatil">
            <div className="wrap sec">
              <F>
                <span className="sec-label">About me</span>
                <h2 className="f h-lg sec-title" style={{ color: txt, marginBottom: 44 }}>Designer, photographer, <span className="txt-italic">storyteller.</span></h2>
              </F>

              <F d={40}>
                <div className="about-unified" style={{ background: bg2, borderColor: bdr }}>
                  <div className="about-layout">

                    {/* Photo column */}
                    <div className="about-photo" style={{ borderColor: bdr }}>
                      <img src="/my-portfolio/about-photo.jpg" alt="Krishna Zolpatil" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", filter: "grayscale(100%)" }} />
                      <span className="about-photo-label" style={{ color: "rgba(255,255,255,0.6)" }}>Krishna Zolpatil</span>
                    </div>

                    {/* Content column */}
                    <div className="about-content" style={{ borderLeftColor: bdr, borderTopColor: bdr }}>
                      <div className="about-bio">
                        <div className="about-avatar" style={{ background: A + "1A" }}>
                          <span className="f" style={{ fontSize: "1rem", color: "var(--accent-fg)" }}>KZ</span>
                        </div>
                        <p className="about-name" style={{ color: txt }}>Krishna Zolpatil</p>
                        <p className="body about-body" style={{ color: txt }}>
                          Hi, I&#39;m Krishna. I got into design out of curiosity. I wanted to understand why some products feel effortless and others feel like a fight. Years later I&#39;m still asking the same question, just with more tools and better taste. I work on SaaS products, AI platforms, and zero-to-one builds. Anywhere the problem is interesting and the craft actually matters.
                        </p>
                        <div className="about-quote">
                          <span className="about-quote-mark" style={{ color: txt }}>&ldquo;</span>
                          <p className="about-quote-text" style={{ color: txt }}>
                            Wonder is the beginning of wisdom.
                          </p>
                          <p className="about-quote-attr" style={{ color: mid }}>Aristotle</p>
                        </div>
                        <div className="about-stats" style={{ borderTopColor: bdr }}>
                          {[["4+", "Years shipping"], ["10+", "AI tools designed"]].map(([n, l]) => (
                            <div key={l}>
                              <p className="about-stat-n">{n}</p>
                              <p className="about-stat-l" style={{ color: mid }}>{l}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Hobbies slideshow inline */}
                      <div className="about-hobbies" style={{ borderTopColor: bdr }}>
                        <div className="about-hobbies-label" style={{ color: mid }}>
                          <span>Also, I point cameras at things.</span>
                        </div>
                        <Slideshow items={MEDIA} dark={dark} T={T} interval={7000}
                          renderItem={(slide) => (
                            <div className="card-sm" style={{ background: dark ? "#111" : "#E4E0DA", borderColor: bdr, overflow: "hidden" }}>
                              <div className="slide-img" style={{
                                background: slide.type === "photo"
                                  ? `linear-gradient(140deg,${dark ? "#151515" : "#E4E0DA"} 0%,${dark ? "#1C1C1C" : "#D8D4CE"} 100%)`
                                  : `linear-gradient(140deg,${dark ? "#0A1220" : "#D8E0ED"} 0%,${dark ? "#101A2C" : "#C0CCE0"} 100%)`
                              }}>
                                <span className="slide-emoji">{slide.emoji}</span>
                                <span className="slide-hint" style={{ color: dark ? "#555" : "#999" }}>Image placeholder — replace in Cursor</span>
                              </div>
                              <div className="slide-caption">
                                <div>
                                  <span className="slide-type">{slide.type === "photo" ? "Photography" : "Videography"}</span>
                                  <p className="f slide-label" style={{ color: txt }}>{slide.label}</p>
                                </div>
                                <p className="slide-sub" style={{ color: mid }}>{slide.caption}</p>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </F>
            </div>
          </section>



          {/* ══ RESOURCES ══ */}
          <section id="resources" aria-label="Free resources and writing" style={{ background: bg2, borderTop: `1px solid ${bdr}`, borderBottom: `1px solid ${bdr}` }}>
            <div className="wrap sec">
              <F>
                <span className="sec-label">Sandbox</span>
                <h2 className="f h-lg sec-title" style={{ color: txt, marginBottom: 44 }}>Design explorations, <span className="txt-italic">and things I've shared.</span></h2>
              </F>
              <F d={40}>
                <div className="res-list" style={{ borderColor: bdr }}>
                  {RESOURCES.map((r, i) => (
                    <a key={r.name} href={r.href} className="res-row"
                      style={{ background: "transparent", borderBottomColor: bdr }}
                      onMouseEnter={e => e.currentTarget.style.background = dark ? "#1A1A1A" : "#E4E0DA"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <div className="res-row-left">
                        <div className="res-row-icon" style={{ background: A + "14", color: "var(--accent-fg)" }}>
                          <r.Icon style={{ width: 15, height: 15 }} />
                        </div>
                        <div>
                          <p className="res-row-type" style={{ color: mid }}>{r.type}</p>
                          <p className="res-row-name" style={{ color: txt }}>{r.name}</p>
                        </div>
                      </div>
                      <span className="res-row-cta" style={{ color: "var(--accent-fg)" }}>
                        {r.cta} <ArrowRight style={{ width: 11, height: 11 }} />
                      </span>
                    </a>
                  ))}
                </div>
              </F>
            </div>
          </section>

          {/* ══ CONTACT ══ */}
          <section id="contact" aria-label="Contact Krishna Zolpatil" className="contact-sec">
            <div className="contact-glow" style={{ background: dark ? `radial-gradient(circle,rgba(255,255,255,0.03) 0%,transparent 65%)` : `radial-gradient(circle,#0000FF22 0%,transparent 65%)` }} />
            <div className="contact-line-t" style={{ background: dark ? `linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)` : `linear-gradient(90deg,transparent,#0000FF60,transparent)` }} />
            <div className="wrap contact-inner">
              <F>
                <div className="contact-badge" style={{ borderColor: bdr, background: bg2 }}>
                  <Sparkles style={{ width: 11, height: 11, color: A }} />
                  <span className="contact-badge-txt" style={{ color: mid }}>Open to new work</span>
                </div>
              </F>
              <F d={50}>
                <h2 className="f contact-h2" style={{ color: txt }}>
                  Let's build<br /><span style={{ fontStyle: "italic" }}>great things.</span>
                </h2>
              </F>
              <F d={110}>
                <p className="body contact-sub" style={{ color: mid }}>
                  I'm open to full-time roles, freelance work, and interesting conversations. Have a brief or just an idea — I'd love to hear it.
                </p>
              </F>
              <F d={165}>
                <a href="mailto:krishna.zolpatil@gmail.com"
                  className="contact-email contact-email-glow"
                  style={{ background: dark ? "#1A1AFF" : "#0000CC" }}>
                  <Mail style={{ width: 16, height: 16 }} /> krishna.zolpatil@gmail.com
                </a>
              </F>
              <F d={210}>
                <div className="socials">
                  {[
                    { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/krishnazolpatil/" },
                    { Icon: Github, label: "GitHub", href: "https://github.com/krishnazolpatil" },
                    { Icon: Instagram, label: "Instagram", href: "https://instagram.com/krishna.ux" },
                    { Icon: Twitter, label: "Twitter / X", href: "https://x.com/krishnazolpatil" },
                  ].map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="social-link" style={{ borderColor: bdr, color: mid }}
                      onMouseEnter={e => e.currentTarget.style.color = txt}
                      onMouseLeave={e => e.currentTarget.style.color = mid}>
                      <s.Icon style={{ width: 13, height: 13 }} /> {s.label}
                    </a>
                  ))}
                  <a href="#" className="social-link cv-link"
                    style={{ borderColor: bdr, color: mid }}
                    onMouseEnter={e => { e.currentTarget.style.color = txt; }}
                    onMouseLeave={e => { e.currentTarget.style.color = mid; }}>
                    <FileText style={{ width: 13, height: 13 }} /> Download CV
                  </a>
                </div>
              </F>
            </div>
            <div className="contact-line-b" style={{ background: dark ? `linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)` : `linear-gradient(90deg,transparent,#0000FF30,transparent)` }} />
          </section>

          {/* ══ FOOTER ══ */}
          <div className="wrap footer">
            <span className="f footer-name" style={{ color: mid }}>Krishna Zolpatil</span>
            <span className="footer-copy" style={{ color: sub }}>© 2025 · Designed with care</span>
          </div>

          {topBtn && (
            <button className="back-top" onClick={goTop}>
              <ChevronUp style={{ width: 14, height: 14, color: "#fff" }} />
            </button>
          )}

        </div>
      </>
    </ErrorBoundary>
  );
}