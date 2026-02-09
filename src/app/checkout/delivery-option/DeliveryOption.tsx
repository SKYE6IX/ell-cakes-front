"use client";
import React, { Dispatch, useState, useRef } from "react";
import { ACTIONTYPE } from "../checkoutReducer";
import { Cart } from "@/types/__generated__/graphql";
import "./delivery-option.scss";
import Link from "next/link";

type DeliveryOptionType = {
  key: "self-pickup" | "regular-time" | "in-between-time" | "fixed-time";
  chosenTime?: string;
};

type DeliveryAddressProps = {
  dispatch: Dispatch<ACTIONTYPE>;
  cart: Cart;
};

const deliveryTimeInterval = [
  "с 9 до 11",
  "с 11 до 13",
  "с 13 до 15",
  "с 15 до 17",
  "с 17 до 19",
  "с 19 до 21",
];

function getFutureDate(daysToAdd: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function DeliveryOption({ cart, dispatch }: DeliveryAddressProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const [currentValue, setCurrentValue] =
    useState<DeliveryOptionType["key"]>("regular-time");

  const [selectedInterval, setSelectedInterval] = useState(
    deliveryTimeInterval[0]
  );
  const [fixedTime, setFixedTime] = useState("");
  const [delivaryDate, setDeliveryDate] = useState("");

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
    } else if (key === "fixed-time") {
      dispatch({
        type: "manage_delivery_option",
        payload: {
          zonePrice: 1590,
          option: `Доставка ко времени(${chosenTime})`,
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
    const { value } = e.target;
    setSelectedInterval(value);

    // Reuse for when user select a different value from the default
    dispatch({
      type: "manage_delivery_option",
      payload: {
        zonePrice: 1290,
        option: `Выбрать интервал доставки (${value})`,
      },
    });
  };

  const handleOnFixedTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFixedTime(value);
    // Reuse for when user select a different value from the default
    dispatch({
      type: "manage_delivery_option",
      payload: {
        zonePrice: 1590,
        option: `Доставка ко времени(${value})`,
      },
    });
  };

  const handleOnDeliveryDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setDeliveryDate(value);

    const date = new Date(value).toISOString();

    dispatch({
      type: "add_delivery_date",
      payload: date,
    });
  };

  const showDatePicker = () => {
    dateInputRef.current?.showPicker();
  };
  const showTimePicker = () => {
    timeInputRef.current?.showPicker();
  };

  // Get preparation data
  const maxPreparationDays =
    cart.cartItems?.reduce((max, item) => {
      return Math.max(max, item.product!.preparationDays!);
    }, 0) ?? 3;

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

        <li className="delivery-option__list-item delivery-time">
          <label
            htmlFor="delivery-time"
            className={[
              "delivery-time__label",
              currentValue === "fixed-time" ? "active" : "",
            ].join(" ")}
            onClick={() => handleSetDelivaryOption({ key: "fixed-time" })}
          >
            Доставка ко времени (с 9:00 до 21:00) - От 1590 руб
          </label>

          <div className="delivery-option__time-wrapper">
            <input
              ref={timeInputRef}
              type="time"
              name="delivery-time"
              id="delivery-time"
              min="09:00"
              max="21:00"
              lang="ru"
              className="delivery-time__input"
              value={fixedTime}
              onChange={handleOnFixedTimeChange}
            />
            <button
              className="delivery-option__time-picker-btn"
              onClick={showTimePicker}
            >
              <TimePicker />
            </button>
          </div>
        </li>
      </ul>

      <div className="delivery-option__date-selection-wrapper">
        <label
          htmlFor="delivery-date"
          className="delivery-option__date-selection-label"
        >
          На какое число приготовить?
        </label>
        <div className="delivery-option__delivery-date">
          <input
            ref={dateInputRef}
            type="date"
            name="delivery-date"
            id="delivery-date"
            lang="ru"
            className="delivery-option__date"
            min={getFutureDate(maxPreparationDays)}
            value={delivaryDate}
            onChange={handleOnDeliveryDateChange}
            required
          />
          <button
            className="delivery-option__date-picker-btn"
            onClick={showDatePicker}
          >
            <CalenderPicker />
          </button>
        </div>
      </div>

      <p className="delivery-option__urgent">
        Нужен срочный заказ? можете позвонить по номеру{" "}
        <Link href="tel:+79651950599">+79651950599</Link>, узнать о наличии.
      </p>
    </div>
  );
}

