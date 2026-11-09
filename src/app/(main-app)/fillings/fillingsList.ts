export type Filling = {
  key: string;
  name: string;
  image: string;
  minWeight: string;
  minWeightPrice: string;
  pricePerKg: string;
  description: string[];
};

export const fillingsList: Filling[] = [
  {
    key: "krasny-barkhat",
    name: "Красный бархат",
    image: "/fillings-images/krasny-barkhat.jpg",
    minWeight: "2.3 кг",
    minWeightPrice: "6.440 ₽",
    pricePerKg: "2.800 ₽",
    description: [
      "влажный бархатистый бисквит",
      "нежный крем-чиз",
      "сочное клубничное конфи",
    ],
  },
  {
    key: "napoleon",
    name: "Наполеон",
    image: "/fillings-images/napoleon.jpg",
    minWeight: "2 кг",
    minWeightPrice: "5.000 ₽",
    pricePerKg: "2.500 ₽",
    description: ["хрустящие слои слоёного теста", "сливочный заварной крем"],
  },
  {
    key: "chernichno-lavandovaya-simfoniya",
    name: "Чернично-лавандовая симфония",
    image: "/fillings-images/chernichno-lavandovaya-simfoniya.jpg",
    minWeight: "2.3 кг",
    minWeightPrice: "6.440 ₽",
    pricePerKg: "2.800 ₽",
    description: [
      "нежная лаванда",
      "насыщенная черника",
      "воздушный сливочный крем",
    ],
  },
  {
    key: "praga",
    name: "Прага",
    image: "/fillings-images/praga.jpg",
    minWeight: "2.3 кг",
    minWeightPrice: "6.440 ₽",
    pricePerKg: "2.800 ₽",
    description: [
      "бисквиты с ромовой пропиткой",
      "масляно-шоколадный крем со сгущёнкой",
      "абрикосовый джем",
    ],
  },
  {
    key: "yagodno-bananovy-milfey",
    name: "Ягодно-банановый мильфей",
    image: "/fillings-images/yagodno-bananovy-milfey.jpg",
    minWeight: "1.5 кг",
    minWeightPrice: "4.650 ₽",
    pricePerKg: "3.100 ₽",
    description: [
      "пропитанные медовые коржи",
      "крем со вкусом сливочного мороженого",
      "свежие ягоды, молочный шоколад",
    ],
  },
  {
    key: "snikers",
    name: "Сникерс",
    image: "/fillings-images/snikers.jpg",
    minWeight: "2.5 кг",
    minWeightPrice: "7.750 ₽",
    pricePerKg: "3.100 ₽",
    description: [
      "насыщенные шоколадные бисквиты",
      "жареный арахис в мягкой карамели, хрустящий слой",
      "ганаш на молочном бельгийском шоколаде и сливочный чиз-крем",
    ],
  },
  {
    key: "karamelny-medovik-v-mindale",
    name: "Карамельный медовик в миндале",
    image: "/fillings-images/karamelny-medovik-v-mindale.jpg",
    minWeight: "2.5 кг",
    minWeightPrice: "7.000 ₽",
    pricePerKg: "2.500 ₽",
    description: [
      "тонкие медовые коржи",
      "сливочно-сметанный крем",
      "нотки карамели",
    ],
  },
  {
    key: "ptichye-moloko",
    name: "Птичье молоко",
    image: "/fillings-images/ptichye-moloko.jpg",
    minWeight: "2 кг",
    minWeightPrice: "5.400 ₽",
    pricePerKg: "2.700 ₽",
    description: [
      "нежный ванильный бисквит",
      "воздушное сливочное суфле",
      "сочные кусочки клубники",
      "молочный шоколад",
    ],
  },
];
