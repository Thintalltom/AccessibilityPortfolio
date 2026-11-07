import React from "react";
import { Link } from "react-router-dom";
import { footerNav, site } from "../../data/site";
import { cn } from "../../utils/cn";
import { container } from "../../utils/layout";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-bg-elevated print:hidden">
      <div className={cn(container, "grid gap-10 py-14 md:grid-cols-[1.3fr_repeat(3,1fr)]")}>
        <div>
          <p className="font-semibold text-fg">{site.ownerName ?? "Your Name"}</p>
          <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-fg-muted">{site.role}</p>
          <p className="mt-6 font-mono text-[13px] text-fg-muted">Build it. Test it. Fix it. Prove it.</p>
        </div>
        {footerNav.map((group) =>
        <nav key={group.heading} aria-label={`${group.heading} links`}>
            <h2 className="font-mono text-[13px] text-fg-muted">{group.heading}</h2>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) =>
            <li key={link.to}>
                  <Link to={link.to} className="rounded text-[15px] text-fg-secondary hover:text-fg hover:underline underline-offset-4">
                    {link.label}
                  </Link>
                </li>
            )}
            </ul>
          </nav>
        )}
      </div>
      <div className="border-t border-line">
        <p className={cn(container, "py-6 text-sm text-fg-muted")}>
          © {year} {site.ownerName ?? "Your Name"}. Built with React, TypeScript and Tailwind CSS. No tracking scripts.
        </p>
      </div>
    </footer>);

}