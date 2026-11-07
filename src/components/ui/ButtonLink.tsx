import React from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { buttonClasses } from "../../utils/buttonStyles";
import type { ButtonSize, ButtonVariant } from "../../utils/buttonStyles";
import { cn } from "../../utils/cn";

type ButtonLinkProps = {
  to: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function ButtonLink({ to, variant = "primary", size = "md", className, children, ...rest }: ButtonLinkProps) {
  const classes = cn(buttonClasses(variant, size), className);
  const isExternal = /^(https?:|mailto:)/.test(to) || to.endsWith(".pdf");

  if (isExternal) {
    return (
      <a href={to} className={classes} {...rest}>
        {children}
      </a>);

  }

  return (
    <Link to={to} className={classes} {...rest}>
      {children}
    </Link>);

}