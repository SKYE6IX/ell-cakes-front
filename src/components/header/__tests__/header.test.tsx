import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../Header";
import { Category } from "@/types/__generated__/graphql";

const mockCategories: Category[] = [
  {
    id: "36029e99-3127-4729-a08f-97c1aa335869",
    name: "Торты на День рождения",
    slug: "torty-na-den-rozhdeniya",
    __typename: "Category",
    createdAt: undefined,
    parent: null,
    products: null,
    productsCount: null,
    updatedAt: undefined,
  },
  {
    id: "6a46fca0-e2cc-4954-8bf7-9e92600d5b70",
    name: "Корпоративные Торты",
    slug: "korporativnye-torty",
    __typename: "Category",
    createdAt: undefined,
    parent: null,
    products: null,
    productsCount: null,
    updatedAt: undefined,
  },
];

describe("Header component", () => {
  it("render site icon", () => {
    // Arrange
    render(<Header categories={mockCategories} />);

    // Act
    const headerSiteIcon = screen.getByTestId("header-site-icon");

    // Assert
    expect(headerSiteIcon).toBeInTheDocument();
  });

  it("add active class to menubar button", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<Header categories={mockCategories} />);
    // Act
    const headerMenuButton = screen.getByTestId("header-menu-button");

    await user.click(headerMenuButton);

    // Assert
    expect(headerMenuButton).toHaveClass("active");
  });
});
