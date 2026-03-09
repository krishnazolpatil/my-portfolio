import { memo, useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ErrorBoundary from "./ErrorBoundary";

const Slideshow = memo(function Slideshow({ items, dark, T, renderItem, interval=4000 }) {
  const { bdr, mid } = T;
  const [idx, setIdx]   = useState(0);
  const [vis, setVis]   = useState(true);
  const mounted  = useRef(true);
  const fadeTimer = useRef(null);
  const len = items.length;

  useEffect(() => { mounted.current = true; return () => { mounted.current = false; clearTimeout(fadeTimer.current); }; }, []);

  const go = useCallback((n) => {
    setVis(false);
    clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => { if (mounted.current) { setIdx(n); setVis(true); } }, 180);
  }, []);

  const prev = useCallback(() => { const n=(idx-1+len)%len; go(n); setIdx(n); }, [go, idx, len]);
  const next = useCallback(() => { const n=(idx+1)%len;     go(n); setIdx(n); }, [go, idx, len]);

  useEffect(() => {
    const t = setInterval(() => {
      if (mounted.current) setIdx(cur => { const n=(cur+1)%len; go(n); return n; });
    }, interval);
    return () => clearInterval(t);
  }, [go, interval, len]);

  return (
    <ErrorBoundary>
      <div>
        <div style={{ opacity:vis?1:0, transition:"opacity 0.18s ease" }}>
          {renderItem(items[idx], idx)}
        </div>
        <div className="slide-controls">
          <div className="slide-dots">
            {items.map((_,k) => (
              <button key={k} onClick={()=>go(k)} className="slide-dot"
                style={{ width:k===idx?24:5, background:dark?"#2A2A2A":"#DDD9D2", overflow:"hidden", position:"relative" }}>
                {k===idx && (
                  <span style={{
                    position:"absolute", inset:0, background:dark?"#EDEAE6":"#18140E",
                    animation:`dotProgress ${interval}ms linear forwards`,
                    transformOrigin:"left center"
                  }}/>
                )}
              </button>
            ))}
          </div>
          <div className="slide-arrows">
            {[{fn:prev,Ic:ChevronLeft},{fn:next,Ic:ChevronRight}].map(({fn,Ic},k)=>(
              <button key={k} onClick={fn} className="slide-arrow"
                style={{ borderColor:bdr, color:mid }}>
                <Ic style={{width:13,height:13}}/>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
});

export default Slideshow;
