import type { CaseStudy } from "../types/content";

export const caseStudies: CaseStudy[] = [
{
  slug: "smartafcfta",
  title: "SmartAfCFTA",
  tagline: "A digital trade facilitation platform connecting businesses and simplifying intra-African trade under the AfCFTA framework.",
  role: "Frontend developer",
  stack: ["React.js", "JavaScript", "Redux Toolkit", "REST APIs", "Google OAuth", "CSS"],
  responsibilities: [
  { area: "Business Directory", frontend: "Built and enhanced the directory for discovering businesses and trading partners across African countries", elsewhere: "Backend search and data APIs" },
  { area: "Customs Duty Calculator", frontend: "Implemented interactive customs duty calculation UI and logic", elsewhere: "Duty rate data and calculation engine" },
  { area: "E-Learning Platform", frontend: "Developed user-facing interfaces for trade education content", elsewhere: "Content management and delivery" },
  { area: "Authentication", frontend: "Implemented Google OAuth sign-in and managed authentication state with Redux", elsewhere: "OAuth provider (Google)" },
  { area: "API integration", frontend: "Integrated REST APIs to retrieve and display dynamic business and trade information", elsewhere: "Backend services and data layer" },
  { area: "State management", frontend: "Used Redux Toolkit to manage application state and data flow across modules", elsewhere: "—" }
  ],
  sections: [
  {
    id: "overview",
    title: "Project overview",
    paragraphs: [
      "SMARTAfCFTA is a digital trade facilitation platform designed to promote and simplify intra-African trade by connecting businesses, providing access to trade-related information, and equipping users with tools to navigate cross-border commerce across African countries.",
      "The platform supports the objectives of the African Continental Free Trade Area (AfCFTA) by helping businesses discover opportunities, understand trade regulations, calculate customs duties, and access educational resources on African trade policies."
    ]
  },
  {
    id: "features",
    title: "What the platform does",
    paragraphs: ["The platform is made up of several interconnected modules, each addressing a specific need in the intra-African trade journey:"],
    list: [
      "Business Directory — enables users to discover businesses and potential trading partners across African countries",
      "Customs Duty Calculator — helps users estimate applicable customs duties for goods traded across borders",
      "Trade & Communication — facilitates trade-related communication and engagement among stakeholders",
      "E-Learning Platform — provides educational resources on African trade regulations, policies and procedures",
      "TradeFlow — provides trade-related information and insights to support trade processes",
      "Rules of Origin — gives users access to AfCFTA Rules of Origin and eligibility requirements",
      "Outcome Indicators — presents indicators and insights related to trade performance",
      "Google Authentication — enables secure and convenient user sign-in"
    ]
  },
  {
    id: "context",
    title: "Context and constraints",
    paragraphs: ["This project was built under NDA at Infinion Technologies. Confidential business information, internal endpoints and customer data are intentionally omitted from this case study."]
  },
  {
    id: "role",
    title: "My role and responsibilities",
    paragraphs: ["I worked as a frontend developer across multiple SMARTAfCFTA modules. The table below outlines my contributions and what was handled elsewhere."]
  },
  {
    id: "stack",
    title: "Technical stack",
    paragraphs: ["React.js for building reusable UI components, JavaScript for application logic, Redux Toolkit for global state management, REST APIs for backend data, Google OAuth for authentication, and CSS for responsive layouts and styling."]
  },
  {
    id: "approach",
    title: "Architecture and implementation",
    paragraphs: [
      "The frontend is structured around Redux Toolkit for centralised state management, with separate slices handling authentication state, business directory data and trade information feeds.",
      "API integration is handled through Redux async thunks and RTK Query patterns, keeping data-fetching logic out of components and making it straightforward to share data across modules."
    ]
  },
  {
    id: "results",
    title: "Results and evidence",
    paragraphs: ["No outcome metrics are published for this project. None will be added unless they can be substantiated."]
  },
  {
    id: "lessons",
    title: "Lessons learned",
    paragraphs: ["Working across multiple modules on a single platform reinforced the value of consistent component patterns and a shared state layer — changes to the auth flow or API integration propagated cleanly across the whole application."]
  }]
},
// {
//   slug: "accessiD8",
//   title: "AccessiD8",
//   tagline: "Frontend engineering for a data-driven web application built under NDA.",
//   role: "Frontend developer",
//   stack: ["React", "TypeScript", "REST APIs", "Microsoft identity"],
//   sections: [
//   {
//     id: "overview",
//     title: "Project overview",
//     paragraphs: ["AccessiD8 is a data-driven web application with dashboards, data presentation and organisational sign-in, built under NDA at Infinion Technologies."],
//     ownerInput: ["One-sentence description of the product's purpose and audience", "Your dates on the project and team size"]
//   },
//   {
//     id: "context",
//     title: "Context and constraints",
//     paragraphs: ["This project was built under NDA. Confidential business information, internal endpoints and customer data are intentionally omitted from this case study."],
//     ownerInput: ["Constraints you worked under (deadlines, browser support, existing APIs, design system)"]
//   },
//   {
//     id: "role",
//     title: "My role and responsibilities",
//     paragraphs: ["Only responsibilities the owner confirms will be listed here."],
//     ownerInput: ["Confirm which areas you delivered"]
//   },
//   {
//     id: "stack",
//     title: "Technical stack",
//     paragraphs: ["React with TypeScript on the client, consuming REST APIs, with organisational sign-in through the Microsoft identity platform."],
//     ownerInput: ["Exact libraries used for state, data fetching and UI"]
//   },
//   {
//     id: "results",
//     title: "Results and evidence",
//     paragraphs: ["No outcome metrics are published for this project. None will be added unless they can be substantiated."]
//   },
//   {
//     id: "lessons",
//     title: "Lessons learned",
//     paragraphs: [],
//     ownerInput: ["What you would do differently next time"]
//   }]
// },
// {
//   slug: "innexa",
//   title: "Innexa",
//   tagline: "A B2B admin dashboard with Azure AD authentication, collapsible sidebar and RTK Query API integration.",
//   role: "Frontend developer",
//   stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Redux Toolkit", "RTK Query", "React Router v7", "MSAL", "Azure AD", "Vitest"],
//   responsibilities: [
//   { area: "Authentication", frontend: "MSAL Azure AD integration, silent token acquisition, 401 retry with force-refresh, session storage caching", elsewhere: "Azure AD app registration and API permissions" },
//   { area: "Layout & navigation", frontend: "Collapsible sidebar, route-aware header with page title and icon, user profile dropdown with sign out", elsewhere: "—" },
//   { area: "State management", frontend: "Redux Toolkit slices for graph data and navbar state, RTK Query API slices with token injection via prepareHeaders", elsewhere: "—" },
//   { area: "Routing", frontend: "React Router v7 with lazy-loaded page routes and loading indicator, 404 Not Found page", elsewhere: "—" },
//   { area: "User profile", frontend: "Microsoft Graph API integration to fetch user profile and photo on login", elsewhere: "Microsoft Graph API" },
//   { area: "Testing", frontend: "Vitest unit tests with coverage reporting", elsewhere: "—" }],
//   sections: [
//   {
//     id: "overview",
//     title: "Project overview",
//     paragraphs: [
//       "Innexa is a B2B admin dashboard built with React 19 and TypeScript. It provides a structured shell for internal tooling with Azure AD authentication, a collapsible sidebar, and a route-aware header.",
//       "The project was built under NDA at Infinion Technologies. No confidential business data, internal API endpoints or proprietary screenshots are included in this case study."
//     ]
//   },
//   {
//     id: "problem",
//     title: "Problem statement",
//     paragraphs: ["Internal B2B tools need a consistent, secure shell that handles authentication, navigation and API access without requiring each feature team to rebuild those foundations. Innexa provides that shell."]
//   },
//   {
//     id: "role",
//     title: "My role and responsibilities",
//     paragraphs: ["I was responsible for the full frontend implementation. The table below separates what I built from services provided externally."]
//   },
//   {
//     id: "stack",
//     title: "Technical stack",
//     paragraphs: [
//       "React 19 with TypeScript, built with Vite and the React Compiler enabled. Tailwind CSS v4 for styling. Redux Toolkit with RTK Query for state management and API calls. React Router v7 for client-side routing.",
//       "Authentication is handled by MSAL (Microsoft Authentication Library) against Azure AD. Tokens are cached in sessionStorage and silently refreshed. The app fetches the user's profile and photo from Microsoft Graph on login."
//     ]
//   },
//   {
//     id: "approach",
//     title: "Architecture and implementation",
//     paragraphs: [
//       "The app is structured around a persistent layout shell — a collapsible sidebar and a route-aware header — with page content rendered via an outlet. Routes are lazy-loaded to keep the initial bundle small.",
//       "RTK Query API slices inject the Azure AD access token into every request via a prepareHeaders function. On a 401 response, the slice force-refreshes the token and retries automatically, so feature screens never need to handle auth errors directly.",
//       "Redux slices manage the sidebar collapse state and the Microsoft Graph user data separately from the API layer, keeping UI state and server state cleanly separated."
//     ]
//   },
//   {
//     id: "decisions",
//     title: "Key technical decisions",
//     paragraphs: [
//       "RTK Query over a custom fetch layer: RTK Query's built-in caching, loading states and tag-based invalidation removed a significant amount of boilerplate while keeping the API layer testable.",
//       "MSAL sessionStorage over localStorage: sessionStorage limits token exposure to the current tab, reducing the risk of token theft via XSS compared to localStorage.",
//       "React Router v7 lazy routes: splitting each screen into its own chunk means the dashboard shell loads immediately while heavier page components load on demand."
//     ]
//   },
//   {
//     id: "testing",
//     title: "Testing strategy",
//     paragraphs: ["Unit tests are written with Vitest. Coverage reporting is available via npm run test:coverage. Auth flows and API slices are the primary test targets."]
//   },
//   {
//     id: "results",
//     title: "Results and evidence",
//     paragraphs: ["No production metrics are published for this project. The repository is available for code review at the link below."]
//   },
//   {
//     id: "lessons",
//     title: "Lessons learned",
//     paragraphs: ["Centralising token injection in RTK Query's prepareHeaders made the auth layer invisible to feature code — a pattern worth applying to any project that uses a single auth provider across multiple API endpoints."]
//   }]
// },
{
  slug: "azure-ai-verification",
  title: "Azure AI Identity Verification",
  tagline: "A secure, AI-powered identity management and verification platform reducing fraud and improving authentication reliability.",
  role: "Frontend developer",
  stack: ["React.js", "TypeScript", "JavaScript", "Microsoft Identity Platform", "Azure AI Vision SDK"],
  responsibilities: [
  { area: "Authentication", frontend: "Implemented secure sign-in and authorisation flows using Microsoft Identity Platform", elsewhere: "Azure AD app registration and token validation" },
  { area: "Identity verification UI", frontend: "Built interactive identity verification interfaces including liveness detection and ID document validation screens", elsewhere: "Azure AI Vision SDK processing and backend verification logic" },
  { area: "Juror management", frontend: "Developed juror management and verification screens", elsewhere: "Backend data and business rules" },
  { area: "Challenge creation", frontend: "Built challenge creation workflows allowing users to turn ideas into structured challenges and pretotypes", elsewhere: "—" },
  { area: "AI-assisted workflows", frontend: "Developed AI-assisted interfaces within templates, research and development, and pretotype workflows", elsewhere: "AI model integration and backend processing" }
  ],
  sections: [
  {
    id: "overview",
    title: "Project overview",
    paragraphs: [
      "Azure AI Verification is a secure, AI-powered identity management and verification platform designed to improve digital identity authentication and help prevent identity fraud.",
      "The platform integrates Microsoft's Identity Platform for secure authentication and Azure AI Vision technology for AI-assisted identity verification. It incorporates human liveness detection and government-issued identity document validation to help establish that users are genuine during the verification process."
    ]
  },
  {
    id: "features",
    title: "Key features",
    paragraphs: ["The platform combines secure authentication with AI-powered verification across several workflows:"],
    list: [
      "Secure authentication and authorisation using Microsoft Identity Platform",
      "AI-powered identity verification using Azure AI Vision SDK",
      "Human liveness detection",
      "Government-issued ID validation",
      "Interactive identity verification interfaces",
      "Juror management and verification screens",
      "Challenge creation — allowing users to turn ideas into structured challenges and pretotypes",
      "AI-assisted functionality within templates, research and development, and pretotype workflows"
    ]
  },
  {
    id: "context",
    title: "Context and constraints",
    paragraphs: ["This project was built under NDA. Confidential business information, internal endpoints and customer data are intentionally omitted from this case study."]
  },
  {
    id: "role",
    title: "My role and responsibilities",
    paragraphs: ["I worked on the React frontend, implementing interactive interfaces, integrating authentication services, and developing AI-powered identity verification experiences. The table below separates my frontend work from services handled elsewhere."]
  },
  {
    id: "stack",
    title: "Technical stack",
    paragraphs: ["React.js with TypeScript and JavaScript on the client. Microsoft Identity Platform for authentication and authorisation. Azure AI Vision SDK for liveness detection and document validation."]
  },
  {
    id: "approach",
    title: "Frontend architecture",
    paragraphs: [
      "The verification workflow is modelled as a sequence of explicit states — idle, capturing, processing, verified, failed — so each screen communicates exactly one thing and every failure has a defined recovery path.",
      "Authentication state is managed centrally using the Microsoft Identity Platform client, with tokens silently refreshed and injected into API requests so verification screens never handle auth errors directly."
    ]
  },
  {
    id: "results",
    title: "Results and evidence",
    paragraphs: [
      "The project was associated with reported improvements of approximately 20% in authentication reliability and 40% in fraud-detection performance.",
      "These figures are reported as provided. Independent verification of the methodology is not available."
    ]
  },
  {
    id: "lessons",
    title: "Lessons learned",
    paragraphs: ["Building around probabilistic AI output requires the UI to communicate uncertainty honestly. Liveness detection and document validation can fail for legitimate users — every failure state needs a clear, recoverable path that does not imply the user has done something wrong."]
  }]
}];
