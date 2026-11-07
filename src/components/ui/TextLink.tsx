import React from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "../../utils/cn";

type TextLinkProps = {to: string;children: ReactNode;className?: string;arrow?: boolean;};

export function TextLink({ to, children, className, arrow = true }: TextLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center gap-1.5 rounded font-medium text-accent underline-offset-4 transition-colors duration-150 hover:text-accent-hover hover:underline",
        className
      )}>
      
      {children}
      {arrow &&
      <ArrowRightIcon
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />

      }
    </Link>);

}