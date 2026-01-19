import { render, screen } from "@testing-library/react";
import ProductFillingSelector from "../product-filling-selector/ProductFillingSelector";
import { mockProduct } from "mock-data";

describe("Product Filling Selector", () => {
  it("render the images icons", () => {
    // Arrange
    const mockDispatch = jest.fn();
    render(
      <ProductFillingSelector
        fillings={mockProduct.fillings!}
        dispatch={mockDispatch}
      />
    );

    // Assert
    const productFillingImages = screen.getAllByTestId("product-filling-image");

    // Act
    expect(productFillingImages.length).toBeTruthy();

    for (const el of productFillingImages) {
      expect(el).toBeInTheDocument();
    }
  });
});
