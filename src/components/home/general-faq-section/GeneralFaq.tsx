import FaqItem from "@/components/faq-item/FaqItem";
import "./general-faq.scss";

const faqList = [
  {
    key: "faq-1",
    question: "Как сделать заказ?",
    answer:
      "Вы можете оформить заказ через наш сайт или написать нашему менеджеру в WhatsApp или Telegram.",
  },
  {
    key: "faq-2",
    question: "За сколько дней нужно заказывать торт?",
    answer:
      "Лучше оформлять заказ заранее, чтобы мы смогли забронировать дату. Торты без сложного украшения мы принимаем за 2–3 дня.",
  },
  {
    key: "faq-3",
    question: "Делаете ли вы торты по индивидуальному дизайну?",
    answer:
      "Да! Вы можете отправить нам референс или вдохновиться примерами в наших социальных сетях и на сайте. Мы создадим торт по вашему желанию.",
  },
  {
    key: "faq-4",
    question: "Сколько хранится торт?",
    answer:
      "Срок хранения торта - 72 часа в холодильнике при соблюдении температурного режима.",
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
