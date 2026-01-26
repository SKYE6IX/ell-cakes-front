import collectionDeliveryInfoImage from "./collection-delivery-section-image.png";
import { getTransliteration } from "@/utils/getTransliteration";

const list = [
  {
    name: "Торты",
    description:
      "Сделаем Ваш праздник слаще - выбери торт, который удивит гостей и порадует именинника!",
    images: ["/collection-images/cake-1.jpg", collectionDeliveryInfoImage],
  },
  {
    name: "Пирожные",
    description:
      "Пирожные, созданные для маленьких радостей. Нежные текстуры и сбалансированный вкус в каждой порции!",
    images: ["/collection-images/cupcakes-1.jpg", "/collection-images/cupcakes-2.jpg"],
  },
  {
    name: "Новый Год",
    description:
      "Сладкий и волшебный Новый Год! Выбирайте праздничные торты и десерты, которые создадут настоящую сказку на вашем столе!",
    images: ["/collection-images/new-year-1.jpg", "/collection-images/new-year-2.jpg"],
  },
  {
    name: "Торты на День рождения",
    description:
      "Сделаем Ваш праздник слаще - выбери торт, который удивит гостей и порадует именинника!",
    images: ["/collection-images/birthday-1.jpg", "/collection-images/birthday-2.jpg"],
  },
  {
    name: "Корпоративные торты",
    description:
      "Создадим торт, который подчеркнет стиль вашей компании и станет главным украшением праздника коллег",
    images: ["/collection-images/corporate-1.jpg", "/collection-images/corporate-2.jpg"],
  },
  {
    name: "Торты для детей",

    description:
      "Яркие, вкусные и безопасные торты, которые вызывают восторг у детей и спокойствие у родителей",
    images: ["/collection-images/kids-1.jpg", "/collection-images/kids-2.jpg"],
  },
  {
    name: "Торты для нее",
    description:
      "Нежные вкусы, утонченный декор и идеальная подача - чтобы порадовать ту, кто заслуживает особенного",
    images: ["/collection-images/for-her-1.jpg", "/collection-images/for-her-2.jpg"],
  },
  {
    name: "Торты для него",
    description:
      "Стильные, брутальные, с насыщенными вкусами! Идеальный выбор для сильных и уверенных",
    images: ["/collection-images/for-him-1.jpg", "/collection-images/for-him-2.jpg"],
  },
  {
    name: "Ягодные торты",
    description:
      "Свежие, легкие и ароматные! Гармония натуральных ягод и нежных кремов в каждом кусочке",
    images: ["/collection-images/berries-1.jpg", "/collection-images/berries-2.jpg"],
  },
  {
    name: "Свадебные торты",
    description:
      "Создадим торт Вашей мечты! Элегантный, изысканный и идеальный для вашего главного дня",
    images: ["/collection-images/wedding-1.jpg", "/collection-images/wedding-2.jpg"],
  },
  {
    name: "Бенто торты",
    description:
      "Маленькие тортики, которые дарят большие эмоции. Идеально подойдет для уютных праздников и сюрпризов!",
    images: ["/collection-images/bento-1.jpg", "/collection-images/bento-2.jpg"],
  },
];

export const getHeroSectionData = (categorySlug: string) => {
  return list.find((item) => getTransliteration(item.name) === categorySlug)!;
};
