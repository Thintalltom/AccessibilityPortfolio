import React from "react";
import { SearchIcon, SearchXIcon } from "lucide-react";
import type { Finding } from "../../types/finding";
import { useFindingFilters } from "../../hooks/useFindingFilters";
import {
  categoryLabels,
  countBy,
  severityLabels,
  severityOrder,
  statusLabels,
  statusOrder,
  uniqueComponents } from
"../../utils/findings";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { FindingItem } from "./FindingItem";

const fieldClass =
"mt-1.5 block min-h-[44px] w-full rounded-lg border border-line-input bg-surface-muted px-3 text-[15px] text-fg";

export function FindingExplorer({ findings }: {findings: Finding[];}) {
  const { filters, update, reset, results, isFiltered } = useFindingFilters(findings);
  const byStatus = countBy(findings, (f) => f.status);
  const byCategory = countBy(findings, (f) => f.category);
  const components = uniqueComponents(findings);

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs text-fg-muted">Total findings</p>
          <p className="mt-1 text-5xl font-semibold tracking-tight text-fg">{findings.length}</p>
          <Badge tone="warning" className="mt-3">Sample dataset · seeded defects</Badge>
        </div>
        <dl className="grid grid-cols-2 gap-x-10 gap-y-3 text-[15px] sm:grid-cols-3">
          {(Object.keys(categoryLabels) as (keyof typeof categoryLabels)[]).map((c) =>
          <div key={c}>
              <dt className="font-mono text-xs text-fg-muted">{categoryLabels[c]}</dt>
              <dd className="text-lg font-medium text-fg">{byCategory[c] ?? 0}</dd>
            </div>
          )}
          {statusOrder.
          filter((s) => byStatus[s]).
          map((s) =>
          <div key={s}>
                <dt className="font-mono text-xs text-fg-muted">{statusLabels[s]}</dt>
                <dd className="text-lg font-medium text-fg">{byStatus[s]}</dd>
              </div>
          )}
        </dl>
      </div>

      <form role="search" aria-label="Filter findings" className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-[1.6fr_repeat(4,1fr)]" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="finding-search" className="text-sm font-medium text-fg">
            Search title or ID
          </label>
          <div className="relative">
            <SearchIcon aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 mt-[3px] h-4 w-4 -translate-y-1/2 text-fg-muted" />
            <input
              id="finding-search"
              type="search"
              value={filters.query}
              onChange={(e) => update("query", e.target.value)}
              placeholder="e.g. ALD-003 or dialog"
              className={`${fieldClass} pl-9 placeholder:text-fg-muted`} />
            
          </div>
        </div>
        <div>
          <label htmlFor="finding-severity" className="text-sm font-medium text-fg">Severity</label>
          <select id="finding-severity" value={filters.severity} onChange={(e) => update("severity", e.target.value as typeof filters.severity)} className={fieldClass}>
            <option value="all">All severities</option>
            {severityOrder.map((s) =>
            <option key={s} value={s}>{severityLabels[s]}</option>
            )}
          </select>
        </div>
        <div>
          <label htmlFor="finding-component" className="text-sm font-medium text-fg">Component</label>
          <select id="finding-component" value={filters.component} onChange={(e) => update("component", e.target.value as typeof filters.component)} className={fieldClass}>
            <option value="all">All components</option>
            {components.map((c) =>
            <option key={c} value={c}>{c}</option>
            )}
          </select>
        </div>
        <div>
          <label htmlFor="finding-status" className="text-sm font-medium text-fg">Status</label>
          <select id="finding-status" value={filters.status} onChange={(e) => update("status", e.target.value as typeof filters.status)} className={fieldClass}>
            <option value="all">All statuses</option>
            {statusOrder.map((s) =>
            <option key={s} value={s}>{statusLabels[s]}</option>
            )}
          </select>
        </div>
        <div>
          <label htmlFor="finding-category" className="text-sm font-medium text-fg">Category</label>
          <select id="finding-category" value={filters.category} onChange={(e) => update("category", e.target.value as typeof filters.category)} className={fieldClass}>
            <option value="all">All categories</option>
            {(Object.keys(categoryLabels) as (keyof typeof categoryLabels)[]).map((c) =>
            <option key={c} value={c}>{categoryLabels[c]}</option>
            )}
          </select>
        </div>
      </form>

      <div className="mt-6 flex min-h-[36px] flex-wrap items-center justify-between gap-3">
        <p role="status" className="text-[15px] text-fg-secondary">
          Showing {results.length} of {findings.length} findings
        </p>
        {isFiltered &&
        <Button size="sm" onClick={reset}>Clear filters</Button>
        }
      </div>

      {results.length > 0 ?
      <ul className="mt-4 overflow-hidden rounded-2xl border border-line bg-surface">
          {results.map((finding) =>
        <FindingItem key={finding.id} finding={finding} />
        )}
        </ul> :

      <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-line-strong px-6 py-14 text-center">
          <SearchXIcon aria-hidden="true" className="h-8 w-8 text-fg-muted" />
          <p className="mt-4 font-medium text-fg">No findings match these filters</p>
          <p className="mt-1 max-w-sm text-[15px] text-fg-muted">
            Try a broader severity or status, or search by ID such as “ALD-007”.
          </p>
          <Button size="sm" className="mt-5" onClick={reset}>Clear all filters</Button>
        </div>
      }
    </div>);

}