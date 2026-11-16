"use client";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import { Variants } from "motion";
import * as motion from "motion/react-client";
import CustomRequestModal from "./CustomRequestModal";
import { fillingsList } from "@/lib/fillingsList";
import Input from "@/components/input/Input";
import UploadIcon from "@/components/icons/UploadIcon";
import "./custom-request.scss";

type StepUnion = "step_1" | "step_2" | "step_3";
const STEPS: StepUnion[] = ["step_1", "step_2", "step_3"];

const variant: Variants = {
  active: {
    visibility: "visible",
    opacity: 1,
  },
  in_active: {
    opacity: 0,
    visibility: "hidden",
  },
};

function CustomRequest() {
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const currentStep = STEPS[stepIndex];

  const handleIsOpen = () => {
    setIsOpen((prvState) => !prvState);
  };

  const goNextStep = () => {
    if (stepIndex >= STEPS.length - 1) return;
    setStepIndex((prvState) => prvState + 1);
  };
  const goPrvStep = () => {
    if (stepIndex <= 0) return;
    setStepIndex((prvState) => prvState - 1);
  };

  const isProgressToStep2 = stepIndex > 0 && stepIndex <= 2;
  const isProgressToStep3 = stepIndex > 1 && stepIndex <= 2;

  return (
    <React.Fragment>
      <section className="custom-request">
        <h3 className="custom-request__heading">Хотите создать свой собственный торт?</h3>
        <p className="custom-request__body">
          Мы делаем торты на заказ в Москве! Если у вас есть представление о том, как должен
          выглядеть ваш идеальный торт, мы готовы сделать торт по индивидуальному дизайну!
        </p>
        <button className="custom-request__button" onClick={handleIsOpen}>
          Хочу со своим дизайном
        </button>
      </section>

      {/* Modal Section */}
      <CustomRequestModal showModal={isOpen} handleCloseModal={handleIsOpen}>
        {/* STEPPERS */}
        <div className="custom-request__stepper">
          <div
            className={["custom-request__stepper-item", isProgressToStep2 ? "progress" : ""].join(
              " ",
            )}
          >
            1
          </div>
          <div
            className={["custom-request__stepper-item", isProgressToStep3 ? "progress" : ""].join(
              " ",
            )}
          >
            2
          </div>
          <div className="custom-request__stepper-item">3</div>
        </div>

        {/* SETP 1 */}
        <motion.div
          className="custom-request__step-wrapper step-1"
          initial={currentStep === "step_1"}
          animate={currentStep === "step_1" ? "active" : "in_active"}
          variants={variant}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div className="custom-request__row">
            <h3 className="custom-request__row-label">Форма торта</h3>
            <div className="custom-request__shapes-options">
              <button className="custom-request__shape-item">
                <span className="shape circle-shape" />
                <span className="shape-label">Круг</span>
              </button>
              <button className="custom-request__shape-item">
                <span className="shape heart-shape">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </span>
                <span className="shape-label">Сердце</span>
              </button>
              <button className="custom-request__shape-item">
                <span className="shape oval-shape" />
                <span className="shape-label">Овал</span>
              </button>
            </div>
          </div>

          <div className="custom-request__row">
            <h3 className="custom-request__row-label">Начинка</h3>
            <div className="custom-request__fillings-option">
              {fillingsList.map((filling) => (
                <button key={filling.key} className="custom-request__filling-item">
                  <span className="filling-item__image-container">
                    <Image src={filling.image} alt={filling.name} fill />
                  </span>
                  <span className="filling-item__label">{filling.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* STEP 2 */}
        <motion.div
          className="custom-request__step-wrapper step-2"
          initial={false}
          animate={currentStep === "step_2" ? "active" : "in_active"}
          variants={variant}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div className="custom-request__row-wrapper">
            <div className="custom-request__row">
              <h3 className="custom-request__row-label">Количество ярусов</h3>
              <Input
                type="number"
                value=""
                onInputChange={() => {}}
                placeholder=""
                name=""
                hasError={false}
              />
            </div>

            <div className="custom-request__row">
              <h3 className="custom-request__row-label">Количество гостей</h3>
              <Input
                type="number"
                value=""
                onInputChange={() => {}}
                placeholder=""
                name=""
                hasError={false}
              />
            </div>
          </div>

          <div className="custom-request__row-wrapper">
            <div className="custom-request__row">
              <h3 className="custom-request__row-label">Надпись на торт</h3>
              <Input
                type="text"
                value=""
                onInputChange={() => {}}
                placeholder=""
                name=""
                hasError={false}
              />
            </div>

            <div className="custom-request__row">
              <h3 className="custom-request__row-label">Декор</h3>
              <Input
                type="text"
                value=""
                onInputChange={() => {}}
                placeholder=""
                name=""
                hasError={false}
              />
            </div>
          </div>

          <div className="custom-request__row-wrapper">
            <div className="custom-request__row">
              <h3 className="custom-request__row-label">Цветовая гамма</h3>
              <Input
                type="text"
                value=""
                onInputChange={() => {}}
                placeholder=""
                name=""
                hasError={false}
              />
            </div>

            <div className="custom-request__row">
              <h3 className="custom-request__row-label">Аллергены</h3>
              <Input
                type="text"
                value=""
                onInputChange={() => {}}
                placeholder=""
                name=""
                hasError={false}
              />
            </div>
          </div>

          <div className="custom-request__row">
            <h3 className="custom-request__row-label">Фото-референс</h3>
            <label htmlFor="custom-request-ref-image" className="custom-request__upload-label">
              <UploadIcon />
              Прикрепить фото-референс
            </label>
            <input
              id="custom-request-ref-image"
              type="file"
              accept="image/*"
              className="custom-request__upload-input"
              onChange={() => {}}
            />
          </div>
        </motion.div>

        {/* STEP 3 */}
        <motion.div
          className="custom-request__step-wrapper step-3"
          initial={false}
          animate={currentStep === "step_3" ? "active" : "in_active"}
          variants={variant}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div className="custom-request__row-wrapper">
            <div className="custom-request__row">
              <h3 className="custom-request__row-label">Имя</h3>
              <Input
                type="text"
                value=""
                onInputChange={() => {}}
                placeholder=""
                name=""
                hasError={false}
              />
            </div>

            <div className="custom-request__row">
              <h3 className="custom-request__row-label">Контакты </h3>
              <Input
                type="number"
                value=""
                onInputChange={() => {}}
                placeholder=""
                name=""
                hasError={false}
              />
            </div>
          </div>

          <div className="custom-request__row-wrapper">
            <div className="custom-request__row">
              <h3 className="custom-request__row-label">Адрес</h3>
              <Input
                type="text"
                value=""
                onInputChange={() => {}}
                placeholder=""
                name=""
                hasError={false}
              />
            </div>

            <div className="custom-request__row">
              <h3 className="custom-request__row-label">Дата праздника</h3>
              <Input
                type="text"
                value=""
                onInputChange={() => {}}
                placeholder=""
                name=""
                hasError={false}
              />
            </div>
          </div>

          <div className="custom-request__row">
            <h3 className="custom-request__row-label">Повод</h3>
            <Input
              type="text"
              value=""
              onInputChange={() => {}}
              placeholder=""
              name=""
              hasError={false}
            />
          </div>

          <div className="custom-request__agreement">
            <input type="checkbox" />
            <p className="custom-request__agreement-text">
              Согласена на обработку персональных данных
            </p>
          </div>
        </motion.div>

        {/* NAVIGATION BUTTONS */}

        <div className="custom-request__nav-btn-wrapper">
          <button
            className="custom-request__nav-btn prv"
            onClick={goPrvStep}
            disabled={currentStep === "step_1"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
            <span>Назад</span>
          </button>
          <button className="custom-request__nav-btn next" onClick={goNextStep}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>

            {isProgressToStep3 ? "Рассчитать стоимость" : "Дальше"}
          </button>
        </div>
      </CustomRequestModal>
    </React.Fragment>
  );
}

export default CustomRequest;

// Step 1
// • Форма => Cake Shape (Circle, Heart, Oval) ✅
// • Начинка => What filling for the cake ✅

// Step 2
// • Количество ярусов => How many stack level of the cake (1, 2, 3) ✅
// • Количество гостей => How many guest ✅

// • Цветовая гамма => What kind of color the cake should have => input ✅
// • Аллергены => List of allegeries for client => text area ✅

// • Надпись на торт => Name to be written on the Cake => input ✅
// • Декор => What decoration should be included => text area ✅

// • Фото-референс (загрузка файла) => A refrence image of the cake user want. => images ✅

// Step 3
// • Дата праздника => Event date => input date picker ✅
// • Повод => occassion => input ✅
// • Имя => Name => input ✅
// • Контакты => Phone Number => input ✅
// • Адрес => Address => input ✅
