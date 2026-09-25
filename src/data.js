/* Single source of truth for portfolio content. Consumed by AppV2.jsx. */

export const PROJECTS = [
  {
  id: "naya-workflow",
  n: "01",
  tag: "Workflow Platform",
  title: "Naya Workflow Platform",
  short: "Shaping a workflow platform for physical product development over four years.",
  role: "Senior Product Designer",
  timeline: "Naya Studio · 2022–2026",
  team: "Founders · Engineering · Product · Me · Design team for feedback",
  stack: ["Figma", "Claude Code", "Vercel", "React"],
  award: { label: "iF Design Award 2024 · Product UX", href: "https://ifdesign.com/en/winner-ranking/project/naya/643559" },

  /* The lead of the work section rather than one cell in it. Every other
     project below came out of this same four-year job, so the grid was
     telling a stranger they were unrelated. */
  feature: true,
  lede: "Not two hundred separate features — one product, kept coherent while it grew. I shaped it from early foundations into a connected ecosystem: projects and references, workflow structure, collaboration, mobile, and the design system holding it together.",
  figures: [
    { v: "200+", l: "features shipped" },
    { v: "5", l: "core platform areas" },
    { v: "1", l: "coherent product" },
  ],

  overview: "Naya is a visual workspace for physical product teams. Over four years, I helped shape the workflow platform from early foundations into a connected ecosystem managing projects, references, 3D models, feedback, collaboration, and estimation. The work wasn't about designing 200 separate features. It was about helping the product evolve while maintaining a coherent experience as the platform grew increasingly complex.",

  /* From the 2024–25 feature board: what was actually built, by area. The
     delivery figure is the last quarter's, as the board records it. */
  outcomes: [
    "Mobile, in three phases: Studio, then Journey, then Preview",
    "Comments as a system: comment on anything, threads, highlights, read and unread, an inbox, and the navigation logic that ties them together",
    "Generate with AI from what the journey already holds: select a block, a group, the whole journey or a handful of assets, right-click, and get a product, a render or a summary",
    "Grid view, Preview, and the expanded view rebuilt with pagination",
    "Subscriptions, billing, payments and account management, and the pricing strategy behind them",
    "A design system extracted from the shipped work, then applied back across it: pill buttons, one icon library, neutral colours, consistent modals and snackbars",
    "The Workflow AI website: the copy, the motion and every asset on it",
    "Last quarter on record: every assigned feature delivered, 28 of the 46 the team planned",
  ],

  /* Told the way a stranger meets it: the week the product exists to fix,
     what the product is, what I did there, then the platform walked through
     as the questions a team asks of it. Chapter headings are those
     questions. `body` is a string or a list of short paragraphs. */
  caseStudy: [
    {
      label: "Put yourself in the studio",
      kind: "story",
      figure: { src: "/naya/studio-journey.png", alt: "A product journey in Naya: a design brief, then inspiration, ideation, two concepts, design development and prototyping, each a column of blocks" },
      lead: "Imagine you run a small furniture studio.",
      sub: "One chair is on its way to a factory.",
      pairs: [
        { a: "The reference images are in a folder.", b: "The 3D model is in someone's email." },
        { a: "The manufacturer's feedback is in a chat thread.", b: "The decision about the armrest was never written down." },
        { a: "Now make it ten products and five people.", b: "Count it: 20 stages, 20 file types, 25 stakeholders, 15 platforms, per product." },
      ],
      close: "It is the week Naya exists to fix.",
      peep: "arms",
      shots: [],
    },

    {
      label: "How Naya solves this",
      kind: "points",
      body: [
        "A visual workspace for physical product teams: the designer, the project manager, the engineer or fabricator, and the client who needs to see progress and say what they think.",
        "It holds three things in one place:",
      ],
      points: [
        { t: "The material", b: "Images, documents, product information and 3D models, connected to the product they inform." },
        { t: "The process", b: "Phases, blocks and journeys, so a project follows how the team actually works." },
        { t: "The people", b: "Sharing, feedback and mobile access, so decisions happen where everyone can see them." },
      ],
      shots: [
        "/naya/workflow-product-overview.png",
      ],
    },

    {
      label: "My role",
      kind: "role",
      peep: "sit",
      body: [
        "Senior Product Designer, 2022 to 2026. I joined at the early foundations and stayed as Naya became a connected ecosystem.",
        "Over four years I shipped 200+ UI and UX features across projects, workflows, collaboration and mobile, and built the design system underneath them.",
        "In 2024, the year I was promoted to Senior Product Designer, the platform won an iF Design Award for Product UX.",
        "The work wasn't about volume. It was making sure that as Naya grew to hold all of it, it still felt like one product.",
      ],
      link: { href: "https://ifdesign.com/en/winner-ranking/project/naya/643559", label: "The award, on ifdesign.com" },
      shots: [],
    },

    {
      label: "So how does a product go from 37 features nobody loved to a platform teams at Google and MillerKnoll run on?",
      kind: "pivot",
      peep: "ease",
      body: "Here's the platform, walked through the questions a team asks of it, and the one the company had to ask itself first.",
      shots: [],
    },

    {
      label: "What did the first year build?",
      body: [
        "A lot. By September 2023 the company had talked to its customers constantly, logged 1,200 insights and shipped 500 bugs and minor features in a year.",
        "It had also shipped 37 features, and when the founders sat down with them, the verdict was blunt: we were chasing features instead of chasing love.",
        "Much of what we had built were design tools that Miro and Figma already did better. The features that mattered most were not spotlighted, and none had been refined enough to be loved.",
      ],
      shots: ["/naya/brief-to-tracking.png"],
    },

    {
      label: "What was getting in the way?",
      kind: "points",
      body: "Underneath the feature count were three problems. Each one needed architectural thinking, not another feature.",
      points: [
        { t: "Information was scattered", b: "Teams had to think about storage instead of meaning. Projects were containers, not contexts." },
        { t: "Process had nowhere to live", b: "The features were there, but no structure for how teams actually work through product development." },
        { t: "Collaboration was friction-heavy", b: "Sharing was one project, one person at a time — not how teams think about giving a team access." },
      ],
      shots: ["/naya/scattered-apps.jpg", "/naya/tangle.png"],
    },

    {
      label: "What did the reset look like?",
      kind: "points",
      figure: { src: "/naya/sketch-block.png", alt: "A hand-drawn box with a notes panel beside it", cap: "The block, first sketch" },
      body: [
        "The company reset around one idea, the block: a container for anything, from a sketch to a 3D model to a decision, that can be linked into a journey.",
        "Rather than building our own Figma, we would integrate with it. Everything else was demoted or promoted against five promises:",
      ],
      points: [
        { t: "Easy entry", b: "Jump in with whatever file you have, or request one." },
        { t: "Make your journey", b: "Lay blocks out as the process actually ran, branches included." },
        { t: "Feedback from everyone", b: "Share with a client, a fabricator or a whole group, and never lose what they said." },
        { t: "Show progress, tell the story", b: "Highlights, lenses, and a view of where the project stands. Nobody prints their Asana board; the design process is beautiful." },
        { t: "Superpowers", b: "Search across every app, and later, AI over everything the journey holds." },
      ],
      /* Drawn, not the deck slide: the same five promises as blocks on the
         journey line, in the page's own type. Source: scratch promises.html. */
      shots: [
        "/naya/workflow-five-promises.png",
      ],
    },

    {
      label: "What guided my decisions?",
      kind: "points",
      body: "The reset gave the company its direction. Three principles are how I held every feature to it.",
      points: [
        { t: "Systems thinking", b: "Every new feature had to connect to what came before it, or the product becomes a pile of features." },
        { t: "Constraint-based design", b: "We ruled out the three-month workspace solution and designed Group Sharing instead — a smaller MVP that actually shipped." },
        { t: "Progressive disclosure", b: "Complexity surfaces only when needed. A simple user shouldn't see advanced features; they appear on demand." },
      ],
      shots: [],
    },

    {
      label: "Where do I put this?",
      kind: "beforeAfter",
      before: "Projects were file containers. References were images. Metadata was bureaucratic. Teams had to think about storage categories, not meaning.",
      after: "Projects became spaces where information is connected and purposeful. A project shows its cover, item count, status and collaborators at a glance, and references connect to the products they inform.",
      body: "The redesign changed the question itself, from 'where do I put this?' to 'what does this tell me about my product?'",
      shots: [
        "/naya/workflow-project-context.png",
        "/naya/workflow-project-evolution.png",
      ],
    },

    {
      label: "How does a team show its process?",
      kind: "beforeAfter",
      figure: { src: "/naya/sketch-journeys.png", alt: "Two sketched project timelines, a chair and a planter, with milestones", cap: "Journeys, as first sketched" },
      before: "Projects were flat containers. No way to express process or phases.",
      after: "Phases, Blocks and Journey structures let teams organise work the way they run it: early exploration, concept selection, design refinement, manufacturing planning, feedback loops.",
      body: [
        "The design challenge was making these structures invisible to anyone who doesn't need them.",
        "Simple organisation stays simple. Advanced structure surfaces only when you want it.",
      ],
      shots: [
        "/naya/workflow-phases-structure.png",
        "/naya/workflow-blocks-hierarchy.png",
      ],
    },

    {
      label: "How do I give my team access?",
      kind: "beforeAfter",
      figure: { src: "/naya/stakeholder-rings.png", alt: "Core team at the centre, then leadership, the broader team, fabricators, experts and end users in rings", cap: "Who needs to see a project" },
      before: "Sharing was one project, one person at a time. Fifty shares for ten projects across five people, with no way to check which one you missed.",
      after: "Share a group, and everyone sees what's inside. Access is inherited; direct shares stack on top. Remove someone from the group and you remove the team's access — not just one favour.",
      body: [
        "We couldn't build a full workspace on the time and engineering cost available.",
        "So we designed something smaller that matched how teams already think. Narrower than a workspace model, but clearer and faster to ship.",
      ],
      shots: [
        "/naya/workflow-group-sharing.png",
        "/naya/workflow-collaboration-inheritance.png",
        "/naya/workflow-group-sharing-flow.png",
      ],
    },

    {
      label: "What happens away from the desk?",
      kind: "beforeAfter",
      before: "Product work only happened at desks. Mobile had no first-class support.",
      after: "Teams can open projects on mobile, select 3D models, rotate them, review product information and give feedback.",
      body: [
        "The brief wasn't 'shrink the desktop app'. It was 'what matters when a team is away from their computers?'",
        "The answer was quick access to projects and 3D viewing. On mobile, that flow is all that matters.",
      ],
      shots: [
        "/naya/workflow-mobile-flow.png",
        "/naya/workflow-3d-viewer-mobile.png",
      ],
    },

    {
      label: "How does it all stay consistent?",
      kind: "beforeAfter",
      before: "Every new feature risked inconsistency. Modals varied. Context menus followed different patterns. Sharing appeared in multiple ways.",
      after: "A design system drawn from what worked: components, patterns, interaction models and rules.",
      body: [
        "The system wasn't invented. It was extracted from successful features and iterated.",
        "As 3D, AI and mobile arrived, it evolved to take them while the foundation stayed put. Features shipped faster because the structure was already there.",
      ],
      shots: [
        "/naya/workflow-design-system-components.png",
        "/naya/workflow-design-system-patterns.png",
      ],
    },

    {
      label: "How did the four years unfold?",
      kind: "timeline",
      steps: [
        { y: "2022", t: "Building foundations", b: "Projects, basic collaboration, the core structure." },
        { y: "2023", t: "The reset", b: "Thirty-seven features audited, the block introduced, and the journey built on it. Phases and structure followed." },
        { y: "2024", t: "Increasing complexity", b: "Mobile in three phases, comments rebuilt as a system, grid view and preview, billing and subscriptions. Consistency became critical." },
        { y: "2025–26", t: "Connecting the ecosystem", b: "Project memory and generating with AI from the journey. Workflows fed into Estimation and Estimation fed back. The Workflow AI website, written and animated from the product. My role shifted from designing features to thinking about the whole." },
      ],
      shots: [
        "/naya/workflow-evolution-2022.png",
        "/naya/workflow-evolution-2023.png",
        "/naya/workflow-evolution-2024.png",
        "/naya/workflow-evolution-2025.png",
      ],
    },

    {
      label: "How did my own process change?",
      kind: "beforeAfter",
      before: "Research, roadmap, sketches, design, prototype, handoff. Static Figma files couldn't communicate complex interactions, and developers would each interpret them differently.",
      after: "Working prototypes built in code and deployed to Vercel, so engineering could click through the real experience before a ticket was written.",
      body: "I used Claude Code to build quickly — not as finished products, but as communication tools. Better communication meant fewer misunderstandings and faster shipping.",
      shots: [
        "/naya/workflow-process-evolution.png",
      ],
    },

    {
      label: "What if the journey already knew enough to generate?",
      kind: "pivot",
      body: "By 2025 a journey held everything about a product: its images, documents, renders and decisions. Naya's AI still asked you to describe all of that in a prompt, and the output showed it.",
      shots: [],
    },

    {
      label: "What was there before?",
      body: [
        "Naya had AI generation already, and it was prompt-based like everything else at the time. You typed what you wanted and the model started from nothing.",
        "The output was not good, and it could not be: the model never saw the product it was generating for. Everything the team knew about it sat in the journey, a click away, unused.",
      ],
      shots: [],
    },

    {
      label: "What does the journey know?",
      figure: { src: "/naya/sketch-superpowers.png", alt: "Sketched block types: sustainability, 3D, matchmaking, AI estimation, print order", cap: "Superpowers, sketched early" },
      clip: {
        src: "/naya/project-memory.mp4", poster: "/naya/project-memory-poster.jpg",
        alt: "Blocks stream into the Naya mark, which then hands out insight cards: project summary, content creation, next steps, estimation, manufacturing analysis, sustainability analysis",
        note: "I made this motion graphic alongside the feature. It ran on Autodesk's page while the founders presented.",
        link: { href: "https://www.instagram.com/reels/DdbgIENB3or/", label: "Watch the Autodesk feature" },
      },
      body: [
        "Project memory, when you turn it on, ingests every asset in the journey and works out what is in each of them.",
        "I sat with the engineers for a week to understand how that ingestion works before drawing anything. Two things came out of it.",
        "It happens all at once: block by block, so you can see how many are done, but nothing can be generated until everything is in. Per-asset ingestion would have let people start early. It was a technical limit, so the design had to show the wait honestly rather than hide it.",
      ],
      shots: [],
    },

    {
      label: "How do you ask it for something?",
      kind: "points",
      body: [
        "Once ingestion was clear, we diverged on options in Figma and settled on one rule: you generate from a selection, and everything starts with a right-click.",
        "Select a single block, a group, the whole journey, or any handful of assets, then choose what you want made from them:",
      ],
      points: [
        { t: "A product", b: "Written back into project memory, so what the AI made is part of what the journey knows." },
        { t: "Renders", b: "Concepts generated from the assets you selected, not from a description of them." },
        { t: "A summary", b: "What the selection says, in a few lines." },
      ],
      shots: [
        "/naya/workflow-multi-in-menu.png",
        "/naya/workflow-multi-in-ask.png",
        "/naya/workflow-multi-in-result.png",
      ],
    },

    {
      label: "Why is there no prompt box?",
      kind: "beforeAfter",
      before: "Keep the prompt and attach the journey's assets to it: a new block type where you type what you want, with the memory behind it.",
      after: "A right-click on what is already there. The assets are the prompt, and a text block, which the journey already had, covers anything you want to say in words.",
      body: [
        "A prompt requires input before it does anything, and the old prompt was the thing producing poor output. A selection is input you already made.",
        "It shipped, and it was picked up by student product teams at USC and MIT.",
      ],
      shots: [],
    },

    {
      label: "Where does Estimation fit?",
      body: [
        "By 2026 Naya was three products in one studio. Estimation AI is the appetizer: the costing tool a customer tries first. Workflow AI, the platform this study is about, is the main course they stay for. Sustainability AI is the dessert.",
        "The three share a journey. Teams gather product information in Workflow, Estimation reads it and builds a costing plan, and the estimate lands back in the project as a PDF with every data source kept as a link block.",
        "Designing that connection showed how to add a whole product to an existing system without breaking its coherence.",
      ],
      shots: [
        "/naya/workflow-estimation-connection.png",
      ],
    },

    {
      label: "How does a stranger meet it?",
      kind: "points",
      clip: [
        {
          src: "/naya/site-feedback.mp4", poster: "/naya/site-feedback-poster.jpg",
          alt: "The feedback section of the Workflow AI site: a comment pinned to a 3D model and a timed comment on a video",
          note: "Feedback on a 3D model and on a video, the section loop from the site.",
        },
        {
          src: "/naya/site-search.mp4", poster: "/naya/site-search-poster.jpg",
          alt: "The search section of the Workflow AI site: an AI search bar over a project archive",
          note: "The copy, the motion and every asset on the Workflow AI site are mine.",
          link: { href: "https://naya.studio", label: "See the site" },
        },
      ],
      body: [
        "The website is the first screen most teams ever see, and it had to say in a paragraph what took the product four years to become.",
        "I wrote it and made everything on it, because I knew what every screen was for. Most product designers hand the site to an agency. This one came from the person who had designed the product.",
      ],
      points: [
        { t: "The copy", b: "Written from the same five promises the product was reset around, so the site and the app say the same thing." },
        { t: "The motion", b: "Section animations that show feedback landing on a 3D model and search finding an old file, the product doing what the copy claims, not decoration." },
        { t: "The assets", b: "Every screen, illustration and product shot on the page, taken from the live product and composed for the site." },
      ],
      shots: [
        "/naya/site-integrations.png",
        "/naya/site-views.png",
        "/naya/site-ai-tools.png",
      ],
    },

    {
      label: "That's 200+ features. It isn't how anyone experiences it.",
      kind: "pivot",
      body: [
        "People experience Naya as a product where things make sense, where actions are consistent, and where complexity surfaces only when it's needed. The number of features matters less than whether they feel like they belong.",
        "The numbers: 263,579 blocks created, an NPS above 70 held for two years, usage doubled in a quarter, and a USC programme that grew from one class to 1,500 licences. A director there called it a design journal.",
      ],
      shots: [
        "/naya/workflow-feature-gallery-1.png",
        "/naya/workflow-feature-gallery-2.png",
        "/naya/workflow-feature-gallery-3.png",
      ],
    },

    {
      label: "What did it teach me?",
      kind: "points",
      points: [
        { t: "Depth teaches more than breadth", b: "Four years on one product shows you how products actually change, and how today's decisions affect tomorrow's work." },
        { t: "Systems thinking scales", b: "Individual features don't compound into a product. Without a system they fall apart. The system is the work." },
        { t: "Constraints drive clarity", b: "We couldn't build workspaces, so we built Group Sharing instead. It was better." },
        { t: "Consistency is freedom", b: "When the system is strong, a new feature doesn't require reinventing interaction design." },
        { t: "Communication beats tools", b: "Prototypes in code communicated better than static frames, because the format matched the outcome." },
      ],
      shots: [],
    },

    {
      label: "Depth as strength",
      kind: "quote",
      quote: "I didn't design 200 separate features. I spent four years shaping how those features became one product people could understand.",
      body: "The hardest design work wasn't any one feature. It was the system that holds them together: thinking about the whole, keeping coherence across complexity, understanding how products actually grow.",
      shots: [
        "/naya/workflow-final-reflection.png",
      ],
    },
  ],
}
,


  {
    id: "estimation-ai", n: "02", tag: "AI Platform", title: "Estimation AI",
    short: "Upload your product images, get a costed estimate in minutes.",
    role: "Senior Product Designer", timeline: "Naya Studio · 2022–2026", team: "Founders · Engineering · Me · Design team for feedback",
    stack: ["Figma", "Google AI Studio"],

    /* The second case study, not an example. It grew alongside the workflow
       platform across the same four years and ends up inside it — an
       estimate lands back in a Naya project as a PDF. The arc follows the
       founders' own account of the platform (LinkedIn, June 2026): why
       costing is a black box, four generations, how it works, where it is
       now. My part sits in the middle two generations. */
    feature: true,
    lede: "Costing a physical product is a black box: weeks of emails to suppliers, then a number with no explanation. Naya spent seven years opening it. I came in for the middle of that story, first inside the platform, where a project's own memory could estimate what was in it, then on the standalone app, moving a generic AI build onto Naya's brand one layer at a time and giving the estimate somewhere to land.",
    figures: [
      { v: "4", l: "generations in seven years" },
      { v: "6", l: "steps from any input to an estimate" },
      { v: "0s", l: "wait when you press Export" },
    ],

    overview: "Estimation AI turns whatever you have, a sketch, a photo, a 3D model or a bill of materials, into a costed estimate in minutes. You add a few details, the AI works through a visible plan, and a full breakdown comes back: materials, parts, labour, tooling, logistics. I picked up the standalone app after a first version had been generated in Google AI Studio. It worked, but it did not look like Naya, and the estimate it produced was a dead end: a number on a screen with nowhere to go.",
    outcomes: [
      "Shipped as an MVP that looks and behaves like the rest of Naya",
      "Export is instant: the file is built in the background before anyone asks for it",
      "Every estimate lands in a Naya project as a PDF, with its data sources as link blocks",
      {
        text: "Led to a dedicated Estimation landing page, where you upload your assets and start the estimate instead of doing it inside the app",
        shots: ["/work/estimation-ai-landing.png"],
      },
    ],
    caseStudy: [
      {
        label: "The question before every product",
        kind: "story",
        figure: { src: "/work/estimation-opener.png", alt: "A pair of headphones, a chair, a shoe, a parka and a multitool, each with a manufacturing cost tag that reads a question mark" },
        lead: "Imagine you've designed a product. A pair of headphones, say.",
        sub: "All you have is photos of the prototype.",
        pairs: [
          { a: "Before anyone funds it or builds it, you need one answer.", b: "What will it cost to make?" },
          { a: "Finding out means chasing quotes.", b: "Email suppliers, wait days or weeks, and get back numbers that differ by orders of magnitude, with no explanation." },
          { a: "Pick one, and the other quotes were wasted work.", b: "Then find out, months in, that the design was too costly to make." },
        ],
        close: "Costing is a black box. That was the design problem.",
        peep: "point",
      },

      {
        label: "What's inside the box?",
        kind: "points",
        body: [
          "A cost reads as one number. Getting to it means holding all of this at once, which is why it lives in one person's head, or in a spreadsheet nobody else can read.",
        ],
        points: [
          { t: "Parts", b: "The bill of materials: subassemblies, hardware, fasteners, consumables." },
          { t: "Process", b: "Machining, casting, moulding, welding, and the trade-offs between them." },
          { t: "Material", b: "Grade, sourcing and yield. Solid wood wastes a fifth to two fifths of the stock. Leather yields two thirds of the hide." },
          { t: "Supply chain", b: "Who can make it, where, and how long they take." },
          { t: "Logistics", b: "Freight, import duties and tariffs, the landed cost at the door." },
          { t: "Sustainability", b: "The second cost of every choice, and the first to be dropped when there is no time." },
        ],
        shots: [
          "/work/estimation-workflow-before.png",
          { src: "/work/estimation-li-challenges.png", wide: true },
        ],
      },

      {
        label: "How the platform answers it",
        kind: "timeline",
        body: [
          "It works at any stage. Early on, a fast should-cost to check a direction. Late, precision for sourcing and negotiation. The workflow is the same six steps either way.",
        ],
        steps: [
          { y: "01", t: "Start anywhere", b: "A brief, a sketch, a photo, a 3D model, a drawing, a bill of materials. There is no required starting point." },
          { y: "02", t: "Add a few details", b: "Order quantity, where it will be made, packaging, where it has to arrive." },
          { y: "03", t: "Bring what you know", b: "Past quotes, labour rates, material pricing, if you have them. If not, the platform sources what is relevant." },
          { y: "04", t: "The agents run", b: "Cost research, value engineering, scenario planning, duties and tariffs, shipping, each handled by its own agent." },
          { y: "05", t: "The estimate comes back", b: "Materials, parts, labour, overhead, tooling, processes, and where the cost can come down. In minutes." },
          { y: "06", t: "Adjust without starting over", b: "Change the quantity, the location or the material and the estimate updates in real time." },
        ],
        shots: [
          "/work/estimation-li-how-it-works.png",
          "/work/estimation-li-skills.png",
        ],
      },

      {
        label: "Seven years, four generations",
        kind: "timeline",
        figure: { src: "/work/estimation-li-timeline.png", wide: true, alt: "A timeline from 2020 to 2026: ML models for estimation, LLM integrations, project memory, agentic AI", cap: "The product journey, as the founders drew it" },
        body: [
          "Each generation fixed the limit of the one before it. The accuracy figures are Naya's own, from the founders' account.",
        ],
        steps: [
          { y: "Gen One", t: "Furniture only · 70%", b: "A chat trained on 5,000 data points that asked for dimensions and a material and returned a number. It worked for furniture, and could not read a file." },
          { y: "Gen Two", t: "Project memory · 85%", b: "Inside the platform. The journey's own images, documents and models became the input, and the estimate was written back into it. This is where I came in." },
          { y: "Gen Three", t: "Agents · 90%", b: "A standalone app. A network of agents, one per concern, returning a landed cost per unit with the breakdown behind it. The build I redesigned." },
          { y: "Gen Four", t: "Skills · 95%", b: "Industry expertise encoded as layers: material yields, labour rates, compliance, processes. The interface speaks each industry's language." },
        ],
        shots: [
          "/work/estimation-gen-one-chat.png",
          "/work/estimation-gen-two-journey.png",
          "/work/estimation-gen-three-report.png",
          "/work/estimation-li-skills.png",
        ],
      },

      {
        label: "My role",
        kind: "role",
        peep: "sit",
        body: [
          "Two of those generations are mine. In the second, I worked with the engineers on how the memory a project already holds could estimate what the product in it was worth, and on how the estimate should sit inside the journey.",
          "In the third, the idea became a standalone app, first generated in Google AI Studio. I took on its interface.",
          "I moved it onto Naya's brand a layer at a time, designed the report the AI produces, and gave the estimate somewhere to go.",
        ],
        shots: [],
      },

      {
        label: "So how does a number on a screen become something you can hand to someone?",
        kind: "pivot",
        peep: "ease",
        body: "Here's what I picked up and what I changed, in the order it happened.",
        shots: [],
      },

      {
        label: "What did I inherit?",
        body: [
          "The first build was put together fast in Google AI Studio. The flow worked: upload your images, answer a few questions, watch the AI plan and cost each part.",
          "But nothing about it felt like our product. A generic dark theme, default form controls, a squared-off primary button. The first thing you saw was a spinner on an empty page.",
          "And once the AI gave you a number, that was the end of it. You couldn't hand it to anyone, and there was no record of where it came from.",
        ],
        shots: [
          "/work/estimation-ai-before-1.png",
          "/work/estimation-ai-before-2.png",
          "/work/estimation-ai-before-3.png",
          "/work/estimation-ai-before-4.png",
        ],
      },

      {
        label: "Why not just redesign it?",
        kind: "points",
        body: "Three constraints, and none of them left room for the redesign this obviously wanted.",
        points: [
          { t: "A short timeline", b: "A full redesign would have stalled on it, so I turned one down and moved the surface a layer at a time instead." },
          { t: "No Figma file", b: "The interface existed only as code inside Google AI Studio. I learned the tool and edited it directly, rebuilding in Figma only the parts I needed to work through properly." },
          { t: "A slow export", b: "Hitting Export is exactly the wrong moment to make someone wait." },
        ],
        shots: [],
      },

      {
        label: "What changed, if the questions didn't?",
        kind: "beforeAfter",
        before: "A generic dark theme, default form controls, a squared-off primary button, and none of the type, elevation or radius we use everywhere else.",
        after: "Our light theme in place of the dark one, our typeface, our drop shadows for elevation, our corner radius on inputs and cards, and the pill shape on the primary action.",
        body: [
          "The questions and their order stayed exactly as they were. Only the surface moved.",
          "I also designed the report the AI produces, not just the form that feeds it: cost per unit, a confidence score, the sources it drew on, and the summary.",
        ],
        shots: [
          "/work/estimation-ai-new-1.png",
          "/work/estimation-ai-new-2.png",
          "/work/estimation-ai-new-3.png",
          "/work/estimation-ai-new-4.png",
          "/work/estimation-ai-new-5.png",
          "/work/estimation-ai-new-6.png",
        ],
      },

      {
        label: "Where does an estimate go?",
        kind: "beforeAfter",
        before: "The AI gave you a number and that was the end of it. You could not hand it to anyone, and there was no record of where it came from.",
        after: "Exporting writes the whole thing into a Naya Journey as a PDF, with every data source the AI used kept as link blocks inside a structured project.",
        body: "It stops being a number on a screen and becomes an estimate review you can share with stakeholders and come back to later. The black box gets an audit trail.",
        shots: [
          "/work/estimation-ai-export.png",
          "/work/estimation-ai-landing.png",
        ],
      },

      {
        label: "What about the wait on Export?",
        kind: "points",
        body: [
          "There were three ways to deal with it.",
          "We solved it with engineering, not with a spinner.",
        ],
        points: [
          { t: "Show a saving indicator", b: "Still a wait, in nicer clothes." },
          { t: "Leave it alone", b: "Fixes nothing." },
          { t: "Build it in the background", b: "Start the moment the estimate is generated. We went with this one: by the time anyone presses Export the file already exists, so it opens straight away." },
        ],
        shots: ["/work/estimation-costing-problem.png"],
      },

      {
        label: "Where is it now?",
        kind: "points",
        body: [
          "The fourth generation is the one Naya leads with. To see it from the user's side I modelled a hand tool of my own and ran it through: a landed cost per unit, an accuracy score, and every category of the cost, in minutes.",
          "The estimate is no longer the end of the workflow. It is the start of the next question.",
        ],
        points: [
          { t: "Value engineering", b: "Where the cost can come down, shown while you look at the design." },
          { t: "Scenario planning", b: "Quantity, route and tooling against cost, without regenerating the estimate." },
          { t: "Tuned to the company", b: "Enterprise teams layer in their own supplier pricing and cost rules, an hour or two of an expert's week, and the accuracy closes towards 99%." },
        ],
        shots: [
          "/work/estimation-report-today.png",
          "/work/estimation-li-value-engineering.png",
          "/work/estimation-li-scenario-planning.png",
          "/work/estimation-li-accuracy.png",
        ],
      },

      {
        label: "What it taught",
        kind: "quote",
        quote: "A redesign I turned down was the reason this shipped at all.",
        body: [
          "The timeline couldn't carry one, so the surface moved a layer at a time and the questions underneath never changed. The part that mattered most wasn't the theme at all. It was giving the estimate somewhere to land.",
          "Naya now leads with it. Estimation is the product a customer tries first, and Workflow is the one they stay for. MillerKnoll's VP of Product puts it at close to 70% of the team's time saved.",
        ],
        shots: [
          "/work/estimation-li-cover.png",
          "/work/estimation-li-roi.png",
        ],
      },
    ],
  },
  {
    id: "workflow-builder", n: "03", tag: "AI · Flagship", title: "AI Workflow Builder",
    partOf: "naya-workflow", archived: true,
    short: "Composable AI workflows teams can trust. Zero to one.",
    role: "Senior Product Designer", timeline: "Naya Studio · ongoing", team: "Founders · Engineering · Me · Design team for feedback",
    overview: "Naya helps product teams take ideas to production. The Workflow Builder brings AI into that journey. Teams set up intelligent, repeatable workflows instead of managing every step by hand. I owned the design end to end, from early framing with the founders to prototypes and handoff.",
    outcomes: ["Shipped as a flagship AI capability of the platform", "Template-first design made workflows reusable across teams", "Click-through code prototypes replaced static mocks in reviews"],
    caseStudy: [
      { label: "Problem", body: "Teams ran their product process manually. Repetitive setup, scattered steps, and no way to reuse what worked. AI could automate much of it, but only if people could see and trust what it was doing." },
      { label: "Constraints", body: "Startup pace, no long research runway, and AI capabilities that kept evolving while we designed. The design had to flex as the models improved, without re-teaching users." },
      { label: "Solution", body: "A builder organised around templates and progressive disclosure: start from a proven workflow, preview what the AI will do before it does it, and step in at any point. Complexity is available when you want it and hidden when you don't." },
      { label: "Interaction highlights", body: "Prototypes were built in working code with Claude, so the team reviewed real behaviour — transitions, empty states, and AI 'thinking' states — instead of imagining them from static frames." },
    ],
  },
  {
    id: "homebase", n: "04", tag: "Core Product", title: "Projects & Homebase Redesign",
    partOf: "naya-workflow", archived: true,
    short: "The surface every user starts their day on.",
    role: "Senior Product Designer", timeline: "Naya Studio", team: "Founders · Engineering · Me · Design team for feedback",
    stack: ["Claude Code", "Antigravity IDE", "Vercel"],
    overview: "Homebase is the first thing you see when you open Naya: every project, group, template and block you have access to. It had grown one control at a time and it showed — the filters read like page navigation, cards gave you a picture and a name but never said what they were, and the list view sorted by things nobody needed. The redesign came down to one decision about hierarchy. Creating something is why most people open this screen, so that keeps the first cell at full size. Everything else had to earn its place.",
    outcomes: [
      "The create tile kept the first cell on purpose, but went from three competing actions to two with a clear rank",
      "'Journey' became 'project' throughout, matching the word people already used for it",
      "Cards say what they are before you click: a group composes its cover from what's inside it",
      "Filter, sort and view collapsed into one control cluster instead of scattered navigation",
      "Favouriting became pinning — ordering you control, not sentiment",
    ],
    caseStudy: [
      {
        label: "Problem",
        body: "The most important thing on the screen was also the most confusing. Three create actions shared the first cell — New journey, AI journey builder, Use template — in three different purples with no rank between them, so the one you wanted was a guess. Above them, Projects · Blocks · Everything sat left-aligned like page navigation even though it only filtered what was already on screen, and Everything is where most people left it. The cards had the reverse problem: a photo, a name pill and a heart meant a project, a group of projects and a single block all looked identical until you opened one. And in list view the columns had stopped earning their place — Size, in megabytes, for a project — while the thing people actually wanted to know, where something stands, had no column at all.",
        shots: [
          "/work/homebase-before-1.png", // grid: three competing purples in the first cell
          "/work/homebase-before-2.png", // list: same three actions as buttons, Size column
        ],
      },
      { label: "Constraints", body: "This is the screen everyone opens first, every day, so it had to stay recognisable on the first load — same grid, same card shape, same things in the same places. Nobody should have to relearn their own workspace. It also had to be designed twice: people pick grid or list and stay there, so every decision needed an answer in both. And one card system had to hold everything Naya has — projects, groups, blocks, templates, links, files — without special cases for each." },
      {
        label: "Solution",
        body: "The create tile stayed in the first cell, and that was the deliberate part. Starting something is the reason most people open Homebase, so it keeps the position and the full-size purple; what it lost was the crowd. Three actions became two with an obvious rank — New Project, then Use a template — and 'journey' became 'project' everywhere, matching the word people already used. Everything that was not creating moved right and became one cluster: Projects · Blocks · Everything as a segmented control, Sort beside it, view toggles last, with a Projects header above the results so the filter stays legible as a label and not only as a highlighted pill. Then cards were given one job — tell me what you are before I click you. A group composes its cover from the first few things inside it, so a container looks like a container. A badge in the corner marks the type. Anything published carries its own state, Live and how many people have seen it. And the heart became a pin, because what people wanted was never to love a project, it was to keep it at the top.",
        shots: [
          "/work/homebase-new-1.png", // shipped grid: two-action tile, group covers, pins
          "/work/homebase-new-2.png", // shipped list: Status column, inline metadata
        ],
      },
      {
        label: "Component design",
        body: "The page sits on #FAFAFA rather than white, so white itself can carry meaning. Every control group became an island: a white pill, 40px tall with 4px of inset padding, holding three 32px chips, lifted off the background by one shadow — 1px offset, 3px blur, black at 6%. Filter, sort and view are three separate islands instead of a row of loose buttons, and the grouping does the explaining. This island changes what you see, this one the order, this one the shape. It is also why the tabs left the far left and moved beside Sort. Against the page edge they read as page navigation; sitting next to Sort they read as what they actually are, three controls over one list. Chips resolve in Naya purple #4F00C1 on an #F1EBFA tint when active, and plain #F5F5F5 on hover, so selected and hovered can never be mistaken for each other. Labels are Rand at 13px medium, icons at 24px, 6px between them.",
      },
      { label: "Interaction highlights", body: "Tiles follow the same rule — say what you are, then get out of the way. The cover fills the frame; the name sits in a white pill at the top-left so it survives any image behind it; the type badge holds the bottom-left; and the pin is the only control on the card, top-right, sitting at zero opacity until you hover. It stays visible once the project is actually pinned, so a pinned card and a merely hovered one never look the same. Covers are generated, never chosen: a group composes its own from the first few things inside it, and a half-full group leaves the empty cells blank instead of stretching two thumbnails across four, so 'this has two things in it' reads at a glance. A project with no imagery yet sets its own name large in purple rather than showing an empty frame — an early project still looks like something, which matters on a screen you see before you have done any work. In list view the same restraint governs the row: share and open surface only on the row under the cursor, and an empty Status is a dashed chip in grey that turns purple on approach and takes the status in place, no dialog and no leaving your list." },
      { label: "Built as a prototype", body: "None of this was handed over as a Figma file for someone else to interpret. The surface was built as a working prototype in code — Claude Code and the Antigravity IDE — and deployed on Vercel, so engineering got a URL they could click through instead of frames they had to infer behaviour from. The hover reveals, the empty states, the pin that appears and then stays, the dashed Add status chip: all of it was decided and demonstrable before a ticket was written, which is why the shipped screens and the prototype still agree." },
    ],
  },
  {
    id: "sharing", n: "05", tag: "Collaboration", title: "Group Sharing",
    partOf: "naya-workflow", archived: true,
    short: "Share the folder, not the file.",
    role: "Senior Product Designer", timeline: "Naya Studio", team: "Founders · Engineering · Me · Design team for feedback",
    duration: "1 week, research to handoff",
    stack: ["Claude Code", "Antigravity IDE", "Vercel"],
    process: [
      { day: "Day 1", t: "Research",
        b: "How Drive, Slack, Discord and Figma teams each solve shared access — and what people actually meant when they asked for one." },
      { day: "Day 2", t: "Scoping the model",
        b: "Sized workspaces with engineering, ruled them out with the founders, and settled on sharing a group you already keep." },
      { day: "Day 3", t: "Access logic",
        b: "Inheritance, direct shares stacking rather than competing, what removal closes, and who is allowed to share at all." },
      { day: "Day 4", t: "Prototype", loop: true,
        b: "Built the modal, the move-out confirmation and the snackbars as a working build, deployed for anyone to click through." },
      { day: "Day 5", t: "Feedback", loop: true,
        b: "Reviewed with founders and engineering on the live prototype; the confirmation copy and the blocked-action wording changed here." },
      { day: "Day 5", t: "Handoff",
        b: "Spec plus the prototype URL, so engineering built from behaviour they could try rather than frames to interpret." },
    ],
    overview: "Naya had groups, but they were personal furniture — a place to organise your own projects that nobody else could see. Sharing was a separate mechanism and it worked one project, one person at a time. What teams kept asking for was smaller than it sounded: one place where everyone sees the same projects. The complete answer to that is workspaces, and we ruled workspaces out. What shipped is closer to a Drive shared folder — share a group you already have, and everything in it goes with it.",
    outcomes: [
      "Groups became a sharing unit: share the group once instead of each project to each person",
      "Access inside a shared group is inherited from the group, and direct shares stack on top instead of being overwritten",
      "Removing someone from a group closes only the route the group opened — a direct share survives it",
      "Editing is the gate: you can share a group only if you can edit everything inside it, and no invite grants a role above your own",
      "Every action that costs someone access confirms first and names the people by name",
    ],
    caseStudy: [
      {
        label: "Problem",
        body: "A group was one person's idea of order. You could make one, drop projects into it, and nobody else ever saw it — two people could file the same project into two different groups and both were right, because groups organised and nothing more. Sharing was somewhere else entirely, and it went one at a time: this project, to this person, at this role, repeated for every project and every member. Five people across a ten-project engagement is fifty of those actions, with no way to check afterwards which one you missed. And the thing teams actually asked for wasn't a permissions feature. It was a shelf everyone could see.",
        shots: [
          "/work/sharing-before-1.png", // a group before sharing existed: projects, no way in
        ],
      },
      { label: "Constraints", body: "This was an MVP with a real ceiling on build cost. The complete answer is a workspace — the Slack, Discord and Figma-teams model, where an org is the container and everything hangs off it — and design and the founders ruled it out together once engineering sized it. It rewrites who owns what, so it isn't a feature you add, it's a foundation you replace. The model had to be assembled from what already existed instead: groups, projects, and the invite roles we already had. It also had to carry both kinds of access at once, because individual sharing wasn't going anywhere — a project can be reached by ten people through a group and by one more directly, and neither can break the other. And nothing could quietly take access away from anyone." },
      {
        label: "Solution",
        body: "We took the shape of a Drive shared folder rather than a workspace: you don't create a team, you share a folder you already keep. Share group opens on the group instead of the project — one email field, one role, one Invite, and above it the rule in the plainest sentence we could write, that collaborators you invite to this group can access everything in it. From there access is inherited. Everyone in the group reaches everything in it at the role the group gave them, and a project that is also shared with someone directly keeps that share as well; inherited and direct stack rather than compete, so the person you invited to a single project doesn't silently lose it when the group changes around them. That is also what decided removal. Taking someone out of a group closes the route the group opened and nothing else — the people who reached a project only through it lose it, and a direct share survives. It's deliberately narrower than what Drive does, because it matches what people mean when they take someone off a team: end the team's access, not the favour you did somebody. Sharing itself is gated on editing rather than owning, so a viewer can organise privately but can't re-broadcast someone else's work, and no invite can hand out a role higher than the one you hold.",
        shots: [
          "/work/sharing-new-1.png", // Share group modal: one role, one rule stated above the field
        ],
      },
      {
        label: "Interaction highlights",
        body: "Anything that costs someone access asks first, and it names them. Move a project out of a shared group and the dialog tells you who could only reach it through that group — face, name, email address — before you commit, rather than a generic warning about permissions. Everything else is a snackbar, because most of these actions aren't dangerous, they're just invisible: add a project to a shared group and it confirms where it landed and who can now see it. Blocked actions answer in the same place and in the same voice — this project already lives in a shared group and can only be in one, or you only have view access to this group, so you can't share it.",
        shots: [
          "/work/sharing-new-2.png", // confirmation naming exactly who loses access
          "/work/sharing-new-3.png", // snackbar: added, and who can now see it
        ],
      },
      {
        label: "Seven confirmations, one component",
        body: "Moving something in or out of a shared group can cost people access in seven different ways, and each one needed its own sentence — but not its own dialog. One component covers all of them and changes only what it says. Moving a project out of a group it inherits from: 'Change who has access?', then the plain consequence, that anyone shared only through this group loses it. Adding a project to a group shared more widely than its parent flips the direction entirely — 'Share with more people?', because the risk is exposure rather than removal. Removing it outright names the loss precisely and leads with the action: 'Remove Onboarding Flow from Research.' A project can live in only one shared group, so moving it between two is a relocation, not a copy — 'Move X to Research?' followed by the fact that it leaves the group it was in. When the group it is leaving belongs to someone else, the dialog says so plainly: it lives in a group you don't manage, and moving it both removes it from there and shares it with everyone here. Ungrouping is the widest of all and gets the bluntest line, that the shared group goes away and these people lose access. Wherever access is actually lost, the dialog stops describing and starts listing: avatar, name and email address for every person, scrolling if the list runs long. Nobody has to translate a permissions warning into people.",
      },
      {
        label: "Eleven messages, one voice",
        body: "Most of what happens here is not dangerous, just invisible, so it answers in a snackbar instead of a dialog. They fall into three groups and the shape of each is deliberate. Confirmations tell you the consequence, not the operation: 'Added to Research. Everyone in this group can now access Onboarding Flow' — where it went and who can see it now, in one sentence. Refusals always name the reason rather than the rule, and they are given more time on screen than a confirmation, five seconds against four, because a denial has to be read to be useful: you only have view access to this group, so you can't share it; you can't share it because you only have view access to something inside it; this project already lives in another shared group and can only be in one place. And reversals carry Undo rather than a confirmation up front — 'Removed from group, now in homebase' and 'Group ungrouped' both undo in a click, because asking permission for something this cheap to reverse is friction with no payoff. The last one is neither: request access on something you cannot open, and it confirms the request was sent and that the owner will hear about it, so a dead end becomes a next step.",
      },
    ],
  },
  {
    id: "design-system", n: "06", tag: "Foundations", title: "Design System",
    partOf: "naya-workflow", archived: true,
    short: "A Figma file nobody could keep current, rebuilt as a file Claude reads.",
    role: "Senior Product Designer", timeline: "Naya Studio · ongoing", team: "Design · Engineering",
    stack: ["Figma", "Claude Code"],
    overview: "Naya had a design system file. What people actually took from it was colours and fonts — the rest of the decisions got made again on every screen. I spent two years adding the parts that were missing, starting with elevation and button states, then building a Blocks file to answer the question that was costing everyone the most time: which version of this component is the current one? Then design moved to Claude, and a Figma library stopped being the right container for any of it. The system now lives in nayadesign.md, written to be read by the thing that draws the interface.",
    outcomes: [
      "Elevation became a six-step ladder tied to what a surface is, not how important it is",
      "Button hover and pressed states became a formula — a 4% and an 8% overlay — instead of a shade someone picked",
      "One Blocks file replaced the guess about which of several Figma files held the current component",
      "The system now ships as nayadesign.md, so prototypes built with Claude inherit the brand instead of approximating it",
      "The four things that carry the brand — pill controls, the #FAFAFA page, Rand at medium, one icon stroke weight — are written down rather than passed on",
    ],
    caseStudy: [
      {
        label: "Problem",
        body: "The design system file existed and everyone opened it, but only two things ever came out of it: the colours and the type. Everything past that was a decision each screen made on its own. There was no answer to how far a surface should lift off the page, so shadows were eyeballed and no two panels agreed. There was no answer to what a button does when you hover it, so every hover state was a purple somebody had picked once and nobody could re-derive. And as the product grew, so did the number of Figma files — which turned the library into a search problem. You would find a component, have no way to tell whether it was the latest one, and give up: detach the instance, change what you needed on top of it, move on. That is a rational thing to do under deadline, and it is also the thing that quietly ends a design system. Every detached copy is a component that will never receive another update.",
      },
      {
        label: "Constraints",
        body: "A small team at startup pace will not adopt a system that costs more to follow than to skip, so anything requiring ceremony was out — no approval step, no weekly library review. It also had to work retroactively: the product was already built, so any new standard had to be something existing screens could be moved onto gradually rather than a rewrite. And I was adding to someone else's foundation, not starting one, which meant the parts I contributed had to sit underneath what was already there without invalidating it.",
      },
      {
        label: "Elevation, and the rule underneath it",
        body: "The first gap I filled was elevation, and I went to Material Design 3 and Apple's Human Interface Guidelines for it rather than inventing a ladder. What Material gave me was the reason shadows look wrong when you guess: real elevation is two lights, not one. A key light casts a tight, offset, higher-opacity shadow, and an ambient light casts a wide, soft, faint one. Every level in our ladder is two layers for that reason, which is why a Naya card looks seated rather than pasted on. I set six steps and tied each one to what a surface is, not to how much it matters — a resting card and a control island both sit at level one, a dropdown at three, a modal at five — because 'important' is the judgement call that had produced the mess in the first place. Two rules came with it: one step of change per interaction, so a card at rest goes up one on hover and never jumps to modal depth; and never a shadow and a border on the same edge, pick one. That last rule is what makes the #FAFAFA page background load-bearing — it is what lets a white surface read as a raised object without needing an outline.",
      },
      {
        label: "Four percent and eight percent",
        body: "The second gap was button states, and the fix was to stop treating hover as a colour and start treating it as a formula. Material 3's state layer model composites a translucent overlay over whatever the button's resting fill is: 4% for hover, 8% for pressed. Which colour overlays depends on the surface rather than the button — black on a light surface so it darkens, white on a dark or brand-filled one so it lifts. The whole point is that it generalises. A neutral button on white hovers to #F5F5F5 and presses to #EBEBEB, and those are not values anyone chose; they are white with 4% and 8% of black over it. Add a colour to the system tomorrow and its states already exist. I also specified that focus never changes the fill — it gets a ring instead, on :focus-visible, so keyboard users get a state that pointer users cannot accidentally trigger — and that disabled buttons get their own fill and text colour rather than reduced opacity, because fading the whole button takes the label below contrast.",
      },
      {
        label: "Blocks: one file to look in",
        body: "None of the above solves the detaching problem, because that was never about standards — it was about not knowing what is current. So I made a Figma file called Blocks component collection and gave it one job: be the place you look. Components that were finished went in as the canonical version. Components that were still moving went in as reference, marked as such, so the file could tell you 'this exists and it is not settled' instead of leaving you to infer it from silence. That distinction is most of the value. The failure mode before was not people choosing a stale component; it was people unable to tell a stale one from a current one, so they treated everything as stale and detached by default. One file with an honest status on each thing made the instance worth keeping.",
      },
      {
        label: "Then design moved to Claude",
        body: "We now design Claude-first: the interface gets built as working code in Claude Code rather than assembled from components by hand in Figma, and the prototype is what goes to engineering. That change makes a Figma library the wrong container for a design system. The consumer of the system is no longer a designer dragging in an instance — it is a model writing the markup, and a model cannot open a Figma file, read a shadow off a panel, or notice that a component is the outdated one. It will write something plausible instead, and plausible is exactly how drift starts. So the system had to become text.",
      },
      {
        label: "nayadesign.md",
        body: "The system is now a single markdown file, written to be read by Claude before it writes any interface. It carries typography — the Rand stack with its fallback, the four weights and what each is for, and a scale where every size is paired with a line height so nothing is left to the browser. It carries colour as two layers, primitives and semantic tokens, with the rule that components reference tokens and never the raw ramp. It carries the elevation ladder and the radius scale, including the one that gives Naya its shape: everything clickable that is not a card is a pill. It carries both button variants with their state layers resolved to flat hexes, the avatar sizes and the initials fallback, and Lucide as the icon library with a size and a stroke weight per context. It ends with working rules — never invent a value, match the file you are editing, prototypes are not the spec, this file is — and a note on the one place where shipped product still disagrees with the standard, named rather than hidden, because a system that pretends to be perfectly applied is a system nobody trusts twice.",
      },
    ],
  },
  {
    id: "monetisation", n: "07", tag: "Monetisation", title: "Subscriptions, Teams & Stripe",
    partOf: "naya-workflow", archived: true,
    short: "Subscriptions and payments, designed for trust.",
    role: "Senior Product Designer", timeline: "Naya Studio", team: "Founders · Engineering · Me · Design team for feedback",
    overview: "Enabling monetisation required designing for trust. Every step, from plan selection to payment confirmation, needed to feel safe, clear, and frictionless.",
    outcomes: ["Launched subscriptions, teams and per-seat pricing", "Every billing edge case mapped with engineering before build", "Checkout designed for trust at every step"],
    caseStudy: [
      { label: "Problem", body: "The product needed to start charging: plans, team seats, upgrades, and billing, without making early users feel like they'd hit a wall of paywalls." },
      { label: "Constraints", body: "Payments have no room for ambiguity. Every edge case (failed cards, seat changes mid-cycle, downgrades with data) had to be designed, not discovered in support tickets." },
      { label: "Solution", body: "A checkout and billing flow that explains itself: what you're paying, what changes, and what happens next, with upgrade paths placed where the need arises instead of behind a pricing page." },
      { label: "Interaction highlights", body: "Edge cases were mapped with engineering as flows, not tickets, so error and recovery states shipped with the feature instead of after it." },
    ],
  },
  {
    /* Lives in the Side projects row rather than Selected work, but carries a
       full case study — so it opens the same sheet the Naya projects do. */
    id: "yoink", n: "08", side: true, tag: "Solo · Shipped", title: "Yoink",
    short: "Copy any UI on the web. Paste it in Figma as editable layers.",
    role: "Designer and sole builder", timeline: "Personal · shipped on the Chrome Web Store",
    team: "Me",
    href: "https://chromewebstore.google.com/detail/yoink/lecfomokhlobahfkpojglfcigbbdckia",
    hrefLabel: "Install from the Chrome Web Store",
    overview: "Yoink is a Chrome extension that takes any interface on the web and puts it into Figma as real, editable layers — text that is still text, fonts, colours, images and auto-layout intact. I designed it and built it on my own, and it is live on the Chrome Web Store: free forever, MIT licensed, and entirely offline. It is the one piece of work here where I own every decision and can show every part of it.",
    outcomes: [
      "Shipped publicly on the Chrome Web Store, free with no account and no paid tier",
      "Open source under MIT — the whole implementation is readable",
      "Runs entirely in the browser: no servers, no sign-up, no tracking, zero data collected",
      "Three capture modes cover the three ways designers actually reach for a reference: whole screen, one element, several at once",
      "Every capture is stored locally, so a page behind a login can be re-copied without going back to it",
    ],
    caseStudy: [
      {
        label: "Problem",
        body: "Rebuilding someone else's interface in Figma is slow, and the shortcut everyone takes makes it slower. You screenshot the page, drop the image on the canvas, and now you are holding a picture: the text is not text, the colours cannot be sampled into styles, the spacing has to be measured by eye, and nothing can be pulled apart. Every reference you gather has to be rebuilt by hand before it is any use — which is the exact work you were trying to skip.",
        shots: [],
      },
      {
        label: "Constraints",
        body: "Solo build, no backend, no budget, and no appetite for either. Designers capture client work, competitor products and internal tools behind logins, so anything that sent a page to a server was disqualified on the first day — that is the constraint that decided the architecture, not a feature added later. It also had to work on any site rather than a curated list, which rules out per-site handling. And Figma cannot be written to from outside, so the last step leans on the free html.to.design plugin; the design had to make that dependency a one-time setup rather than a step in every capture.",
        shots: [],
      },
      {
        label: "Solution",
        body: "A dock instead of a popup. Browser extensions usually hide behind a toolbar icon, which puts a click between you and the thing you are pointing at, and closes the moment you look away. Yoink opens a persistent bar along the bottom of the page — the page stays fully usable underneath it, so you can open a menu, trigger a hover state, or scroll to the section you actually want, and only then capture. The three modes on that bar are the three real intents, named plainly: Entire screen, Select element, Multi-select. Then it is ⌘V in Figma and the UI lands as layers.",
        shots: [
          "/work/yoink-3.png", // element selection: overlay names the element and its size
          "/work/yoink-2.png", // three clicks from webpage to Figma
        ],
      },
      {
        label: "Interaction highlights",
        body: "Selection tells you what you are about to get before you commit to it: hovering outlines the element and labels it with its selector and pixel dimensions — div.card · 312 × 178 — so you can see whether you have grabbed the card or the wrapper around it without guessing. Confirmation stays in the dock as a quiet 'copied ✓' rather than a toast that covers the page you are working on. Everything has a key: ⌘⇧Y opens the dock, ⌘⇧U takes the viewport outright, S and M switch modes — so a capture never requires the mouse to leave what it is pointing at. And because capturing the viewport happens instantly, hover states survive: you hold the state, hit the shortcut, and it comes through.",
        shots: [
          "/work/yoink-4.png", // multi-select, capture history, keyboard-first, real text
        ],
      },
      {
        label: "Private by design",
        body: "The privacy position is the product, so it is stated on the page rather than buried in a policy: no servers, no account, no tracking, MIT licensed. Every capture is processed in the browser and saved to local storage, which is also what makes capture history possible without an account — the last thing you yoinked is still there tomorrow, and re-copying it never touches the network. For anyone pasting a client's product or an internal tool, that is not a nice-to-have, it is the reason they can use it at all.",
        shots: [
          "/work/yoink-5.png", // everything on your device
        ],
      },
    ],
  },
];

