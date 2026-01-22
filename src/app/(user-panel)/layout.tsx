"use client";
import React from "react";
import { TypedDocumentNode, gql } from "@apollo/client";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client/react";
import UserSidebar from "@/components/user-sidebar/UserSidebar";
import Loader from "@/components/loader/Loader";
import { AUTHORIZED_USER_QUERY } from "@/authentication/operation";
import "./user-panel-layout.scss";

const RESEND_PHONE_NUMBER_TOKEN: TypedDocumentNode<
  {
    resendPhoneNumberToken: string;
  },
  { phoneNumber: string }
> = gql`
  mutation ResendPhoneNumberToken($phoneNumber: String!) {
    resendPhoneNumberToken(phoneNumber: $phoneNumber)
  }
`;

function UserPanelLayout({ children }: { children: React.ReactNode }) {
  const { data } = useQuery(AUTHORIZED_USER_QUERY);
  const pathname = usePathname();
  const router = useRouter();
  const activeLink = pathname.slice(1) as "dashboard" | "order-history";

  const authUser = data?.queryAuthorizedUser;

  const [resendPhoneNumberToken, { loading }] = useMutation(
    RESEND_PHONE_NUMBER_TOKEN,
    {
      variables: {
        phoneNumber: authUser?.phoneNumber || "",
      },
      onCompleted() {
        router.push("/confirm-phone");
      },
    }
  );

  if (authUser && !authUser.isPhoneNumberVerified) {
    return (
      <div className="user-panel-layout">
        <div className="user-panel-layout__verification">
          <h4 className="user-panel-layout__verification-title">
            Подтвердите свой номер телефона
          </h4>
          <button
            className="user-panel-layout__verification-btn"
            disabled={loading}
            onClick={() => resendPhoneNumberToken()}
          >
            {loading ? <Loader /> : "Запрос"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-panel-layout">
      <UserSidebar authUser={authUser} active={activeLink} />
      <div className="user-panel-layout__content">{children}</div>
    </div>
  );
}

export default UserPanelLayout;
