import FadeIn from "./FadeIn";
const F = FadeIn;
import { ArrowUpRight } from "lucide-react";

export function About({ dark, T, MEDIA }) {
  const { txt, mid, sub, bdr, ac, bg, bg2 } = T;
  const A = "var(--accent)";

  return (
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
                <img src={MEDIA.profileImage}
                  alt="Krishna"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading="lazy" />
              </div>

              {/* Content column */}
              <div className="about-content">
                <div className="about-bio">
                  <h3 className="f" style={{ color: txt, fontSize: 20, marginBottom: 12 }}>Hi, I'm Krishna.</h3>
                  <p className="body" style={{ color: mid }}>
                    I'm a multidisciplinary designer based in India, currently focused on creating digital experiences that balance bold aesthetics with intuitive functionality.
                  </p>
                  <p className="body" style={{ color: sub }}>
                    With a background spanning UI/UX, brand identity, and front-end development, I approach design holistically. I believe the best products don't just solve problems—they tell a story and feel inherently human.
                  </p>
                </div>

                <div className="about-stats">
                  {[
                    { l: "Years Active", v: "5+" },
                    { l: "Projects Shipped", v: "40+" },
                    { l: "Cups of Coffee", v: "∞" }
                  ].map(s => (
                    <div className="a-stat" key={s.l} style={{ background: bg, borderColor: bdr }}>
                      <span className="f a-stat-v" style={{ color: txt }}>{s.v}</span>
                      <span className="a-stat-l" style={{ color: sub }}>{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="about-foot" style={{ borderColor: bdr }}>
              <div className="about-hobbies">
                <span className="a-label" style={{ color: txt }}>Beyond pixels</span>
                <p className="a-list" style={{ color: mid }}>
                  Analog photography • Specialty coffee • Mechanical keyboards • Indie games
                </p>
              </div>
              <div className="about-quote">
                <p className="a-q-txt" style={{ color: mid, fontStyle: "italic" }}>
                  "Design is not just what it looks like and feels like. Design is how it works."
                </p>
                <span className="a-q-author" style={{ color: sub }}>— Steve Jobs</span>
              </div>
            </div>

          </div>
        </F>
      </div>
    </section>
  );
}
