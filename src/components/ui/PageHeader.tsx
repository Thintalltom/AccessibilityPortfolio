import React from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";
import { container, readingContainer, reportContainer } from "../../utils/layout";

type Crumb = {label: string;to?: string;};

type PageHeaderProps = {
  title: string;
  description?: ReactNode;
  crumbs?: Crumb[];
  width?: "content" | "reading" | "report";
  children?: ReactNode;
};

const widths = { content: container, reading: readingContainer, report: reportContainer };

export function PageHeader({ title, description, crumbs, width = "content", children }: PageHeaderProps) {
  return (
    <header className="border-b border-line">
      <div className={cn(widths[width], "pb-10 pt-12 md:pb-14 md:pt-16")}>
        {crumbs && crumbs.length > 0 &&
        <nav aria-label="Breadcrumb" className="print:hidden">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[13px] text-fg-muted">
              {crumbs.map((crumb, i) =>
            <li key={crumb.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {crumb.to ?
              <Link to={crumb.to} className="rounded hover:text-fg hover:underline underline-offset-4">
                      {crumb.label}
                    </Link> :

              <span aria-current="page" className="text-fg-secondary">
                      {crumb.label}
                    </span>
              }
                </li>
            )}
            </ol>
          </nav>
        }
        <h1 className="mt-4 text-page font-semibold text-fg">{title}</h1>
        {description && <div className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-secondary">{description}</div>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>);

}