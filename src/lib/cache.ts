import { makeVar } from "@apollo/client";
import { InMemoryCache } from "@apollo/client-integration-nextjs";
import { Cart, User } from "@/types/__generated__/graphql";

export const cartVar = makeVar<Cart | null>(null);

export const isCartOpenVar = makeVar<boolean>(false);

export const userVar = makeVar<User | null>(null);

export const appCache = new InMemoryCache({
  typePolicies: {
    Cart: {
      fields: {
        cartItems: {
          merge(existing, incoming) {
            return [...incoming];
          },
        },
      },
    },
  },
});
