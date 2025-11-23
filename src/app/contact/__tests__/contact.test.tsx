import { render, screen } from "@testing-library/react";
import Contact from "../page";

describe("Contact page", () => {
  it("render contact content", () => {
    // Arrange
    render(<Contact />);

    // Assert
    const title = screen.getByRole("heading", { level: 2 });
    const pageText = screen.getByTestId("page-text");
    const contactAddress = screen.getByTestId("contact-address");
    const contactPhone = screen.getByTestId("contact-phone");

    // Act
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Свяжитесь с нами");
    expect(pageText).toBeInTheDocument();
    expect(contactAddress).toBeInTheDocument();
    expect(contactPhone).toBeInTheDocument();
    expect(contactAddress).toHaveTextContent("г. Москва, Жуков проезд, дом 8");
    expect(contactPhone).toHaveTextContent("8(965)-195-05-99");
  });
});
