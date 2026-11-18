import { TypedDocumentNode, gql } from "@apollo/client";
import { CustomRequestState } from "./util";

export const CUSTOM_REQUEST_MUTATION: TypedDocumentNode<
  string,
  { requestForCustomCakeInput: CustomRequestState }
> = gql`
  mutation RequestForCustomCake($requestForCustomCakeInput: RequestForCustomCakeInput!) {
    requestForCustomCake(requestForCustomCakeInput: $requestForCustomCakeInput)
  }
`;
