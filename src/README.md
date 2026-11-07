# Frontend & Accessibility Portfolio

A portfolio for a frontend engineer and accessibility QA specialist, built around one idea:
**build it, test it, find the problems, fix them, prove the improvements.**

It has the usual portfolio pages, plus three working labs:

- **Accessibility Lab.** A fictional university booking portal ("AccessLab Demo"), shipped as a flawed build with 15 documented, intentionally introduced defects and a corrected build. It comes with a searchable findings catalogue, a printable audit report and a remediation log.
- **Performance Lab.** Two controlled experiments (memoisation and re-render avoidance) that are measured live in the visitor's browser, plus a documented Lighthouse workflow.
- **Accessible component library.** Twelve components, each with a live demo, keyboard map, naming strategy, testing notes and known limitations.

## Technology

React 18, TypeScript, Tailwind CSS 3, React Router 6, lucide-react, framer-motion (page fade only; reduced motion is respected), date-fns.
Testing: Vitest, React Testing Library, Playwright and @axe-core/playwright.

## Folder structure

```
App.tsx                 Routes only
pages/                  One file per route (accessibility/ and performance/ subfolders)
components/
  layout/               Header, Footer, SiteLayout (skip link, focus on navigation), CvLink
  ui/                   Button, ButtonLink, Badge, Callout, CodeBlock, PageHeader, Placeholder, TextLink
  accessibility/        FindingExplorer, FindingItem, Severity/Status badges, SeverityFramework, RemediationEntry
  audit/                AuditFinding
  lab/                  DemoFrame, VariantSwitch, LabModuleDemo
  portal/               The fictional portal: flawed + fixed variants of each component
  library/              The accessible component library
  performance/          Experiments and readouts
  home/, projects/, experience/, contact/
data/                   All content: site.ts, projects, case studies, findings, audit, skills, articles…
hooks/                  usePageMeta, useModalDialog, useFindingFilters
utils/                  Pure helpers: contrast, findings, validation, stats, class names
types/                  Shared types (finding.ts, portal.ts, content.ts)
tests/                  Vitest + Testing Library
e2e/                    Playwright
.github/workflows/ci.yml
```

## Personalising before you publish

Content you haven't supplied yet renders as a visible **"Owner input"** placeholder. Nothing is invented.

| What | Where |
| --- | --- |
| Name, email, LinkedIn, GitHub, CV path, last accessibility review date | `data/site.ts` |
| Roles, education, certifications | `data/experience.ts` (set `placeholder: false`) |
| Project facts | `data/projects.ts`, `data/caseStudies.ts` (fill in `ownerInput`, set `verification: "verified"`) |
| Skills | `data/skills.ts` (only list tools you can demonstrate) |
| Articles | `data/articles.ts` (`status: "published"` plus a real `publishedOn`) |
| Audit environment, evaluator, date | `data/audit.ts` |
| CV | Put the PDF in `public/cv.pdf` and set `cvUrl: "/cv.pdf"`. The "Download CV" button only appears once this is set. |

## Adding findings

Add an entry to `data/accessibilityFindings.ts` or `data/performanceFindings.ts`. Each entry needs a `severityRationale` and a `retestPlan`.
After you actually run the retest, add `retestNotes` and change `status` to `"retested"` or `"not-reproduced"`. A unit test fails if a retest status has no notes.

## Running as a standalone Vite project

The design was built in Magic Patterns, which runs the app without build tooling. To run it locally:

```bash
npm create vite@latest portfolio -- --template react-ts
# copy every file from this project into src/ (keep index.tsx as the entry)
```

Add these dev dependencies:

```bash
npm i -D tailwindcss@3 postcss autoprefixer vitest jsdom @testing-library/react @testing-library/user-event \
  @testing-library/jest-dom @playwright/test @axe-core/playwright eslint typescript-eslint eslint-plugin-react-hooks prettier
```

Then add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview --port 4173",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

Add a test block to `vite.config.ts`:

```ts
test: { environment: "jsdom", setupFiles: ["./tests/setup.ts"], include: ["tests/**/*.test.{ts,tsx}"] }
```

And add `playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "e2e",
  webServer: { command: "npm run preview", port: 4173, reuseExistingServer: !process.env.CI },
  use: { baseURL: "http://localhost:4173" },
});
```

Turn on `"strict": true` in `tsconfig.json`.

## Deployment

The output is a static single-page app, so every route has to fall back to `index.html`:

- **Vercel:** `vercel.json` is already included.
- **Netlify:** `public/_redirects` is already included.
- **Other hosts:** configure an SPA fallback to `/index.html`.

Once you have a production domain, add canonical URLs and a sitemap, then update `public/robots.txt`.

## Accessibility approach

- Native HTML comes first. ARIA is used only where a pattern needs it: tabs, live regions and `aria-current`.
- There is a skip link, the landmarks are semantic, and focus moves to `<main>` on every route change.
- Contrast was calculated for the token pairs (see `/accessibility-statement`). The original `#46536A` border measured about 2.5:1, which fails the 3:1 requirement for input boundaries, so `--color-border-input: #6B7890` was added.
- Automated axe checks are only one layer of evidence. Manual keyboard and screen reader testing still has to be done and recorded.

## Performance approach

The experiments use `performance.now()` in the visitor's browser, so no figures are hardcoded. Lighthouse results stay empty until real runs are recorded in `data/performance.ts`.

## Known limitations

- **Tests and CI haven't run yet.** Vitest, Playwright, ESLint and CI have **not been run** in the authoring environment, which has no test runner. Expect to fix small issues on the first run.
- **No retests recorded.** Every fix is marked "Fixed, not yet retested".
- **No screen reader testing or testing with disabled users** has been recorded.
- **ALD-011 is still open.** The appointments table scrolls horizontally at 320px.
- **No article pages.** Writing is limited to an index until articles are written; adding Markdown/MDX rendering is a follow-up.
- **Favicon.** Add a favicon through your host or `index.html`.
