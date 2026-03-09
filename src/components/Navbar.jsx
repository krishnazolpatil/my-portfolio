import FadeIn from "./FadeIn";
const F = FadeIn;
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";

export function Navbar({ dark, menu, setMenu, toggleDark, scrollTo, goTop, T, BRAND_LOGOS }) {
  const { txt, mid, bdr, ac, bg, sub } = T;
  const A = "var(--accent)";

  return (
    <>
      <nav className="wrap nav f">
        <F>
          <div className="nav-l" onClick={goTop}>
            <div className="brand-logo" style={{ color: dark ? "#fff" : "#000" }}>
              <div className="cube">
                <div className="face front" style={{ background: A }}></div>
                <div className="face back" style={{ background: A }}></div>
                <div className="face right" style={{ background: A }}></div>
                <div className="face left" style={{ background: A }}></div>
                <div className="face top" style={{ background: A }}></div>
                <div className="face bottom" style={{ background: A }}></div>
              </div>
              Krishna Zolpatil
            </div>
          </div>
        </F>
        <F d={30}>
          <div className="nav-r">
            <div className="nav-links">
              {['About', 'Projects', 'Skills', 'Resources'].map((item, i) => (
                <button key={item} onClick={() => scrollTo(item.toLowerCase())} style={{ color: mid }}>
                  {item}
                </button>
              ))}
            </div>
            <div className="nav-actions">
              <button className="theme-toggle" onClick={toggleDark} style={{ color: txt, borderColor: bdr }}>
                {dark ? <Sun style={{ width: 14, height: 14 }} /> : <Moon style={{ width: 14, height: 14 }} />}
              </button>
              <button className="cta-btn" onClick={() => scrollTo('contact')} style={{ background: "var(--accent)", color: "var(--accent-fg)" }}>
                Let's Talk <ArrowUpRight style={{ width: 14, height: 14 }} />
              </button>
            </div>
            <button className="mobile-menu-btn" onClick={() => setMenu(!menu)} style={{ color: txt, borderColor: bdr }}>
              {menu ? <X style={{ width: 16, height: 16 }} /> : <Menu style={{ width: 16, height: 16 }} />}
            </button>
          </div>
        </F>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-nav ${menu ? 'open' : ''}`} style={{ background: bg, borderColor: bdr }}>
        <div className="mobile-nav-inner">
          {['About', 'Projects', 'Skills', 'Resources', 'Contact'].map((item) => (
            <button key={item} onClick={() => { scrollTo(item.toLowerCase()); setMenu(false); }} className="f" style={{ color: txt }}>
              {item}
            </button>
          ))}
          <div className="mobile-nav-footer">
            <button className="theme-toggle" onClick={() => { toggleDark(); setMenu(false); }} style={{ color: txt, borderColor: bdr, width: "100%", justifyContent: "center" }}>
              {dark ? <><Sun style={{ width: 14, height: 14, marginRight: 8 }} /> Light Mode</> : <><Moon style={{ width: 14, height: 14, marginRight: 8 }} /> Dark Mode</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
