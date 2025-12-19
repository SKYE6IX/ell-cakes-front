import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductVariantSelector from "../product-variant-selector/ProductVariantSelector";
import { mockProduct } from "mock-data";

describe("Product variant selector", () => {
  it("render initial weight value and price", () => {
    // Arrange
    const mockDispatch = jest.fn();
    render(
      <ProductVariantSelector
        variantType={mockProduct.variantType!}
        variants={mockProduct.fillings![0].variants!}
        dispatch={mockDispatch}
      />
    );

    // Assert
    const variantWeight = screen.getByTestId("product-variant-weight");
    const variantPrice = screen.getByTestId("product-variant-price");

    // Act
    expect(variantPrice).toBeInTheDocument();
    expect(variantWeight).toBeInTheDocument();

    expect(variantPrice).toHaveTextContent(
      String(mockProduct.fillings![0].variants![0].price)
    );
    expect(variantWeight).toHaveTextContent(
      String(mockProduct.fillings![0].variants![0].weight)
    );
  });

  it("render diffrent weight value and price when increase", async () => {
    // Arrange
    const mockDispatch = jest.fn();
    const user = userEvent.setup();
    render(
      <ProductVariantSelector
        variantType={mockProduct.variantType!}
        variants={mockProduct.fillings![0].variants!}
        dispatch={mockDispatch}
      />
    );

    // Assert
    const variantWeight = screen.getByTestId("product-variant-weight");
    const variantPrice = screen.getByTestId("product-variant-price");
    const variantIncreaseBtn = screen.getByTestId(
      "product-variant-increase-btn"
    );

    // Act
    await user.click(variantIncreaseBtn);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "set_selected_product_variant",
      payload: mockProduct.fillings![0].variants![1],
    });

    expect(variantPrice).toHaveTextContent(
      String(mockProduct.fillings![0].variants![1].price)
    );
    expect(variantWeight).toHaveTextContent(
      String(mockProduct.fillings![0].variants![1].weight)
    );
  });
});
