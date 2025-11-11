"use client";
import React from "react";
import Link from "next/link";
import "./help-block.scss";

function HelpBlock() {
  return (
    <section className="help-block">
      <div className="help-block__title">Нужна помощь?</div>
      <div className="help-block__content">
        <Link
          href="/"
          className="help-block__content-link"
          target="_target"
        >Условия доставки</Link>
        <Link
          href="/"
          className="help-block__content-link"
          target="_target"
        >Сотрудничество</Link>
        <Link
          href="/"
          className="help-block__content-link"
          target="_target"
        >Контакты</Link>
      </div>
    </section>
  );
}

export default HelpBlock;
