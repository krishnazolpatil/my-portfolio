import FadeIn from "./FadeIn";
const F = FadeIn;
import { ArrowUpRight } from "lucide-react";

export function Projects({ dark, openPage, T, PROJECTS }) {
  const { txt, mid, sub, bdr, ac, bg, bg2 } = T;
  const A = "var(--accent)";

  return (
    <section id="projects" aria-label="Selected Projects">
      <div className="wrap sec">
        <F>
          <span className="sec-label">Selected Works</span>
          <h2 className="f h-lg sec-title" style={{ color: txt }}>Ideas brought to <span className="txt-italic">life.</span></h2>
          <p className="sec-desc" style={{ color: mid }}>A collection of projects bridging the gap between design and engineering.</p>
        </F>
        <div className="grid">
          {PROJECTS.map((p, i) => (
            <div key={p.id} className="card p-card"
              style={{ background: bg2, borderColor: bdr }}
              onClick={() => openPage(p)}>
              <div className="p-img-box" style={{ background: dark ? "#0a0a0a" : "#f0f0f0" }}>
                <img src={p.thumb} alt={p.title} className="p-img" loading="lazy" />
                <div className="p-overlay">
                  <span className="f p-view" style={{ background: bg, color: txt }}>View Project <ArrowUpRight style={{ width: 14, height: 14 }} /></span>
                </div>
              </div>
              <div className="card-bot">
                <div className="p-tags">
                  {p.tags.slice(0, 2).map(t => (
                    <span key={t} className="tag" style={{ color: A, background: A + "11" }}>{t}</span>
                  ))}
                </div>
                <div>
                  <h3 className="f p-title" style={{ color: txt }}>{p.title}</h3>
                  <p className="p-desc" style={{ color: sub }}>{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
