import FAQBlock from "@/components/faq-block/FAQBlock";
import HelpBlock from "@/components/help-block/helpBlock";
import { faqList } from "./faqList";
import { faqIngredientsList } from "./faqIngredientsList";
import { faqDeliveryList } from "./faqDeliveryList";
import "./faq.scss";

export default function Faq() {
   return (
      <section className="faq">
        <HelpBlock />
        
        <div className="faq__wrapper">
            <FAQBlock title="Часто задаваемые вопросы" faqList={faqList}/>
            <FAQBlock title="Доставка" faqList={faqDeliveryList}/>
            <FAQBlock title="Ингредиенты" faqList={faqIngredientsList}/>
        </div>
      </section>
   );
}

