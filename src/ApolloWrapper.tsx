"use client";

import {
  ApolloNextAppProvider,
  ApolloClient,
} from "@apollo/client-integration-nextjs";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import { LocalState } from "@apollo/client/local-state";
import { appCache } from "./lib/cache";

function makeClient() {
  const httpLink = new UploadHttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
    fetchOptions: {
      credentials: "include",
    },
  });

  return new ApolloClient({
    cache: appCache,
    link: httpLink,
    localState: new LocalState(),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
