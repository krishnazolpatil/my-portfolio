import FadeIn from "./FadeIn";
const F = FadeIn;

export function Skills({ dark, T, SKILLS }) {
  const { txt, mid, sub, bdr, bg2 } = T;
  const A = "var(--accent)";

  return (
    <section id="skills" aria-label="Skills & Expertise" style={{ background: dark ? "#0a0a0a" : "#fafafa", borderTop: `1px solid ${bdr}`, borderBottom: `1px solid ${bdr}` }}>
      <div className="wrap sec">
        <F>
          <span className="sec-label">Skills & Expertise</span>
          <h2 className="f h-lg sec-title" style={{ color: txt, marginBottom: 44 }}>What I <span className="txt-italic">do best.</span></h2>
        </F>
        <div className="grid">
          {SKILLS.map((s, i) => (
            <F d={i * 40} key={s.name}>
              <div className="card s-card" style={{ background: bg2, borderColor: bdr }}>
                <div className="s-icon" style={{ background: A + "11", color: A }}>
                  <s.Icon style={{ width: 18, height: 18 }} />
                </div>
                <h3 className="f s-title" style={{ color: txt }}>{s.name}</h3>
                <p className="s-tags" style={{ color: sub }}>{s.tags.join(" • ")}</p>
              </div>
            </F>
          ))}
        </div>
      </div>
    </section>
  );
}
