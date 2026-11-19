import { TypedDocumentNode, gql } from "@apollo/client";
import { CustomRequestData } from "./util";

export const CUSTOM_REQUEST_MUTATION: TypedDocumentNode<
  { requestForCustomCake: { status: string } },
  { requestForCustomCakeInput: CustomRequestData }
> = gql`
  mutation RequestForCustomCake($requestForCustomCakeInput: RequestForCustomCakeInput!) {
    requestForCustomCake(requestForCustomCakeInput: $requestForCustomCakeInput) {
      status
    }
  }
`;
