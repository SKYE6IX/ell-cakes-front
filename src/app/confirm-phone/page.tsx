"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client/react";
import Input from "@/components/input/Input";
import TokenInput from "@/components/token-input/TokenInput";
import { AUTHORIZED_USER_QUERY } from "@/authentication/operation";
import { REEDEEM_PHONE_NUMBER_TOKEN } from "./operation";

import "./confirm-phone.scss";

function ConfirmPhonePage() {
  const router = useRouter();

  const { data } = useQuery(AUTHORIZED_USER_QUERY);
  const authUser = data?.queryAuthorizedUser;

  const [numberChange, setNumberChange] = useState({
    showInput: false,
    newNumber: "",
  });

  const onInputChange = ({ value }: { name: string; value: string }) => {
    setNumberChange((prvState) => ({ ...prvState, newNumber: value }));
  };

  const handleShowChangeNumber = () => {
    setNumberChange((prvState) => ({
      ...prvState,
      showInput: !prvState.showInput,
    }));
  };

  const [reedeemPhoneToken, { loading, error }] = useMutation(
    REEDEEM_PHONE_NUMBER_TOKEN,
    {
      variables: {
        phoneNumber: authUser?.phoneNumber || "",
      },
      onCompleted(data) {
        if (data.redeemPhoneNumberToken.status) {
          router.push("/dashboard");
        }
      },

      refetchQueries(result) {
        if (result.data.redeemPhoneNumberToken.status) {
          return [AUTHORIZED_USER_QUERY];
        }
        return [];
      },
    }
  );

  const reedeemConfirmPhoneNumberToken = (token: string) => {
    reedeemPhoneToken({ variables: { token } });
  };

  return (
    <section className="confirm-phone">
      <div className="confirm-phone__inner-wrapper">
        {numberChange.showInput ? (
          <div className="confirm-phone__change-phone-wrapper">
            <Input
              initialValue={""}
              name="phoneNumber"
              placeholder="ТЕЛЕФОН"
              type="tel"
              onInputChange={onInputChange}
              hasError={false}
            />
            <button className="confirm-phone__change-number-btn" disabled>
              Изменить
            </button>
          </div>
        ) : (
          <div className="confirm-phone__otp-wrapper">
            <TokenInput
              inputPhoneNumber={authUser!.phoneNumber!}
              reedeemToken={reedeemConfirmPhoneNumberToken}
              error={error}
              loading={loading}
            />

            <div className="confirm-phone__divider" />

            <button
              className="confirm-phone__show-change-number-btn"
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
