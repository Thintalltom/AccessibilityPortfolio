import React from "react";
import { Link } from "react-router-dom";
import { BriefcaseIcon, Code2Icon, FileTextIcon, MailIcon } from "lucide-react";
import { site } from "../../data/site";
import { Placeholder } from "../ui/Placeholder";

const linkClass = "break-all font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline";

export function ContactLinks() {
  const rows = [
  {
    label: "Email",
    Icon: MailIcon,
    value: site.email ? <a href={`mailto:${site.email}`} className={linkClass}>{site.email}</a> : <Placeholder>verified email address</Placeholder>
  },
  {
    label: "LinkedIn",
    Icon: BriefcaseIcon,
    value: site.linkedinUrl ? <a href={site.linkedinUrl} className={linkClass}>Tomide Adeyanju</a> : <Placeholder>LinkedIn profile URL</Placeholder>
  },
  {
    label: "GitHub",
    Icon: Code2Icon,
    value: site.githubUrl ? <a href={site.githubUrl} className={linkClass}>Tomide Adeyanju</a> : <Placeholder>GitHub profile URL</Placeholder>
  },
  {
    label: "CV",
    Icon: FileTextIcon,
    value: site.cvUrl ?
        <a href={site.cvUrl} download="Tomide_Adeyanju_CV.pdf" className={linkClass}>Download CV (PDF)</a> :

    <Link to="/experience#cv" className={linkClass}>Experience page — PDF not yet published</Link>

  }];


  return (
    <dl className="divide-y divide-line border-y border-line">
      {rows.map(({ label, Icon, value }) =>
      <div key={label} className="grid grid-cols-[28px_96px_1fr] items-center gap-3 py-4">
          <Icon aria-hidden="true" className="h-5 w-5 text-fg-muted" />
          <dt className="text-[15px] text-fg-muted">{label}</dt>
          <dd className="min-w-0 text-[15px]">{value}</dd>
        </div>
      )}
    </dl>);

}