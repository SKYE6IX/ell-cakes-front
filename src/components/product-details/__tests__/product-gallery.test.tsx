import { render, screen } from "@testing-library/react";
import ProductGallery from "../product-gallery/ProductImageGallery";
import { mockProduct } from "../mock-datas";

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
    render(<ProductGallery productImages={mockProduct.images!} />);

    // Act
    const productImages = screen.getAllByTestId("product-image-view");

    // Act
    expect(productImages.length).toBeGreaterThan(1);
    for (const el of productImages) {
      expect(el).toBeInTheDocument();
    }
  });

  it("render product thumbnails", () => {
    // Arrange
    render(<ProductGallery productImages={mockProduct.images!} />);

    // Act
    const imagesThumbnails = screen.getAllByTestId("product-image-thumbnail");

    // Act
    expect(imagesThumbnails.length).toBeGreaterThan(1);
    for (const el of imagesThumbnails) {
      expect(el).toBeInTheDocument();
    }
  });
});
