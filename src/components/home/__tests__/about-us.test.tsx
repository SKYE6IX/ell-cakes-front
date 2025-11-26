import { render, screen } from "@testing-library/react";
import AboutUs from "../about-us-section/AboutUs";

describe("About Us Component", () => {
  it("render all text content on the component", () => {
    // Arrange
    render(<AboutUs />);

    // Assert
    const headingText = screen.getByRole("heading", { level: 3 });
    const descriptionText = screen.getByTestId("about-us-text");
    const image = screen.getByTestId("about-us-image");

    // Act
    expect(headingText).toBeInTheDocument();
    expect(headingText).toHaveTextContent("о нас");
    expect(descriptionText).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
