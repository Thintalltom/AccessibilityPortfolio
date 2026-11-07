
import { capabilities } from "../../data/capabilities";
import { cn } from "../../utils/cn";
import { container, sectionHeading } from "../../utils/layout";
import { TextLink } from "../ui/TextLink";

export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-heading" className={cn(container, "py-20 lg:py-24")}>
      <h2 id="capabilities-heading" className={sectionHeading}>
        What I work on
      </h2>
      <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-0">
        {capabilities.map((c, i) =>
        <article key={c.id} className={cn("flex flex-col md:px-8", i === 0 ? "md:pl-0" : "md:border-l md:border-line", i === capabilities.length - 1 && "md:pr-0")}>
            <h3 className="text-xl font-semibold text-fg">{c.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-secondary">{c.description}</p>
            <ul className="mt-5 space-y-1.5 font-mono text-[13px] text-fg-muted">
              {c.focus.map((f) =>
            <li key={f}>— {f}</li>
            )}
            </ul>
            <div className="mt-auto pt-6">
              <TextLink to={c.link.to}>{c.link.label}</TextLink>
            </div>
          </article>
        )}
      </div>
    </section>);

}