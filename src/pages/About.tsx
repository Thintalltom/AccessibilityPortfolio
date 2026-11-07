import React from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../utils/cn";
import { readingContainer } from "../utils/layout";
import { PageHeader } from "../components/ui/PageHeader";
import { Placeholder } from "../components/ui/Placeholder";
import { TextLink } from "../components/ui/TextLink";

const h2 = "mt-14 text-2xl font-semibold text-fg";
const p = "mt-4 text-[17px] leading-relaxed text-fg-secondary";

const debugging = [
"Reproduce it reliably, and write the steps down.",
"Shrink it to the smallest case that still fails.",
"Form one hypothesis and test it before changing anything else.",
"Fix the cause, then add a test that would have caught it."];


export function About() {
  usePageMeta("About", "Professional background and technical philosophy: frontend engineering and accessibility QA as one discipline.");

  return (
    <>
      <PageHeader
        width="reading"
        title="About"
        description="I build interfaces and I test them — and I think the two jobs make each other better."
        crumbs={[{ label: "about" }]} />
      
      <div className={cn(readingContainer, "pb-12")}>
        <p className={p}>
          <Placeholder>two or three sentences introducing yourself: where you work, what you build and who for</Placeholder>
        </p>

        <h2 className={h2}>How I think about engineering</h2>
        <p className={p}>
          Good frontend code is code the next person can change safely. That means clear component boundaries, types that describe the data
          honestly, and tests that check what users experience rather than how a component happens to be built.
        </p>
        <p className={p}>
          I prefer the platform where it works. A native button, a real label or a <span className="font-mono text-[15px]">&lt;dialog&gt;</span>{" "}
          element carries behaviour that would otherwise have to be rebuilt, tested and maintained by hand.
        </p>

        <h2 className={h2}>Why accessibility</h2>
        <p className={p}>
          Accessibility is where engineering quality becomes visible to people. A missing label or a lost focus position is a bug like any other
          — it just happens to stop someone from finishing a task. I am interested in making those bugs findable, reproducible and fixable.
        </p>

        <h2 className={h2}>Building and testing together</h2>
        <p className={p}>
          Building teaches me where interfaces tend to break. Testing teaches me which decisions prevent those breaks in the first place. The
          Accessibility Lab on this site is that loop made concrete: build something, test it, document what is wrong, fix it and check the fix.
        </p>
        <div className="mt-5">
          <TextLink to="/accessibility">See the lab</TextLink>
        </div>

        <h2 className={h2}>How I debug</h2>
        <ol className="mt-5 space-y-3">
          {debugging.map((d, i) =>
          <li key={d} className="flex gap-4 text-[17px] leading-relaxed text-fg-secondary">
              <span aria-hidden="true" className="mt-1 font-mono text-sm text-accent-secondary">{i + 1}.</span>
              {d}
            </li>
          )}
        </ol>

        <h2 className={h2}>Currently learning</h2>
        <p className={p}>
          <Placeholder>optional: what you are learning now, if you want to share it</Placeholder>
        </p>
      </div>
    </>);

}