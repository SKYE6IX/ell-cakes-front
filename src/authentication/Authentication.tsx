import { getClient } from "@/ApolloClient";
import { AUTHORIZED_USER_QUERY } from "./operation";
import UserMenu from "@/components/header/user-menu/UserMenu";

async function Authentication() {
  const { data } = await (
    await getClient()
  ).query({
    query: AUTHORIZED_USER_QUERY,
    fetchPolicy: "network-only",
  });

  return <UserMenu preloadQuery={data?.queryAuthorizedUser} />;
}

export default Authentication;
