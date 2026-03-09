import { ChevronUp } from "lucide-react";

export function Footer({ topBtn, goTop, T }) {
  const { mid, sub } = T;

  return (
    <>
      <div className="wrap footer">
        <span className="f footer-name" style={{ color: mid }}>Krishna Zolpatil</span>
        <span className="footer-copy" style={{ color: sub }}>© 2025 · Designed with care</span>
      </div>

      {topBtn && (
        <button className="back-top" onClick={goTop}>
          <ChevronUp style={{ width: 14, height: 14, color: "#fff" }} />
        </button>
      )}
    </>
  );
}
