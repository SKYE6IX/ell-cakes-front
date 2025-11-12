import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navigation from "../navigation/Navigation";

describe("Navigation component", () => {
  it("render navigation menu item", () => {
    // Arrange
    render(<Navigation isMenuOpen={false} />);

    // Act
    const navigationMenuItems = screen.getAllByTestId("navigation-menu-item");

    // Assert
    expect(navigationMenuItems.length).toEqual(5);
    for (const el of navigationMenuItems) {
      expect(el).toBeInTheDocument();
    }
  });

  it("render navigation sub menu item", () => {
    // Arrange
    render(<Navigation isMenuOpen={false} />);

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

  it("show sub menu on mobile when user click", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<Navigation isMenuOpen={true} />);

    // Act
    const subMenuTrigger = screen.getByTestId("navigation-sub-menu-trigger");
    const navigationWidget = screen.getByTestId("navigation-widget");

    await user.click(subMenuTrigger);

    // Assert
    expect(subMenuTrigger).toHaveClass("active");
    expect(navigationWidget).toHaveClass("open-sub-menu");
  });
});
