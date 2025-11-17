import { gql, TypedDocumentNode } from "@apollo/client";
import {
  Product,
  ProductWhereUniqueInput,
  ProductVariantOrderByInput,
  ToppingOptionOrderByInput,
} from "@/types/__generated__/graphql";

export const GET_PRODUCT_DETAILS_QUERY: TypedDocumentNode<
  { product: Product },
  {
    where: ProductWhereUniqueInput;
    variantsOrderBy: ProductVariantOrderByInput[];
    toppingOptionOrderBy: ToppingOptionOrderByInput[];
  }
> = gql`
  query Product(
    $where: ProductWhereUniqueInput!
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
      images {
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
      fillingsCount
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
        attribute {
          id
          name
          productAttributes {
            id
            product {
              id
              name
              images {
                id
                image {
                  url
                }
              }
            }
          }
        }
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
        options(orderBy: $toppingOptionOrderBy) {
          id
          pieces
          weight
          extraPrice
        }
      }
    }
  }
`;
