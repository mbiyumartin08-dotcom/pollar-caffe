import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

function setup() {
  render(<MemoryRouter><Navbar /></MemoryRouter>);
}

test("renders a link to every page", () => {
  setup();
  for (const name of ["Menu", "Orders", "Dashboard"]) {
    expect(screen.getByRole("link", { name })).toBeInTheDocument();
  }
});

test("hamburger toggles aria-expanded", async () => {
  setup();
  const btn = screen.getByRole("button", { name: /toggle menu/i });
  expect(btn).toHaveAttribute("aria-expanded", "false");
  await userEvent.click(btn);
  expect(btn).toHaveAttribute("aria-expanded", "true");
});
