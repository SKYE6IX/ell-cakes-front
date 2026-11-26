"use client";
import Image from "next/image";
import dessertImage from "./dessert.jpg";
import "./collaboration.scss";
import Input from "@/components/input/Input";
import Loader from "@/components/loader/Loader";
import { useState } from "react";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { validateCooperationRequest } from "@/utils/validations";
import { gql, TypedDocumentNode } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

interface RequestInput {
  email: string;
  company: string;
  message: string;
  phoneNumber: string | null;
}
interface CooperationState {
  requestFields: RequestInput;
  inputErrors: string[];
}

const DEFAULT_FIELD: RequestInput = {
  email: "",
  company: "",
  message: "",
  phoneNumber: null,
};

const REQUEST_COOPERATION: TypedDocumentNode<
  { requestForCooperation: string },
  { requestInput: RequestInput }
> = gql`
  mutation RequestForCustomCake($requestInput: RequestForCooperationInput!) {
    requestForCooperation(requestInput: $requestInput)
  }
`;

function Collaboration() {
  const [cooperationState, setCooperationState] = useState<CooperationState>({
    requestFields: DEFAULT_FIELD,
    inputErrors: [],
  });

  const onInputChange = ({ value, name }: { name: string; value: string }) => {
    let updateErrorNames: string[] = [];
    if (cooperationState.inputErrors.length >= 1) {
      updateErrorNames = cooperationState.inputErrors.filter((errName) => errName !== name);
    }
    setCooperationState((prvState) => {
      if (name === "phoneNumber" && !value.trim()) {
        return {
          ...prvState,
          requestFields: {
            ...prvState.requestFields,
            [name]: null,
          },
          inputErrors: updateErrorNames,
        };
      } else {
        return {
          ...prvState,
          requestFields: {
            ...prvState.requestFields,
            [name]: value,
          },
          inputErrors: updateErrorNames,
        };
      }
    });
  };

  const [requestCall, { loading }] = useMutation(REQUEST_COOPERATION, {
    variables: {
      requestInput: cooperationState.requestFields,
    },
    onCompleted() {
      setCooperationState((prvState) => ({
        ...prvState,
        requestFields: DEFAULT_FIELD,
      }));
      alert("Message Sent! 🚀");
    },
  });

  const handleSubmitRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validatedFields = validateCooperationRequest(cooperationState.requestFields);

    if (validatedFields.error) {
      validatedFields.error.issues.forEach((issue) => {
        setCooperationState((prvState) => ({
          ...prvState,
          inputErrors: [...prvState.inputErrors, issue.path[0].toString()],
        }));
      });

      return;
    }

    requestCall();
  };

  return (
    <section className="collaboration">
      <div className="collaboration__text-wrapper">
        <h2 className="collaboration__title">Мы открыты к сотрудничеству!</h2>
        <p className="collaboration__text" data-testid="page-text">
          Предлагаем партнёрство для:
        </p>
        <p className="collaboration__text">
          - кафе и ресторанов
          <br />
          - фотостудий и организаторов мероприятий
          <br />
          - корпоративных клиентов
          <br />- свадебных и праздничных агентств
        </p>
        <p className="collaboration__text">
          Гарантируем индивидуальный подход, стабильное качество и сладкие условия сотрудничества.
        </p>
        <p className="collaboration__text">Свяжитесь с нами - будем рады обсудить детали!</p>

        <form className="collaboration__form-wrapper" onSubmit={handleSubmitRequest}>
          <Input
            value={cooperationState.requestFields.email}
            name="email"
            placeholder="Рабочая почта"
            type="email"
            onInputChange={onInputChange}
            hasError={cooperationState.inputErrors.includes("email")}
          />
          <Input
            value={cooperationState.requestFields.company}
            name="company"
            placeholder="Компания"
            type="text"
            onInputChange={onInputChange}
            hasError={cooperationState.inputErrors.includes("company")}
          />
          <textarea
            name="message"
            className={[
              "collaboration__text-area",
              cooperationState.inputErrors.includes("company") ? "error" : "",
            ].join(" ")}
            placeholder="Ваше предложение"
            value={cooperationState.requestFields.message}
            onChange={(e) => {
              const { name, value } = e.target;
              onInputChange({ value, name });
            }}
          />
          <Input
            value={
              cooperationState.requestFields.phoneNumber
                ? formatPhoneNumber(cooperationState.requestFields.phoneNumber)
                : ""
            }
            name="phoneNumber"
            placeholder="Телефон"
            type="tel"
            onInputChange={onInputChange}
            hasError={false}
          />

          <button className="collaboration__form-btn" type="submit" disabled={loading}>
            {loading ? <Loader /> : "Отправить запрос"}
          </button>
        </form>
      </div>

      <div className="collaboration__media">
        <Image
          className="collaboration__image"
          src={dessertImage}
          alt="birthday cake"
          fill
          priority
          data-testid="page-image"
        />
      </div>
    </section>
  );
}
export default Collaboration;
