"use client";
import { useState } from 'react';
import Link from 'next/link';
import FaqItem from "@/components/faq-item/FaqItem";
import { faqList, faqDeliveryList, faqIngredientList } from "./faqList";
import "./faq-page.scss";

// Section identifiers (to build unique keys) 
type SectionKey = "frequently" | "delivery" | "ingredients";

const sections: { key: SectionKey; title: string; items: typeof faqList }[] = [
  { key: "frequently", title: "Часто задаваемые вопросы", items: faqList },
  { key: "delivery", title: "Доставка", items: faqDeliveryList },
  { key: "ingredients", title: "Ингредиенты", items: faqIngredientList },
];

function Faq() {
  const [IsExpandKey, setIsExpandKey] = useState<string | null>(null);

  // Open clicked item, or close if it's already open
  const toggleExpand = (key: string) =>
    setIsExpandKey(prev => (prev === key ? null : key));

  return (
    <section className="faq">
      <div className="faq__inner-wrapper">
        <div className="faq-help">
          <div className="faq-help__title">Нужна помощь?</div>
          <div className="faq-help__link-wrapper">
            <Link
              href="/"
              className="faq-help__link"
              target="_target"
            >Условия доставки</Link>
            <Link
              href="/"
              className="faq-help__link"
              target="_target"
            >Сотрудничество</Link>
            <Link
              href="/"
              className="faq-help__link"
              target="_target"
            >Контакты</Link>
          </div>
        </div>
        <div className="faq__body">
          {sections.map(section => (
            <div className="faq__section" key={section.key}>
              <h2 className="faq__title">{section.title}</h2>
              {section.items.map((item, idx) => {
                // A unique key
                const key = `${section.key}-${idx}`; 
                return (
                  <FaqItem
                    key={key}
                    question={item.question}
                    answer={item.answer}
                    isOpen={IsExpandKey === key} // Open only if matches the global open key
                    onToggle={() => toggleExpand(key)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Faq;
