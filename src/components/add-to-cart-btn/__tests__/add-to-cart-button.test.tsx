import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import { resetApolloClientSingletons } from "@apollo/client-integration-nextjs";
import AddToCartButton from "../AddToCartButton";
import { Cart, OrderDirection } from "@/types/__generated__/graphql";
import { ADD_TO_CART_MUTATION, AddToCartArgs } from "../operation";

const addToCart: Cart = {
  __typename: "Cart",
  cartItems: [
    {
      __typename: "CartItem",
      cart: null,
      compositionSnapShot: undefined,
      createdAt: undefined,
      customizationsSnapShot: undefined,
      id: "mock-id-cart",
      product: null,
      quantity: null,
      subTotal: null,
      toppingOption: null,
      unitPrice: null,
      updatedAt: undefined,
      variant: null,
    },
  ],
  cartItemsCount: null,
  createdAt: undefined,
  id: "mock-id",
  subTotal: 50000,
  updatedAt: undefined,
  user: null,
  sessionId: null,
};

const variables: AddToCartArgs = {
  productId: "mock-product-id",
  variantId: "mock-variant-id",
  customizations: null,
  compositionOptions: null,
  toppingOptionId: null,
};

const mocks = [
  {
    request: {
      query: ADD_TO_CART_MUTATION,
      variables: {
        ...variables,
        cartItemsOrderBy: [{ createdAt: OrderDirection.Asc }],
        orderImagesBy: [{ id: OrderDirection.Asc }],
      },
    },
    result: { data: addToCart },
  },
];

afterEach(resetApolloClientSingletons);

describe("Add to cart button Component ", () => {
  it("render the right price", () => {
    // Arrange
    render(
      <MockedProvider mocks={mocks}>
        <AddToCartButton
          productPrice={5000}
          parentComponent="product-details"
          addToCartArgs={variables}
        />
      </MockedProvider>
    );

    // Assert
    const productPrice = screen.getByTestId("cart-btn-product-price");

    // Act
    expect(productPrice).toBeInTheDocument();
    expect(productPrice).toHaveTextContent("5000");
  });

  it("loading should be acitve and button disabled when button click", async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <MockedProvider mocks={mocks}>
        <AddToCartButton
          productPrice={5000}
          parentComponent="product-details"
          addToCartArgs={variables}
        />
      </MockedProvider>
    );

    // Assert
    const button = screen.getByTestId("cart-btn-add-cart");
    const buttonContainer = screen.getByTestId("cart-btn-container");

    await user.click(button);
    expect(button).toBeDisabled();
    expect(buttonContainer).toHaveClass("in-flight");
  });
});
