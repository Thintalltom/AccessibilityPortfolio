import React, { useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout() {
  const { pathname, hash } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const first = isFirstRender.current;
    isFirstRender.current = false;

    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.scrollIntoView({ block: "start" });
        target.focus({ preventScroll: true });
        return;
      }
    }
    if (first) return;
    window.scrollTo(0, 0);
    // Move focus to the new page so screen reader and keyboard users start at the top of the content.
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, hash]);

  const skipToMain = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    mainRef.current?.focus();
    mainRef.current?.scrollIntoView();
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-bg text-fg">
      <a href="#main-content" className="skip-link" onClick={skipToMain}>
        Skip to main content
      </a>
      <Header />
      <main id="main-content" ref={mainRef} tabIndex={-1} className="flex-1 focus:outline-none">
        <motion.div
          key={pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}>
          
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>);

}