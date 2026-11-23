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
    expect(screen.queryByText(/Save Draft/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Schedule/i)).not.toBeInTheDocument();
  });

  test("2. Shows an alert and does not submit if Product Name is empty", async () => {
    const user = userEvent.setup();
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    renderAddProduct();

    // Try to submit
    await user.click(screen.getByText("Add Product +"));

    expect(alertMock).toHaveBeenCalledWith("Please enter a product name");
    expect(mockAddProduct).not.toHaveBeenCalled();

    alertMock.mockRestore();
  });

  test("3. Submits the form with updated values and redirects to /menu", async () => {
    const user = userEvent.setup();
    const { container } = renderAddProduct();

    // Update Product Name
    const nameInput = container.querySelector('input[type="text"]');
    await user.type(nameInput, "Polar Zoom X");

    // Update Cost Price
    const numberInputs = container.querySelectorAll('input[type="number"]');
    await user.type(numberInputs[0], "45");

    // Update Sell Price
    await user.type(numberInputs[1], "95.00");

    // Submit the form
    await user.click(screen.getByText("Add Product +"));

    // Verify addProduct was called with the new data
    expect(mockAddProduct).toHaveBeenCalledTimes(1);
    expect(mockAddProduct).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Polar Zoom X",
        sellPrice: 95,
        costPrice: 45,
      })
    );

    // Verify it navigated to the Menu page
    expect(screen.getByText("Menu Page Redirect")).toBeInTheDocument();
  });
});