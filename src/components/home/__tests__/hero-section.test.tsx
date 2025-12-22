import { render, screen } from "@testing-library/react";
import { QueryRef } from "@apollo/client/react";
import { ProductHomeBanner } from "@/types/__generated__/graphql";
import Hero from "../hero-section/Hero";
import { mockBannerData } from "mock-data";

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

jest.mock("@apollo/client/react", () => ({
  useReadQuery: () => ({
    data: {
      productHomeBanners: mockBannerData,
    },
  }),
}));

describe("Hero Section Component", () => {
  it("render banner text content", async () => {
    // Arrange
    const mockQuerRef: QueryRef<{ productHomeBanners: ProductHomeBanner[] }> =
      {};
    render(<Hero queryRef={mockQuerRef} />);

    // Assert
    const heroBadge = screen.getByRole("heading", { level: 5 });
    const productTitle = screen.getByRole("heading", { level: 3 });
    const bannerText = screen.getByTestId("hero-banner-text");

    // Act
    expect(heroBadge).toBeInTheDocument();
    expect(productTitle).toBeInTheDocument();
    expect(productTitle).toHaveTextContent(
      String(mockBannerData[0].product?.name)
    );
    expect(bannerText).toBeInTheDocument();
  });

  it("render banner media content", () => {
    // Arrange
    // Arrange
    const mockQuerRef: QueryRef<{ productHomeBanners: ProductHomeBanner[] }> =
      {};
    render(<Hero queryRef={mockQuerRef} />);

    // Assert
    const bannerImages = screen.getAllByTestId("hero-banner-image");
    // Act
    expect(bannerImages.length).toBeGreaterThan(1);
    for (const el of bannerImages) {
      expect(el).toBeInTheDocument();
    }
  });
});
