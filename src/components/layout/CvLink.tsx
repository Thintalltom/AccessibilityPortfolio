import React from "react";
import { DownloadIcon, FileTextIcon } from "lucide-react";
import { site } from "../../data/site";
import { ButtonLink } from "../ui/ButtonLink";
import type { ButtonSize, ButtonVariant } from "../../utils/buttonStyles";

type CvLinkProps = {variant?: ButtonVariant;size?: ButtonSize;className?: string;};

/** Offers a real download only when a CV file has been configured. */
export function CvLink({ variant = "secondary", size = "sm", className }: CvLinkProps) {
  if (site.cvUrl) {
    return (
      <ButtonLink to={site.cvUrl} variant={variant} size={size} className={className} download>
        <DownloadIcon aria-hidden="true" className="h-4 w-4" />
        Download CV
        <span className="sr-only">(PDF)</span>
      </ButtonLink>);

  }
  return (
    <ButtonLink to="/experience#cv" variant={variant} size={size} className={className}>
      <FileTextIcon aria-hidden="true" className="h-4 w-4" />
      View CV
    </ButtonLink>);

}