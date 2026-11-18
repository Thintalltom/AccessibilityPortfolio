import { useEffect, useState } from "react";
import type { Project } from "../types/content";
import { getProjects } from "../lib/queries";
import { projects as staticProjects } from "../data/projects";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => { if (data?.length) setProjects(data); })
      .catch(() => {/* keep static fallback */})
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading };
}
