import React from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../utils/cn";
import { readingContainer } from "../utils/layout";
import { PageHeader } from "../components/ui/PageHeader";
import { Placeholder } from "../components/ui/Placeholder";

const h2 = "mt-12 text-2xl font-semibold text-fg";
const p = "mt-4 text-[17px] leading-relaxed text-fg-secondary";

export function Privacy() {
  usePageMeta("Privacy", "What this portfolio does and does not collect.");

  return (
    <>
      <PageHeader width="reading" title="Privacy" description="Short version: this site does not collect personal information." crumbs={[{ label: "privacy" }]} />
      <div className={cn(readingContainer, "pb-12")}>
        <h2 className={h2}>What is collected</h2>
        <p className={p}>No cookies, analytics, tracking scripts, accounts or forms. Fonts are loaded from Google Fonts, which receives your IP address as part of serving the files.</p>
        <h2 className={h2}>Hosting</h2>
        <p className={p}>
          The hosting provider may keep standard server logs (such as IP address and requested URL) for security and operations.{" "}
          <Placeholder>name the hosting provider and link its privacy policy</Placeholder>
        </p>
        <h2 className={h2}>Demo data</h2>
        <p className={p}>
          The AccessLab portal uses only synthetic data. Anything you type into a demo stays in your browser’s memory and disappears when you leave
          the page. Nothing is sent anywhere, and no real bookings are made.
        </p>
        <h2 className={h2}>If you email me</h2>
        <p className={p}>Your message is used only to reply to you and is not shared.</p>
      </div>
    </>);

}