import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import { GET_REVEIW_QUERY } from "../operation";
import { ImageExtension, Review } from "@/types/__generated__/graphql";
import Reviews from "../reviews/Reviews";

const mockData: Review[] = [
  {
    __typename: "Review",
    createdAt: undefined,
    description: "Random descriptiom",
    id: "1d-1",
    image: {
      __typename: "ImageFieldOutput",
      extension: ImageExtension.Gif,
      filesize: 0,
      height: 0,
      id: "",
      url: "https://storage.yandexcloud.net/ell-cake-review-images/1nRFznJc2mKMVthrf0KpaA.jpg",
      width: 0,
    },
    updatedAt: undefined,
    user: "Mock User 01",
  },
  {
    __typename: "Review",
    createdAt: undefined,
    description: "Random descriptiom",
    id: "1d-2",
    image: {
      __typename: "ImageFieldOutput",
      extension: ImageExtension.Gif,
      filesize: 0,
      height: 0,
      id: "",
      url: "https://storage.yandexcloud.net/ell-cake-review-images/1nRFznJc2mKMVthrf0KpaA.jpg",
      width: 0,
    },
    updatedAt: undefined,
    user: "Mock User 02",
  },
];

const mocks = [
  {
    request: {
      query: GET_REVEIW_QUERY,
      variable: undefined,
    },
    result: {
      data: {
        reviews: mockData,
      },
    },
    maxUsageCount: 2,
  },
];

describe("Review Section Component", () => {
  it("render review content", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Reviews />
      </MockedProvider>,
    );

    const headingText = await screen.findByRole("heading", { level: 3 });
    expect(headingText).toBeInTheDocument();

    const reviewItems = await screen.findAllByTestId("review-item");

    for (const review of reviewItems) {
      expect(review).toBeInTheDocument();
    }
  });
});
