"use client";
import Plus from "../icons/Plus";
import "./faq-item.scss";

interface FaqProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItem({ question, answer, isOpen, onToggle }: FaqProps) {
  return (
    <div className="faq-item">
      <div
        className={["faq-item__header", isOpen ? "expand" : "collapsed"].join(
          " "
        )}
        onClick={onToggle}
        aria-expanded={isOpen}
        data-testid="faq-trigger"
      >
        <h4 className="faq-item__title">{question}</h4>
        <span className="faq-item__icon">
          <Plus />
        </span>
      </div>
      <div
        className={[
          "faq-item__panel",
          isOpen ? "expand animate_in" : "collapsed animate_out",
        ].join(" ")}
      >
        <div className="faq-item__panel-inner">
          <p className="faq-item__text" data-testid="faq-answer">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FaqItem;
