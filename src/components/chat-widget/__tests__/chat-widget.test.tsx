import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatWidget from "../ChatWidget";

describe("chat widget component", () => {
  it("render all links", () => {
    // Arrange
    render(<ChatWidget />);

    // Assert
    const links = screen.getAllByRole("link", { current: false });

    // Act
    expect(links.length).toBeGreaterThan(1);
    for (const link of links) {
      expect(link).toBeInTheDocument();
    }
  });

  it("render control button", () => {
    // Arrange
    render(<ChatWidget />);

    // Assert
    const btn = screen.getByRole("button");

    // Act
    expect(btn).toBeInTheDocument();
  });

  it("show the list of links when user click", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<ChatWidget />);

    // Assert
    const linkListWrapper = screen.getByTestId("chat-widget-contact-list");
    const btn = screen.getByRole("button");

    // Act
    await user.click(btn);

    expect(linkListWrapper).toHaveClass("show-list");
    expect(btn).toHaveClass("active");
  });
});
