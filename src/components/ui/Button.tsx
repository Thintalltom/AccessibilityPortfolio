import React, { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { buttonClasses } from "../../utils/buttonStyles";
import type { ButtonSize, ButtonVariant } from "../../utils/buttonStyles";
import { cn } from "../../utils/cn";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
{ variant = "secondary", size = "md", className, type = "button", ...rest },
ref)
{
  return <button ref={ref} type={type} className={cn(buttonClasses(variant, size), className)} {...rest} />;
});