import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { PlayIcon, RotateCcwIcon } from "lucide-react";
import { computeStats, makeRecords } from "../../utils/perfData";
import { formatMs, median, sum } from "../../utils/stats";
import { Button } from "../ui/Button";
import { CodeBlock } from "../ui/CodeBlock";
import { ModeSwitch } from "./ModeSwitch";
import type { ExperimentMode } from "./ModeSwitch";

type Tally = {renders: number;calculations: number;samples: number[];};

const RECORD_COUNT = 40000;
const records = makeRecords(RECORD_COUNT);
const emptyTally = (): Tally => ({ renders: 0, calculations: 0, samples: [] });

export function CalculationExperiment() {
  const [mode, setMode] = useState<ExperimentMode>("baseline");
  const [threshold, setThreshold] = useState(30);
  const [note, setNote] = useState("");
  const [running, setRunning] = useState(false);
  const [, forceRender] = useState(0);
  const tallies = useRef<Record<ExperimentMode, Tally>>({ baseline: emptyTally(), optimised: emptyTally() });
  const intervalRef = useRef<number | null>(null);
  const noteId = useId();
  const thresholdId = useId();

  tallies.current[mode].renders += 1;

  const measure = () => {
    const start = performance.now();
    const result = computeStats(records, threshold);
    const t = tallies.current[mode];
    t.samples.push(performance.now() - start);
    t.calculations += 1;
    return result;
  };

  // Baseline: recalculated on every render, whatever caused it.
  const baselineStats = mode === "baseline" ? measure() : null;
  // Optimised: recalculated only when the threshold (its real input) changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimisedStats = useMemo(() => mode === "optimised" ? measure() : null, [mode, threshold]);
  const stats = baselineStats ?? optimisedStats;

  useEffect(() => () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  }, []);

  const runUpdates = () => {
    setRunning(true);
    let count = 0;
    intervalRef.current = window.setInterval(() => {
      count += 1;
      setNote((n) => n.length >= 30 ? "a" : `${n}a`);
      if (count >= 20 && intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
        setRunning(false);
      }
    }, 40);
  };

  const reset = () => {
    tallies.current = { baseline: emptyTally(), optimised: emptyTally() };
    setNote("");
    forceRender((x) => x + 1);
  };

  const rows = (["baseline", "optimised"] as ExperimentMode[]).map((m) => {
    const t = tallies.current[m];
    return { mode: m, ...t, median: median(t.samples), total: t.samples.length ? sum(t.samples) : null };
  });

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <ModeSwitch value={mode} onChange={setMode} disabled={running} />
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" onClick={runUpdates} disabled={running}>
            <PlayIcon aria-hidden="true" className="h-4 w-4" />
            {running ? "Running…" : "Run 20 unrelated updates"}
          </Button>
          <Button onClick={reset} disabled={running}>
            <RotateCcwIcon aria-hidden="true" className="h-4 w-4" />
            Reset measurements
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={noteId} className="text-sm font-medium text-fg">
            Note (unrelated to the calculation)
          </label>
          <input
            id={noteId}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-1.5 block min-h-[44px] w-full rounded-lg border border-line-input bg-surface-muted px-3 text-[15px] text-fg" />
          
        </div>
        <div>
          <label htmlFor={thresholdId} className="text-sm font-medium text-fg">
            Minimum duration (minutes) — a real input
          </label>
          <input
            id={thresholdId}
            type="number"
            min={10}
            max={89}
            value={threshold}
            onChange={(e) => setThreshold(Math.min(89, Math.max(10, Number(e.target.value) || 10)))}
            className="mt-1.5 block min-h-[44px] w-full rounded-lg border border-line-input bg-surface-muted px-3 text-[15px] text-fg" />
          
        </div>
      </div>

      {stats &&
      <p className="mt-4 font-mono text-[13px] text-fg-muted">
          Result: {stats.matching.toLocaleString()} of {RECORD_COUNT.toLocaleString()} records · p50 {stats.p50} min · p95 {stats.p95} min
        </p>
      }

      <div className="mt-6 overflow-x-auto rounded-xl border border-line" role="region" aria-label="Experiment 1 measurements" tabIndex={0}>
        <table className="w-full min-w-[560px] border-collapse text-left">
          <caption className="sr-only">Measurements taken in this browser session</caption>
          <thead className="bg-surface-muted">
            <tr>
              {["Mode", "Renders", "Calculations run", "Median per calculation", "Total calculation time"].map((h) =>
              <th key={h} scope="col" className="px-4 py-2.5 font-mono text-xs font-medium text-fg-muted">{h}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) =>
            <tr key={r.mode} className="border-t border-line">
                <th scope="row" className="px-4 py-3 text-[15px] font-medium capitalize text-fg">{r.mode}</th>
                <td className="px-4 py-3 font-mono text-sm text-fg-secondary">{r.renders || "—"}</td>
                <td className="px-4 py-3 font-mono text-sm text-fg-secondary">{r.calculations || "—"}</td>
                <td className="px-4 py-3 font-mono text-sm text-fg-secondary">{r.samples.length ? formatMs(r.median) : "Not measured yet"}</td>
                <td className="px-4 py-3 font-mono text-sm text-fg-secondary">{formatMs(r.total)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-fg-muted">
        Measured live with performance.now() in your browser. Run each mode at least once, in the same session, before comparing.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <CodeBlock label="CalculationExperiment.tsx" tone="before" code={`const stats = computeStats(records, threshold);`} />
        <CodeBlock label="CalculationExperiment.tsx" tone="after" code={`const stats = useMemo(\n  () => computeStats(records, threshold),\n  [threshold]\n);`} />
      </div>
    </div>);

}