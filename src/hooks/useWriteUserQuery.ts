import { ApolloCache } from "@apollo/client/cache";
import { User } from "@/types/__generated__/graphql";
import { AUTHORIZED_USER_QUERY } from "@/authentication/operation";

export function useWriteUserQuery() {
  const write = (cache: ApolloCache, user: User) => {
    cache.writeQuery({
      query: AUTHORIZED_USER_QUERY,
      data: { queryAuthorizedUser: user },
    });
  };
  return write;
}
