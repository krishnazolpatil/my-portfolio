import { memo, useEffect } from "react";

const SEO = memo(function SEO({ page, dark }) {
  useEffect(() => {
    const isProject = page && page !== null;
    const title = isProject
      ? `${page.title} — Krishna Zolpatil, Product Designer`
      : "Krishna Zolpatil — Product Designer based in Mumbai, India";
    const desc = isProject
      ? page.desc
      : "Product designer based in Mumbai, India. I design SaaS tools, AI platforms, and zero-to-one digital products with care and craft.";
    const url  = "https://krishnazolpatil.com";
    const img  = `${url}/og-image.jpg`;

    document.title = title;

    const setMeta = (sel, attr, val) => {
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      el.setAttribute(attr, val);
    };

    setMeta('meta[name="description"]',          "name",    "description");
    setMeta('meta[name="description"]',          "content", desc);
    setMeta('meta[name="keywords"]',             "name",    "keywords");
    setMeta('meta[name="keywords"]',             "content", "product designer India, UX designer Mumbai, SaaS design, AI product design, UI designer India, portfolio, Krishna Zolpatil");
    setMeta('meta[name="author"]',               "name",    "author");
    setMeta('meta[name="author"]',               "content", "Krishna Zolpatil");
    setMeta('meta[name="robots"]',               "name",    "robots");
    setMeta('meta[name="robots"]',               "content", "index, follow");
    setMeta('meta[name="theme-color"]',          "name",    "theme-color");
    setMeta('meta[name="theme-color"]',          "content", dark ? "#0A0A0A" : "#F9F7F4");

    setMeta('meta[name="geo.region"]',           "name",    "geo.region");
    setMeta('meta[name="geo.region"]',           "content", "IN-MH");
    setMeta('meta[name="geo.placename"]',        "name",    "geo.placename");
    setMeta('meta[name="geo.placename"]',        "content", "Mumbai, Maharashtra, India");
    setMeta('meta[name="geo.position"]',         "name",    "geo.position");
    setMeta('meta[name="geo.position"]',         "content", "19.0760;72.8777");
    setMeta('meta[name="ICBM"]',                 "name",    "ICBM");
    setMeta('meta[name="ICBM"]',                 "content", "19.0760, 72.8777");

    setMeta('meta[property="og:type"]',          "property", "og:type");
    setMeta('meta[property="og:type"]',          "content",  isProject ? "article" : "website");
    setMeta('meta[property="og:title"]',         "property", "og:title");
    setMeta('meta[property="og:title"]',         "content",  title);
    setMeta('meta[property="og:description"]',   "property", "og:description");
    setMeta('meta[property="og:description"]',   "content",  desc);
    setMeta('meta[property="og:url"]',           "property", "og:url");
    setMeta('meta[property="og:url"]',           "content",  url);
    setMeta('meta[property="og:image"]',         "property", "og:image");
    setMeta('meta[property="og:image"]',         "content",  img);
    setMeta('meta[property="og:locale"]',        "property", "og:locale");
    setMeta('meta[property="og:locale"]',        "content",  "en_IN");
    setMeta('meta[property="og:site_name"]',     "property", "og:site_name");
    setMeta('meta[property="og:site_name"]',     "content",  "Krishna Zolpatil");

    setMeta('meta[name="twitter:card"]',         "name",    "twitter:card");
    setMeta('meta[name="twitter:card"]',         "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]',        "name",    "twitter:title");
    setMeta('meta[name="twitter:title"]',        "content", title);
    setMeta('meta[name="twitter:description"]',  "name",    "twitter:description");
    setMeta('meta[name="twitter:description"]',  "content", desc);
    setMeta('meta[name="twitter:image"]',        "name",    "twitter:image");
    setMeta('meta[name="twitter:image"]',        "content", img);
    setMeta('meta[name="twitter:creator"]',      "name",    "twitter:creator");
    setMeta('meta[name="twitter:creator"]',      "content", "@krishnazolpatil");

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = url;

    const schema = isProject ? {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": page.title,
      "description": page.desc,
      "author": { "@type": "Person", "name": "Krishna Zolpatil", "url": url },
    } : {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Krishna Zolpatil",
      "jobTitle": "Product Designer",
      "url": url,
      "email": "krishna.zolpatil@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://www.linkedin.com/in/krishnazolpatil/",
        "https://github.com/krishnazolpatil",
        "https://x.com/krishnazolpatil",
        "https://instagram.com/krishna.ux"
      ],
      "knowsAbout": ["Product Design", "UX Design", "SaaS", "AI Product Design", "Design Systems"],
    };

    let ld = document.querySelector('#ld-json');
    if (!ld) { ld = document.createElement("script"); ld.type = "application/ld+json"; ld.id = "ld-json"; document.head.appendChild(ld); }
    ld.textContent = JSON.stringify(schema);

  }, [page, dark]);

  return null;
});

export default SEO;
