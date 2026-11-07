import React, { useEffect, useState } from "react";

type Environment = {userAgent: string;cores: string;memory: string;viewport: string;};

export function EnvironmentPanel() {
  const [env, setEnv] = useState<Environment | null>(null);

  useEffect(() => {
    const nav = navigator as Navigator & {deviceMemory?: number;};
    setEnv({
      userAgent: nav.userAgent,
      cores: nav.hardwareConcurrency ? String(nav.hardwareConcurrency) : "Not reported",
      memory: nav.deviceMemory ? `${nav.deviceMemory} GB (approximate)` : "Not reported by this browser",
      viewport: `${window.innerWidth} × ${window.innerHeight} CSS px`
    });
  }, []);

  const rows: [string, string][] = env ?
  [
  ["User agent", env.userAgent],
  ["Logical CPU cores", env.cores],
  ["Device memory", env.memory],
  ["Viewport", env.viewport]] :

  [];

  return (
    <dl className="divide-y divide-line rounded-2xl border border-line bg-surface-muted">
      {env === null ?
      <div className="p-4 text-sm text-fg-muted">Reading environment…</div> :

      rows.map(([k, v]) =>
      <div key={k} className="grid gap-1 px-4 py-3 sm:grid-cols-[180px_1fr] sm:gap-6">
            <dt className="font-mono text-xs leading-6 text-fg-muted">{k}</dt>
            <dd className="break-words font-mono text-[13px] leading-6 text-fg-secondary">{v}</dd>
          </div>
      )
      }
    </dl>);

}