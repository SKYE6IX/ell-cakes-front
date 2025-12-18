import { gql, TypedDocumentNode } from "@apollo/client";
import {
  Product,
  ProductWhereUniqueInput,
  ProductVariantOrderByInput,
  ToppingOptionOrderByInput,
  CustomizeImage,
  ProductImageOrderByInput,
} from "@/types/__generated__/graphql";

export const GET_PRODUCT_DETAILS_QUERY: TypedDocumentNode<
  { product: Product },
  {
    where: ProductWhereUniqueInput;
    imagesOrderBy: ProductImageOrderByInput[];
    variantsOrderBy: ProductVariantOrderByInput[];
    toppingOptionOrderBy: ToppingOptionOrderByInput[];
  }
> = gql`
  query Product(
    $where: ProductWhereUniqueInput!
    $imagesOrderBy: [ProductImageOrderByInput!]!
    $variantsOrderBy: [ProductVariantOrderByInput!]!
    $toppingOptionOrderBy: [ToppingOptionOrderByInput!]!
  ) {
    product(where: $where) {
      id
      name
      baseDescription
      type
      variantType
      stockQuantity
      isAvailable
      images(orderBy: $imagesOrderBy) {
        id
        altText
        image {
          id
          url
        }
      }
      video {
        url
      }
      fillings {
        id
        image_icon {
          url
        }
        name
        description
        calories
        fat
        lifeShelf
        ingredients
        protein
        carbonhydrate
        variants(orderBy: $variantsOrderBy) {
          id
          weight
          pieces
          serving
          price
          isAvailable
        }
      }
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
        options(orderBy: $toppingOptionOrderBy) {
          id
          pieces
          weight
          extraPrice
        }
      }
      mixBoxCompositions {
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
      category {
        id
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
    productId: string;
    categoryId: string;
    takeFillings: number;
    takeVariants: number;
    orderVariantsBy: ProductVariantOrderByInput[];
    imagesOrderBy: ProductImageOrderByInput[];
  }
> = gql`
  query QuerySimilarProducts(
    $productId: String!
    $categoryId: String!
    $takeFillings: Int
    $takeVariants: Int
    $orderVariantsBy: [ProductVariantOrderByInput!]!
    $imagesOrderBy: [ProductImageOrderByInput!]!
  ) {
    querySimilarProducts(productId: $productId, categoryId: $categoryId) {
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
