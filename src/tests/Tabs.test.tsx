import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "../components/library/Tabs";

const tabs = [
{ id: "a", label: "Alpha", content: <p>Alpha panel</p> },
{ id: "b", label: "Beta", content: <p>Beta panel</p> },
{ id: "c", label: "Gamma", content: <p>Gamma panel</p> }];


describe("Tabs", () => {
  it("moves selection with arrow keys, Home and End", async () => {
    render(<Tabs label="Example" tabs={tabs} />);
    await userEvent.click(screen.getByRole("tab", { name: "Alpha" }));
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Beta" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Beta" })).toHaveFocus();
    await userEvent.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Gamma" })).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveFocus();
  });

  it("shows only the selected panel", () => {
    render(<Tabs label="Example" tabs={tabs} />);
    expect(screen.getByText("Alpha panel")).toBeVisible();
    expect(screen.getByText("Beta panel")).not.toBeVisible();
  });
});