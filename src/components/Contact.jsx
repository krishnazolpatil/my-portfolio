import FadeIn from "./FadeIn";
const F = FadeIn;
import { Sparkles, Mail, Linkedin, Github, Instagram, Twitter, FileText } from "lucide-react";

export function Contact({ dark, T }) {
  const { txt, mid, sub, bdr, ac, bg, bg2 } = T;
  const A = "var(--accent)";

  return (
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
  );
}
