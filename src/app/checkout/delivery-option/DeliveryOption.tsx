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

function DeliveryOption() {
  const [selectedInterval, setselectedInterval] = useState("");
  const [chosenTime, setChoosenTime] = useState("");

  const handleOnChosenTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {};
  const handleOnSelectedIntervalChangeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {};

  return (
    <div className="delivery-option">
      <ul className="delivery-option__list">
        <li className="delivery-option__list-item">
          Интервал доставки (с 10:00 до 16:00) - с 990 руб
        </li>

        <li className="delivery-option__list-item delivery-interval">
          <label
            htmlFor="delivery-interval"
            className="delivery-interval__label"
          >
            Выбрать интервал доставки - с 1290 руб
          </label>
          <select
            name="delivery-interval"
            id="delivery-interval"
            className="delivery-interval__select"
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
          <label htmlFor="delivery-time" className="delivery-time__label">
            Доставка ко времени (с 9:00 до 21:00) - с 1590 руб
          </label>
          <input
            type="time"
            name="delivery-time"
            id="delivery-time"
            min="09:00"
            max="21:00"
            lang="ru"
            className="delivery-time__input"
            onChange={handleOnChosenTimeChange}
          />
        </li>
      </ul>
    </div>
  );
}

export default DeliveryOption;

// Выберите время доставки
// 1) Интервал доставки (с 10:00 до 16:00) - 990 руб
// 2) Выбрать интервал доставки () - 1290
// 3) Доставка ко времени () - 1590

// Possible delivery time с 9:00 до 21:00
