import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing/react";
import Header from "../Header";
import { GET_CATEGORIES } from "../navigation/Navigation";

const mocks = [
  {
    request: {
      query: GET_CATEGORIES,
      variables: {
        where: { parent: { slug: { equals: "torty" } } },
      },
    },
    result: () => {
      const categoriesData: { id: string; name: string; slug: string }[] = [];
      Array.from({ length: 8 }).map((data, idx) => {
        const categoryObj = {
          id: "mock-id-" + idx,
          name: "mock-name",
          slug: "muck-slug",
        };
        categoriesData.push(categoryObj);
      });
      return {
        data: {
          categories: categoriesData,
        },
      };
    },
    maxUsageCount: Number.POSITIVE_INFINITY,
  },
];

describe("Header component", () => {
  it("render site icon", () => {
    // Arrange
    render(
      <MockedProvider mocks={mocks}>
        <Header />
      </MockedProvider>
    );

    // Act
    const headerSiteIcon = screen.getByTestId("header-site-icon");

    // Assert
    expect(headerSiteIcon).toBeInTheDocument();
  });

  it("add active class to menubar button", async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <MockedProvider mocks={mocks}>
        <Header />
      </MockedProvider>
    );

    // Act
    const headerMenuButton = screen.getByTestId("header-menu-button");

    await user.click(headerMenuButton);

    // Assert
    expect(headerMenuButton).toHaveClass("active");
  });
});
