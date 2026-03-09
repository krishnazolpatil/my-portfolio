import { memo, useRef, useEffect } from "react";

// Don't render the custom cursor on touch/pointer-coarse devices (phones, tablets)
const isTouchDevice = () =>
  window.matchMedia("(pointer: coarse)").matches || !window.matchMedia("(pointer: fine)").matches;

const Cursor = memo(function Cursor({ dark }) {
  // Bail out early on touch screens — no mouse means nothing to track
  if (isTouchDevice()) return null;

  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: window.innerWidth/2, y: window.innerHeight/2 });
  const ring    = useRef({ x: window.innerWidth/2, y: window.innerHeight/2 });
  const raf     = useRef(null);
  const hovering = useRef(false);
  const clicking  = useRef(false);

  useEffect(() => {
    const dot  = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      dot.style.transform  = `translate(calc(${pos.current.x}px - 50%), calc(${pos.current.y}px - 50%))`;
      ringEl.style.transform = `translate(calc(${ring.current.x}px - 50%), calc(${ring.current.y}px - 50%))`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const onMove = (e) => { pos.current.x = e.clientX; pos.current.y = e.clientY; };

    const onEnter = (e) => {
      const t = e.target.closest('a,button,[data-cursor]');
      if (t) { hovering.current = true; dot.classList.add('hovering'); ringEl.classList.add('hovering'); }
    };
    const onLeave = (e) => {
      const t = e.target.closest('a,button,[data-cursor]');
      if (t) { hovering.current = false; dot.classList.remove('hovering'); ringEl.classList.remove('hovering'); }
    };
    const onDown  = () => { clicking.current = true;  dot.classList.add('clicking');  ringEl.classList.add('clicking'); };
    const onUp    = () => { clicking.current = false; dot.classList.remove('clicking'); ringEl.classList.remove('clicking'); };
    const onOut   = () => { dot.classList.add('hidden'); ringEl.classList.add('hidden'); };
    const onIn    = () => { dot.classList.remove('hidden'); ringEl.classList.remove('hidden'); };

    window.addEventListener('mousemove',  onMove,  { passive:true });
    window.addEventListener('mouseover',  onEnter, { passive:true });
    window.addEventListener('mouseout',   onLeave, { passive:true });
    window.addEventListener('mousedown',  onDown,  { passive:true });
    window.addEventListener('mouseup',    onUp,    { passive:true });
    document.addEventListener('mouseleave', onOut);
    document.addEventListener('mouseenter', onIn);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseover',  onEnter);
      window.removeEventListener('mouseout',   onLeave);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseleave', onOut);
      document.removeEventListener('mouseenter', onIn);
    };
  }, []);

  const dotColor  = dark ? '#EDEAE6' : '#18140E';
  const ringColor = dark ? 'rgba(237,234,230,0.35)' : 'rgba(24,20,14,0.2)';

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  style={{ background:dotColor }}/>
      <div ref={ringRef} className="cursor-ring" style={{ borderColor:ringColor }}/>
    </>
  );
});

export default Cursor;