export default DeliveryOption;

function CalenderPicker() {
  return (
    <svg
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 69.5 76.2"
    >
      <path
        fill="#ff5c5f"
        d="M9.6 42.9H21V31.6H9.6v11.3zm3-8.3H18v5.3h-5.3v-5.3zm16.5 8.3h11.3V31.6H29.1v11.3zm3-8.3h5.3v5.3h-5.3v-5.3zM48 42.9h11.3V31.6H48v11.3zm3-8.3h5.3v5.3H51v-5.3zM9.6 62H21V50.6H9.6V62zm3-8.4H18V59h-5.3v-5.4zM29.1 62h11.3V50.6H29.1V62zm3-8.4h5.3V59h-5.3v-5.4zM48 62h11.3V50.6H48V62zm3-8.4h5.3V59H51v-5.4z"
      ></path>{" "}
      <path
        fill="#ff5c5f"
        d="M59.7 6.8V5.3c0-2.9-2.4-5.3-5.3-5.3s-5.3 2.4-5.3 5.3v1.5H40V5.3C40 2.4 37.6 0 34.7 0s-5.3 2.4-5.3 5.3v1.5h-9.1V5.3C20.3 2.4 18 0 15 0c-2.9 0-5.3 2.4-5.3 5.3v1.5H0v69.5h69.5V6.8h-9.8zm-7.6-1.5c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3v7.1c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3V5.3zm-19.7 0c0-1.3 1-2.3 2.3-2.3S37 4 37 5.3v7.1c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3V5.3zm-19.6 0C12.8 4 13.8 3 15 3c1.3 0 2.3 1 2.3 2.3v7.1c0 1.3-1 2.3-2.3 2.3-1.3 0-2.3-1-2.3-2.3V5.3zm53.7 67.9H3V9.8h6.8v2.6c0 2.9 2.4 5.3 5.3 5.3s5.3-2.4 5.3-5.3V9.8h9.1v2.6c0 2.9 2.4 5.3 5.3 5.3s5.3-2.4 5.3-5.3V9.8h9.1v2.6c0 2.9 2.4 5.3 5.3 5.3s5.3-2.4 5.3-5.3V9.8h6.8l-.1 63.4z"
      ></path>{" "}
    </svg>
  );
}

