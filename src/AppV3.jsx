import { useState, useEffect, useRef, useCallback, memo, Component } from "react";
import { X, Mail, ArrowUpRight, ArrowRight, Download,
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
const WORK = PROJECTS.filter(p => !p.side);
const SIDE = PROJECTS.filter(p => p.side);

const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "side", label: "Side projects" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
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

    html { scroll-behavior:smooth; overflow-x:clip; scroll-padding-top:104px; }
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

      --gut:clamp(16px,3.4vw,52px);
      --maxw:clamp(1120px, 88vw, 1760px);
      --edge:max(var(--gut), calc((100vw - var(--maxw)) / 2));

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

    .v4-page { opacity:0; transition:opacity 0.45s ease; }
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

    /* ── Nav: a sharp square bar, ruled off the page ── */
    .v4-nav { position:fixed; top:0; left:0; right:0; z-index:300;
              display:flex; align-items:center; justify-content:space-between;
              gap:20px; padding:12px var(--edge); border-radius:0;
              background:rgba(28,66,50,0.78);
              backdrop-filter:blur(14px) saturate(150%);
              -webkit-backdrop-filter:blur(14px) saturate(150%);
              border-bottom:1px solid var(--line);
              transition:background 0.3s ease; }
    .v4-nav.solid { background:rgba(15,36,28,0.94); }
    @supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))) {
      .v4-nav { background:rgba(15,36,28,0.96); }
    }
    .v4-navleft { display:flex; align-items:center; gap:clamp(12px,2.2vw,30px); min-width:0; }
    /* Square avatar, not a circle — the face sits high and left in the frame. */
    .v4-mark { display:flex; align-items:center; gap:10px; flex-shrink:0; }
    .v4-mark img { width:32px; height:32px; border-radius:0; object-fit:cover;
                   object-position:33% 28%; border:1px solid var(--line); flex-shrink:0; }
    .v4-mark span { font-family:var(--font-display); font-size:1rem; font-weight:600;
                    letter-spacing:-0.02em; white-space:nowrap; }
    .v4-navlinks { display:flex; align-items:center; gap:2px; }
    .v4-navlink { position:relative; padding:9px 14px; border-radius:0;
                  font-size:0.88rem; font-weight:450; color:var(--cream-2);
                  transition:color 0.16s, background 0.16s; }
    .v4-navlink:hover { color:var(--ink); background:var(--cream); }
    .v4-navlink.on { color:var(--cream); font-weight:550;
                     box-shadow:inset 0 -2px 0 var(--cream); }
    .v4-navlink.on:hover { color:var(--ink); }
    .v4-navright { display:flex; align-items:center; gap:10px; flex-shrink:0; }
    .v4-avail { display:inline-flex; align-items:center; gap:8px; font-size:0.82rem;
                color:var(--cream-2); white-space:nowrap; }
    .v4-avail i { width:7px; height:7px; border-radius:0; background:var(--cream);
                  flex-shrink:0; }

    /* ── Hero ── */
    .v4-hero { padding:clamp(132px,20vh,208px) var(--edge) clamp(56px,9vh,104px); }
    .v4-hero-inner { display:grid; grid-template-columns:auto 1fr; gap:clamp(20px,3vw,40px);
                     align-items:start; }
    .v4-hero-photo { width:clamp(96px,11vw,164px); height:clamp(96px,11vw,164px);
                     border-radius:0; object-fit:cover; object-position:33% 28%;
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
    .v4-sec-head { display:flex; align-items:baseline; justify-content:space-between;
                   gap:16px; flex-wrap:wrap;
                   padding-bottom:14px; margin-bottom:clamp(22px,3vh,34px);
                   border-bottom:1px solid var(--line); }
    .v4-sec-title { font-family:var(--font-display); font-weight:600;
                    font-size:clamp(1.5rem,2.6vw,2.4rem); letter-spacing:-0.03em; }
    .v4-sec-note { font-size:0.86rem; color:var(--cream-3); letter-spacing:0.06em;
                   text-transform:uppercase; font-weight:550; }

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
    /* No screenshot: the numeral carries the cell instead of a dead frame. */
    .v4-shot-none { position:absolute; inset:0; display:flex; flex-direction:column;
                    align-items:center; justify-content:center; gap:8px; padding:18px; }
    .v4-shot-none b { font-family:var(--font-display); font-size:3.4rem; font-weight:600;
                      letter-spacing:-0.06em; line-height:1; color:var(--line); }
    .v4-shot-none span { font-size:0.84rem; font-weight:550; letter-spacing:0.04em;
                         text-transform:uppercase; color:var(--cream-3); text-align:center; }
    .v4-card-foot { display:flex; align-items:center; justify-content:space-between;
                    gap:12px; padding:14px 16px; }
    .v4-card-t { font-family:var(--font-display); font-size:1.05rem; font-weight:600;
                 letter-spacing:-0.02em; line-height:1.25; }
    .v4-card-n { font-size:0.78rem; font-weight:600; letter-spacing:0.1em;
                 color:var(--cream-3); flex-shrink:0; }
    .v4-card-arrow { width:17px; height:17px; flex-shrink:0; color:var(--cream-2);
                     transition:transform 0.2s, color 0.2s; }
    .v4-card:hover .v4-card-arrow { transform:translate(2px,-2px); color:var(--cream); }

    /* ── Process: a ruled ledger, numbered ── */
    .v4-proc { display:grid; gap:0; border-top:1px solid var(--line-2); }
    .v4-proc-row { display:grid; grid-template-columns:64px minmax(0,1fr) minmax(0,1.5fr);
                   gap:clamp(12px,2vw,28px); align-items:baseline;
                   padding:clamp(16px,2.4vh,24px) 4px;
                   border-bottom:1px solid var(--line-2);
                   transition:background 0.18s; }
    .v4-proc-row:hover { background:rgba(15,36,28,0.4); }
    .v4-proc-n { font-size:0.78rem; font-weight:600; letter-spacing:0.12em;
                 color:var(--cream-3); }
    .v4-proc-t { font-family:var(--font-display); font-size:clamp(1rem,1.4vw,1.25rem);
                 font-weight:600; letter-spacing:-0.02em; }
    .v4-proc-d { font-size:0.94rem; line-height:1.6; color:var(--cream-2); }

    /* ── Contact ── */
    .v4-contact { display:grid; gap:clamp(20px,3vw,40px);
                  grid-template-columns:minmax(0,1.4fr) minmax(0,1fr); align-items:start; }
    .v4-contact-t { font-family:var(--font-display); font-weight:600;
                    font-size:clamp(1.8rem,4vw,3.4rem); line-height:1.02;
                    letter-spacing:-0.035em; text-wrap:balance; }
    .v4-contact-d { margin-top:16px; max-width:46ch; font-size:1rem; line-height:1.62;
                    color:var(--cream-2); }
    .v4-contact-actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:26px; }
    .v4-socials { display:flex; flex-wrap:wrap; gap:10px; }
    .v4-social { display:grid; place-items:center; width:48px; height:48px; border-radius:0;
                 border:1px solid var(--line); color:var(--cream-2);
                 transition:background 0.18s, color 0.18s, border-color 0.18s; }
    .v4-social:hover { background:var(--cream); color:var(--ink); border-color:var(--cream); }
    .v4-social svg { width:19px; height:19px; }

    /* ── Footer ── */
    .v4-foot { padding:clamp(24px,4vh,44px) var(--edge) clamp(28px,4vh,48px);
               border-top:1px solid var(--line); display:flex; flex-wrap:wrap;
               gap:12px; align-items:center; justify-content:space-between;
               font-size:0.85rem; color:var(--cream-3); }

    /* ── Case study sheet ── */
    .v4-scrim { position:fixed; inset:0; z-index:400; background:rgba(9,22,17,0.82);
                backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px);
                display:flex; align-items:flex-start; justify-content:center;
                padding:clamp(12px,4vh,52px) clamp(12px,3vw,32px); overflow-y:auto;
                animation:v4fade 0.22s ease; }
    @keyframes v4fade { from { opacity:0; } to { opacity:1; } }
    .v4-sheet { position:relative; width:min(1080px,100%); border-radius:0;
                background:var(--green); border:1px solid var(--cream);
                animation:v4rise 0.26s cubic-bezier(0.23,1,0.32,1); }
    @keyframes v4rise { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
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
    .v4-stack { margin-top:16px; display:flex; flex-wrap:wrap; gap:8px; }
    .v4-stack span { display:inline-flex; align-items:center; padding:6px 12px;
                     border:1px solid var(--line); border-radius:0; font-size:0.82rem;
                     color:var(--cream-2); }

    /* ── Responsive ── */
    @media (max-width:1080px) {
      .v4-avail { display:none; }
      .v4-contact { grid-template-columns:1fr; }
    }
    @media (max-width:920px) {
      .v4-navlinks { display:none; }
      .v4-hero-inner { grid-template-columns:1fr; }
      .v4-proc-row { grid-template-columns:48px 1fr; }
      .v4-proc-d { grid-column:2; }
    }
    @media (max-width:760px) {
      .v4-mark span { display:none; }
      .v4-btn { height:46px; padding:0 18px; font-size:0.9rem; }
      .v4-btn-sm { height:38px; padding:0 13px; font-size:0.82rem; }
      .v4-hero-actions .v4-btn { flex:1 1 auto; }
      .v4-title { max-width:none; }
    }
    @media (prefers-reduced-motion:reduce) {
      .v4-card:hover { transform:none; }
      .v4-scrim, .v4-sheet { animation:none; }
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
const Card = memo(function Card({ id, n, tag, title, onOpen }) {
  const [missing, setMissing] = useState(false);
  /* A cached image can finish decoding before React attaches onLoad, so settle
     it on attach rather than waiting for an event that has already fired. */
  const attach = useCallback(el => {
    if (el?.complete && !el.naturalWidth) setMissing(true);
  }, []);
  return (
    <button type="button" className="v4-card" onClick={onOpen}>
      <div className="v4-shot">
        {missing ? (
          <div className="v4-shot-none"><b>{n}</b><span>{tag}</span></div>
        ) : (
          <img ref={attach} src={`/work/${id}.png`} alt={`${title} screenshot`}
            loading="lazy" onError={() => setMissing(true)} />
        )}
      </div>
      <div className="v4-card-foot">
        <span className="v4-card-t">{title}</span>
        <span className="v4-card-n">{n}</span>
      </div>
    </button>
  );
});

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

const Sheet = memo(function Sheet({ project, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    /* Lock the page behind the sheet, and restore exactly what was there —
       the page may already have had an overflow set. */
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const shotsOf = block => (block.shots || []).filter(Boolean);
  const outcomeShots = (project.outcomes || [])
    .flatMap(o => (typeof o === "string" ? [] : o.shots || []));

  return (
    <div className="v4-scrim" onClick={onClose} role="presentation">
      <div className="v4-sheet" role="dialog" aria-modal="true"
        aria-label={project.title} tabIndex={-1} ref={ref}
        onClick={e => e.stopPropagation()}>
        <div className="v4-sheet-bar">
          <h2>{project.title}</h2>
          <button className="v4-close" onClick={onClose} aria-label="Close case study">
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
            {project.team && <div><dt>Team</dt><dd>{project.team}</dd></div>}
          </dl>

          {project.stack?.length > 0 && (
            <div className="v4-stack">
              {project.stack.map(s => <span key={s}>{s}</span>)}
            </div>
          )}

          {project.overview && (
            <div className="v4-block">
              <h3>Overview</h3>
              <p>{project.overview}</p>
            </div>
          )}

          {project.outcomes?.length > 0 && (
            <div className="v4-block">
              <h3>Outcomes</h3>
              <ul className="v4-list">
                {project.outcomes.map((o, i) => <Outcome key={i} item={o} />)}
              </ul>
              {outcomeShots.length > 0 && (
                <div className="v4-shots">
                  {outcomeShots.map(src => (
                    <img key={src} src={src} alt="" loading="lazy" />
                  ))}
                </div>
              )}
            </div>
          )}

          {project.caseStudy?.map(block => (
            <div className="v4-block" key={block.label}>
              <h3>{block.label}</h3>
              <p>{block.body}</p>
              {shotsOf(block).length > 0 && (
                <div className="v4-shots">
                  {shotsOf(block).map(src => (
                    <img key={src} src={src} alt="" loading="lazy" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

const ToolSheet = memo(function ToolSheet({ tool, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="v4-scrim" onClick={onClose} role="presentation">
      <div className="v4-sheet" role="dialog" aria-modal="true" aria-label={tool.name}
        tabIndex={-1} ref={ref} onClick={e => e.stopPropagation()}>
        <div className="v4-sheet-bar">
          <h2>{tool.name}</h2>
          <button className="v4-close" onClick={onClose} aria-label="Close">
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

  const openProject = useCallback(id => setOpen(id), []);
  const closeProject = useCallback(() => setOpen(null), []);
  const closeTool = useCallback(() => setTool(null), []);

  const current = open ? PROJECTS.find(p => p.id === open) : null;

  return (
    <ErrorBoundary>
      <Styles />
      <div className={`v4${ready ? " ready" : ""}`}>

        <div className="v4-grid" aria-hidden="true">
          <ShapeGrid direction="down" speed={0.35} squareSize={52}
            borderColor="rgba(240,233,217,0.10)" hoverFillColor="#0F241C" />
        </div>

        <header className={`v4-nav${solid ? " solid" : ""}`}>
          <div className="v4-navleft">
            <a href="#top" className="v4-mark">
              <img src="/about-photo.jpg" alt="" width="32" height="32" />
              <span>Krishna Zolpatil</span>
            </a>
            <nav className="v4-navlinks" aria-label="Sections">
              {NAV_LINKS.map(({ id, label }) => (
                <a key={id} href={`#${id}`} onClick={() => setActiveSec(id)}
                  className={`v4-navlink${activeSec === id ? " on" : ""}`}>{label}</a>
              ))}
            </nav>
          </div>
          <div className="v4-navright">
            <span className="v4-avail"><i />Available for work</span>
            <a className="v4-btn v4-btn-ghost v4-btn-sm" href="/resume.pdf"
              download="Krishna-Zolpatil-Resume.pdf">
              <Download /> Resume
            </a>
            <a className="v4-btn v4-btn-solid v4-btn-sm" href={MAILTO}>
              <Mail /> Get in touch
            </a>
          </div>
        </header>

        <div className="v4-page">
          <main id="top">

            <section className="v4-hero" aria-label="Introduction">
              <div className="v4-hero-inner">
                <img className="v4-hero-photo" src="/about-photo.jpg"
                  alt="Krishna Zolpatil" width="164" height="164" />
                <div>
                  <span className="v4-hi">Hi, I&rsquo;m Krishna</span>
                  <h1 className="v4-title">I design AI products people can trust.</h1>
                  <p className="v4-lede">
                    Senior Product Designer at Naya Studio. Four years, 200+ shipped
                    features. I design in Figma and build the prototypes in code.
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

            <Section id="work" title="Selected work" note={`${WORK.length} projects`}>
              <div className="v4-grid-work">
                {WORK.map(p => (
                  <Card key={p.id} id={p.id} n={p.n} tag={p.tag} title={p.title}
                    onOpen={() => openProject(p.id)} />
                ))}
              </div>
            </Section>

            <Section id="side" title="Side projects" note="Shipped solo">
              <div className="v4-grid-work">
                {SIDE.map(p => (
                  <Card key={p.id} id={p.id} n={p.n} tag={p.tag} title={p.title}
                    onOpen={() => openProject(p.id)} />
                ))}
                {BUILT.map(b => (
                  <button type="button" key={b.slug} className="v4-card"
                    onClick={() => setTool(b)}>
                    <div className="v4-shot">
                      <img src={`/work/${b.slug}.png`} alt={`${b.name} screenshot`}
                        loading="lazy" />
                    </div>
                    <div className="v4-card-foot">
                      <span className="v4-card-t">{b.name}</span>
                      <ArrowUpRight className="v4-card-arrow" />
                    </div>
                  </button>
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

            <Section id="contact" title="Get in touch" note="Available for work">
              <div className="v4-contact">
                <div>
                  <p className="v4-contact-t">Let&rsquo;s build something people trust.</p>
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
            </Section>
          </main>

          <footer className="v4-foot">
            <span>Also shipped: {ARCHIVE}</span>
            <span>© {new Date().getFullYear()} Krishna Zolpatil</span>
          </footer>
        </div>

        {current && <Sheet project={current} onClose={closeProject} />}
        {tool && <ToolSheet tool={tool} onClose={closeTool} />}
      </div>
    </ErrorBoundary>
  );
}
