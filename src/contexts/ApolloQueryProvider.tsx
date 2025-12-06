"use client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import { LocalState } from "@apollo/client/local-state";

export const client = new ApolloClient({
  link: new UploadHttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: "include",
  }),
  cache: new InMemoryCache({
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
  }),
  localState: new LocalState(),
});

export default function ApolloQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
