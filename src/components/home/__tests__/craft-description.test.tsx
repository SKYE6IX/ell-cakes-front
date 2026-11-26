import { render, screen } from "@testing-library/react";
import CraftDescription from "../craft-description-section/CraftDescription";

describe("Craft Description Component", () => {
  it("render all text content on the component", () => {
    // Arrange
    render(<CraftDescription />);

    // Assert
    const headingText = screen.getByRole("heading", { level: 3 });
    const descriptionText = screen.getByTestId("craft-description-text");

    // Act
    expect(headingText).toBeInTheDocument();
    expect(headingText).toHaveTextContent(
      "Авторские торты, пирожные и нежнейшие капкейки ручной работы"
    );
    expect(descriptionText).toBeInTheDocument();
    expect(descriptionText).toHaveTextContent(
      "В основе наших десертов — только натуральные ингредиенты премиум-класса. Мы убеждены, что идеальный вкус не нуждается в красителях и консервантах, поэтому каждый торт — это чистое удовольствие и ручная работа."
    );
  });
});
