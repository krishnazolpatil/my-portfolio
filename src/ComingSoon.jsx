/* The holding page. Same ground and accent as the portfolio, so the
   real site doesn't read as a different property when it lands. */
export default function ComingSoon() {
  return (
    <>
      <style>{`
        html, body { background:#0F171E; }
        .soon {
          --bg:#0F171E; --txt:#F2F6F9; --dim:#7C8B98; --acc:#00A8E1;
          /* flex, not grid — a centred grid track sizes to max-content and the
             headline overflows a phone instead of wrapping. */
          min-height:100svh; display:flex; align-items:center; justify-content:center;
          padding:clamp(24px,6vw,64px); background:var(--bg); color:var(--txt);
          font-family:'Spline Sans','Inter',system-ui,-apple-system,sans-serif;
          text-align:center; position:relative; overflow:hidden;
        }
        /* A soft cyan wash keeps the empty page from reading as a 404. */
        .soon::before {
          content:''; position:absolute; inset:auto 50% 0 auto;
          width:min(1100px,150vw); aspect-ratio:1; transform:translate(50%,42%);
          background:radial-gradient(circle, rgba(0,168,225,0.16), transparent 62%);
          pointer-events:none;
        }
        /* Plain block flow, not grid/flex — a centred grid track sizes itself to
           the headline's max-content, which pushes it off the side of a phone
           instead of wrapping. Block children just fill the width. */
        .soon-inner { position:relative; width:100%; max-width:720px; }
        .soon-dot {
          display:block; margin:0 auto 18px;
          width:8px; height:8px; border-radius:99px; background:var(--acc);
          box-shadow:0 0 0 0 rgba(0,168,225,0.5); animation:soon-pulse 2.4s ease-out infinite;
        }
        @keyframes soon-pulse {
          0%   { box-shadow:0 0 0 0 rgba(0,168,225,0.45); }
          70%  { box-shadow:0 0 0 16px rgba(0,168,225,0); }
          100% { box-shadow:0 0 0 0 rgba(0,168,225,0); }
        }
        .soon h1 {
          margin:0; font-family:'Playfair Display',Georgia,serif; font-weight:500;
          font-size:clamp(2rem,7vw,4rem); line-height:1.1; letter-spacing:-0.01em;
          text-wrap:balance;
        }
        .soon p { margin:14px 0 0; color:var(--dim);
                  font-size:clamp(0.95rem,2.4vw,1.05rem); }
        .soon a { color:var(--acc); text-decoration:none; }
        .soon a:hover { text-decoration:underline; }
        @media (prefers-reduced-motion:reduce) { .soon-dot { animation:none; } }
      `}</style>

      <main className="soon">
        <div className="soon-inner">
          <span className="soon-dot" aria-hidden="true" />
          <h1>Krishna is still cooking</h1>
          <p>
            New portfolio, in progress. Say hi in the meantime —{" "}
            <a href="mailto:krishna.zolpatil@gmail.com">krishna.zolpatil@gmail.com</a>
          </p>
        </div>
      </main>
    </>
  );
}
