import { memo, useRef, useState, useEffect } from "react";

export function useFade() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); o.disconnect(); } },
      { threshold:0.07, rootMargin:"0px 0px -24px 0px" }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, on];
}

const FadeIn = memo(function FadeIn({ children, d=0, className="", style={} }) {
  const [ref, on] = useFade();
  return (
    <div ref={ref} style={{ animationDelay:`${d}ms`, opacity:on?undefined:0, ...style }}
      className={`${on?"fu":""} ${className}`}>{children}</div>
  )
});

export default FadeIn;
