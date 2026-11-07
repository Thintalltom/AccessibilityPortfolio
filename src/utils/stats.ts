export function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function sum(values: number[]): number {
  return values.reduce((total, v) => total + v, 0);
}

export function formatMs(value: number | null): string {
  if (value === null) return "—";
  return `${value < 10 ? value.toFixed(2) : value.toFixed(1)} ms`;
}