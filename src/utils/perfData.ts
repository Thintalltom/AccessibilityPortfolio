export type SyntheticRecord = {id: number;serviceIndex: number;durationMins: number;waitDays: number;};

export type RecordStats = {matching: number;p50: number;p95: number;busiestService: number;};

/** Deterministic pseudo-random generator so every run uses identical input. */
function lcg(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

export function makeRecords(count: number): SyntheticRecord[] {
  const rand = lcg(42);
  return Array.from({ length: count }, (_, id) => ({
    id,
    serviceIndex: Math.floor(rand() * 8),
    durationMins: 10 + Math.floor(rand() * 80),
    waitDays: Math.floor(rand() * 30)
  }));
}

/** Deliberately non-trivial: filter, copy, sort and group. */
export function computeStats(records: SyntheticRecord[], minDuration: number): RecordStats {
  const matching = records.filter((r) => r.durationMins >= minDuration);
  const sorted = [...matching].sort((a, b) => a.durationMins - b.durationMins || a.waitDays - b.waitDays);
  const counts = new Array(8).fill(0) as number[];
  for (const r of sorted) counts[r.serviceIndex] += 1;
  const pick = (p: number) => sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))].durationMins : 0;
  return {
    matching: sorted.length,
    p50: pick(0.5),
    p95: pick(0.95),
    busiestService: counts.indexOf(Math.max(...counts))
  };
}