import React from "react";
import { getClient } from "@/ApolloClient";
import { AUTHORIZED_USER_QUERY } from "./operation";
import AuthenticationProvider from "./AuthenticationProvider";

async function AuthenticationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await (
    await getClient()
  ).query({
    query: AUTHORIZED_USER_QUERY,
  });
  return (
    <AuthenticationProvider preloadQuery={data?.queryAuthorizedUser}>
      {children}
    </AuthenticationProvider>
  );
}

export default AuthenticationWrapper;
