"use client";
import React, { Dispatch, useState, useRef } from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import { ACTIONTYPE } from "../checkoutReducer";
import { Cart } from "@/types/__generated__/graphql";
import "./delivery-option.scss";

import "react-datepicker/dist/react-datepicker.css";

type DeliveryOptionType = {
  key: "self-pickup" | "regular-time" | "in-between-time";
  chosenTime?: string;
};

type CustomInputProps = {
  value?: string;
  onClick?: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
};

type DeliveryAddressProps = {
  dispatch: Dispatch<ACTIONTYPE>;
  cart: Cart;
};

const deliveryTimeInterval = [
  "с 10 до 12",
  "с 12 до 14",
  "с 14 до 16",
  "с 16 до 18",
  "с 16 до 20",
];

function getFutureDate(daysToAdd: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd + 1);
  return new Date(date);
}

function DeliveryOption({ cart, dispatch }: DeliveryAddressProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const dateButtonRef = useRef<HTMLButtonElement>(null);

  const [currentValue, setCurrentValue] =
    useState<DeliveryOptionType["key"]>("regular-time");

  const [selectedInterval, setSelectedInterval] = useState(
    deliveryTimeInterval[0]
  );

  const handleSetDelivaryOption = ({ key, chosenTime }: DeliveryOptionType) => {
    setCurrentValue(key);
    if (key === "regular-time") {
      dispatch({
        type: "manage_delivery_option",
        payload: {
          zonePrice: 990,
          option: "Интервал доставки (с 10:00 до 16:00)",
        },
      });
    } else if (key === "in-between-time") {
      dispatch({
        type: "manage_delivery_option",
        payload: {
          zonePrice: 1290,
          option: `Выбрать интервал доставки (${chosenTime})`,
        },
      });
    } else if (key === "self-pickup") {
      dispatch({
        type: "manage_delivery_option",
        payload: {
          zonePrice: 0,
          option:
            "Самовывоз - Котельники, ул Кузьминская 17, (с 09:00 до 14:00)",
        },
      });
    }
  };

  const handleOnSelectedIntervalChangeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentValue("in-between-time");
    const { value } = e.target;
    setSelectedInterval(value);
    dispatch({
      type: "manage_delivery_option",
      payload: {
        zonePrice: 1290,
        option: `Выбрать интервал доставки (${value})`,
      },
    });
  };

  const handleOnDeliveryDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const offset = date.getTimezoneOffset() * 60000;
      const newDate = new Date(date.getTime() - offset).toISOString();
      dispatch({
        type: "add_delivery_date",
        payload: newDate,
      });
    }
  };

  // Get preparation data
  const maxPreparationDays =
    cart.cartItems?.reduce((max, item) => {
      return Math.max(max, item.product!.preparationDays!);
    }, 0) ?? 3;

  const url = new URL("https://t.me/Ell_Cakes");
  url.searchParams.set("text", "Здравствуйте! Хочу оформить заказ");
  const tlUrl = url.toString().replace(/\+/g, "%20");

  return (
    <div className="delivery-option">
      <ul className="delivery-option__list">
        <li
          className={[
            "delivery-option__list-item",
            currentValue === "regular-time" ? "active" : "",
          ].join(" ")}
          onClick={() => handleSetDelivaryOption({ key: "regular-time" })}
        >
          Интервал доставки (с 10:00 до 16:00) - От 990 руб
        </li>

        <li
          className={[
            "delivery-option__list-item",
            currentValue === "self-pickup" ? "active" : "",
          ].join(" ")}
          onClick={() => handleSetDelivaryOption({ key: "self-pickup" })}
        >
          Самовывоз - Котельники, ул Кузьминская 17, (с 09:00 до 14:00)
        </li>

        <li className="delivery-option__list-item delivery-interval">
          <label
            htmlFor="delivery-interval"
            className={[
              "delivery-interval__label",
              currentValue === "in-between-time" ? "active" : "",
            ].join(" ")}
            onClick={() =>
              handleSetDelivaryOption({
                key: "in-between-time",
                chosenTime: selectedInterval,
              })
            }
          >
            Выбрать интервал доставки - От 1290 руб
          </label>
          <select
            name="delivery-interval"
            id="delivery-interval"
            className="delivery-interval__select"
            value={selectedInterval}
            onChange={handleOnSelectedIntervalChangeChange}
          >
            {deliveryTimeInterval.map((dti) => (
              <option
                key={dti}
                value={dti}
                className="delivery-interval__option"
              >
                {dti}
              </option>
            ))}
          </select>
        </li>
      </ul>

      <div className="delivery-option__date-selection-wrapper">
        <label className="delivery-option__date-selection-label">
          На какое число приготовить?
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={handleOnDeliveryDateChange}
          customInput={<CustomDateInputWithButton buttonRef={dateButtonRef} />}
          popperTargetRef={dateButtonRef}
          minDate={getFutureDate(maxPreparationDays)}
        />
      </div>
      <p className="delivery-option__urgent">
        Нужен срочный заказ? Можете{" "}
        <Link href={tlUrl} target="_blank">
          Написать в Telegram{" "}
        </Link>
        узнать о наличии.
      </p>
    </div>
  );
}

export default DeliveryOption;

const CustomDateInputWithButton: React.FC<CustomInputProps> = ({
  value,
  onClick,
  buttonRef,
}) => (
  <div className="delivery-option__custom-date">
    <span className="delivery-option__custom-date-text">
      {value || "Выберите дату"}
    </span>
    <button
      className="delivery-option__custom-date-btn"
      ref={buttonRef}
      onClick={onClick}
      type="button"
    >
      📅
    </button>
  </div>
);
