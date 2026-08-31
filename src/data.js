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

  outcomes: [
    "Shipped 200+ UI and UX features across the platform",
    "Built and evolved a design system to maintain consistency as features compounded",
    "Designed core platform areas: projects, workflows, collaboration, and mobile",
    "Shifted from feature-driven design to systems thinking and product architecture",
    "Rebuilt Homebase, the screen every user opens first, so cards say what they are before you click them",
    "Established patterns for progressive disclosure that scale to new features without overwhelming users",
  ],

  caseStudy: [
    {
      label: "Overview",
      body: "Senior Product Designer at Naya (2022–2026). I shaped a visual workflow platform for physical product teams from early foundations into a connected ecosystem. Over four years, I shipped 200+ UI and UX features while maintaining coherence and consistency. The work wasn't about volume — it was about helping a complex product evolve into something users understood and trusted.",
      shots: [
        "/naya/workflow-product-overview.png",
      ],
    },

    {
      label: "The Problem: Complexity Without Coherence",
      body: "Physical product development is complex. Teams manage images, documents, product information, 3D models, feedback, and decisions that evolve over months. As Naya added capabilities to serve this work, every new feature introduced a question: Where does this fit? Does it feel like Naya? Will users understand where to find it? How can we add capability without making the product harder to understand? The core challenge was preventing features from becoming a disconnected collection instead of a coherent system.",
      shots: [],
    },

    {
      label: "Three Core Friction Points",
      body: "Research and early usage revealed three problems: (1) Information was scattered and disorganized—teams had to think about storage instead of meaning. Projects were containers, not contexts. (2) Teams couldn't express their process—features were there, but no structure for how teams actually work through product development. (3) Collaboration was friction-heavy—sharing was one project, one person at a time, not matching how teams think about team access. Each problem required architectural thinking, not just feature design.",
      shots: [],
    },

    {
      label: "Design Approach: Systems, Constraints & Progressive Disclosure",
      body: "I approached these problems through three principles: First, systems thinking — every new feature had to connect to what came before. Second, constraint-based design — we ruled out the 3-month workspace solution and designed Group Sharing instead, a smaller MVP. Third, progressive disclosure — complexity should surface only when needed. A simple user shouldn't see advanced features; they appear on demand. These principles guided every major design decision.",
      shots: [],
    },

    {
      label: "Solution 1: From Information Storage to Product Context",
      body: "Before: Projects were file containers. References were images. Metadata was bureaucratic. Teams had to think about storage categories, not meaning. After: Projects became spaces where information is connected and purposeful. A project shows its cover, item count, status, and collaborators at a glance. References connect to the products they inform. Metadata tells a story about where work stands. The redesign reframed the model from 'where do I put this?' to 'what does this tell me about my product?'",
      shots: [
        "/naya/workflow-project-context.png",
        "/naya/workflow-project-evolution.png",
      ],
    },

    {
      label: "Solution 2: Giving Teams Structure Without Forcing One Path",
      body: "Before: Projects were flat containers. No way to express process or phases. After: Phases, Blocks, and Journey structures let teams organize work matching their actual process. Early exploration → concept selection → design refinement → manufacturing planning → feedback loops. The design challenge: make these structures invisible to users who don't need them. Simple organization stays simple. Advanced structure surfaces only when you want it. Progressive disclosure proved essential as the platform grew.",
      shots: [
        "/naya/workflow-phases-structure.png",
        "/naya/workflow-blocks-hierarchy.png",
      ],
    },

    {
      label: "Solution 3: Group Sharing — MVP Thinking Under Constraint",
      body: "Before: Sharing was one project, one person at a time. Fifty shares for ten projects across five people. After: Share a group, and everyone sees what's inside. Access is inherited; direct shares stack on top. Remove someone from the group, and you remove the team's access—not just one favor. The key constraint: we couldn't build a full workspace (3 months, engineering cost). So we designed something smaller that matched how teams actually think. It's narrower than Slack's workspace model but clearer and faster to execute.",
      shots: [
        "/naya/workflow-group-sharing.png",
        "/naya/workflow-collaboration-inheritance.png",
        "/naya/workflow-group-sharing-flow.png",
      ],
    },

    {
      label: "Solution 4: Extending Beyond Desktop",
      body: "Before: Product work only happened at desks. Mobile had no first-class support. After: Teams can open projects on mobile, select 3D models, rotate them, review product information, and provide feedback. The design wasn't 'shrink the desktop app.' It was 'what matters when teams are away from computers?' The answer: quick access to projects and 3D viewing. On mobile, that flow is all that matters. Everything else is secondary.",
      shots: [
        "/naya/workflow-mobile-flow.png",
        "/naya/workflow-3d-viewer-mobile.png",
      ],
    },

    {
      label: "Solution 5: Design System for Scale",
      body: "Before: Every new feature risked inconsistency. Modals varied. Context menus followed different patterns. Sharing appeared in multiple ways. After: A design system emerged from what worked. Components, patterns, interaction models, and rules. The system wasn't invented—it was extracted from successful features and iterated. As new capabilities arrived (3D, AI, mobile), the system evolved to accommodate them while the foundation stayed consistent. This allowed features to ship faster because the system provided the structure.",
      shots: [
        "/naya/workflow-design-system-components.png",
        "/naya/workflow-design-system-patterns.png",
      ],
    },

    {
      label: "200+ Features, One Coherent Product",
      body: "The work added up to over 200 shipped UI and UX features. But users don't experience Naya as 200 features. They experience it as a product where things make sense, where actions are consistent, where complexity surfaces only when needed. This coherence didn't happen by accident. It came from constantly asking: 'Does this feel like Naya? Does the user understand where this is? Can they predict what happens next?' The number of features matters less than whether they feel like they belong.",
      shots: [
        "/naya/workflow-feature-gallery-1.png",
        "/naya/workflow-feature-gallery-2.png",
        "/naya/workflow-feature-gallery-3.png",
      ],
    },

    {
      label: "Four Years of Evolution",
      body: "2022: Building Foundations. Projects, basic collaboration, the core structure. 2023: Expanding Workflows. Phases, blocks, journey structures. Users needed ways to express process. 2024: Increasing Complexity. Mobile access, 3D viewers, metadata systems, deeper collaboration. The platform served different contexts and devices. Consistency became critical. 2025–2026: Connecting the Ecosystem. Workflows fed into Estimation. Estimation fed back into projects. The platform became a system. My role shifted from designing features to thinking about the whole.",
      shots: [
        "/naya/workflow-evolution-2022.png",
        "/naya/workflow-evolution-2023.png",
        "/naya/workflow-evolution-2024.png",
        "/naya/workflow-evolution-2025.png",
      ],
    },

    {
      label: "How My Process Evolved",
      body: "Early: Research → Roadmap → Sketches → Design → Prototype → Handoff. As Naya needed to move faster, I adapted. Static Figma files couldn't communicate complex interactions — developers would interpret them differently. So I started building working prototypes in code, deployed to Vercel. Engineering could click through the real experience. I used Claude Code to build quickly, not as finished products but as communication tools. Better communication meant fewer misunderstandings and faster shipping.",
      shots: [
        "/naya/workflow-process-evolution.png",
      ],
    },

    {
      label: "Connecting Workflows & Estimation",
      body: "Estimation AI is a separate product, but it's part of the Naya ecosystem. Teams work in Naya, gather product information, then upload to Estimation AI. The AI analyzes images and asks clarifying questions. It builds a costing plan. The estimate lands back in Naya as a PDF in a project. Every data source is a link block. Estimation isn't a separate tool — it's part of the workflow. Designing this connection showed how to integrate new capabilities into an existing system without breaking coherence.",
      shots: [
        "/naya/workflow-estimation-connection.png",
      ],
    },

    {
      label: "Key Learnings",
      body: "Depth teaches more than breadth. Four years on one product teaches you what short-term projects never can: how products actually change over time, how today's decisions affect tomorrow's work, how constraints drive better solutions. Systems thinking scales. Individual features don't compound into product—they fall apart without a system. The system is the work. Constraints drive clarity. We couldn't build workspace, so we built Group Sharing instead. Better. Consistency isn't limitation—it's freedom. When the system is strong, new features don't require reinventing interaction design. Communication matters more than tools. Prototypes in code communicated better than static frames because the format matched the outcome.",
      shots: [],
    },

    {
      label: "Depth as Strength",
      body: "I didn't design 200 separate features. I spent four years helping shape how those features evolved into a connected product experience. The hardest design work wasn't individual features — it was the system that holds them together. That's what matters at the senior level: thinking about the whole, maintaining coherence across complexity, understanding how products actually grow. Depth isn't limitation. It's the only way to learn this.",
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
       estimate lands back in a Naya project as a PDF. */
    feature: true,
    lede: "It began inside the platform: working with the engineers on how a project's own memory could estimate what the product in it was worth. By 2025 it had become a standalone app — upload a photo, get a costed estimate — and I took on its interface, moving a generic AI build onto Naya's brand one layer at a time.",
    figures: [
      { v: "2", l: "lives: in the platform, then standalone" },
      { v: "6", l: "production stages costed" },
      { v: "0s", l: "wait when you press Export" },
    ],

    overview: "Estimation AI turns product images into a costed estimate in minutes. You upload your photos, the AI asks a few clarifying questions, then works through a visible plan — machining, moulding, PCB assembly, final assembly, packaging, shipping — before returning a cost. I picked it up after a first version had already been generated in Google AI Studio. It worked, but it did not look like Naya, and the estimate it produced was a dead end: a number on a screen with nowhere to go.",
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
        label: "Problem",
        body: "The first build was put together fast in Google AI Studio. The flow worked — upload your product images, answer a short set of questions about quantity, country, material and whether there is a PCB, then watch the AI build a step-by-step plan and cost each part of it. But nothing about it felt like our product: a generic dark theme, default form controls, a squared-off primary button, and none of the type, elevation or radius we use everywhere else. The first thing you saw was a spinner on an empty page. And once the AI gave you a number, that was the end of it. You could not hand it to anyone, and there was no record of where it came from.",
        shots: [
          "/work/estimation-ai-before-1.png", // spinner on an empty page
          "/work/estimation-ai-before-2.png", // the question form, dark and generic
          "/work/estimation-ai-before-3.png", // "AI is thinking"
          "/work/estimation-ai-before-4.png", // the AI action plan
        ],
      },
      { label: "Constraints", body: "Short timeline, and no Figma file to design from — the interface only existed as code inside Google AI Studio. So I learned the tool and made the edits directly in it, and rebuilt the parts I needed in Figma to work them through properly. Everything went through rounds of feedback before it went live. On top of that, exporting was slow, and hitting Export is exactly the wrong moment to make someone wait." },
      {
        label: "Solution",
        body: "I turned down a full redesign — on that timeline it would have stalled. Instead I moved the interface onto our brand one layer at a time: our light theme in place of the generic dark one, our typeface, our drop shadows for elevation, our corner radius on inputs and cards, and the pill shape on the primary action. The questions and their order did not change; only the surface did. I also designed the report the AI produces, not just the form that feeds it. Then I gave the estimate somewhere to go: exporting writes the whole thing into a Naya Journey as a PDF, with every data source the AI used as link blocks inside a structured project. It stops being a number on a screen and becomes an estimate review you can share with stakeholders and come back to later.",
        shots: [
          "/work/estimation-ai-export.png", // the estimate landed in a Naya project
          "/work/estimation-ai-new-1.png",
          "/work/estimation-ai-new-2.png",
          "/work/estimation-ai-new-3.png",
          "/work/estimation-ai-new-4.png",
          "/work/estimation-ai-new-5.png",
          "/work/estimation-ai-new-6.png",
        ],
      },
      { label: "Interaction highlights", body: "The export wait was solved with engineering, not with a spinner. We looked at three options: show a saving indicator on click, which is still a wait in nicer clothes; leave it alone, which fixes nothing; or start building the export in the background the moment the estimate is generated. We went with the third. By the time anyone presses Export the file already exists, so it opens straight away." },
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

/* Shared narrative used by both versions' process sections. */
export const PROCESS = [
  { t: "It starts with a question", d: "Product strategy with founders — roadmap prioritisation, grounded in user insights." },
  { t: "Then it goes on paper", d: "Problem, scope and success metrics in a PRD. Stakeholder alignment before pixels." },
  { t: "I study who's solved it", d: "UX research and competitive analysis across the products that got it right." },
  { t: "Sketches become software", d: "User flows, wireframes, interaction design — then high-fidelity prototypes in working code." },
  { t: "Engineers take the baton", d: "Design specs, developer handoff and design QA, with a running preview to build from." },
  { t: "And we listen, always", d: "Usability testing and cross-functional feedback between every stage — iterate, ship, repeat." },
];

