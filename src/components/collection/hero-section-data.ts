import collectionDeliveryInfoImage from "./collection-delivery-section-image.png";
import { getTransliteration } from "@/utils/getTransliteration";
const list = [
  {
    name: "Торты",
    description:
      "Сделаем Ваш праздник слаще - выбери торт, который удивит гостей и порадует именинника!",
    media: [
      { href: "/collection-images/cake-1.jpg", isVideo: false },
      { href: collectionDeliveryInfoImage, isVideo: false },
    ],
  },
  {
    name: "Пирожные",
    description:
      "Пирожные, созданные для маленьких радостей. Нежные текстуры и сбалансированный вкус в каждой порции!",
    media: [
      { href: "/collection-images/cupcakes-1.jpg", isVideo: false },
      { href: "/collection-images/cupcakes-2.jpg", isVideo: false },
    ],
  },
  {
    name: "Новый Год",
    description:
      "Сладкий и волшебный Новый Год! Выбирайте праздничные торты и десерты, которые создадут настоящую сказку на вашем столе!",
    media: [
      { href: "/collection-images/new-year-1.jpg", isVideo: false },
      { href: "/collection-images/new-year-2.jpg", isVideo: false },
    ],
  },
  {
    name: "Торты на День рождения",
    description:
      "Сделаем Ваш праздник слаще - выбери торт, который удивит гостей и порадует именинника!",
    media: [
      { href: "/collection-images/birthday-1.jpg", isVideo: false },
      { href: "/collection-images/birthday-2.jpg", isVideo: false },
    ],
  },
  {
    name: "Корпоративные торты",
    description:
      "Создадим торт, который подчеркнет стиль вашей компании и станет главным украшением праздника коллег",
    media: [
      { href: "/collection-images/corporate-1.jpg", isVideo: false },
      { href: "/collection-images/corporate-2.jpg", isVideo: false },
    ],
  },
  {
    name: "Торты для детей",
    description:
      "Яркие, вкусные и безопасные торты, которые вызывают восторг у детей и спокойствие у родителей",
    media: [
      { href: "/collection-images/kids-1.jpg", isVideo: false },
      { href: "/collection-images/kids-2.jpg", isVideo: false },
    ],
  },
  {
    name: "Торты для нее",
    description:
      "Нежные вкусы, утонченный декор и идеальная подача - чтобы порадовать ту, кто заслуживает особенного",
    media: [
      { href: "/collection-images/for-her-1.jpg", isVideo: false },
      { href: "/collection-images/for-her-2.jpg", isVideo: false },
    ],
  },
  {
    name: "Торты для него",
    description:
      "Стильные, брутальные, с насыщенными вкусами! Идеальный выбор для сильных и уверенных",
    media: [
      { href: "/collection-images/for-him-1.jpg", isVideo: false },
      { href: "/collection-images/for-him-2.jpg", isVideo: false },
    ],
  },
  {
    name: "Ягодные торты",
    description:
      "Свежие, легкие и ароматные! Гармония натуральных ягод и нежных кремов в каждом кусочке",
    media: [
      { href: "/collection-images/berries-1.jpg", isVideo: false },
      { href: "/collection-images/berries-2.jpg", isVideo: false },
    ],
  },
  {
    name: "Свадебные торты",
    description:
      "Создадим торт Вашей мечты! Элегантный, изысканный и идеальный для вашего главного дня",
    media: [
      { href: "/collection-images/wedding-1.jpg", isVideo: false },
      { href: "/collection-images/wedding-2.jpg", isVideo: false },
    ],
  },
  {
    name: "Бенто торты",
    description:
      "Маленькие тортики, которые дарят большие эмоции. Идеально подойдет для уютных праздников и сюрпризов!",
    media: [
      { href: "/collection-images/bento-1.jpg", isVideo: false },
      { href: "/collection-images/bento-2.jpg", isVideo: false },
    ],
  },
  {
    name: "14 февраля",
    description:
      "Маленькие тортики, которые дарят большие эмоции. Идеально подойдет для уютных праздников и сюрпризов!",
    media: [
      { href: "/collection-images/bento-1.jpg", isVideo: false },
      { href: "/collection-images/bento-2.jpg", isVideo: false },
    ],
  },
  {
    name: "23 февраля",
    description:
      "Маленькие тортики, которые дарят большие эмоции. Идеально подойдет для уютных праздников и сюрпризов!",
    media: [
      { href: "/collection-images/bento-1.jpg", isVideo: false },
      { href: "/collection-images/bento-2.jpg", isVideo: false },
    ],
  },
  {
    name: "8 марта",
    description:
      "Бенто-торты в виде очаровательных горшочков с живыми герберами - идеальный подарок на 8 марта, символизирующий весну и нежность",
    media: [
      { href: "/collection-images/woman-day-1.jpeg", isVideo: false },
      { href: "/collection-images/woman-day-2.jpeg", isVideo: false },
    ],
  },
  {
    name: "Пасаха",
    description:
      "Пасха — это вкус тепла, уюта и семейных традиций. Мы создаём нежные десерты и ароматные куличи вручную, с любовью к каждой детали. Оформите предзаказ заранее и подарите себе и близким настоящее праздничное настроение!",
    media: [
      { href: "/collection-images/paskha.jpeg", isVideo: false },
      {
        href: " https://storage.yandexcloud.net/ell-cake-files-prod/IMG_2583.MOV",
        isVideo: true,
      },
    ],
  },
];

export const getHeroSectionData = (categorySlug: string) => {
  return list.find((item) => getTransliteration(item.name) === categorySlug)!;
};

// https://storage.yandexcloud.net/ell-cake-files-prod/IMG_2583.MOV
