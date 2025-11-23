import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FaqItem from "../FaqItem";

const mockFaq = {
  question: "What is the test about?",
  answer: "Testing whatever whatever!",
  isOpen: true,
  onToggle: jest.fn(),
};

describe("FAQ Item component", () => {
  it("render faq content and perform action", async () => {
    // Arrange
    const user = userEvent.setup();

    render(
      <FaqItem
        question={mockFaq.question}
        answer={mockFaq.answer}
        isOpen={mockFaq.isOpen}
        onToggle={mockFaq.onToggle}
      />
    );

    // Assert
    const question = screen.getByRole("heading", { level: 4 });
    const answer = screen.getByTestId("faq-answer");
    const trigger = screen.getByTestId("faq-trigger");

    expect(question).toBeInTheDocument();
    expect(question).toHaveTextContent(mockFaq.question);

    expect(answer).toBeInTheDocument();
    expect(answer).toHaveTextContent(mockFaq.answer);

    await user.click(trigger);
    expect(trigger).toHaveClass("expand");
  });
});
