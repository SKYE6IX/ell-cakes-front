import { render, screen } from "@testing-library/react";
import RegistrationPage from "../page";

describe("Registration page component", () => {
  it("render page contnent", () => {
    // Arrange
    render(<RegistrationPage />);

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
