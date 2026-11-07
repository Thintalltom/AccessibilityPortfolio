import React from "react";
import { useLocation } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../utils/cn";
import { container } from "../utils/layout";
import { ButtonLink } from "../components/ui/ButtonLink";

export function NotFound() {
  const { pathname } = useLocation();
  usePageMeta("Page not found", "The requested page could not be found.");

  return (
    <div className={cn(container, "py-24 md:py-32")}>
      <p className="font-mono text-[13px] text-accent-secondary">404 · {pathname}</p>
      <h1 className="mt-4 text-page font-semibold text-fg">Page not found</h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-fg-secondary">
        There’s nothing at this address. It may have moved, or the link may contain a typo.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink to="/">Go to the homepage</ButtonLink>
        <ButtonLink to="/projects" variant="secondary">Browse projects</ButtonLink>
        <ButtonLink to="/accessibility" variant="secondary">Accessibility Lab</ButtonLink>
      </div>
    </div>);

}