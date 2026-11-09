import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing/react";
import { Category } from "@/types/__generated__/graphql";
import Navigation from "../navigation/Navigation";

const mockCategories: Category[] = [
  {
    id: "3cf79f1b-9a95-4ba0-9966-92aa7dd32eejd5",
    name: "Ассортимент",
    slug: "assortiment",
    __typename: "Category",
    createdAt: undefined,
    parent: null,
    products: null,
    productsCount: null,
    updatedAt: undefined,
    isAvailable: null,
    priority: null,
  },
  {
    id: "36029e99-3127-4729-a08f-97c1aa335869",
    name: "Торты на День рождения",
    slug: "torty-na-den-rozhdeniya",
    __typename: "Category",
    createdAt: undefined,
    parent: {
      __typename: "Category",
      createdAt: undefined,
      id: "",
      isAvailable: null,
      name: null,
      parent: null,
      products: null,
      productsCount: null,
      slug: "assortiment",
      updatedAt: undefined,
      priority: null,
    },
    products: null,
    productsCount: null,
    updatedAt: undefined,
    isAvailable: null,
    priority: null,
  },
  {
    id: "6a46fca0-e2cc-4954-8bf7-9e92600d5b70",
    name: "Корпоративные Торты",
    slug: "korporativnye-torty",
    __typename: "Category",
    createdAt: undefined,
    parent: {
      __typename: "Category",
      createdAt: undefined,
      id: "",
      isAvailable: null,
      name: null,
      parent: null,
      products: null,
      productsCount: null,
      slug: "assortiment",
      updatedAt: undefined,
      priority: null,
    },
    products: null,
    productsCount: null,
    updatedAt: undefined,
    isAvailable: null,
    priority: null,
  },
  {
    id: "d032a8ec-28e7-473c-a628-7175cf84c631",
    name: "Торты для детей",
    slug: "torty-dlya-detey",
    __typename: "Category",
    createdAt: undefined,
    parent: {
      __typename: "Category",
      createdAt: undefined,
      id: "",
      isAvailable: null,
      name: null,
      parent: null,
      products: null,
      productsCount: null,
      slug: "assortiment",
      updatedAt: undefined,
      priority: null,
    },
    products: null,
    productsCount: null,
    updatedAt: undefined,
    isAvailable: null,
    priority: null,
  },
  {
    id: "e920de9b-fb78-485d-83f9-fa7793dd40fa",
    name: "Торты для Нее",
    slug: "torty-dlya-nee",
    __typename: "Category",
    createdAt: undefined,
    parent: {
      __typename: "Category",
      createdAt: undefined,
      id: "",
      isAvailable: null,
      name: null,
      parent: null,
      products: null,
      productsCount: null,
      slug: "assortiment",
      updatedAt: undefined,
      priority: null,
    },
    products: null,
    productsCount: null,
    updatedAt: undefined,
    isAvailable: null,
    priority: null,
  },
  {
    id: "ed5bb33d-d6cd-44db-a8cd-0e56051eaf22",
    name: "Торты для Него",
    slug: "torty-dlya-nego",
    __typename: "Category",
    createdAt: undefined,
    parent: {
      __typename: "Category",
      createdAt: undefined,
      id: "",
      isAvailable: null,
      name: null,
      parent: null,
      products: null,
      productsCount: null,
      slug: "assortiment",
      updatedAt: undefined,
      priority: null,
    },
    products: null,
    productsCount: null,
    updatedAt: undefined,
    isAvailable: null,
    priority: null,
  },
  {
    id: "62ddac6b-5f2b-4db2-87be-b3fa4cdb7a3d",
    name: "ягодные торты",
    slug: "yagodnye-torty",
    __typename: "Category",
    createdAt: undefined,
    parent: {
      __typename: "Category",
      createdAt: undefined,
      id: "",
      isAvailable: null,
      name: null,
      parent: null,
      products: null,
      productsCount: null,
      slug: "assortiment",
      updatedAt: undefined,
      priority: null,
    },
    products: null,
    productsCount: null,
    updatedAt: undefined,
    isAvailable: null,
    priority: null,
  },
  {
    id: "2f385852-a2d9-44fb-b3f0-a8d22f8693d8",
    name: "Свадебные торты",
    slug: "svadebnye-torty",
    __typename: "Category",
    createdAt: undefined,
    parent: {
      __typename: "Category",
      createdAt: undefined,
      id: "",
      isAvailable: null,
      name: null,
      parent: null,
      products: null,
      productsCount: null,
      slug: "assortiment",
      updatedAt: undefined,
      priority: null,
    },
    products: null,
    productsCount: null,
    updatedAt: undefined,
    isAvailable: null,
    priority: null,
  },
  {
    id: "3cf79f1b-9a95-4ba0-9966-92aa7dd32ec5",
    name: "бенто торты",
    slug: "bento-torty",
    __typename: "Category",
    createdAt: undefined,
    parent: {
      __typename: "Category",
      createdAt: undefined,
      id: "",
      isAvailable: null,
      name: null,
      parent: null,
      products: null,
      productsCount: null,
      slug: "assortiment",
      updatedAt: undefined,
      priority: null,
    },
    products: null,
    productsCount: null,
    updatedAt: undefined,
    isAvailable: null,
    priority: null,
  },
];

describe("Navigation component", () => {
  it("render navigation menu item", () => {
    // Arrange
    render(
      <MockedProvider>
        <Navigation categories={mockCategories} />
      </MockedProvider>,
    );
    // Act
    const navigationMenuItems = screen.getAllByTestId("navigation-menu-item");
    // // Assert
    expect(navigationMenuItems.length).toBeGreaterThan(2);
    for (const el of navigationMenuItems) {
      expect(el).toBeInTheDocument();
    }
  });

  it("render navigation sub menu item", async () => {
    // Arrange
    render(
      <MockedProvider>
        <Navigation categories={mockCategories} />
      </MockedProvider>,
    );

    await waitFor(() => {
      // Act
      const navigationSubMenuItems = screen.getAllByTestId("navigation-sub-menu-item");

      // Assert
      expect(navigationSubMenuItems.length).toBeGreaterThan(1);
      for (const el of navigationSubMenuItems) {
        expect(el).toBeInTheDocument();
      }
    });
  });

  it("show sub menu on mobile when user click", async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <MockedProvider>
        <Navigation categories={mockCategories} />
      </MockedProvider>,
    );

    // Act
    const subMenuTrigger = screen.getByTestId("navigation-sub-menu-trigger");
    const navigationSubMenu = screen.getByTestId("navigation-sub-menu");

    await user.click(subMenuTrigger);
    // Assert
    expect(subMenuTrigger).toHaveClass("active");
    expect(navigationSubMenu).toHaveClass("open-sub-menu");
  });
});