/* Archived, not deleted. These five are areas of the workflow platform and
   their case studies stay written above — the page shows the two studies,
   and this line keeps the scope of the work on the page. Setting
   archived:false on any of them puts its card back under its parent. */
export const ARCHIVE = "Homebase · Group Sharing · Design System · Subscriptions & Teams · AI Workflow Builder · Saved Views · Comments · Notifications · Onboarding · Mobile PM";

export const BUILT = [
  {
    slug: "email-signature-generator", name: "Email Signature Generator", kind: "Internal tool",
    desc: "Replaced a three-week, three-person manual process.",
    about: "Getting a branded email signature used to take three weeks and three people across design, dev and marketing — and still ended in manual copy-paste. This tool replaced all of that: type your name, hit copy, paste into Gmail. Everyone at the company gets an on-brand signature, animated logo included, fully self-serve.",
  },
  {
    slug: "qr-code-builder", name: "QR Code Builder", kind: "Internal tool",
    desc: "On-brand QR codes, self-serve for the whole company.",
    about: "Custom, on-brand QR codes for business cards and print — generated self-serve by anyone in the company, ready to share. Designed and built end to end.",
  },
];

/* The hero says four plain things instead of one tagline. Each is a fact a
   stranger can check further down the page or on the resume. */
export const ABOUT_POINTS = [
  /* A point can be a string, or { t, b, href? }: the sentence, then a bold
     line under it, which links somewhere when href is set. */
  { t: "I design award-winning platforms: four years as Senior Product Designer at Naya Studio.",
    b: "iF Design Award winner for UX.", href: "https://ifdesign.com/en/winner-ranking/project/naya/643559" },
  { t: "A computer science graduate who started in graphic design and never stopped building.",
    b: "Designed for TEDxJNEC." },
  { t: "I design in Figma, then build the prototype in working code.",
    b: "This site is one of those prototypes." },
  { t: "On the side I ship my own tools — Yoink pastes any website into Figma as editable layers.",
    b: "Check out Yoink, which I built with Claude Code.", href: "#/work/yoink" },
];

