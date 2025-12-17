import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { cookies } from "next/headers";

export const { query, PreloadQuery } = registerApolloClient(async () => {
  const cookiesStores = await cookies();

  const cookiesHeaders = cookiesStores
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.SERVER_URL,
      headers: {
        cookie: cookiesHeaders,
      },
      fetchOptions: {
        cache: "force-cache",
        next: {
          revalidate: 1800, // Reset every 30 min,
        },
        credentials: "include",
      },
    }),
  });
});
