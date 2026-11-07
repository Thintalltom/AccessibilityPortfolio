import React, { useEffect, useRef, useState } from "react";
import { PlayIcon, PlusIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "../ui/Button";
import { CodeBlock } from "../ui/CodeBlock";
import { ModeSwitch } from "./ModeSwitch";
import type { ExperimentMode } from "./ModeSwitch";
import { ListRow, MemoListRow } from "./ListRow";
import type { ListItem, RenderCounter } from "./ListRow";
import { RenderReadout } from "./RenderReadout";

const items: ListItem[] = Array.from({ length: 150 }, (_, i) => ({ id: i, label: `Appointment slot ${i + 1}` }));

export function RerenderExperiment() {
  const [mode, setMode] = useState<ExperimentMode>("baseline");
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(false);
  const counters = useRef<Record<ExperimentMode, RenderCounter>>({ baseline: { current: 0 }, optimised: { current: 0 } });
  const updates = useRef<Record<ExperimentMode, number>>({ baseline: 0, optimised: 0 });
  const intervalRef = useRef<number | null>(null);
  const Row = mode === "baseline" ? ListRow : MemoListRow;

  useEffect(() => () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  }, []);

  const update = () => {
    updates.current[mode] += 1;
    setTick((t) => t + 1);
  };

  const runUpdates = () => {
    setRunning(true);
    let count = 0;
    intervalRef.current = window.setInterval(() => {
      count += 1;
      update();
      if (count >= 20 && intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
        setRunning(false);
      }
    }, 40);
  };

  const reset = () => {
    counters.current = { baseline: { current: 0 }, optimised: { current: 0 } };
    updates.current = { baseline: 0, optimised: 0 };
    setMode("baseline");
    setTick((t) => t + 1);
  };

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <ModeSwitch value={mode} onChange={setMode} disabled={running} />
        <div className="flex flex-wrap gap-2">
          <Button onClick={update} disabled={running}>
            <PlusIcon aria-hidden="true" className="h-4 w-4" />
            Update parent once
          </Button>
          <Button variant="primary" onClick={runUpdates} disabled={running}>
            <PlayIcon aria-hidden="true" className="h-4 w-4" />
            {running ? "Running…" : "Run 20 parent updates"}
          </Button>
          <Button onClick={reset} disabled={running}>
            <RotateCcwIcon aria-hidden="true" className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      <p className="mt-6 font-mono text-[13px] text-fg-muted">Parent counter: {tick}</p>
      <ul
        tabIndex={0}
        aria-label="Synthetic list of 150 rows"
        className="mt-2 max-h-56 overflow-y-auto rounded-xl border border-line bg-surface-muted">
        
        {items.map((item) =>
        <Row key={item.id} item={item} counter={counters.current[mode]} />
        )}
      </ul>

      <div className="mt-6">
        <RenderReadout counters={counters.current} updates={updates.current} />
      </div>
      <p className="mt-3 text-sm text-fg-muted">
        Counts include the 150 renders needed to mount the list when a mode is first shown. Switching modes remounts the list.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <CodeBlock label="ListRow.tsx" tone="before" code={`export function ListRow({ item, counter }) { … }`} />
        <CodeBlock label="ListRow.tsx" tone="after" code={`export const MemoListRow = memo(ListRow);`} />
      </div>
    </div>);

}