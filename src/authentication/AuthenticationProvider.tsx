"use client";
import React, { useEffect } from "react";
import { useQuery, useApolloClient } from "@apollo/client/react";
import { userVar } from "@/lib/cache";
import { AUTHORIZED_USER_QUERY } from "./operation";
import { User } from "@/types/__generated__/graphql";

interface AuthenticationProviderProps {
  preloadQuery: User | null | undefined;
  children: React.ReactNode;
}

function AuthenticationProvider({
  preloadQuery,
  children,
}: AuthenticationProviderProps) {
  const client = useApolloClient();

  if (preloadQuery) {
    client.writeQuery({
      query: AUTHORIZED_USER_QUERY,
      data: { queryAuthorizedUser: preloadQuery },
    });
  }

  const { data } = useQuery(AUTHORIZED_USER_QUERY);

  useEffect(() => {
    if (data?.queryAuthorizedUser) {
      userVar(data.queryAuthorizedUser);
    }
  }, [data]);

  return <>{children}</>;
}

export default AuthenticationProvider;
