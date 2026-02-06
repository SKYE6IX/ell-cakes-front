"use client";
import React, { useState } from "react";
import "./delivery-option.scss";

const deliveryTimeInterval = [
  "с 9 до 11",
  "с 11 до 13",
  "с 13 до 15",
  "с 15 до 17",
  "с 17 до 19",
  "с 19 до 21",
];

type DeliveryOptionType = {
  key: "regular-time" | "in-between-time" | "fixed-time";
  chosenTime?: string;
};

type DeliveryAddressProps = {
  onDeliveryOptionSet: ({ key, chosenTime }: DeliveryOptionType) => void;
};

function DeliveryOption({ onDeliveryOptionSet }: DeliveryAddressProps) {
  const [currentValue, setCurrentValue] =
    useState<DeliveryOptionType["key"]>("regular-time");
  const [selectedInterval, setSelectedInterval] = useState(
    deliveryTimeInterval[0]
  );
  const [fixedTime, setFixedTime] = useState("");

  const handleSetDelivaryOption = ({ key, chosenTime }: DeliveryOptionType) => {
    setCurrentValue(key);
    onDeliveryOptionSet({ key, chosenTime });
  };

  const handleOnFixedTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFixedTime(value);
    onDeliveryOptionSet({ key: "fixed-time", chosenTime: value });
  };

  const handleOnSelectedIntervalChangeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setSelectedInterval(value);
    onDeliveryOptionSet({ key: "in-between-time", chosenTime: value });
  };

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
          <input
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
        </li>
      </ul>
    </div>
  );
}

export default DeliveryOption;
