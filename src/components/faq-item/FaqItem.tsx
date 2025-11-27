"use client";
import { useState } from "react";
import Plus from "../icons/Plus";
import "./faq-item.scss";

type FaqProps = {
  expandKey: string;
  question: string;
  answer: string;
};

function FaqItem({ question, answer, expandKey }: FaqProps) {
  const [isExpandKey, setIsExpandKey] = useState<string | null>(null);

  const handleSetExpandKey = (key: string) => {
    setIsExpandKey((prvState) => {
      if (prvState === key) {
        return null;
      } else {
        return key;
      }
    });
  };

  return (
    <div className="faq-item">
      <div
        className={[
          "faq-item__header",
          isExpandKey === expandKey ? "expand" : "collapsed",
        ].join(" ")}
        onClick={() => handleSetExpandKey(expandKey)}
        aria-expanded={isExpandKey === expandKey}
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
          isExpandKey === expandKey
            ? "expand animate_in"
            : "collapsed animate_out",
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
