import { makeVar } from "@apollo/client";
import { InMemoryCache } from "@apollo/client-integration-nextjs";

export const isCartOpenVar = makeVar<boolean>(false);

export const isMenuOpenVar = makeVar<boolean>(false);

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
    User: {
      fields: {
        orders: {
          merge(existing, incoming) {
            return existing ?? incoming;
          },
        },
      },
    },
  },
});
