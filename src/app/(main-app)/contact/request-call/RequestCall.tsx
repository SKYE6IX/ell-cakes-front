"use client";
import { TypedDocumentNode, gql } from "@apollo/client";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import Input from "@/components/input/Input";
import Loader from "@/components/loader/Loader";
import "./request-call.scss";

const REQUEST_CALL: TypedDocumentNode<
  { requestCall: string },
  { phoneNumber: string }
> = gql`
  mutation RequestCall($phoneNumber: String!) {
    requestCall(phoneNumber: $phoneNumber)
  }
`;

function RequestCall() {
  const [requestCallState, setRequestCallState] = useState({
    requestNumber: "",
    inputHasError: false,
    text: "Запрос",
    disabledButton: false,
  });

  const onInputChange = ({ value }: { name: string; value: string }) => {
    setRequestCallState((prvState) => ({
      ...prvState,
      requestNumber: value,
      inputHasError: false,
    }));
  };

  const [requestCall, { loading }] = useMutation(REQUEST_CALL, {
    variables: {
      phoneNumber: requestCallState.requestNumber,
    },
    onCompleted() {
      setRequestCallState((prvState) => ({
        ...prvState,
        requestNumber: "",
        text: "Отправил!",
        disabledButton: true,
      }));

      // Reset it back to original text after 5 seconds
      setTimeout(() => {
        setRequestCallState((prvState) => ({
          ...prvState,
          text: "Запрос",
          disabledButton: false,
        }));
      }, 5000);
    },
  });

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestCallState.requestNumber) {
      setRequestCallState((prvState) => ({
        ...prvState,
        inputHasError: true,
      }));
      return;
    }
    requestCall();
  };

  return (
    <div className="request-call">
      <form onSubmit={handleSubmitRequest} className="request-call__form">
        <h4 className="request-call__form-title">
          Оставьте свой номер телефона и мы свяжемся с вами.
        </h4>
        <Input
          initialValue={requestCallState.requestNumber}
          name="phoneNumber"
          placeholder="Телефон"
          type="tel"
          onInputChange={onInputChange}
          hasError={requestCallState.inputHasError}
        />
        <button
          className="request-call__form-btn"
          type="submit"
          disabled={loading || requestCallState.disabledButton}
        >
          {loading ? <Loader /> : requestCallState.text}
        </button>
      </form>
    </div>
  );
}

export default RequestCall;
