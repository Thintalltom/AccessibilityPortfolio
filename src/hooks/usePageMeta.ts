import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { site } from "../data/site";

const SITE_URL = "https://tomideadeyanju.com";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="canonical"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

export function usePageMeta(title: string, description: string) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = `Tomide Adeyanju | ${title}`;
    const canonical = `${SITE_URL}${pathname}`;

    document.title = fullTitle;

    setMeta("name", "description", description);
    setMeta("name", "author", "Tomide Adeyanju");
    setMeta("name", "robots", "index, follow");

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", `${SITE_URL}/profile.png`);
    setMeta("property", "og:image:alt", "Tomide Adeyanju");

    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", `${SITE_URL}/profile.png`);

    setCanonical(canonical);
  }, [title, description, pathname]);
}
