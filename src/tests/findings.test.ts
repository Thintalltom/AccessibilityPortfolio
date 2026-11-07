import { describe, expect, it } from "vitest";
import { allFindings } from "../utils/allFindings";
import { defaultFindingFilters, filterFindings } from "../utils/findings";
import { contrastRatio } from "../utils/contrast";
import { validateBooking } from "../utils/bookingValidation";
import { emptyBooking } from "../utils/bookingValidation";

describe("filterFindings", () => {
  it("returns everything with default filters", () => {
    expect(filterFindings(allFindings, defaultFindingFilters)).toHaveLength(allFindings.length);
  });

  it("matches IDs case-insensitively", () => {
    const result = filterFindings(allFindings, { ...defaultFindingFilters, query: "ald-003" });
    expect(result.map((f) => f.id)).toEqual(["ALD-003"]);
  });

  it("combines filters", () => {
    const result = filterFindings(allFindings, { ...defaultFindingFilters, category: "performance", severity: "low" });
    expect(result.every((f) => f.category === "performance" && f.severity === "low")).toBe(true);
  });
});

describe("finding data integrity", () => {
  it("has unique IDs", () => {
    const ids = allFindings.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("never claims a retest without notes", () => {
    for (const f of allFindings) {
      if (f.status === "retested" || f.status === "not-reproduced") expect(f.retestNotes).toBeTruthy();
    }
  });
});

describe("contrastRatio", () => {
  it("computes black on white as 21:1", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 1);
  });
});

describe("validateBooking", () => {
  it("requires all mandatory fields", () => {
    expect(Object.keys(validateBooking(emptyBooking))).toEqual(["fullName", "studentId", "email", "serviceId", "date", "time"]);
  });

  it("rejects malformed student IDs", () => {
    const errors = validateBooking({ ...emptyBooking, studentId: "12345" });
    expect(errors.studentId).toMatch(/HU-123456/);
  });
});