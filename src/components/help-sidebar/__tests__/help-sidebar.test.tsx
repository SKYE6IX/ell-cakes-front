import { render, screen } from "@testing-library/react";
import HelpSidebar from "../HelpSidebar";

describe("Help Sidebar Component", () => {
  it("render all component contents", () => {
    // Arrange
    render(<HelpSidebar />);

    // Assert
    const heading = screen.getByRole("heading", { level: 3 });
    const links = screen.getAllByRole("link", { current: "page" });

    // Act
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Добро пожаловать!");
    expect(links.length).toEqual(4);
    for (const el of links) {
      expect(el).toBeInTheDocument();
    }
  });
});
