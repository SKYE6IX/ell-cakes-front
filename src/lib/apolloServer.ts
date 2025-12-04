import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export function createServerApolloClient() {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: process.env.SERVER_URL,
      fetch,
      credentials: "include",
    }),
    cache: new InMemoryCache(),
  });
}
