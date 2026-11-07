import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";
import { primaryNav, site } from "../../data/site";
import { cn } from "../../utils/cn";
import { container } from "../../utils/layout";
import { CvLink } from "./CvLink";
import logo from '../../Asset/Tomide.png';
export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const name = site.ownerName ?? "Yo Name";
  const initials = name.
  split(" ").
  map((part) => part[0]).
  join("").
  slice(0, 2).
  toUpperCase();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg print:hidden">
      <div className={cn(container, "flex h-16 items-center justify-between gap-6")}>
        <Link to="/" className="flex shrink-0 items-center gap-2.5 rounded-md text-fg">
          <img
            src={logo}
            alt=""
            aria-hidden="true"
            className="h-8 w-8 rounded-lg border border-line-strong object-cover"
          />
          <span className="font-semibold tracking-tight">{name}</span>
          <span className="sr-only">, home</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center">
            {primaryNav.map((item) =>
            <li key={item.to}>
                <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                cn(
                  "relative inline-flex h-16 items-center whitespace-nowrap px-3 text-[15px] transition-colors duration-150",
                  isActive ?
                  "font-medium text-fg after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-accent" :
                  "text-fg-secondary hover:text-fg"
                )
                }>
                
                  {item.label}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <CvLink className="hidden sm:inline-flex" />
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-[10px] border border-line-strong px-3.5 text-sm font-medium text-fg transition-colors duration-150 hover:bg-surface-hover lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}>
            
            {open ? <XIcon aria-hidden="true" className="h-4 w-4" /> : <MenuIcon aria-hidden="true" className="h-4 w-4" />}
            Menu
          </button>
        </div>
      </div>

      <nav id="mobile-navigation" aria-label="Main" hidden={!open} className="border-t border-line bg-bg-elevated lg:hidden">
        <ul className={cn(container, "py-3")}>
          {primaryNav.map((item) =>
          <li key={item.to}>
              <NavLink
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
              cn(
                "flex min-h-[48px] items-center border-l-2 pl-4 text-base",
                isActive ? "border-accent font-medium text-fg" : "border-transparent text-fg-secondary hover:text-fg"
              )
              }>
              
                {item.label}
              </NavLink>
            </li>
          )}
          <li className="mt-3 border-t border-line pt-4 sm:hidden">
            <CvLink size="md" className="w-full" />
          </li>
        </ul>
      </nav>
    </header>);

}