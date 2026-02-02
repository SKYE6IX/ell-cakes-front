"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client/react";
import { TypedDocumentNode, gql } from "@apollo/client";
import Input from "@/components/input/Input";
import TokenInput from "@/components/token-input/TokenInput";
import { useVerifyPhoneNumber } from "@/hooks/useVerifyUser";
import { useWriteUserQuery } from "@/hooks/useWriteUserQuery";
import { AUTHORIZED_USER_QUERY } from "@/authentication/operation";
import { USER_DATA_FRAGMENT } from "@/userDataFragment";
import {
  User,
  UserWhereUniqueInput,
  UserUpdateInput,
} from "@/types/__generated__/graphql";
import Loader from "@/components/loader/Loader";
import "./confirm-phone.scss";

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

function ConfirmPhonePage() {
  const router = useRouter();

  const writeUserQuery = useWriteUserQuery();
  const { data } = useQuery(AUTHORIZED_USER_QUERY);
  const authUser = data?.queryAuthorizedUser;

  const [confirmPageState, setConfirmPageState] = useState({
    showInput: false,
    newEmail: "",
  });

  const onInputChange = ({ value }: { name: string; value: string }) => {
    setConfirmPageState((prvState) => ({ ...prvState, newEmail: value }));
  };

  const handleShowChangeNumber = () => {
    setConfirmPageState((prvState) => ({
      ...prvState,
      showInput: !prvState.showInput,
    }));
  };

  const { reedeemUserVerificationToken, error, loading } = useVerifyPhoneNumber(
    {
      email: authUser?.email as string,
      callback() {
        router.push("/dashboard");
      },
    }
  );

  const reedeemConfirmPhoneNumberToken = (token: string) => {
    reedeemUserVerificationToken({ variables: { token } });
  };

  const [updateUserProfile, { loading: updateEmailLoading }] = useMutation(
    UPDATE_USER_PROFILE,
    {
      variables: {
        data: { email: confirmPageState.newEmail },
        where: { id: authUser?.id },
      },

      onCompleted() {
        setConfirmPageState((prvState) => ({
          ...prvState,
          showInput: !prvState.showInput,
        }));
      },

      update(cache, { data }) {
        if (data?.updateUser) {
          writeUserQuery(cache, data.updateUser);
        }
      },

      onError(error) {
        console.error(
          "A new error occur when try to update user profile -> ",
          error.message
        );
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!confirmPageState.newEmail.trim()) {
      return;
    }
    updateUserProfile();
  };

  return (
    <section className="verify-user">
      <div className="verify-user__inner-wrapper">
        {confirmPageState.showInput ? (
          <form onSubmit={handleSubmit}>
            <div className="verify-user__change-email-wrapper">
              <Input
                initialValue={confirmPageState.newEmail}
                name="email"
                placeholder="Почта"
                type="email"
                onInputChange={onInputChange}
                hasError={false}
              />
              <button
                className="verify-user__change-email-btn"
                type="submit"
                disabled={updateEmailLoading}
              >
                {updateEmailLoading ? <Loader /> : "Изменить"}
              </button>
            </div>
          </form>
        ) : (
          <div className="verify-user__otp-wrapper">
            <TokenInput
              inputEmail={authUser?.email as string}
              reedeemToken={reedeemConfirmPhoneNumberToken}
              error={error}
              loading={loading}
            />

            <div className="verify-user__divider" />

            <button
              className="verify-user__show-change-email-btn"
              onClick={handleShowChangeNumber}
            >
              Изменить номер
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ConfirmPhonePage;
