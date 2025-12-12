import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TokenInput from "../TokenInput";

describe("Token input component", () => {
  it("render the component title and sub title", () => {
    // Arrange
    const mockSetToken = jest.fn();
    render(<TokenInput handleSetToken={mockSetToken} />);

    // Assert
    const componentTitle = screen.getByRole("heading", { level: 3 });
    const componentSubTitle = screen.getByRole("heading", { level: 5 });

    // Act
    expect(componentTitle).toBeInTheDocument();
    expect(componentTitle).toHaveTextContent("Подтвердите номер");
    expect(componentSubTitle).toBeInTheDocument();
  });

  it("render all input and accept user input", async () => {
    // Arrange
    const user = userEvent.setup();
    const mockSetToken = jest.fn();
    const TOKEN_LENGTH = 6;
    const mockTokenArray = ["1", "2", "3", "4", "5", "6"];
    render(<TokenInput handleSetToken={mockSetToken} />);

    // Assert
    const tokenInputs = screen.getAllByTestId("token-input");

    // Act
    expect(tokenInputs.length).toEqual(TOKEN_LENGTH);

    let index = 0;
    for (const el of tokenInputs) {
      await user.type(el, mockTokenArray[index]);
      expect(el).toHaveValue(mockTokenArray[index]);
      index++;
    }
  });
});
