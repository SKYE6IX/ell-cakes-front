import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import { GET_PRODUCT_HOME_BANNERS_QUERY } from "../operation";
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

const mocks = [
  {
    request: {
      query: GET_PRODUCT_HOME_BANNERS_QUERY,
      variables: { take: 3 },
    },
    result: {
      data: {
        productHomeBanners: mockBannerData,
      },
    },
    maxUsageCount: 2,
  },
];

describe("Hero Section Component", () => {
  it("render banner text content", async () => {
    // Arrange
    render(
      <MockedProvider mocks={mocks}>
        <Hero />
      </MockedProvider>
    );

    // Assert
    const productTitle = screen.getByRole("heading", { level: 3 });
    const bannerText = screen.getByTestId("hero-banner-text");

    // Act
    expect(productTitle).toBeInTheDocument();
    expect(bannerText).toBeInTheDocument();
  });

  it("render banner media content", () => {
    // Arrange
    render(
      <MockedProvider mocks={mocks}>
        <Hero />
      </MockedProvider>
    );

    // Assert
    const bannerImages = screen.getAllByTestId("hero-banner-image");
    // Act
    expect(bannerImages.length).toBeGreaterThan(1);
    for (const el of bannerImages) {
      expect(el).toBeInTheDocument();
    }
  });
});
