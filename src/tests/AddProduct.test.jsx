import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import { ProductContext } from "../context/ProductContext";
import AddProduct from "../components/AddProduct";

describe("AddProduct Component Tests", () => {
  // Create a mock function so we can check if addProduct() gets called
  const mockAddProduct = vi.fn();

  // Helper function to render AddProduct with its required Context and Router
  function renderAddProduct() {
    return render(
      <ProductContext.Provider value={{ addProduct: mockAddProduct }}>
        <MemoryRouter initialEntries={["/add-product"]}>
          <Routes>
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/menu" element={<div>Menu Page Redirect</div>} />
          </Routes>
        </MemoryRouter>
      </ProductContext.Provider>
    );
  }

  // Reset mock calls before each test
  beforeEach(() => {
    mockAddProduct.mockClear();
  });

  test("1. Renders the Add New Product form and default fields", () => {
    renderAddProduct();

    expect(screen.getByText("Add New Product")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Street Runner")).toBeInTheDocument();
    expect(screen.getByDisplayValue("45.00")).toBeInTheDocument();
    expect(screen.getByDisplayValue("59.99")).toBeInTheDocument();
  });

  test("2. Shows status messages when Save Draft or Schedule is clicked", async () => {
    const user = userEvent.setup();
    renderAddProduct();

    // Click Save Draft
    await user.click(screen.getByText(/Save Draft/i));
    expect(screen.getByText("Draft saved!")).toBeInTheDocument();

    // Click Schedule
    await user.click(screen.getByText(/Schedule/i));
    expect(screen.getByText("Product scheduled!")).toBeInTheDocument();
  });

  test("3. Shows an alert and does not submit if Product Name is empty", async () => {
    const user = userEvent.setup();
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    renderAddProduct();

    // Clear the Product Name input
    const nameInput = screen.getByDisplayValue("Street Runner");
    await user.clear(nameInput);

    // Try to submit
    await user.click(screen.getByText("Add Product +"));

    expect(alertMock).toHaveBeenCalledWith("Please enter a product name");
    expect(mockAddProduct).not.toHaveBeenCalled();

    alertMock.mockRestore();
  });

  test("4. Submits the form with updated values and redirects to /menu", async () => {
    const user = userEvent.setup();
    renderAddProduct();

    // Update Product Name
    const nameInput = screen.getByDisplayValue("Street Runner");
    await user.clear(nameInput);
    await user.type(nameInput, "Polar Zoom X");

    // Update Sell Price
    const sellPriceInput = screen.getByDisplayValue("59.99");
    await user.clear(sellPriceInput);
    await user.type(sellPriceInput, "95.00");

    // Submit the form
    await user.click(screen.getByText("Add Product +"));

    // Verify addProduct was called with the new data
    expect(mockAddProduct).toHaveBeenCalledTimes(1);
    expect(mockAddProduct).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Polar Zoom X",
        sellPrice: 95,
        costPrice: 45,
        category: "Running",
      })
    );

    // Verify it navigated to the Menu page
    expect(screen.getByText("Menu Page Redirect")).toBeInTheDocument();
  });
});