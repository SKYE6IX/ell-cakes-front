import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { cookies } from "next/headers";

export const { query, PreloadQuery } = registerApolloClient(async () => {
  let cookiesHeaders = "";
  const cookiesStores = await cookies();
  if (cookiesStores) {
    cookiesHeaders = cookiesStores
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
  }
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.SERVER_URL,
      headers: {
        cookie: cookiesHeaders,
      },
      fetchOptions: {
        cache: "default",
        credentials: "include",
      },
    }),
  });
});
