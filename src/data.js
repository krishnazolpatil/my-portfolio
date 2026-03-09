import {
  Zap, MessageSquare, CreditCard, Bot, Globe,
  Palette, Brain, MousePointer, Lightbulb, Layers,
  ExternalLink, Sparkles,
} from "lucide-react";

export const A = "#0000FF"; // brand primary-500

export const BRAND_LOGOS = [
  { name:"adidas",      src:"/my-portfolio/logos/adidas.svg" },
  { name:"autodesk",    src:"/my-portfolio/logos/autodesk.svg" },
  { name:"bmw",         src:"/my-portfolio/logos/bmw.svg" },
  { name:"bose",        src:"/my-portfolio/logos/bose.svg" },
  { name:"frog",        src:"/my-portfolio/logos/frog.svg" },
  { name:"google",      src:"/my-portfolio/logos/google.svg" },
  { name:"harvard",     src:"/my-portfolio/logos/harvard.svg" },
  { name:"ideo",        src:"/my-portfolio/logos/ideo.svg" },
  { name:"microsoft",   src:"/my-portfolio/logos/microsoft.svg" },
  { name:"millerknoll", src:"/my-portfolio/logos/millerknoll.svg" },
  { name:"mit",         src:"/my-portfolio/logos/mit.svg" },
  { name:"nike",        src:"/my-portfolio/logos/nike.svg" },
  { name:"onshape",     src:"/my-portfolio/logos/onshape.svg" },
  { name:"risd",        src:"/my-portfolio/logos/risd.svg" },
];

export const PROJECTS = [
  { id:"workflow",     n:"01", tag:"Workflow Tool",  title:"Workflow Tool — Home & Action Page",     short:"Redesigning the core dashboard to reduce friction through progressive disclosure.",       desc:"Redesigned the core home dashboard and action page, reducing friction and improving task discovery through progressive disclosure and intelligent defaults.",    chips:["UX Research","Dashboard Design","IA"],       Icon:Zap,          role:"Senior Product Designer", timeline:"8 weeks",  team:"1 Designer · 2 Eng · 1 PM", outcomes:["Reduced time-to-first-action by 40%","Increased daily active usage by 22%","Simplified navigation from 9 items to 4"],   overview:"This project focused on simplifying the most-used surface of a workflow tool — the home dashboard. Users were overwhelmed by the density of actions and struggled to find what mattered most." },
  { id:"comments",     n:"02", tag:"Collaboration",  title:"Comments Feature",                        short:"In-context commenting enabling real-time team collaboration.",                            desc:"Designed an in-context commenting system enabling real-time collaboration — focused on thread clarity, notification design, and feeling native to the product.",   chips:["Feature Design","Interaction Design","Prototyping"], Icon:MessageSquare, role:"Senior Product Designer", timeline:"5 weeks",  team:"1 Designer · 1 Eng · 1 PM", outcomes:["Eliminated 60% of Slack back-and-forth","Reduced review cycle time by 35%","Adopted by 80% of teams in month one"], overview:"Teams needed a way to discuss work without leaving the product. The comments feature brought conversation into context — directly on the objects that matter." },
  { id:"monetisation", n:"03", tag:"Monetisation",   title:"Subscriptions, Teams & Stripe",          short:"End-to-end UX for subscriptions, team management and Stripe payments.",                  desc:"Led UX and UI for subscriptions, team management, and Stripe integration. Mapped payment flows, upgrade paths, and billing edge cases with engineers.",           chips:["SaaS UX","Payment Flows","Dev Collab"],      Icon:CreditCard,   role:"Senior Product Designer", timeline:"12 weeks", team:"1 Designer · 3 Eng · 1 PM", outcomes:["94% checkout completion rate","Reduced billing support tickets by 50%","Launched subscriptions, teams and per-seat pricing"], overview:"Enabling monetisation required designing for trust. Every step — from plan selection to payment confirmation — needed to feel safe, clear, and frictionless." },
  { id:"ai-platform",  n:"04", tag:"AI Platform",    title:"Agentic AI for Manufacturing Estimates", short:"UX for an AI platform automating cost estimation in manufacturing.",                    desc:"UX and UI for an agentic AI platform automating manufacturing cost estimation. Designed for trust, transparency, and AI output legibility using Google Stitch & AI Studio.", chips:["AI/ML UX","Google Stitch","B2B SaaS"],  Icon:Bot,          role:"Senior Product Designer", timeline:"10 weeks", team:"1 Designer · 4 Eng · 1 PM", outcomes:["Estimate time from days to minutes","Designed explainability layer for AI outputs","Shipped with Google Stitch + AI Studio"], overview:"Manufacturing teams spend weeks on cost estimates manually. This agentic AI platform automates the process — but the UX challenge was making AI outputs feel trustworthy and auditable." },
  { id:"landing",      n:"05", tag:"Marketing",      title:"Landing Page Design",                     short:"Conversion-focused landing page with a full redesign iteration.",                       desc:"Designed a conversion-focused landing page then led a full redesign iteration — balancing storytelling with hierarchy and clear CTAs.",                           chips:["Landing Page","Visual Design","Brand"],      Icon:Globe,        role:"Senior Product Designer", timeline:"3 weeks",  team:"1 Designer · 1 Eng",        outcomes:["Increased conversion rate by 38%","Reduced bounce rate by 25%","Improved above-the-fold clarity"], overview:"The original landing page wasn't converting. A full audit revealed misaligned messaging, weak hierarchy, and a CTA buried below the fold. The redesign addressed all three." },
];

export const SKILLS = [
  { Icon:Palette,      name:"Visual Design",      tags:["Figma","Design Systems","Typography","Color Theory"] },
  { Icon:Brain,        name:"UX Research",        tags:["User Interviews","Usability Testing","Journey Mapping"] },
  { Icon:MousePointer, name:"Interaction Design", tags:["Prototyping","Micro-interactions","Motion"] },
  { Icon:Lightbulb,    name:"Product Thinking",   tags:["Roadmapping","Prioritisation","Dev Handoff"] },
  { Icon:Bot,          name:"AI Product Design",  tags:["AI UX","Google AI Studio","Agent Design"] },
  { Icon:Layers,       name:"Design Systems",     tags:["Component Libraries","Tokens","Docs"] },
];

export const RESOURCES = [
  { Icon:ExternalLink, type:"Figma Community", name:"Free Design Assets",      desc:"UI kits, icon sets, and design system components for the community.", cta:"Open in Figma",  href:"#" },
  { Icon:Sparkles,     type:"Writing",         name:"Design Thinking & Notes", desc:"Essays on product design, AI UX, craft, and what makes things good.",  cta:"Read articles", href:"#" },
];

export const MEDIA = [
  { type:"photo", emoji:"📷", label:"Street, Mumbai", caption:"Finding geometry in chaos" },
  { type:"photo", emoji:"🌅", label:"Golden Hour",     caption:"Light that lasts 10 minutes" },
  { type:"video", emoji:"🎬", label:"Short Film",      caption:"Visual essays in motion" },
  { type:"photo", emoji:"🏙️", label:"Architecture",   caption:"Lines, shadows, structure" },
  { type:"video", emoji:"📽️", label:"Product Reel",    caption:"Design in motion" },
];
