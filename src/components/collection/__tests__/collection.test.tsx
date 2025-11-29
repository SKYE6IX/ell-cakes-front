import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import Collection from "../Collection";
import {
  Product,
  ImageExtension,
  ProductImage,
} from "@/types/__generated__/graphql";

const mockImages: ProductImage[] = [
  {
    id: "962134bd-33c5-4966-a6f0-6aa3bef6c771",
    __typename: "ProductImage",
    product: null,
    altText: "",
    image: {
      id: "7FqLGlzXPbjoN7olp9MVtg",
      url: "https://ell-cake-images.storage.yandexcloud.net/7FqLGlzXPbjoN7olp9MVtg.jpg",
      __typename: "ImageFieldOutput",
      extension: ImageExtension.Gif,
      filesize: 0,
      height: 0,
      width: 0,
    },
  },
  {
    id: "f01bd439-3537-423c-a590-cb0ff8094433",
    altText: "",
    __typename: "ProductImage",
    product: null,
    image: {
      id: "pvdxPjOUYdvgxnu69A51Dw",
      url: "https://ell-cake-images.storage.yandexcloud.net/pvdxPjOUYdvgxnu69A51Dw.jpg",
      __typename: "ImageFieldOutput",
      extension: ImageExtension.Gif,
      filesize: 0,
      height: 0,
      width: 0,
    },
  },
];

export const mockProducts: Product[] = [
  {
    id: "b313f90f-3059-42f0-b805-a252840dcd11",
    name: "Ягодно-банановый мильфей",
    baseDescription:
      "Создавая этот торт 14 лет назад, мы и представить не могли сколько сердец он покорит. Это органичное сочетание пропитанных медовых коржей и крема словно сливочное мороженое, свежих ягод и мягкого молочного шоколада удивит даже самого искушенного гурмана!",
    type: "cake",
    variantType: "weight",
    stockQuantity: 10,
    isAvailable: true,
    images: mockImages,
    video: null,
    fillings: [
      {
        id: "9840d7c2-75af-40ac-bb80-42414afb4236",
        image_icon: {
          id: "JD4oZqc_7tPhQ4oZ0Q_ZNS",
          url: "https://ell-cake-images.storage.yandexcloud.net/JD4oZqc_7tPhQ4oZ0Q_ZNA.jpg",
          __typename: "ImageFieldOutput",
          extension: ImageExtension.Gif,
          filesize: 0,
          height: 0,
          width: 0,
        },
        name: "Ягодно-банановый мильфей",
        description:
          "Мягкие медовые коржи, сливочный крем, свежие ягоды и слайсы банана в каждом слое.",
        calories: "311.80",
        fat: "4.70",
        lifeShelf: 72,
        ingredients:
          "Мука в/с, сахар-песок, сахарная пудра, яйцо куриное, масло сливочное 82,5%, сливки молочные натуральные, сметана 20%, мёд цветочный, ваниль стручковая натуральная, разрыхлитель, шоколад молочный, свежая клубника, голубика, малина, банан, свежие сезонные ягоды",
        protein: "9.80",
        carbonhydrate: "56.20",
        variants: [
          {
            id: "6fc478d5-c0c4-4c19-8676-0919221df5c7",
            weight: "2.5",
            pieces: null,
            serving: 8,
            price: 7750,
            isAvailable: true,
            __typename: "ProductVariant",
            createdAt: undefined,
            filling: null,
            updatedAt: undefined,
          },
          {
            id: "1ccb37c7-876f-40a3-b6cc-9ee090a81754",
            weight: "15.0",
            pieces: null,
            serving: 48,
            price: 46500,
            isAvailable: true,
            __typename: "ProductVariant",
            createdAt: undefined,
            filling: null,
            updatedAt: undefined,
          },
        ],
        __typename: "ProductFilling",
        createdAt: undefined,
        products: null,
        productsCount: null,
        slug: null,
        stockQuantity: null,
        updatedAt: undefined,
        variantsCount: null,
      },
    ],
    __typename: "Product",
    badge: null,
    category: null,
    createdAt: undefined,
    customization: null,
    fillingsCount: null,
    imagesCount: null,
    mixBoxCompositions: null,
    mixBoxCompositionsCount: null,
    slug: null,
    topping: null,
    updatedAt: undefined,
  },
  {
    id: "b313f90f-3059-42f0-b805-a252840dcd33",
    name: "Ягодно-банановый",
    baseDescription:
      "Создавая этот торт 14 лет назад, мы и представить не могли сколько сердец он покорит. Это органичное сочетание пропитанных медовых коржей и крема словно сливочное мороженое, свежих ягод и мягкого молочного шоколада удивит даже самого искушенного гурмана!",
    type: "cake",
    variantType: "weight",
    stockQuantity: 10,
    isAvailable: true,
    images: mockImages,
    video: null,
    fillings: [
      {
        id: "9840d7c2-75af-40ac-bb80-42414afb4236",
        image_icon: {
          id: "JD4oZqc_7tPhQ4oZ0Q_ZNS",
          url: "https://ell-cake-images.storage.yandexcloud.net/JD4oZqc_7tPhQ4oZ0Q_ZNA.jpg",
          __typename: "ImageFieldOutput",
          extension: ImageExtension.Gif,
          filesize: 0,
          height: 0,
          width: 0,
        },
        name: "Ягодно-банановый мильфей",
        description:
          "Мягкие медовые коржи, сливочный крем, свежие ягоды и слайсы банана в каждом слое.",
        calories: "311.80",
        fat: "4.70",
        lifeShelf: 72,
        ingredients:
          "Мука в/с, сахар-песок, сахарная пудра, яйцо куриное, масло сливочное 82,5%, сливки молочные натуральные, сметана 20%, мёд цветочный, ваниль стручковая натуральная, разрыхлитель, шоколад молочный, свежая клубника, голубика, малина, банан, свежие сезонные ягоды",
        protein: "9.80",
        carbonhydrate: "56.20",
        variants: [
          {
            id: "6fc478d5-c0c4-4c19-8676-0919221df5c7",
            weight: "2.5",
            pieces: null,
            serving: 8,
            price: 7750,
            isAvailable: true,
            __typename: "ProductVariant",
            createdAt: undefined,
            filling: null,
            updatedAt: undefined,
          },
          {
            id: "1ccb37c7-876f-40a3-b6cc-9ee090a81754",
            weight: "15.0",
            pieces: null,
            serving: 48,
            price: 46500,
            isAvailable: true,
            __typename: "ProductVariant",
            createdAt: undefined,
            filling: null,
            updatedAt: undefined,
          },
        ],
        __typename: "ProductFilling",
        createdAt: undefined,
        products: null,
        productsCount: null,
        slug: null,
        stockQuantity: null,
        updatedAt: undefined,
        variantsCount: null,
      },
    ],
    __typename: "Product",
    badge: null,
    category: null,
    createdAt: undefined,
    customization: null,
    fillingsCount: null,
    imagesCount: null,
    mixBoxCompositions: null,
    mixBoxCompositionsCount: null,
    slug: null,
    topping: null,
    updatedAt: undefined,
  },
];

