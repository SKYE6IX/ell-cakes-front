import collectionDeliveryInfoImage from "./collection-delivery-section-image.png";
import { getTransliteration } from "@/utils/getTransliteration";

const list = [
  {
    name: "Торты",
    description:
      "Сделаем Ваш праздник слаще - выбери торт, который удивит гостей и порадует именинника!",
    images: [collectionDeliveryInfoImage, collectionDeliveryInfoImage],
  },
  {
    name: "Пирожные",
    description:
      "Сделаем Ваш праздник слаще - выбери торт, который удивит гостей и порадует именинника!",
    images: [collectionDeliveryInfoImage, collectionDeliveryInfoImage],
  },
  {
    name: "Новый Год",
    description:
      "Сделаем Ваш праздник слаще - выбери торт, который удивит гостей и порадует именинника!",
    images: [collectionDeliveryInfoImage, collectionDeliveryInfoImage],
  },
  {
    name: "Торты на День рождения",
    description:
      "Сделаем Ваш праздник слаще - выбери торт, который удивит гостей и порадует именинника!",
    images: [collectionDeliveryInfoImage, collectionDeliveryInfoImage],
  },
  {
    name: "Корпоративные торты",
    description:
      "Создадим торт, который подчеркнет стиль вашей компании и станет главным украшением праздника коллег",
    images: [collectionDeliveryInfoImage, collectionDeliveryInfoImage],
  },
  {
    name: "Торты для детей",

    description:
      "Яркие, вкусные и безопасные торты, которые вызывают восторг у детей и спокойствие у родителей",
    images: [collectionDeliveryInfoImage, collectionDeliveryInfoImage],
  },
  {
    name: "Торты для нее",
    description:
      "Нежные вкусы, утонченный декор и идеальная подача - чтобы порадовать ту, кто заслуживает особенного",
    images: [collectionDeliveryInfoImage, collectionDeliveryInfoImage],
  },
  {
    name: "Торты для него",
    description:
      "Стильные, брутальные, с насыщенными вкусами! Идеальный выбор для сильных и уверенных",
    images: [collectionDeliveryInfoImage, collectionDeliveryInfoImage],
  },
  {
    name: "Ягодные торты",
    description:
      "Свежие, легкие и ароматные! Гармония натуральных ягод и нежных кремов в каждом кусочке",
    images: [collectionDeliveryInfoImage, collectionDeliveryInfoImage],
  },
  {
    name: "Свадебные торты",
    description:
      "Создадим торт Вашей мечты! Элегантный, изысканный и идеальный для вашего главного дня",
    images: [collectionDeliveryInfoImage, collectionDeliveryInfoImage],
  },
  {
    name: "Бенто торты",
    description:
      "Маленькие тортики, которые дарят большие эмоции. Идеально подойдет для уютных праздников и сюрпризов!",
    images: [collectionDeliveryInfoImage, collectionDeliveryInfoImage],
  },
];

export const getHeroSectionData = (categorySlug: string) => {
  return list.find((item) => getTransliteration(item.name) === categorySlug)!;
};
