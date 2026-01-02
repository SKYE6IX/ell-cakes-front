import { ApolloCache } from "@apollo/client/cache";
import { GET_CART_QUERY } from "@/components/cart/operations";
import { OrderDirection, Cart } from "@/types/__generated__/graphql";

export function useWriteCartQuery() {
  const write = (cache: ApolloCache, cart: Cart) => {
    cache.writeQuery({
      query: GET_CART_QUERY,
      data: { queryCart: cart },
      variables: {
        cartItemsOrderBy: [{ createdAt: OrderDirection.Asc }],
        orderImagesBy: [{ createdAt: OrderDirection.Asc }],
      },
    });
  };
  return write;
}
