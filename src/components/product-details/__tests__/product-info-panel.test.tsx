import { render, screen } from "@testing-library/react";
import ProductInfoPanel from "../product-info-panel/ProductInfoPanel";
import { mockProduct } from "../mock-datas";

describe("Product Info Panel", () => {
  it("render product title", () => {
    // Arrange
    render(<ProductInfoPanel product={mockProduct} />);

    // Assert
    const productTitle = screen.getByTestId("product-title");

    // Act
    expect(productTitle).toBeInTheDocument();
    expect(productTitle).toHaveTextContent(String(mockProduct.name));
  });

  it("render product description", () => {
    // Arrange
    render(<ProductInfoPanel product={mockProduct} />);

    // Assert
    const productDescription = screen.getByTestId("product-description");

    // Act
    expect(productDescription).toBeInTheDocument();
    expect(productDescription).toHaveTextContent(
      String(mockProduct.baseDescription)
    );
  });

  it("render product initial price", () => {
    // Arrange
    render(<ProductInfoPanel product={mockProduct} />);

    // Assert
    const productInitialPrice = screen.getByTestId("product-initial-price");

    // Act
    expect(productInitialPrice).toBeInTheDocument();
    expect(productInitialPrice).toHaveTextContent(
      String(mockProduct.fillings![0].variants![0].price)
    );
  });
});
