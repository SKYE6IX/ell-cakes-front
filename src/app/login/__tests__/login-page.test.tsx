import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import { User } from "@/types/__generated__/graphql";
import { AUTHORIZED_USER } from "@/hooks/useLoginUserMutation";

import Login from "../page";
const returnUser: User = {
  __typename: "User",
  cart: null,
  createdAt: undefined,
  delivaryAddress: null,
  delivaryAddressCount: null,
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
    const loginTitle = screen.getByTestId("login-page-title");
    const loginSubTitle = screen.getByTestId("login-page-sub-title");
    const pageLink = screen.getByTestId("login-page-link");

    // Act
    expect(pageHeading).toBeInTheDocument();
    expect(pageHeading).toHaveTextContent("Авторизация");
    expect(loginTitle).toBeInTheDocument();
    expect(loginTitle).toHaveTextContent("Зарегистрироваться");
    expect(loginSubTitle).toBeInTheDocument();
    expect(pageLink).toBeInTheDocument();
  });
});
