import { render, screen } from "@testing-library/react";
import { QueryRef, useReadQuery } from "@apollo/client/react";
import ProductGallery from "../product-gallery/ProductImageGallery";
import { mockProduct } from "mock-data";
import { ProductImage, ProductVideo } from "@/types/__generated__/graphql";

jest.mock("@apollo/client/react");

beforeEach(() => {
  global.IntersectionObserver = class {
    constructor(private callback: IntersectionObserverCallback) {}
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    takeRecords = jest.fn(() => []);
    trigger = (entries: IntersectionObserverEntry[]) =>
      // @ts-expect-error unknow error
      this.callback(entries, this);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
});

describe("Product Gallery Component", () => {
  it("render product images", () => {
    // Arrange
    const mockImageRef: QueryRef<{ productImages: ProductImage[] }> = {};
    const mockVideoRef: QueryRef<{ productVideo: ProductVideo }> = {};

    (useReadQuery as unknown as jest.Mock).mockImplementation((queryRef) => {
      switch (queryRef) {
        case mockImageRef:
          return { data: { productImages: mockProduct.images } };

        case mockVideoRef:
          return { data: { productVideo: mockProduct.video } };

        default:
          return { data: null };
      }
    });

    render(
      <ProductGallery
        imagesQueryRef={mockImageRef}
        videoQueryRef={mockVideoRef}
      />
    );

    // Act
    const productImages = screen.getAllByTestId("product-image-view");
    // Act
    expect(productImages.length).toBeGreaterThan(1);
    for (const el of productImages) {
      expect(el).toBeInTheDocument();
    }
  });

  it("render product thumbnails", () => {
    // Arrnage
    const mockImageRef: QueryRef<{ productImages: ProductImage[] }> = {};
    const mockVideoRef: QueryRef<{ productVideo: ProductVideo }> = {};

    (useReadQuery as unknown as jest.Mock).mockImplementation((queryRef) => {
      switch (queryRef) {
        case mockImageRef:
          return { data: { productImages: mockProduct.images } };

        case mockVideoRef:
          return { data: { productVideo: mockProduct.video } };

        default:
          return { data: null };
      }
    });

    render(
      <ProductGallery
        imagesQueryRef={mockImageRef}
        videoQueryRef={mockVideoRef}
      />
    );

    // Act
    const imagesThumbnails = screen.getAllByTestId("product-image-thumbnail");
    // Act
    expect(imagesThumbnails.length).toBeGreaterThan(1);
    for (const el of imagesThumbnails) {
      expect(el).toBeInTheDocument();
    }
  });
});
