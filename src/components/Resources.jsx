import FadeIn from "./FadeIn";
const F = FadeIn;
import { ArrowRight } from "lucide-react";

export function Resources({ dark, T, RESOURCES }) {
  const { txt, mid, sub, bdr, ac, bg, bg2 } = T;
  const A = "var(--accent)";

  return (
    <section id="resources" aria-label="Resources & Articles">
      <div className="wrap sec">
        <F>
          <div className="res-header">
            <div>
              <span className="sec-label">Resources & Writing</span>
              <h2 className="f h-lg sec-title" style={{ color: txt, marginBottom: 8 }}>Sharing knowledge & <span className="txt-italic">tools.</span></h2>
              <p className="sec-desc" style={{ color: sub }}>Articles, design assets, and thoughts on the industry.</p>
            </div>
          </div>
        </F>
        <F d={40}>
          <div className="res-list">
            {RESOURCES.map((r, i) => (
              <a key={r.name} href="#" className="res-row" style={{ borderColor: bdr }}
                onMouseEnter={e => e.currentTarget.style.background = bg2}
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
  );
}
