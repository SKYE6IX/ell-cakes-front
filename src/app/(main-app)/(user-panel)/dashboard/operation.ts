import { TypedDocumentNode, gql } from "@apollo/client";
import {
  User,
  UserWhereUniqueInput,
  UserUpdateInput,
} from "@/types/__generated__/graphql";
import { USER_DATA_FRAGMENT } from "@/userDataFragment";

export const UPDATE_USER_PROFILE: TypedDocumentNode<
  { updateUser: User },
  { where: UserWhereUniqueInput; data: UserUpdateInput }
> = gql`
  mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      ...UserFragment
    }
  }
  ${USER_DATA_FRAGMENT}
`;