/* What it is like to have me on the team, in the first person. `t` is the
   sentence that makes the claim and `d` the work that backs it; `proof` is a
   project id the link opens, `label` names it. `mark` underlines the one
   line to leave with. */
export const WORKING_WITH_ME = [
  { t: "You review a working prototype, not a mock.",
    d: "I explore directions as coded prototypes with real states and motion, so engineers click through the feature before they build it instead of decoding a spec.",
    proof: "naya-workflow", label: "Naya Workflow Platform" },
  { t: "I cut scope before I cut quality.",
    d: "When a full workspace model was three months of engineering we didn't have, I designed Group Sharing instead. It was smaller, and it shipped.",
    proof: "sharing", label: "Group Sharing" },
  { t: "I write it down before I draw it.",
    d: "Problem, scope and what success looks like go in a PRD first, so founders and engineers are arguing about the same thing before there are pixels to defend." },
  { t: "If AI made it, you should be able to see how.",
    d: "An AI answer nobody can audit is a dead end. Estimation AI shows its plan as it works and files every estimate with its data sources attached.",
    proof: "estimation-ai", label: "Estimation AI" },
  { t: "I pick up what is lying on the floor.", mark: true,
    d: "A three-week, three-person signature process became a self-serve tool because nobody owned it. Same story for the QR builder, launch videos and App Store copy.",
    href: "#side", label: "Side projects" },
];

