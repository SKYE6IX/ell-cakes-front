import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

export const { query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.SERVER_URL,
      fetchOptions: {
        cache:
          process.env.NODE_ENV === "production" ? "default" : "force-cache",
        credentials: "include",
      },
    }),
  });
});