function TimePicker() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 570 589"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M528.653 140.11C520.077 140.184 511.896 136.513 506.252 130.056C486.466 107.42 463.271 87.8471 437.481 72.1382C430.151 67.6736 425.137 60.2303 423.753 51.76C422.37 43.2899 424.755 34.6379 430.283 28.0732C444.7 10.9548 466.387 0 490.605 0C534.147 0 569.444 35.2978 569.444 78.8399C569.444 98.1778 562.444 115.957 550.874 129.668C545.344 136.222 537.228 140.035 528.653 140.11ZM145.691 51.7592C144.307 60.2296 139.293 67.673 131.963 72.1376C106.172 87.8464 82.9779 107.42 63.1912 130.055C57.5471 136.512 49.3662 140.184 40.7907 140.109C32.2153 140.034 24.0996 136.22 18.569 129.666C6.99945 115.956 0 98.1771 0 78.8399C0 35.2978 35.2978 0 78.8399 0C103.057 0 124.744 10.9543 139.16 28.0723C144.689 34.6369 147.074 43.2889 145.691 51.7592ZM477.515 63.6931C488.114 71.5701 498.214 80.0803 507.76 89.1677C514.963 96.0243 521.849 103.209 528.397 110.699C535.459 102.33 539.792 91.5833 540.023 79.8307C540.029 79.5013 540.033 79.1709 540.033 78.8399C540.033 51.5415 517.903 29.4118 490.605 29.4118C487.394 29.4118 484.254 29.7179 481.214 30.3027C469.883 32.4819 459.929 38.5303 452.78 47.019C461.291 52.2031 469.544 57.769 477.515 63.6931ZM61.6837 89.1667C71.2294 80.0795 81.3296 71.5694 91.9283 63.6925C99.8994 57.7684 108.152 52.2024 116.664 47.0184C109.515 38.5297 99.5603 32.4814 88.2293 30.3024C85.1894 29.7179 82.0504 29.4118 78.8399 29.4118C51.5415 29.4118 29.4118 51.5415 29.4118 78.8399C29.4118 79.1704 29.415 79.5002 29.4215 79.8291C29.6522 91.5819 33.985 102.329 41.0472 110.698C47.5943 103.209 54.4811 96.0233 61.6837 89.1667ZM270.015 558.371V529.411C270.015 521.289 276.599 514.705 284.72 514.705C292.842 514.705 299.426 521.289 299.426 529.411V558.371C360.702 554.592 415.631 527.362 455.35 485.544L436.086 466.281C430.343 460.537 430.343 451.226 436.086 445.483C441.829 439.74 451.141 439.74 456.884 445.483L474.309 462.909C500.318 427.589 516.694 384.74 519.562 338.235H490.603C482.481 338.235 475.897 331.651 475.897 323.529C475.897 315.407 482.481 308.823 490.603 308.823H519.562C516.238 254.917 494.763 205.921 461.174 167.873L442.178 186.869C436.435 192.612 427.124 192.612 421.381 186.869C415.638 181.126 415.638 171.815 421.381 166.072L440.376 147.076C402.328 113.486 353.333 92.0113 299.426 88.687V117.647C299.426 125.768 292.842 132.352 284.72 132.352C276.599 132.352 270.015 125.768 270.015 117.647V88.6869C216.108 92.0111 167.112 113.486 129.064 147.075L148.06 166.072C153.803 171.815 153.803 181.126 148.06 186.869C142.317 192.612 133.006 192.612 127.263 186.869L108.267 167.873C74.6774 205.921 53.2024 254.916 49.8781 308.823H78.8381C86.9599 308.823 93.544 315.407 93.544 323.529C93.544 331.651 86.9599 338.235 78.8381 338.235H49.8781C52.746 384.74 69.1223 427.59 95.1315 462.909L112.557 445.483C118.3 439.74 127.611 439.74 133.354 445.483C139.097 451.226 139.097 460.537 133.354 466.281L114.09 485.544C153.809 527.362 208.739 554.592 270.015 558.371ZM122.957 533.073C109.161 522.407 96.4475 510.409 85.0089 497.272C84.3556 496.805 83.7318 496.279 83.1453 495.692C81.9582 494.505 81.0164 493.166 80.3201 491.737C79.7031 490.988 79.0901 490.235 78.4812 489.479L54.4514 537.539C49.5624 547.317 56.6726 558.822 67.6047 558.822H108.251C116.373 558.822 122.957 552.238 122.957 544.116V533.073ZM59.2209 462.233L28.1447 524.386C13.4778 553.72 34.8084 588.233 67.6047 588.233H108.251C129.794 588.233 147.73 572.793 151.597 552.374C190.705 575.174 236.187 588.235 284.72 588.235C364.425 588.235 435.902 553.008 484.431 497.273C485.084 496.806 485.709 496.279 486.295 495.692C487.483 494.505 488.425 493.165 489.121 491.735C526.781 446.024 549.405 387.462 549.426 323.617V323.529V323.441C549.379 177.288 430.884 58.8231 284.72 58.8231C138.527 58.8231 20.0143 177.336 20.0143 323.529C20.0143 374.389 34.358 421.898 59.2209 462.233ZM284.72 161.764C292.842 161.764 299.426 168.348 299.426 176.47V298.052C303.891 300.635 307.614 304.358 310.197 308.823H372.955C381.077 308.823 387.661 315.407 387.661 323.529C387.661 331.651 381.077 338.235 372.955 338.235H310.197C305.112 347.026 295.607 352.941 284.72 352.941C268.476 352.941 255.308 339.773 255.308 323.529C255.308 312.642 261.223 303.137 270.014 298.052V176.47C270.014 168.348 276.598 161.764 284.72 161.764ZM461.192 588.233C439.649 588.233 421.712 572.792 417.846 552.374C427.826 546.555 437.391 540.103 446.486 533.072V544.116C446.486 552.238 453.07 558.822 461.192 558.822H501.838C512.77 558.822 519.88 547.317 514.991 537.539L490.961 489.479C497.931 480.828 504.368 471.729 510.221 462.233L541.298 524.386C555.965 553.72 534.634 588.233 501.838 588.233H461.192Z"
        fill="#ff5c5f"
      />
    </svg>
  );
}
