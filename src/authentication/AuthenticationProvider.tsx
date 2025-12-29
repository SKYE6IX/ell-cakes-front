"use client";
import React, { useEffect, useRef } from "react";
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
  const initialLoad = useRef(true);
  const client = useApolloClient();

  const { data } = useQuery(AUTHORIZED_USER_QUERY);

  const userResult = data?.queryAuthorizedUser ?? null;

  useEffect(() => {
    if (initialLoad.current && preloadQuery) {
      client.writeQuery({
        query: AUTHORIZED_USER_QUERY,
        data: { queryAuthorizedUser: preloadQuery },
      });
      initialLoad.current = false;
    } else {
      userVar(userResult);
    }
  }, [client, preloadQuery, userResult]);

  return <>{children}</>;
}

export default AuthenticationProvider;
