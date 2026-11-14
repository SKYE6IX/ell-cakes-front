import { render, screen } from "@testing-library/react";
import LandingPage from "../page";

describe("Landing page", () => {
  it("render main heading and section headings", () => {
    render(<LandingPage />);

    const title = screen.getByRole("heading", { level: 1 });
    const sectionHeadings = screen.getAllByRole("heading", { level: 2 });

    expect(title).toHaveTextContent("Пусть он запомнится таким же вкусным");
    expect(sectionHeadings.length).toEqual(3);
    expect(sectionHeadings[0]).toHaveTextContent("Храните в холодильнике");
    expect(sectionHeadings[1]).toHaveTextContent(
      "15-30 минут при комнатной температуре",
    );
    expect(sectionHeadings[2]).toHaveTextContent(
      "Понравился торт? Расскажите об этом",
    );
  });

  it("render storage facts", () => {
    render(<LandingPage />);

    expect(screen.getByText("+2…+6 °C")).toBeInTheDocument();
    expect(screen.getByText("72 часа")).toBeInTheDocument();
    expect(screen.getByText("24 часа")).toBeInTheDocument();
  });

  it("render review link and QR code", () => {
    render(<LandingPage />);

    const reviewLink = screen.getByRole("link", { name: "Оставить отзыв" });
    const qrCode = screen.getByRole("img", {
      name: "QR-код на отзывы Ell Cakes в Яндекс Картах",
    });

    expect(reviewLink).toHaveAttribute(
      "href",
      "https://ya.cc/t/Vxht4M46BRUvU4",
    );
    expect(reviewLink).toHaveAttribute("target", "_blank");
    expect(qrCode).toBeInTheDocument();
  });

  it("render social links in footer", () => {
    render(<LandingPage />);

    const telegram = screen.getByRole("link", { name: "Telegram" });
    const instagram = screen.getByRole("link", { name: "Instagram" });

    expect(telegram).toHaveAttribute("href", "https://t.me/by_ellcakes");
    expect(instagram).toHaveAttribute(
      "href",
      "https://www.instagram.com/ell_cakes",
    );
  });
});
