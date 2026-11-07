import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookingForm } from "../components/portal/BookingForm";

describe("BookingForm (corrected build)", () => {
  it("labels every field", () => {
    render(<BookingForm variant="fixed" />);
    for (const name of [/Full name/, /Student ID/, /University email/, /Service/, /Date/, /Time/]) {
      expect(screen.getByLabelText(name)).toBeInTheDocument();
    }
  });

  it("focuses an error summary and marks fields invalid on empty submit", async () => {
    render(<BookingForm variant="fixed" />);
    await userEvent.click(screen.getByRole("button", { name: "Continue to confirm" }));
    const summary = screen.getByRole("heading", { name: /There are 6 problems/ }).parentElement;
    expect(summary).toHaveFocus();
    expect(screen.getByLabelText(/Full name/)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(/Full name/)).toHaveAccessibleDescription(/Enter your full name/);
  });

  it("moves focus to a field from the summary link", async () => {
    render(<BookingForm variant="fixed" />);
    await userEvent.click(screen.getByRole("button", { name: "Continue to confirm" }));
    await userEvent.click(screen.getByRole("link", { name: "Enter your full name" }));
    expect(screen.getByLabelText(/Full name/)).toHaveFocus();
  });
});

describe("BookingForm (flawed build)", () => {
  it("reproduces ALD-001: the service select has no accessible name", () => {
    render(<BookingForm variant="flawed" />);
    expect(screen.queryByLabelText(/Service/)).toBeNull();
  });
});