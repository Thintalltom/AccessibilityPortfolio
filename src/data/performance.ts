export const coreWebVitals = [
{
  metric: "Largest Contentful Paint (LCP)",
  measures: "Loading: when the largest image or text block in the viewport finished rendering.",
  good: "≤ 2.5 s",
  needsImprovement: "≤ 4.0 s",
  poor: "> 4.0 s"
},
{
  metric: "Interaction to Next Paint (INP)",
  measures: "Responsiveness: the latency of interactions across the whole visit, reported near the worst case.",
  good: "≤ 200 ms",
  needsImprovement: "≤ 500 ms",
  poor: "> 500 ms"
},
{
  metric: "Cumulative Layout Shift (CLS)",
  measures: "Visual stability: the largest burst of unexpected layout shift scores during the page’s lifetime.",
  good: "≤ 0.1",
  needsImprovement: "≤ 0.25",
  poor: "> 0.25"
}];


export const lighthouseWorkflow = [
"Build the production bundle and serve it locally (npm run build && npm run preview).",
"Open Chrome in a fresh Guest profile so extensions do not affect results.",
"In DevTools → Lighthouse, choose Mobile, the Performance category and the default simulated throttling.",
"Run five times against the baseline build and record each run; report the median.",
"Apply one change, rebuild, and repeat five runs under identical settings.",
"Record Chrome version, device, and the date alongside the results."];


/** Fill in only with real Lighthouse runs. `null` renders as "not yet measured". */
export const lighthouseResults: {metric: string;baseline: string | null;optimised: string | null;}[] = [
{ metric: "Performance score (median of 5)", baseline: null, optimised: null },
{ metric: "Largest Contentful Paint", baseline: null, optimised: null },
{ metric: "Total Blocking Time (lab proxy for responsiveness)", baseline: null, optimised: null },
{ metric: "Cumulative Layout Shift", baseline: null, optimised: null },
{ metric: "JavaScript transferred", baseline: null, optimised: null }];


export const performanceLimitations = [
"Live experiments measure JavaScript execution with performance.now(). Timer precision is reduced by browsers for security, so very small values are approximate.",
"Results depend on your device, browser, power state and other open tabs. Compare modes in the same session.",
"The experiments isolate render work. They do not measure network, layout or paint costs.",
"Lighthouse lab results are not field data. Core Web Vitals are assessed at the 75th percentile of real page loads."];