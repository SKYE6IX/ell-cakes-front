"use client";
import React, { useState } from "react";
import Plus from "../../../public/icons/Plus" //have quastion about path
import "./faq-block.scss";

interface FaqProps {
  title: string; 
  faqList: {
    question: string;
    answer: string;
  }[];
}

function FAQBlock({ title, faqList }: FaqProps) {
  const [isExpandIdx, setIsExpandIdx] = useState<number | null>(null);

  const toggleExpand = (newIdx: number) => {
    setIsExpandIdx((prev) => (prev === newIdx ? null : newIdx));
  };

  return (
    <section className="faq-block">
      <h2 className="faq-block__title">{title}</h2>

      <div className="faq-block__list">
        {faqList.map((faq, idx) => (
          <div className="faq-block__list-item" key={faq.question}>
            <div
              className="faq-block__list-item-header"
              onClick={() => toggleExpand(idx)}
              aria-expanded={isExpandIdx === idx}
            >
              <h4 className="faq-block__list-item-header-title">
                {faq.question}
              </h4>

              <span
                className={[
                  "faq-block__list-item-header-icon",
                  isExpandIdx === idx ? "expand" : "collapsed",
                ].join(" ")}
              >
                <Plus />
              </span>
            </div>

            <div
              className={[
                "faq-block__list-item-text-wrapper",
                isExpandIdx === idx
                  ? "expand animate_in"
                  : "collapsed animate_out",
              ].join(" ")}
            >
              <div className="faq-block__list-item-text-wrapper-inner">
                  <p className="faq-block__list-item-text">
                    {faq.answer}
                  </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQBlock;
