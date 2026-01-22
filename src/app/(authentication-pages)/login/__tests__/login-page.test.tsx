import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import { OrderDirection, User } from "@/types/__generated__/graphql";
import { AUTHORIZED_USER } from "@/hooks/useLoginUserMutation";
import { GET_CART_QUERY } from "@/components/cart/operations";
import Login from "../page";

const returnUser: User = {
  __typename: "User",
  cart: null,
  createdAt: undefined,
  delivaryAddress: null,
  email: null,
  firstOrderDiscountEligible: null,
  id: "",
  isPhoneNumberVerified: null,
  lastLogin: undefined,
  name: null,
  orders: null,
  ordersCount: null,
  password: null,
  passwordResetIssuedAt: undefined,
  passwordResetRedeemedAt: undefined,
  passwordResetToken: null,
  payments: null,
  paymentsCount: null,
  phoneNumber: null,
  phoneNumberToken: null,
  phoneNumberVerificationIssuedAt: undefined,
  phoneNumberVerificationRedeemedAt: undefined,
  role: null,
  updatedAt: undefined,
};

const mocks = [
  {
    request: {
      query: AUTHORIZED_USER,
      variables: { email: "Buck", password: "123456789" },
    },
    result: { data: { authorizedUser: returnUser } },
  },
  {
    request: {
      query: GET_CART_QUERY,
      variables: {
        cartItemsOrderBy: [{ createdAt: OrderDirection.Asc }],
        orderImagesBy: [{ createdAt: OrderDirection.Asc }],
      },
    },
    result: { data: { queryCart: null } },
  },
];

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Login page component", () => {
  it("render page contnent", () => {
    // Arrange
    render(
      <MockedProvider mocks={mocks}>
        <Login />
      </MockedProvider>
    );

    // Assert
    const pageHeading = screen.getByTestId("login-page-heading");
    const loginSubTitle = screen.getByTestId("login-page-sub-title");
    const pageLink = screen.getByTestId("login-page-link");

    // Act
    expect(pageHeading).toBeInTheDocument();
    expect(pageHeading).toHaveTextContent("Авторизация");
    expect(loginSubTitle).toBeInTheDocument();
    expect(pageLink).toBeInTheDocument();
  });
});
