import React from "react";
import { experience } from "../data/experience";
import { site } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../utils/cn";
import { container, sectionHeading } from "../utils/layout";
import { PageHeader } from "../components/ui/PageHeader";
import { Placeholder } from "../components/ui/Placeholder";
import { Timeline } from "../components/experience/Timeline";
import { ButtonLink } from "../components/ui/ButtonLink";

export function Experience() {
  usePageMeta("Experience", "Professional experience, education and certifications.");
  const roles = experience.filter((e) => e.kind === "role");
  const education = experience.filter((e) => e.kind === "education");
  const certifications = experience.filter((e) => e.kind === "certification");

  return (
    <>
      <PageHeader title="Experience" description="Roles, education and certifications, taken from my CV." crumbs={[{ label: "experience" }]} />
      <div className={cn(container, "grid gap-16 py-12 lg:grid-cols-[1.6fr_1fr]")}>
        <section aria-labelledby="roles">
          <h2 id="roles" className={sectionHeading}>Professional experience</h2>
          <div className="mt-8"><Timeline entries={roles} /></div>
        </section>

        <div className="space-y-14">
          <section aria-labelledby="education">
            <h2 id="education" className={sectionHeading}>Education</h2>
            <div className="mt-8"><Timeline entries={education} /></div>
          </section>

          <section aria-labelledby="certs">
            <h2 id="certs" className={sectionHeading}>Certifications</h2>
            {certifications.length > 0 ?
            <div className="mt-8"><Timeline entries={certifications} /></div> :

            <p className="mt-6 text-[15px] leading-relaxed text-fg-secondary">
                None listed. <Placeholder>add only certifications you hold, with issuer and date</Placeholder>
              </p>
            }
          </section>

          <section id="cv" aria-labelledby="cv-h" className="rounded-2xl border border-line bg-surface p-6">
            <h2 id="cv-h" className="text-xl font-semibold text-fg">CV</h2>
            {site.cvUrl ?
            <div className="mt-4">
                <ButtonLink to={site.cvUrl} download>Download CV (PDF)</ButtonLink>
              </div> :

            <p className="mt-3 text-[15px] leading-relaxed text-fg-secondary">
                A downloadable CV has not been published yet. This page reflects its contents.{" "}
                <Placeholder>add the PDF and set cvUrl in data/site.ts</Placeholder>
              </p>
            }
          </section>
        </div>
      </div>
    </>);

}