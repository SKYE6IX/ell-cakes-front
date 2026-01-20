import { TypedDocumentNode, gql } from "@apollo/client";
import {
  FeaturedProduct,
  ProductHomeBanner,
  ProductImageOrderByInput,
  ProductVariantOrderByInput,
} from "@/types/__generated__/graphql";

export const GET_PRODUCT_HOME_BANNERS_QUERY: TypedDocumentNode<
  {
    productHomeBanners: ProductHomeBanner[];
  },
  { take: number }
> = gql`
  query ProductHomeBanners($take: Int) {
    productHomeBanners(take: $take) {
      id
      bannerText
      product {
        id
        slug
        name
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

export const GET_FEATURED_PRODUCTS_QUERY: TypedDocumentNode<
  {
    featuredProducts: FeaturedProduct[];
  },
  {
    takeFeaturedProducts: number;
    takeFillings: number;
    takeVariants: number;
    variantsOrderBy: ProductVariantOrderByInput[];
    imagesOrderBy: ProductImageOrderByInput[];
  }
> = gql`
  query FeaturedProducts(
    $takeFeaturedProducts: Int
    $takeFillings: Int
    $takeVariants: Int
    $variantsOrderBy: [ProductVariantOrderByInput!]!
    $imagesOrderBy: [ProductImageOrderByInput!]!
  ) {
    featuredProducts(take: $takeFeaturedProducts) {
      id
      products {
        id
        name
        slug
        badge
        baseDescription
        variantType
        fillings(take: $takeFillings) {
          id
          variants(take: $takeVariants, orderBy: $variantsOrderBy) {
            id
            weight
            pieces
            size
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
  }
`;
