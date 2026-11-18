import { useEffect, useState } from "react";
import type { ExperienceEntry } from "../types/content";
import { getExperience } from "../lib/queries";
import { experience as staticExperience } from "../data/experience";

export function useExperience() {
  const [experience, setExperience] = useState<ExperienceEntry[]>(staticExperience);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperience()
      .then((data) => { if (data?.length) setExperience(data); })
      .catch(() => {/* keep static fallback */})
      .finally(() => setLoading(false));
  }, []);

  return { experience, loading };
}
