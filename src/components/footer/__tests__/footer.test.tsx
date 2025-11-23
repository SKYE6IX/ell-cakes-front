import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer Component", () => {
  it("render footer heading", () => {
    // Arrange
    render(<Footer />);

    // Assert
    const footerHeading = screen.getByRole("heading", { level: 3 });

    // Act
    expect(footerHeading).toBeInTheDocument();
    expect(footerHeading).toHaveTextContent(
      "Сделай свой праздник ещё слаще вместе с нашей кондитерской!"
    );
  });

  it("render footer navigations", () => {
    // Arrange
    render(<Footer />);

    // Assert
    const footerNavs = screen.getAllByTestId("footer-nav");

    // Act
    expect(footerNavs.length).toBeGreaterThan(1);
    for (const el of footerNavs) {
      expect(el).toBeInTheDocument();
    }
  });

  it("render footer logo", () => {
    // Arrange
    render(<Footer />);

    // Assert
    const footerLogo = screen.getByTestId("footer-logo");

    // Act
    expect(footerLogo).toBeInTheDocument();
  });
});
