import { gql, TypedDocumentNode } from "@apollo/client";
import { getClient } from "@/ApolloClient";
import { User } from "@/types/__generated__/graphql";

const AUTHORIZED_USER_QUERY: TypedDocumentNode<
  { queryAuthorizedUser: User | null },
  Record<string, null>
> = gql`
  query IsAuthorizedUser {
    queryAuthorizedUser {
      id
    }
  }
`;

export async function isAuthenticated() {
  const { data, error } = await (
    await getClient()
  ).query({
    query: AUTHORIZED_USER_QUERY,
  });

  if (error) {
    console.error(error);
    return false;
  }

  if (!data || data.queryAuthorizedUser === null) {
    return false;
  }

  return true;
}
