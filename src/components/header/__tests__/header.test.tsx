import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../Header";

describe("Header component", () => {
  it("render site icon", () => {
    // Arrange
    render(<Header />);

    // Act
    const headerSiteIcon = screen.getByTestId("header-site-icon");

    // Assert
    expect(headerSiteIcon).toBeInTheDocument();
  });

  it("add active class to menubar button", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<Header />);

    // Act
    const headerMenuButton = screen.getByTestId("header-menu-button");

    await user.click(headerMenuButton);

    // Assert
    expect(headerMenuButton).toHaveClass("active");
  });
});
