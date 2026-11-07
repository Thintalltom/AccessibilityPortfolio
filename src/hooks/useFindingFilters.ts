import { useMemo, useState } from "react";
import type { Finding } from "../types/finding";
import { defaultFindingFilters, filterFindings } from "../utils/findings";
import type { FindingFilters } from "../utils/findings";

export function useFindingFilters(findings: Finding[]) {
  const [filters, setFilters] = useState<FindingFilters>(defaultFindingFilters);

  const results = useMemo(() => filterFindings(findings, filters), [findings, filters]);

  const update = <K extends keyof FindingFilters,>(key: K, value: FindingFilters[K]) =>
  setFilters((current) => ({ ...current, [key]: value }));

  const reset = () => setFilters(defaultFindingFilters);

  const isFiltered = (Object.keys(filters) as (keyof FindingFilters)[]).some(
    (key) => filters[key] !== defaultFindingFilters[key]
  );

  return { filters, update, reset, results, isFiltered };
}