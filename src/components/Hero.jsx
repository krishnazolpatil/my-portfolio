import FadeIn from "./FadeIn";
const F = FadeIn;
import { ArrowDown } from "lucide-react";

export function Hero({ dark, scrollTo, T }) {
  const { txt, mid, sub, bdr, ac, bg2 } = T;
  const A = "var(--accent)";

  return (
    <div className="wrap hero">
      <F>
        <div className="status-badge" style={{ borderColor: bdr, background: bg2 }}>
          <div className="status-dot">
            <div className="dot-core" style={{ background: A }}></div>
            <div className="dot-pulse" style={{ background: A }}></div>
          </div>
          <span className="status-txt" style={{ color: mid }}>Available for freelance</span>
        </div>
      </F>

      <F d={40}>
        <h1 className="f h-xl split-text" style={{ color: txt }}>
          Crafting digital<br />
          <span style={{ color: sub, fontStyle: "italic", fontWeight: 400 }}>experiences.</span>
        </h1>
      </F>

      <F d={100}>
        <p className="body sub-txt" style={{ color: mid }}>
          I'm a designer building products that blend utility with motion and visual craft.
          Currently crafting the future of web interfaces.
        </p>
      </F>

      <F d={160}>
        <div className="hero-actions">
          <button className="primary-btn" onClick={() => scrollTo('projects')} style={{ background: "var(--accent)", color: "var(--accent-fg)" }}>
            View Work
          </button>
          <button className="secondary-btn" onClick={() => scrollTo('about')} style={{ color: txt, borderColor: bdr, background: bg2 }}>
            About Me <ArrowDown style={{ width: 14, height: 14 }} />
          </button>
        </div>
      </F>

      <div className="hero-stats f">
        <F d={200}><div className="stat" style={{ color: mid }}><span style={{ color: txt }}>5+</span> Yrs Exp</div></F>
        <div className="stat-div" style={{ background: bdr }}></div>
        <F d={240}><div className="stat" style={{ color: mid }}><span style={{ color: txt }}>20+</span> Projects</div></F>
        <div className="stat-div" style={{ background: bdr }}></div>
        <F d={280}><div className="stat" style={{ color: mid }}><span style={{ color: txt }}>100%</span> Client Fit</div></F>
      </div>
    </div>
  );
}
