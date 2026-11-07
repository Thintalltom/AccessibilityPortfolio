import React, { useId, useMemo, useState } from "react";
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react";

type Row = Record<string, string | number>;
type Column<T extends Row> = {key: keyof T & string;label: string;sortable?: boolean;};

type DataTableProps<T extends Row> = {
  caption: string;
  columns: Column<T>[];
  rows: T[];
  rowKey: keyof T & string;
};

export function DataTable<T extends Row>({ caption, columns, rows, rowKey }: DataTableProps<T>) {
  const [sort, setSort] = useState<{key: keyof T & string;dir: "ascending" | "descending";} | null>(null);
  const captionId = useId();

  const sorted = useMemo(() => {
    if (!sort) return rows;
    return [...rows].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sort.dir === "ascending" ? cmp : -cmp;
    });
  }, [rows, sort]);

  const toggle = (key: keyof T & string) =>
  setSort((s) => s?.key === key ? { key, dir: s.dir === "ascending" ? "descending" : "ascending" } : { key, dir: "ascending" });

  const sortedLabel = sort ? columns.find((c) => c.key === sort.key)?.label : null;

  return (
    <div>
      <div role="region" aria-labelledby={captionId} tabIndex={0} className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[520px] border-collapse text-left">
          <caption id={captionId} className="px-4 py-3 text-left text-sm text-fg-muted">
            {caption}
            {sortedLabel && `, sorted by ${sortedLabel} ${sort?.dir}`}
          </caption>
          <thead className="bg-surface-muted">
            <tr>
              {columns.map((c) => {
                const active = sort?.key === c.key;
                const Icon = !active ? ArrowUpDownIcon : sort?.dir === "ascending" ? ArrowUpIcon : ArrowDownIcon;
                return (
                  <th key={c.key} scope="col" aria-sort={active ? sort?.dir : undefined} className="px-4 py-2 font-mono text-xs font-medium text-fg-muted">
                    {c.sortable ?
                    <button type="button" onClick={() => toggle(c.key)} className="inline-flex min-h-[36px] items-center gap-1.5 rounded hover:text-fg">
                        {c.label}
                        <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                      </button> :

                    c.label
                    }
                  </th>);

              })}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) =>
            <tr key={String(r[rowKey])} className="border-t border-line">
                {columns.map((c) =>
              <td key={c.key} className="px-4 py-3 text-[15px] text-fg-secondary">
                    {r[c.key]}
                  </td>
              )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p role="status" className="sr-only">
        {sortedLabel ? `Sorted by ${sortedLabel}, ${sort?.dir}` : ""}
      </p>
    </div>);

}