import { render, screen } from "@testing-library/react";
import ProductList from "../ProductList";
import { mockProducts } from "../mock-data";

describe("Product List Component", () => {
  it("render product images", () => {
    // Arrange
    render(<ProductList products={mockProducts} />);

    // Assert
    const productCardImages = screen.getAllByTestId("product-card-image");

    // Act
    expect(productCardImages.length).toBeGreaterThan(1);
    for (const el of productCardImages) {
      expect(el).toBeInTheDocument();
    }
  });

  it("render product text content", () => {
    // Arrange
    render(<ProductList products={mockProducts} />);

    // Assert
    const productCardNames = screen.getAllByRole("heading", { level: 3 });
    const productCardDescription = screen.getAllByTestId(
      "product-card-description"
    );

    // Act
    expect(productCardNames[0]).toBeInTheDocument();
    expect(productCardNames[0]).toHaveTextContent(mockProducts[0].name!);
    expect(productCardDescription[0]).toBeInTheDocument();
    expect(productCardDescription[0]).toHaveTextContent(
      mockProducts[0].baseDescription!
    );
  });

  it("render product price and weight", () => {
    // Arrange
    render(<ProductList products={mockProducts} />);

    // Assert
    const productCardPrices = screen.getAllByTestId("product-card-price");
    const productCardWeights = screen.getAllByTestId("product-card-weight");

    // Act
    expect(productCardPrices[0]).toBeInTheDocument();
    expect(productCardPrices[0]).toHaveTextContent(
      String(mockProducts[0].fillings![0].variants![0].price)
    );
    expect(productCardWeights[0]).toBeInTheDocument();
    expect(productCardWeights[0]).toHaveTextContent(
      String(mockProducts[0].fillings![0].variants![0].weight)
    );
  });
});
