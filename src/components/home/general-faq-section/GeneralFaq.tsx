import React from "react";
import FaqItem from "@/components/faq-item/FaqItem";
import "./general-faq.scss";

const faqList = [
  {
    key: "faq-1",
    question: "Как сделать заказ?",
    answer:
      "От 25 000 ₽ в месяц + рекламный бюджет. Расчёт — индивидуально по количеству вакансий и регионов.",
  },
  {
    key: "faq-2",
    question: "За сколько дней нужно заказывать торт?",
    answer: "Полный цикл: стратегия, креатив, запуск, оптимизация, отчёты.",
  },
  {
    key: "faq-3",
    question: "Делаете ли вы торты по индивидуальному дизайну?",
    answer: "1–2 дня с момента согласования.",
  },
  {
    key: "faq-4",
    question: "Сколько хранится торт?",
    answer: "1–2 дня с момента согласования.",
  },
];

function GeneralFaq() {
  return (
    <section className="general-faq">
      <h3 className="general-faq__heading">Часто задаваемые вопросы</h3>
      <div className="general-faq__list">
        {faqList.map((faq) => (
          <FaqItem
            key={faq.key}
            question={faq.question}
            answer={faq.answer}
            expandKey={faq.key}
          />
        ))}
      </div>
    </section>
  );
}

export default GeneralFaq;
