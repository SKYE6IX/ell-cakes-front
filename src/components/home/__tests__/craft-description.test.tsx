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
      "авторские торты, пирожные и нежнейшие капкейки ручной работы"
    );
    expect(descriptionText).toBeInTheDocument();
    expect(descriptionText).toHaveTextContent(
      "Основной нашей концепцией является использование в изготовлении кулинарной продукции только натуральных и экологически чистых пищевых продуктов."
    );
  });
});
