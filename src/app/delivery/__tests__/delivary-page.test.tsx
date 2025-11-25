import { render, screen } from "@testing-library/react";
import Contact from "../page";

describe("Delivary page", () => {
  it("render delivary page content", () => {
    // Arrange
    render(<Contact />);

    // Assert
    const title = screen.getByRole("heading", { level: 2 });
    const pageTexts = screen.getAllByTestId("page-text");
    const pageImage = screen.getByTestId("page-image");

    // Act
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Доставка");
    expect(pageTexts.length).toEqual(2);
    for (const el of pageTexts) {
      expect(el).toBeInTheDocument();
    }
    expect(pageTexts[0]).toHaveTextContent(
      "Курьерская доставка работает ежедневно с 10:00 до 17:00."
    );
    expect(pageImage).toBeInTheDocument();
  });
});
