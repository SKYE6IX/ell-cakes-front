"use client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";

export const client = new ApolloClient({
  link: new UploadHttpLink({ uri: process.env.NEXT_PUBLIC_SERVER_URL }),
  cache: new InMemoryCache(),
});

export default function ApolloQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
