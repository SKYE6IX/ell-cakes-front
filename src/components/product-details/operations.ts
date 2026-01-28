import { gql, TypedDocumentNode } from "@apollo/client";
import {
  Product,
  ProductWhereUniqueInput,
  ProductVariantOrderByInput,
  CustomizeImage,
  ProductImageOrderByInput,
  ProductImage,
  ProductImageWhereInput,
  ProductVideoWhereUniqueInput,
  ProductVideo,
  ProductFillingWhereInput,
  ProductFilling,
  MixBoxProductWhereUniqueInput,
  MixBoxProduct,
  ToppingOptionOrderByInput,
} from "@/types/__generated__/graphql";

export const GET_PRODUCT_QUERY: TypedDocumentNode<
  { product: Product },
  {
    where: ProductWhereUniqueInput;
    orderToppingOptionBy: ToppingOptionOrderByInput[];
  }
> = gql`
  query Product(
    $where: ProductWhereUniqueInput!
    $orderToppingOptionBy: [ToppingOptionOrderByInput!]!
  ) {
    product(where: $where) {
      id
      name
      baseDescription
      type
      variantType
      isAvailable
      fillingsCount
      customization {
        id
        customOptions {
          id
          name
          customValues {
            id
            value
            extraPrice
          }
        }
      }
      topping {
        id
        name
        options(orderBy: $orderToppingOptionBy) {
          id
          pieces
          weight
          extraPrice
        }
      }
    }
  }
`;

export const GET_PRODUCT_FILLINGS_QUERY: TypedDocumentNode<
  { productFillings: ProductFilling[] },
  {
    where: ProductFillingWhereInput;
    orderVariantsBy: ProductVariantOrderByInput[];
  }
> = gql`
  query ProductFillings(
    $where: ProductFillingWhereInput!
    $orderVariantsBy: [ProductVariantOrderByInput!]!
  ) {
    productFillings(where: $where) {
      id
      name
      description
      calories
      fat
      ingredients
      protein
      carbonhydrate
      image_icon {
        id
        url
      }
      variants(orderBy: $orderVariantsBy) {
        id
        weight
        pieces
        size
        serving
        price
      }
    }
  }
`;

export const GET_MIX_BOX_PRODUCT_QUERY: TypedDocumentNode<
  { mixBoxProduct: MixBoxProduct },
  { where: MixBoxProductWhereUniqueInput }
> = gql`
  query MixBoxProduct($where: MixBoxProductWhereUniqueInput!) {
    mixBoxProduct(where: $where) {
      id
      compositions {
        id
        name
        slug
        images {
          id
          image {
            id
            url
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_IMAGES_QUERY: TypedDocumentNode<
  { productImages: ProductImage[] },
  {
    where: ProductImageWhereInput;
    orderImageBy: ProductImageOrderByInput[];
  }
> = gql`
  query ProductImages(
    $where: ProductImageWhereInput!
    $orderImageBy: [ProductImageOrderByInput!]!
  ) {
    productImages(orderBy: $orderImageBy, where: $where) {
      id
      image {
        id
        url
      }
    }
  }
`;

export const GET_PRODUCT_VIDEO_QUERY: TypedDocumentNode<
  { productVideo: ProductVideo },
  {
    where: ProductVideoWhereUniqueInput;
  }
> = gql`
  query ProductVideo($where: ProductVideoWhereUniqueInput!) {
    productVideo(where: $where) {
      id
      video {
        url
      }
    }
  }
`;

export const ADD_CUSTOMIZE_IMAGE: TypedDocumentNode<
  {
    uploadImageCustomization: CustomizeImage[];
  },
  { files: FileList }
> = gql`
  mutation UploadImageCustomization($files: [Upload!]!) {
    uploadImageCustomization(files: $files) {
      id
      altText
    }
  }
`;

export const QUERY_SIMILAR_PRODUCTS: TypedDocumentNode<
  { querySimilarProducts: Product[] },
  {
    productSlug: string;
    takeFillings: number;
    takeVariants: number;
    orderVariantsBy: ProductVariantOrderByInput[];
    imagesOrderBy: ProductImageOrderByInput[];
  }
> = gql`
  query QuerySimilarProducts(
    $productSlug: String!
    $takeFillings: Int
    $takeVariants: Int
    $orderVariantsBy: [ProductVariantOrderByInput!]!
    $imagesOrderBy: [ProductImageOrderByInput!]!
  ) {
    querySimilarProducts(productSlug: $productSlug) {
      id
      name
      slug
      badge
      baseDescription
      fillings(take: $takeFillings) {
        id
        variants(take: $takeVariants, orderBy: $orderVariantsBy) {
          id
          weight
          pieces
          price
        }
      }
      images(orderBy: $imagesOrderBy) {
        id
        image {
          url
        }
      }
    }
  }
`;
