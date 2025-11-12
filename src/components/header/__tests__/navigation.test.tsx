import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing/react";
import Navigation, { GET_CATEGORIES } from "../navigation/Navigation";

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

describe("Navigation component", () => {
  it("render navigation menu item", () => {
    //   // Arrange
    render(
      <MockedProvider mocks={mocks}>
        <Navigation isMenuOpen={false} />
      </MockedProvider>
    );
    //   // Act
    const navigationMenuItems = screen.getAllByTestId("navigation-menu-item");
    //   // Assert
    expect(navigationMenuItems.length).toEqual(5);
    for (const el of navigationMenuItems) {
      expect(el).toBeInTheDocument();
    }
  });

  it("render navigation sub menu item", async () => {
    // Arrange
    render(
      <MockedProvider mocks={mocks}>
        <Navigation isMenuOpen={false} />
      </MockedProvider>
    );

    await waitFor(() => {
      // Act
      const navigationSubMenuItems = screen.getAllByTestId(
        "navigation-sub-menu-item"
      );

      // Assert
      expect(navigationSubMenuItems.length).toEqual(8);
      for (const el of navigationSubMenuItems) {
        expect(el).toBeInTheDocument();
      }
    });
  });

  it("show sub menu on mobile when user click", async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <MockedProvider mocks={mocks}>
        <Navigation isMenuOpen={true} />
      </MockedProvider>
    );
    // Act
    const subMenuTrigger = screen.getByTestId("navigation-sub-menu-trigger");
    const navigationWidget = screen.getByTestId("navigation-widget");
    await user.click(subMenuTrigger);
    // Assert
    expect(subMenuTrigger).toHaveClass("active");
    expect(navigationWidget).toHaveClass("open-sub-menu");
  });
});
