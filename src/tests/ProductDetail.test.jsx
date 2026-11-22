import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { it, expect, vi } from "vitest";
import ProductDetail from "../pages/ProductDetail";

const coffee = { id: 1, name: "Espresso", description: "Strong", price: 3 };

function showPage() {
  render(
    <MemoryRouter initialEntries={["/products/1"]}>
      <Routes>
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products" element={<p>List page</p>} />
      </Routes>
    </MemoryRouter>
  );
}

it("shows the product", async () => {
  global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => coffee });
  showPage();
  expect(await screen.findByText("Espresso")).toBeInTheDocument();
});

it("shows not found for a bad id", async () => {
  global.fetch = vi.fn().mockResolvedValue({ ok: false });
  showPage();
  expect(await screen.findByText("Product not found")).toBeInTheDocument();
});

// first fetch loads the item, second fetch is the PATCH
it("edit updates the price", async () => {
  global.fetch = vi
    .fn()
    .mockResolvedValueOnce({ ok: true, json: async () => coffee })
    .mockResolvedValueOnce({ ok: true, json: async () => ({ ...coffee, price: 5 }) });
  showPage();
  await screen.findByText("Espresso");

  await userEvent.clear(screen.getByLabelText("Edit price"));
  await userEvent.type(screen.getByLabelText("Edit price"), "5");
  await userEvent.click(screen.getByText("Save"));

  expect(await screen.findByText("Price: KSh 5")).toBeInTheDocument();
});

it("delete goes back to the list", async () => {
  vi.spyOn(window, "confirm").mockReturnValue(true);
  global.fetch = vi
    .fn()
    .mockResolvedValueOnce({ ok: true, json: async () => coffee })
    .mockResolvedValueOnce({ ok: true });
  showPage();
  await screen.findByText("Espresso");

  await userEvent.click(screen.getByText("Delete"));
  expect(await screen.findByText("List page")).toBeInTheDocument();
});