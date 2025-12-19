import { render, screen } from "@testing-library/react";
import ProductInfoPanel from "../product-info-panel/ProductInfoPanel";
import { MockedProvider } from "@apollo/client/testing/react";
import { mockProduct } from "mock-data";

describe("Product Info Panel", () => {
  it("render product title", () => {
    // Arrange
    render(
      <MockedProvider>
        <ProductInfoPanel product={mockProduct} />
      </MockedProvider>
    );

    // Assert
    const productTitle = screen.getByTestId("product-title");

    // Act
    expect(productTitle).toBeInTheDocument();
    expect(productTitle).toHaveTextContent(String(mockProduct.name));
  });

  it("render product description", () => {
    // Arrange
    render(
      <MockedProvider>
        <ProductInfoPanel product={mockProduct} />
      </MockedProvider>
    );

    // Assert
    const productDescription = screen.getByTestId("product-description");

    // Act
    expect(productDescription).toBeInTheDocument();
    expect(productDescription).toHaveTextContent(
      String(mockProduct.baseDescription)
    );
  });
});
