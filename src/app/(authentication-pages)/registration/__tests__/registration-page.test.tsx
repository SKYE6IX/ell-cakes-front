import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import {
  IS_EMAIL_IN_USE,
  IS_PHONE_NUMBER_IN_USE,
} from "@/hooks/useUserDataExistQuery";
import { REGISTER_USER } from "@/hooks/useRegisterUserMutation";
import { GET_CART_QUERY } from "@/components/cart/operations";
import {
  OrderDirection,
  RegisterUserInput,
  User,
} from "@/types/__generated__/graphql";
import RegistrationPage from "../page";

const mockRegister: RegisterUserInput = {
  name: "John",
  email: "john@mock.com",
  password: "123455679",
  phoneNumber: "12345678900",
};
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
      query: REGISTER_USER,
      variables: { registerData: mockRegister },
    },
    result: { data: { registerUser: returnUser } },
  },
  {
    request: {
      query: IS_EMAIL_IN_USE,
      variables: { email: mockRegister.email },
    },
    result: { data: { isEmailInUse: true } },
  },
  {
    request: {
      query: IS_PHONE_NUMBER_IN_USE,
      variables: { phoneNumber: mockRegister.phoneNumber },
    },
    result: { data: { isPhoneNumberInUse: true } },
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

describe("Registration page component", () => {
  it("render page contnent", () => {
    // Arrange
    render(
      <MockedProvider mocks={mocks}>
        <RegistrationPage />
      </MockedProvider>
    );

    // Assert
    const pageHeading = screen.getByTestId("registration-page-heading");
    const policyText = screen.getByTestId("registration-page-policy");
    const policyLink = screen.getByTestId("registration-page-policy-link");

    // Act
    expect(pageHeading).toBeInTheDocument();
    expect(pageHeading).toHaveTextContent("Регистрация");
    expect(policyText).toBeInTheDocument();
    expect(policyLink).toBeInTheDocument();
  });
});
