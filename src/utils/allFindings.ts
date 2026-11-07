import { accessibilityFindings } from "../data/accessibilityFindings";
import { performanceFindings } from "../data/performanceFindings";
import type { Finding } from "../types/finding";

export const allFindings: Finding[] = [...accessibilityFindings, ...performanceFindings];