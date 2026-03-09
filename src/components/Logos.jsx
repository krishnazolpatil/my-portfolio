import FadeIn from "./FadeIn";
const F = FadeIn;

export function Logos({ T, BRAND_LOGOS }) {
  const { bdr } = T;

  return (
    <div className="logo-band" style={{ borderColor: bdr }}>
      <div className="logo-track">
        {[...BRAND_LOGOS, ...BRAND_LOGOS].map((logo, i) => (
          <div key={i} className="logo-item f">
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}
