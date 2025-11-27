import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "../Input";

describe("Input component", () => {
  it("type into an input field", async () => {
    // Arrange
    const mockOnchange = jest.fn();
    const user = userEvent.setup();
    render(
      <Input
        initialValue=""
        placeholder="mock-placeholder"
        onInputChange={mockOnchange}
        name="mock"
      />
    );
    // Assert
    const input = screen.getByRole("textbox");
    await user.type(input, "Here is some other new text");
    // Act
    expect(mockOnchange).toHaveBeenCalled();
    expect(input).toHaveValue("Here is some other new text");
  });
});
