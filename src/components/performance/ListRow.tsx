import React, { memo } from "react";

export type RenderCounter = {current: number;};
export type ListItem = {id: number;label: string;};

type ListRowProps = {item: ListItem;counter: RenderCounter;};

export function ListRow({ item, counter }: ListRowProps) {
  // Counting renders is the point of the experiment.
  counter.current += 1;
  return (
    <li className="flex items-center justify-between border-b border-line px-4 py-2 text-sm text-fg-secondary last:border-b-0">
      <span>{item.label}</span>
      <span className="font-mono text-xs text-fg-muted">#{item.id + 1}</span>
    </li>);

}

/** Same row, skipped by React when its props are unchanged. */
export const MemoListRow = memo(ListRow);