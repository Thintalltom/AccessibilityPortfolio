import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { FindingExplorer } from "../components/accessibility/FindingExplorer";
import { allFindings } from "../utils/allFindings";

function setup() {
  render(
    <MemoryRouter>
      <FindingExplorer findings={allFindings} />
    </MemoryRouter>
  );
}

describe("FindingExplorer", () => {
  it("announces the filtered count", async () => {
    setup();
    const critical = allFindings.filter((f) => f.severity === "critical").length;
    await userEvent.selectOptions(screen.getByLabelText("Severity"), "critical");
    expect(screen.getByRole("status")).toHaveTextContent(`Showing ${critical} of ${allFindings.length} findings`);
  });

  it("searches by finding ID", async () => {
    setup();
    await userEvent.type(screen.getByLabelText("Search title or ID"), "ALD-007");
    expect(screen.getByRole("button", { name: /dialog does not move or contain focus/i })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Showing 1 of");
  });

  it("shows an empty state that can clear filters", async () => {
    setup();
    await userEvent.type(screen.getByLabelText("Search title or ID"), "no-such-finding");
    expect(screen.getByText("No findings match these filters")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Clear all filters" }));
    expect(screen.getByRole("status")).toHaveTextContent(`Showing ${allFindings.length} of ${allFindings.length}`);
  });

  it("expands finding details", async () => {
    setup();
    const toggle = screen.getByRole("button", { name: /no programmatic labels/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Steps to reproduce")).toBeVisible();
  });
});