describe("Collection Component", () => {
  it("render all component contents", () => {
    //  Arrange
    render(
      <MockedProvider>
        <Collection products={mockProducts} categorySlug="pirozhenye" />
      </MockedProvider>
    );

    // Assert
    const heroSectionImages = screen.getAllByTestId("collection-hero-image");
    const heroSectionHeading = screen.getByTestId("collection-hero-heading");
    const heroSectionText = screen.getByTestId("collection-hero-text");
    const deliveryInfoHeading = screen.getByTestId(
      "collection-delivery-info-heading"
    );
    const deliveryInfoItems = screen.getAllByTestId(
      "collection-delivery-info-item"
    );
    const deliveryInfoSectionImage = screen.getByTestId(
      "collection-delivery-info-image"
    );

    // Act
    expect(heroSectionImages.length).toEqual(2);
    for (const el of heroSectionImages) {
      expect(el).toBeInTheDocument();
    }
    expect(heroSectionHeading).toBeInTheDocument();
    expect(heroSectionHeading).toHaveTextContent("Пироженые");
    expect(heroSectionText).toBeInTheDocument();

    expect(deliveryInfoHeading).toBeInTheDocument();
    expect(deliveryInfoItems.length).toEqual(3);
    for (const el of deliveryInfoItems) {
      expect(el).toBeInTheDocument();
    }
    expect(deliveryInfoSectionImage).toBeInTheDocument();
  });
});
