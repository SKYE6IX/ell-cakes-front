import { useLazyQuery } from "@apollo/client/react";
import { TypedDocumentNode, gql } from "@apollo/client";

export const IS_EMAIL_IN_USE: TypedDocumentNode<
  { isEmailInUse: boolean },
  { email: string }
> = gql`
  query IsEmailInUse($email: String!) {
    isEmailInUse(email: $email)
  }
`;

export const IS_PHONE_NUMBER_IN_USE: TypedDocumentNode<
  { isPhoneNumberInUse: boolean },
  { phoneNumber: string }
> = gql`
  query IsPhoneNumberInUse($phoneNumber: String!) {
    isPhoneNumberInUse(phoneNumber: $phoneNumber)
  }
`;

const debounce = (fn: (arg: string) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (arg: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(arg), delay);
  };
};

export function useUserDataExistQuery() {
  const [isEmailInUse, { data: emailValidation }] = useLazyQuery(
    IS_EMAIL_IN_USE,
    { fetchPolicy: "network-only" }
  );
  const [isPhoneInUse, { data: phoneValidation }] = useLazyQuery(
    IS_PHONE_NUMBER_IN_USE,
    { fetchPolicy: "network-only" }
  );

  const executeEmailInUse = (email: string) => {
    isEmailInUse({ variables: { email } });
  };
  const executePhoneInUse = (phoneNumber: string) => {
    isPhoneInUse({ variables: { phoneNumber } });
  };

  const debounceEmailInUse = debounce(executeEmailInUse, 1000);
  const debouncePhoneInUser = debounce(executePhoneInUse, 1000);

  return {
    emailValidation,
    phoneValidation,
    debounceEmailInUse,
    debouncePhoneInUser,
  };
}
