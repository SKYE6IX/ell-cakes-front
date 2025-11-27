import { render, screen } from "@testing-library/react";
import CustomizeInfo from "../customize-info-section/CustomizeInfo";

describe("Customize Info Component", () => {
  it("render all text content on the component", () => {
    // Arrange
    render(<CustomizeInfo />);

    // Assert
    const headingText = screen.getByRole("heading", { level: 3 });
    const descriptionText = screen.getByTestId("customize-info-text");
    const image = screen.getByTestId("customize-info-image");

    // Act
    expect(headingText).toBeInTheDocument();
    expect(headingText).toHaveTextContent(
      "Торт твоей мечты — по индивидуальному дизайну"
    );
    expect(descriptionText).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
