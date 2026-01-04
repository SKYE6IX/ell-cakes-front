import { render, screen } from "@testing-library/react";
import { QueryRef, useReadQuery } from "@apollo/client/react";
import { MockedProvider } from "@apollo/client/testing/react";
import ProductInfoPanel from "../product-info-panel/ProductInfoPanel";
import { mockProduct } from "mock-data";
import {
  MixBoxProduct,
  Product,
  ProductFilling,
} from "@/types/__generated__/graphql";

jest.mock("@apollo/client/react", () => ({
  ...jest.requireActual("@apollo/client/react"),
  useReadQuery: jest.fn(),
}));

describe("Product Info Panel", () => {
  it("render product title", () => {
    // Arrange
    const mockProductRef: QueryRef<{ product: Product }> = {};
    const mockFillingsRef: QueryRef<{ productFillings: ProductFilling[] }> = {};
    const mockMixBoxRef: QueryRef<{ mixBoxProduct: MixBoxProduct }> = {};

    (useReadQuery as unknown as jest.Mock).mockImplementation((queryRef) => {
      switch (queryRef) {
        case mockProductRef:
          return { data: { product: mockProduct } };

        case mockFillingsRef:
          return { data: { productFillings: mockProduct.fillings } };

        case mockMixBoxRef:
          return { data: { mixBoxProduct: mockProduct.mixBoxProduct } };

        default:
          return { data: null };
      }
    });

    render(
      <MockedProvider>
        <ProductInfoPanel
          productQueryRef={mockProductRef}
          fillingsQueryRef={mockFillingsRef}
          mixBoxQueryRef={mockMixBoxRef}
        />
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
    const mockProductRef: QueryRef<{ product: Product }> = {};
    const mockFillingsRef: QueryRef<{ productFillings: ProductFilling[] }> = {};
    const mockMixBoxRef: QueryRef<{ mixBoxProduct: MixBoxProduct }> = {};

    (useReadQuery as unknown as jest.Mock).mockImplementation((queryRef) => {
      switch (queryRef) {
        case mockProductRef:
          return { data: { product: mockProduct } };

        case mockFillingsRef:
          return { data: { productFillings: mockProduct.fillings } };

        case mockMixBoxRef:
          return { data: { mixBoxProduct: mockProduct.mixBoxProduct } };

        default:
          return { data: null };
      }
    });

    render(
      <MockedProvider>
        <ProductInfoPanel
          productQueryRef={mockProductRef}
          fillingsQueryRef={mockFillingsRef}
          mixBoxQueryRef={mockMixBoxRef}
        />
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
