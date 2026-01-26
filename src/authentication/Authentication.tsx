import { getClient } from "@/ApolloClient";
import { AUTHORIZED_USER_QUERY } from "./operation";
import UserMenu from "@/components/header/user-menu/UserMenu";

async function getAuthorizedUser() {
  try {
    const client = await getClient();
    const { data } = await client.query({
      query: AUTHORIZED_USER_QUERY,
      fetchPolicy: "network-only",
    });
    return { data, error: null };
  } catch (err) {
    console.error("Here the error that occur -> :", err);
    return { data: null, error: "Unexpected error occurred" };
  }
}

async function Authentication() {
  const result = await getAuthorizedUser();

  const authUser = result.data?.queryAuthorizedUser ?? null;

  return <UserMenu preloadQuery={authUser} />;
}

export default Authentication;
