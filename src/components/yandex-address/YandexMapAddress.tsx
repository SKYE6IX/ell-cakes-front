"use client";
import React, { useState, useRef } from "react";
import { SearchResponse } from "ymaps3";
import "./yandex-map-address.scss";

const debounce = (fn: (arg: string) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (arg: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(arg), delay);
  };
};

type YandexMapAddressProps = {
  onAddressInputChange: ({}: { address: string }) => void;
};

function YandexMapAddress({ onAddressInputChange }: YandexMapAddressProps) {
  const [address, setAddress] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [suggesstion, setSuggestion] = useState<SearchResponse>();
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);

  const getAddressSugestion = async (query: string) => {
    await window.ymaps3.ready;

    const results = await window.ymaps3.search({
      text: query,
      limit: 5,
    });

    setSuggestion(results);
  };

  const debounceGetAddressSuggestion = debounce(getAddressSugestion, 500);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAddress(value);
    onAddressInputChange({ address: value });
    debounceGetAddressSuggestion(value);

    if (!showSuggestionBox) {
      setShowSuggestionBox(true);
    }
  };

  const handleSuggestionClick = (address: string) => {
    setAddress(address);
    onAddressInputChange({ address });
    setShowSuggestionBox(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.relatedTarget)) {
      setShowSuggestionBox(false);
    }
  };

  return (
    <div className="yandex-map-address" ref={wrapperRef}>
      <input
        type="text"
        className="yandex-map-address__input"
        placeholder="Город, улица, дом"
        value={address}
        onChange={handleOnChange}
        autoFocus
        onBlur={handleBlur}
      />

      <ul
        className={`yandex-map-address__suggestion-list ${
          suggesstion && suggesstion.length > 0 && showSuggestionBox
            ? "show"
            : " "
        }`}
      >
        {suggesstion?.map((item, i) => {
          const fullAddress = `${
            item.properties.description
              ? item.properties.description + ", " + item.properties.name
              : item.properties.name
          }`;
          return (
            <li
              tabIndex={-1}
              key={item.properties.name + i}
              className="yandex-map-address__suggestion-item"
              onClick={() => handleSuggestionClick(fullAddress)}
            >
              {fullAddress}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default YandexMapAddress;
