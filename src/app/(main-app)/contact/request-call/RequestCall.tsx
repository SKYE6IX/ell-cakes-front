"use client";
import { TypedDocumentNode, gql } from "@apollo/client";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import Input from "@/components/input/Input";
import Loader from "@/components/loader/Loader";
import { validaterequestCallFields } from "@/utils/validations";
import "./request-call.scss";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

interface RequestCallInput {
  email: string;
  company: string;
  message: string;
  phoneNumber: string;
}
interface RequestCallState {
  requestCallField: RequestCallInput;
  errorNames: string[];
}

const REQUEST_CALL: TypedDocumentNode<
  { requestCall: string },
  { requestCallInput: RequestCallInput }
> = gql`
  mutation RequestCall($requestCallInput: RequestCallInput!) {
    requestCall(requestCallInput: $requestCallInput)
  }
`;

const DEFAULT_FIELD: RequestCallInput = {
  email: "",
  company: "",
  message: "",
  phoneNumber: "",
};

function RequestCall() {
  const [requestCallState, setRequestCallState] = useState<RequestCallState>({
    requestCallField: DEFAULT_FIELD,
    errorNames: [],
  });

  const onInputChange = ({ value, name }: { name: string; value: string }) => {
    let updateErrorNames: string[] = [];
    if (requestCallState.errorNames.length >= 1) {
      updateErrorNames = requestCallState.errorNames.filter((errName) => errName !== name);
    }
    setRequestCallState((prvState) => ({
      ...prvState,
      requestCallField: {
        ...prvState.requestCallField,
        [name]: value,
      },
      errorNames: updateErrorNames,
    }));
  };

  const [requestCall, { loading }] = useMutation(REQUEST_CALL, {
    variables: {
      requestCallInput: requestCallState.requestCallField,
    },
    onCompleted() {
      setRequestCallState((prvState) => ({
        ...prvState,
        requestCallField: DEFAULT_FIELD,
      }));
      alert("Message Sent! 🚀");
    },
  });

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const validatedFields = validaterequestCallFields(requestCallState.requestCallField);
    if (validatedFields.error) {
      validatedFields.error.issues.forEach((issue) => {
        setRequestCallState((prvState) => ({
          ...prvState,
          errorNames: [...prvState.errorNames, issue.path[0].toString()],
        }));
      });
      return;
    }
    requestCall();
  };

  return (
    <div className="request-call">
      <form onSubmit={handleSubmitRequest} className="request-call__form">
        <h4 className="request-call__form-title">Заполните форму запроса, и мы свяжемся с вами.</h4>

        <div className="request-call__input-wrapper">
          <Input
            value={requestCallState.requestCallField.email}
            name="email"
            placeholder="Ваша почта"
            type="email"
            onInputChange={onInputChange}
            hasError={requestCallState.errorNames.includes("email")}
          />
          <Input
            value={requestCallState.requestCallField.company}
            name="company"
            placeholder="Компания"
            type="text"
            onInputChange={onInputChange}
            hasError={requestCallState.errorNames.includes("company")}
          />
          <textarea
            name="message"
            className={[
              "message-text-area",
              requestCallState.errorNames.includes("message") ? "error" : "",
            ].join(" ")}
            placeholder="Ваше предложение"
            value={requestCallState.requestCallField.message}
            onChange={(e) => {
              const { name, value } = e.target;
              onInputChange({ value, name });
            }}
          />
          <Input
            value={
              requestCallState.requestCallField.phoneNumber
                ? formatPhoneNumber(requestCallState.requestCallField.phoneNumber)
                : ""
            }
            name="phoneNumber"
            placeholder="Телефон"
            type="tel"
            onInputChange={onInputChange}
            hasError={requestCallState.errorNames.includes("phoneNumber")}
          />
        </div>

        <button className="request-call__form-btn" type="submit" disabled={loading}>
          {loading ? <Loader /> : "Отправить"}
        </button>
      </form>
    </div>
  );
}

export default RequestCall;
