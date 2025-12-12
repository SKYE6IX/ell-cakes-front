import { render, screen } from "@testing-library/react";
import ConfirmPhonePage from "../page";

describe("Confirm Page component", () => {
  it("render page contnent", () => {
    // Arrange
    render(<ConfirmPhonePage />);

    // Assert
    // const pageTitle = screen.getByTestId("confirm-phone-page-title");
    // const pageSubTitle = screen.getByTestId("confirm-phone-page-sub-title");

    // // Act
    // expect(pageTitle).toBeInTheDocument();
    // expect(pageSubTitle).toBeInTheDocument();
  });
});
