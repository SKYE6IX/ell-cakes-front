"use client";
import { useState } from "react";
import Link from "next/link";
import ChatIcon from "../icons/ChatIcon";
import PhoneIcon from "../icons/PhoneIcon";
import WhatAppWidgetIcon from "../icons/WhatAppWidgetIcon";
import TelegramIcon from "../icons/TelegramIcon";
import CloseIcon from "../icons/CloseIcon";
import "./chat-widget.scss";

function ChatWidget() {
  const [isOpenWidget, setIsOpenWidget] = useState(false);

  const showWidgetList = () => {
    setIsOpenWidget(!isOpenWidget);
  };

  return (
    <div className="chat-widget">
      <div className="chat-widget__content-wrapper">
        <ul
          className={[
            "chat-widget__contact-list",
            isOpenWidget ? "show-list" : "hide-list",
          ].join(" ")}
        >
          <li className="chat-widget__contact">
            <Link href="" className="chat-widget__link">
              <TelegramIcon />
            </Link>
          </li>
          <li className="chat-widget__contact">
            <Link
              target="_blank"
              href="https://wa.me/79651950599"
              className="chat-widget__link"
            >
              <WhatAppWidgetIcon />
            </Link>
          </li>
          <li className="chat-widget__contact">
            <Link href="tel:+79651950599" className="chat-widget__link">
              <PhoneIcon />
            </Link>
          </li>
        </ul>
        <button
          className={[
            "chat-widget__control",
            isOpenWidget ? "active" : "",
          ].join(" ")}
          onClick={showWidgetList}
          onMouseEnter={() => setIsOpenWidget(true)}
        >
          {isOpenWidget ? <CloseIcon /> : <ChatIcon />}
        </button>
      </div>
    </div>
  );
}

export default ChatWidget;
