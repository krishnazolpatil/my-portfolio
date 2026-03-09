import { memo, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const ProjectPage = memo(function ProjectPage({ p, dark, onBack, T, exiting }) {
  const { bg, bg2, bdr, txt, mid, sub } = T;
  useEffect(()=>{ window.scrollTo(0,0); },[]);

  if (!p) return (
    <div className="wrap" style={{paddingTop:48,paddingBottom:48,color:mid,fontSize:"0.9rem"}}>
      Project not found.{" "}
      <button onClick={onBack} style={{ color:"var(--accent-fg)", background:"none", border:"none", cursor:"pointer" }}>Go back</button>
    </div>
  );

  return (
    <div className={`proj-page ${exiting?"page-exit":"page-enter"}`} style={{ background:bg, color:txt }}>

      <div className="proj-topbar" style={{ background:dark?"rgba(10,10,10,0.92)":"rgba(249,247,244,0.92)", borderBottomColor:bdr }}>
        <button onClick={onBack} className="proj-back-btn" style={{ borderColor:bdr, color:mid }}>
          <ArrowLeft style={{width:12,height:12}}/> Back to portfolio
        </button>
      </div>

      <div className="proj-hero" style={{ background:`linear-gradient(145deg,${dark?"#111":"#EEE"} 0%,${bg} 100%)`, borderBottomColor:bdr }}>
        <div className="proj-hero-inner">
          <span className="proj-hero-tag">{p.tag}</span>
          <h1 className="f proj-hero-h1" style={{ color:txt }}>{p.title}</h1>
          <p className="proj-hero-desc" style={{ color:mid }}>{p.desc}</p>
        </div>
      </div>

      <div className="proj-meta" style={{ background:bg2, borderBottomColor:bdr }}>
        <div className="proj-meta-inner">
          {[["Role",p.role],["Timeline",p.timeline],["Team",p.team]].map(([k,v])=>(
            <div key={k}>
              <p className="proj-meta-label" style={{ color:mid }}>{k}</p>
              <p className="proj-meta-val" style={{ color:txt }}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="proj-body">
        <div className="proj-hero-img" style={{ background:dark?"#111":"#EEE", borderColor:bdr }}>
          <p style={{ fontSize:"0.75rem", color:mid, letterSpacing:"0.08em" }}>Project hero image — replace me</p>
        </div>

        <div className="proj-section">
          <span className="proj-section-label">Overview</span>
          <p className="proj-overview" style={{ color:txt }}>{p.overview}</p>
        </div>

        <div className="proj-divider" style={{ background:bdr }}/>

        <div className="proj-section">
          <span className="proj-section-label">Outcomes</span>
          <div className="outcomes-list">
            {p.outcomes.map((o,i)=>(
              <div key={i} className="outcome-item" style={{ background:bg2, borderColor:bdr }}>
                <span className="outcome-dot"/>
                <span className="outcome-txt" style={{ color:txt }}>{o}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="proj-divider" style={{ background:bdr }}/>

        {["Problem","Process","Solution","Learnings"].map(s=>(
          <div key={s} className="case-block">
            <span className="proj-section-label">{s}</span>
            <div className="case-placeholder" style={{ background:bg2, borderColor:bdr }}>
              <p style={{ color:mid }}>✏️ Edit this into your {s.toLowerCase()} section.</p>
            </div>
          </div>
        ))}

        <span className="proj-section-label">Screens & Artefacts</span>
        <div className="screens-grid">
          {[1,2,3,4].map(n=>(
            <div key={n} className="screen-item" style={{ background:bg2, borderColor:bdr }}>
              <p style={{ color:sub }}>Screen {n}</p>
            </div>
          ))}
        </div>

        <div className="proj-footer" style={{ borderTopColor:bdr }}>
          <button onClick={onBack} className="proj-back-btn" style={{ borderColor:bdr, color:mid }}>
            <ArrowLeft style={{width:12,height:12}}/> Back to portfolio
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProjectPage;
