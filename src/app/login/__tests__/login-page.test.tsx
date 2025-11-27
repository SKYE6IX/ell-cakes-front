import { render, screen } from "@testing-library/react";
import Login from "../page";

describe("Login page component", () => {
  it("render page contnent", () => {
    // Arrange
    render(<Login />);

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
