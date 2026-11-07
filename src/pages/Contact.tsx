import React from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../utils/cn";
import { container } from "../utils/layout";
import { PageHeader } from "../components/ui/PageHeader";
import { ContactLinks } from "../components/contact/ContactLinks";

export function Contact() {
  usePageMeta("Contact", "Get in touch about a project, an accessibility challenge or an engineering opportunity.");

  return (
    <>
      <PageHeader
        title="Contact"
        description="Have a project, accessibility challenge, or engineering opportunity? Email is the most reliable way to reach me."
        crumbs={[{ label: "contact" }]} />
      
      <div className={cn(container, "grid gap-12 py-12 lg:grid-cols-[1.2fr_1fr]")}>
        <ContactLinks />
        <div className="text-[15px] leading-relaxed text-fg-muted">
          <h2 className="font-semibold text-fg">Why there’s no contact form</h2>
          <p className="mt-2">
            A form needs a service to deliver messages and store your details. Email avoids both, so this site collects no personal information.
          </p>
          <h2 className="mt-6 font-semibold text-fg">Reporting an accessibility barrier</h2>
          <p className="mt-2">Please use the email address above and mention the page you were on.</p>
        </div>
      </div>
    </>);

}