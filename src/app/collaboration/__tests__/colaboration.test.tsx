import { render, screen } from "@testing-library/react";
import Colaboration from "../page";

describe("Colaboration page", () => {
  it("render colaboration content", () => {
    // Arrange
    render(<Colaboration />);

    // Assert
    const title = screen.getByRole("heading", { level: 2 });
    const pageText = screen.getByTestId("page-text");
    const pageImage = screen.getByTestId("page-image");

    // Act
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Сотрудничество");

    expect(pageText).toBeInTheDocument();
    expect(pageImage).toBeInTheDocument();
  });
});