/* What each missing Naya screenshot should show, in plain words. The dev
   server prints the hint in the empty slot, above the path to drop the file
   at. Delete a line once its file exists; nothing reads it after that. */
export const SHOT_HINTS = {
  "/naya/workflow-product-overview.png": "A full journey, zoomed out: image blocks, a PDF, a 3D model and a few comments visible. The one screen that says what Naya is.",
  "/naya/workflow-project-context.png": "Homebase today: project cards with cover, item count, status and collaborator avatars.",
  "/naya/workflow-project-evolution.png": "Homebase before the redesign, so the two sit side by side. An old screenshot or a Figma frame is fine.",
  "/naya/workflow-phases-structure.png": "A journey with phases visible: the phase headers and the blocks under each.",
  "/naya/workflow-blocks-hierarchy.png": "A group opened to show the blocks inside it, or the expanded view of one block.",
  "/naya/workflow-group-sharing.png": "The Share group dialog: email field, role, Invite, and the sentence about inherited access.",
  "/naya/workflow-collaboration-inheritance.png": "A project's share list showing someone with access via a group and someone with a direct share.",
  "/naya/workflow-group-sharing-flow.png": "The Figma flow for group sharing, or the remove-from-group confirmation.",
  "/naya/workflow-mobile-flow.png": "Phone screenshots: Studio, then a journey, then Preview. Three phone frames side by side in one PNG is ideal.",
  "/naya/workflow-3d-viewer-mobile.png": "A 3D model open on a phone, mid-rotate.",
  "/naya/workflow-design-system-components.png": "A Figma page or a nayadesign.md excerpt: buttons, avatars, icons, the type scale.",
  "/naya/workflow-design-system-patterns.png": "Two or three shipped screens that share the same modal, snackbar and pill buttons.",
  "/naya/workflow-evolution-2022.png": "The oldest Naya screenshot you have: projects and basic sharing, 2022.",
  "/naya/workflow-evolution-2023.png": "A 2023 journey with phases and blocks.",
  "/naya/workflow-evolution-2024.png": "A 2024 screen: comments open on a block, or the mobile app.",
  "/naya/workflow-evolution-2025.png": "A 2025 screen: project memory on, or the estimate PDF inside a project.",
  "/naya/workflow-process-evolution.png": "A coded prototype running on Vercel, browser chrome included so the URL shows.",
  "/naya/workflow-multi-in-ask.png": "The generate dialog after the right-click: what you asked for, over the assets it will read.",
  "/naya/workflow-multi-in-menu.png": "The right-click menu open on that selection, with the generate options showing.",
  "/naya/workflow-multi-in-result.png": "The generated product, render or summary landed in the journey.",
  "/naya/workflow-estimation-connection.png": "The estimate PDF sitting in a Naya project as a block, with its link blocks beside it.",
  "/naya/workflow-feature-gallery-1.png": "Any shipped screen you are proud of, 1 of 3. Different surfaces work best: desktop, mobile, a modal.",
  "/naya/workflow-feature-gallery-2.png": "Any shipped screen you are proud of, 2 of 3.",
  "/naya/workflow-feature-gallery-3.png": "Any shipped screen you are proud of, 3 of 3.",
  "/naya/workflow-final-reflection.png": "One wide, calm screenshot of the product to close on. A full journey works.",
  "/naya/site-feedback.mp4": "The feedback section loop from the Workflow AI site: a comment on a 3D model, a timed comment on a video.",
  "/naya/site-search.mp4": "The AI search section loop from the Workflow AI site.",
  "/naya/site-integrations.png": "The integrations visual from the site: the tool tiles and a project holding files from each.",
  "/naya/site-views.png": "The views visual from the site: timeline view over a project, and the client / manufacturer view switch.",
  "/naya/site-ai-tools.png": "The AI tools visual from the site: cost estimate, sketch to 3D model to rendering.",
};

