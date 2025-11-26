import { render, screen } from "@testing-library/react";
import WhyUs from "../why-us-section/WhyUs";

describe("Why Us Component", () => {
  it("render all text content on the component", () => {
    // Arrange
    render(<WhyUs />);

    // Assert
    const headingText = screen.getByRole("heading", { level: 3 });
    const itemHeadings = screen.getAllByRole("heading", { level: 5 });
    const itemTexts = screen.getAllByTestId("why-us-item-text");

    // Act
    expect(headingText).toBeInTheDocument();
    expect(headingText).toHaveTextContent("ПОЧЕМу выбирают нас ?");
    expect(itemHeadings.length).toEqual(3);
    expect(itemTexts.length).toEqual(3);
    for (const el of itemHeadings) {
      expect(el).toBeInTheDocument();
    }
    for (const el of itemTexts) {
      expect(el).toBeInTheDocument();
    }
  });
});