/* Shared narrative used by both versions' process sections. */
export const PROCESS = [
  { t: "It starts with a question", d: "Product strategy with founders — roadmap prioritisation, grounded in user insights." },
  { t: "Then it goes on paper", d: "Problem, scope and success metrics in a PRD. Stakeholder alignment before pixels." },
  { t: "I study who's solved it", d: "UX research and competitive analysis across the products that got it right." },
  { t: "Sketches become software", d: "User flows, wireframes, interaction design — then high-fidelity prototypes in working code." },
  { t: "Engineers take the baton", d: "Design specs, developer handoff and design QA, with a running preview to build from." },
  { t: "And we listen, always", d: "Usability testing and cross-functional feedback between every stage — iterate, ship, repeat." },
];


/* The line under each screen: what it is, in one breath. */
export const SHOT_CAPS = {
  "/naya/workflow-five-promises.png": "The five promises the company reset around, laid along the journey a project runs.",
  "/naya/workflow-product-overview.png": "A MillerKnoll journey zoomed out: phases across the top, blocks under each.",
  "/naya/brief-to-tracking.png": "Before Naya: a brief in a PDF, a plan in a sheet, progress tracked by hand.",
  "/naya/scattered-apps.jpg": "Where one desk lived before Naya: an email, a folder, a Miro board, a Drive and a row of tabs.",
  "/naya/tangle.png": "Stages, file types, stakeholders and platforms multiplied into one tangle.",
  "/naya/workflow-project-context.png": "Homebase today: project cards with a cover, a count, a status and the team.",
  "/naya/workflow-project-evolution.png": "Homebase before the redesign, as a Figma frame, for comparison.",
  "/naya/workflow-phases-structure.png": "A journey template: phase headers with the blocks that belong to each.",
  "/naya/workflow-blocks-hierarchy.png": "One block opened in preview, a 3D model with the viewer's tools.",
  "/naya/workflow-group-sharing.png": "The Share group dialog: an email, a role, and the sentence about inherited access.",
  "/naya/workflow-collaboration-inheritance.png": "Added to a group: everyone in it can now open the project.",
  "/naya/workflow-group-sharing-flow.png": "Moving a project out of a group: the confirmation names who loses access.",
  "/naya/workflow-mobile-flow.png": "A journey on an iPad, with search and filters open.",
  "/naya/workflow-3d-viewer-mobile.png": "A 3D model open in the viewer, mid-rotate.",
  "/naya/workflow-design-system-components.png": "The design system's parts: buttons, avatars, icons and the type scale.",
  "/naya/workflow-design-system-patterns.png": "Three shipped screens, a journey, a dialog and a comment, drawn from one system.",
  "/naya/workflow-evolution-2022.png": "The early Homebase: projects in a grid, shared one at a time.",
  "/naya/workflow-evolution-2023.png": "2023: a journey with phases and blocks.",
  "/naya/workflow-evolution-2024.png": "2024: a comment pinned to a 3D model, the thread open beside it.",
  "/naya/workflow-evolution-2025.png": "2025: AI search reading the whole journey.",
  "/naya/workflow-process-evolution.png": "A coded prototype running on Vercel, the URL in the bar.",
  "/naya/workflow-multi-in-menu.png": "Right-click on a selection: the generate options in the menu.",
  "/naya/workflow-multi-in-ask.png": "The ask, written over the assets the AI will read.",
  "/naya/workflow-multi-in-result.png": "What came back, landed in the journey as a block.",
  "/naya/workflow-estimation-connection.png": "An estimate inside a Naya journey, its sources kept as link blocks.",
  "/naya/site-integrations.png": "The site's integrations visual: the tools, and a project holding files from each.",
  "/naya/site-views.png": "The site's views visual: a timeline over a project, and the client or manufacturer switch.",
  "/naya/site-ai-tools.png": "The site's AI visual: a cost estimate, then sketch to model to rendering.",
  "/naya/workflow-feature-gallery-1.png": "Team notes opened in preview.",
  "/naya/workflow-feature-gallery-2.png": "The block menu, open on a journey.",
  "/naya/workflow-feature-gallery-3.png": "A comment opened on a block.",
  "/naya/workflow-final-reflection.png": "A full journey, at rest.",
  "/work/estimation-ai-landing.png": "The Estimation landing page: upload your assets and start.",
  "/work/estimation-li-challenges.png": "The same weeks, drawn as the founders see them: chasing, waiting, redesigning.",
  "/work/estimation-li-how-it-works.png": "The six steps as the product shows them, from any starting point to an estimate.",
  "/work/estimation-li-skills.png": "Industry skills: what each one knows about materials, labour and compliance.",
  "/work/estimation-li-timeline.png": "Seven years of estimation, from ML models to agentic AI.",
  "/work/estimation-li-gen-one.png": "Gen One: a chat that asked for dimensions and returned a number.",
  "/work/estimation-li-gen-two.png": "Gen Two: an estimate generated from the memory of a Naya journey.",
  "/work/estimation-li-gen-three.png": "Gen Three: agents return a full cost breakdown.",
  "/work/estimation-workflow-before.png": "The old workflow, day 0 to week 6: spec, email suppliers, wait, compare quotes that don't compare, pick one.",
  "/work/estimation-gen-one-chat.png": "Gen One: a chat that asked for dimensions and a material and returned a number.",
  "/work/estimation-gen-two-journey.png": "Gen Two: the estimate written into a Naya journey from what the project already held.",
  "/work/estimation-gen-three-report.png": "Gen Three: agents return a landed cost per unit with the breakdown behind it.",
  "/work/estimation-report-today.png": "The report today, for a hand tool I modelled myself: cost per unit, an accuracy score, every category.",
  "/work/estimation-li-accuracy.png": "How the last stretch closes: feedback, then skills, then the company's own data.",
  "/work/estimation-ai-before-1.png": "Inherited: a spinner on an empty page.",
  "/work/estimation-ai-before-2.png": "Inherited: the questions, in default form controls on a dark theme.",
  "/work/estimation-ai-before-3.png": "Inherited: the AI thinking, with the product photos beside it.",
  "/work/estimation-ai-before-4.png": "Inherited: the plan as a list, nowhere to go from it.",
  "/work/estimation-ai-new-1.png": "The same questions on the light theme, in our controls.",
  "/work/estimation-ai-new-2.png": "A material picked from a proper dropdown.",
  "/work/estimation-ai-new-3.png": "The plan being written, shown honestly while it works.",
  "/work/estimation-ai-new-4.png": "Each step explained, with room to correct the AI before it moves on.",
  "/work/estimation-ai-new-5.png": "Every source the AI used, and a button to save it as a Naya project.",
  "/work/estimation-ai-new-6.png": "The report: cost per unit, a confidence score and the summary.",
  "/work/estimation-ai-export.png": "Exported into a Naya journey: reference, details, plan and the report as blocks.",
  "/work/estimation-costing-problem.png": "The problem slide: from a spec with no cost visibility to a decision, five to six weeks later.",
  "/work/estimation-li-cover.png": "Estimation AI as Naya leads with it now.",
  "/work/estimation-li-value-engineering.png": "Value engineering: where the cost can come down, in real time.",
  "/work/estimation-li-scenario-planning.png": "Scenario planning: quantity, route and tooling against cost.",
  "/work/estimation-li-roi.png": "The return: hours recaptured when an estimate takes minutes.",
};
