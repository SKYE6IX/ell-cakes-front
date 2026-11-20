"use client";
import { useRef, useState } from "react";
import React from "react";
import Image from "next/image";
import { Variants } from "motion";
import * as motion from "motion/react-client";
import DatePicker from "react-datepicker";
import CustomRequestModal from "./CustomRequestModal";
import Input from "@/components/input/Input";
import UploadIcon from "@/components/icons/UploadIcon";
import {
  clearStateStorage,
  COLOR_PALLATE,
  CustomRequestData,
  FILLINGS_OPITON,
  getInitiState,
  onStateChange,
  STACK_LEVELS,
  StepUnion,
  validateFields,
} from "./util";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { getFutureDate } from "@/utils/getFutureDate";
import { useMutation } from "@apollo/client/react";
import { CUSTOM_REQUEST_MUTATION } from "./operation";
import Loader from "@/components/loader/Loader";

import "./custom-request.scss";
import "react-datepicker/dist/react-datepicker.css";

interface CustomReqState {
  openModal: boolean;
  stepIndex: number;
  selectedDate: Date | null;
  errorFields: string[];
  allowDataProccess: boolean;
  showAllowDataProcessError: boolean;
}

const STEPS: StepUnion[] = ["step_1", "step_2", "step_3"];

const fadeVariant: Variants = {
  active: {
    visibility: "visible",
    opacity: 1,
  },
  in_active: {
    opacity: 0,
    visibility: "hidden",
  },
};
const dropDownVariant: Variants = {
  open: {
    translateY: 0,
    visibility: "visible",
    opacity: 1,
  },
  close: {
    translateY: -30,
    opacity: 0,
    visibility: "hidden",
  },
};

// TODO: Check all field in step_3 are filled before allowing user to submit ✅
// Check mobile and write test for vital component after sharing with client
function CustomRequest() {
  const [customReqState, setCustomReqState] = useState<CustomReqState>({
    openModal: false,
    stepIndex: 0,
    selectedDate: null,
    errorFields: [],
    allowDataProccess: false,
    showAllowDataProcessError: false,
  });
  const [customReqData, setCustomReqData] = useState<CustomRequestData>(getInitiState());

  const dateButtonRef = useRef<HTMLButtonElement>(null);

  const currentStep = STEPS[customReqState.stepIndex];

  const handleOpenModal = () => {
    setCustomReqState((prvState) => ({ ...prvState, openModal: !prvState.openModal }));
  };

  // GO NEXT STEP
  const goNextStep = () => {
    if (customReqState.stepIndex >= STEPS.length - 1) return;

    const { fields, isError } = validateFields({
      step: currentStep,
      customRequest: customReqData,
    });

    setCustomReqState((prvState) => ({
      ...prvState,
      errorFields: [...prvState.errorFields, ...fields],
    }));

    if (isError) return;

    setCustomReqState((prvState) => ({
      ...prvState,
      stepIndex: prvState.stepIndex + 1,
    }));
  };

  // GO PREVIOUS STEP
  const goPrvStep = () => {
    if (customReqState.stepIndex <= 0) return;

    setCustomReqState((prvState) => ({
      ...prvState,
      stepIndex: prvState.stepIndex - 1,
    }));
  };

  const isProgressToStep2 = customReqState.stepIndex > 0 && customReqState.stepIndex <= 2;
  const isProgressToStep3 = customReqState.stepIndex > 1 && customReqState.stepIndex <= 2;

  const handleSetCustomReqState = ({
    name,
    value,
  }: {
    name: string;
    value: string | FileList | null;
  }) => {
    //Always remove the errror field from the list
    setCustomReqState((prvState) => ({
      ...prvState,
      errorFields: prvState.errorFields.filter((field) => field !== name),
    }));
    setCustomReqData((prvState) => ({
      ...prvState,
      [name]: value,
    }));

    onStateChange({ name, value });
  };

  const setShapeOption = (value: string) => {
    handleSetCustomReqState({ name: "shape", value });
  };

  const setFillingOption = ({ value, optoion_id }: { value: string; optoion_id: string }) => {
    // Always set shape to circle for all other
    // filling option that isn't "option_1"
    if (optoion_id !== "option_1") {
      setShapeOption("Круг");
    }
    handleSetCustomReqState({ name: "filling", value });
  };

  const setStackLevelOption = (value: string) => {
    handleSetCustomReqState({ name: "stackLevel", value });
  };
  const setColorPallateOption = (value: string) => {
    handleSetCustomReqState({ name: "colorPallete", value });
  };
  const setEventDateOption = (date: Date | null) => {
    setCustomReqState((prvState) => ({
      ...prvState,
      selectedDate: date,
    }));

    if (date) {
      const formatDate = date.toLocaleString("ru", { dateStyle: "full" });
      handleSetCustomReqState({ name: "eventDate", value: formatDate });
    }
  };
  const setRefPhotoOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    handleSetCustomReqState({ name: "refPhoto", value: fileList });
  };

  const [makeRequest, { loading }] = useMutation(CUSTOM_REQUEST_MUTATION, {
    variables: {
      requestForCustomCakeInput: customReqData,
    },
    context: {
      headers: {
        "apollo-require-preflight": "true",
      },
    },
    onCompleted() {
      clearStateStorage();
      setCustomReqData(getInitiState());
      setCustomReqState((prvState) => ({
        ...prvState,
        stepIndex: 0,
      }));
      alert("Message Sent! 🚀🚀");
    },
    onError() {
      alert("SOmething Went wrong! Please try again! 🚀🚀");
    },
  });

  const sendRequest = () => {
    const { fields, isError } = validateFields({
      step: currentStep,
      customRequest: customReqData,
    });
    setCustomReqState((prvState) => ({
      ...prvState,
      errorFields: [...prvState.errorFields, ...fields],
    }));

    if (isError) return;

    if (!customReqState.allowDataProccess) {
      setCustomReqState((prvState) => ({
        ...prvState,
        showAllowDataProcessError: true,
      }));
      return;
    }
    makeRequest();
  };

  return (
    <React.Fragment>
      <section className="custom-request">
        <h3 className="custom-request__heading">Хотите создать свой собственный торт?</h3>
        <p className="custom-request__body">
          Мы делаем торты на заказ в Москве! Если у вас есть представление о том, как должен
          выглядеть ваш идеальный торт, мы готовы сделать торт по индивидуальному дизайну!
        </p>
        <button className="custom-request__button" onClick={handleOpenModal}>
          Хочу со своим дизайном
        </button>
      </section>

      {/* Modal Section */}
      <CustomRequestModal showModal={customReqState.openModal} handleCloseModal={handleOpenModal}>
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
          variants={fadeVariant}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div className="custom-request__row">
            <div className="custom-request__row-label-wrapper">
              <h3 className="custom-request__row-label">Форма торта</h3>
              {customReqState.errorFields.includes("shape") && (
                <span className="custom-request__error-message">Выберите вариант</span>
              )}
            </div>

            <div className="custom-request__shapes-options">
              <button
                className={[
                  "custom-request__shape-item",
                  customReqData.shape === "Круг" ? "selected" : "",
                ].join(" ")}
                onClick={() => setShapeOption("Круг")}
              >
                <span className="shape circle-shape" />
                <span className="shape-label">Круг</span>
              </button>

              <button
                className={[
                  "custom-request__shape-item",
                  customReqData.shape === "Сердце" ? "selected" : "",
                ].join(" ")}
                onClick={() => setShapeOption("Сердце")}
              >
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
            </div>
          </div>

          <div className="custom-request__row">
            <div className="custom-request__row-label-wrapper">
              <h3 className="custom-request__row-label">Начинка</h3>
              {customReqState.errorFields.includes("filling") && (
                <span className="custom-request__error-message">Выберите вариант</span>
              )}
            </div>

            <div className="custom-request__fillings-option">
              {FILLINGS_OPITON.map((filling) => (
                <button
                  key={filling.id + filling.name}
                  className={[
                    "custom-request__filling-item",
                    customReqData.filling === filling.name ? "selected" : "",
                  ].join(" ")}
                  onClick={() => setFillingOption({ value: filling.name, optoion_id: filling.id })}
                >
                  <span className="filling-item__image-container">
                    {filling.img_src ? (
                      <Image src={filling.img_src} alt={filling.name} fill />
                    ) : (
                      <span className="filling-item__image-placeholder">{filling.name.at(0)}</span>
                    )}
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
          variants={fadeVariant}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div className="custom-request__row-wrapper">
            <div
              className={[
                "custom-request__row",
                customReqState.errorFields.includes("stackLevel") ? "error" : "",
              ].join(" ")}
            >
              <h3 className="custom-request__row-label">Количество ярусов</h3>
              <DropDown
                value={customReqData.stackLevel}
                placeholder="Выберите количество ярусов"
                lists={STACK_LEVELS}
                setOption={setStackLevelOption}
              />
            </div>

            <div className="custom-request__row">
              <h3 className="custom-request__row-label">Количество гостей</h3>
              <Input
                type="number"
                value={customReqData.guestNum}
                onInputChange={handleSetCustomReqState}
                placeholder="Введите количество гостей"
                name="guestNum"
                hasError={customReqState.errorFields.includes("guestNum")}
              />
            </div>
          </div>

          <div className="custom-request__row-wrapper">
            <div
              className={[
                "custom-request__row",
                customReqState.errorFields.includes("colorPallete") ? "error" : "",
              ].join(" ")}
            >
              <h3 className="custom-request__row-label">Цветовая гамма</h3>
              <DropDown
                value={customReqData.colorPallete}
                placeholder="Выберите цветовую гамму"
                lists={COLOR_PALLATE}
                setOption={setColorPallateOption}
              />
            </div>

            <div className="custom-request__row">
              <h3 className="custom-request__row-label">Декор</h3>
              <Input
                type="text"
                value={customReqData.decorations}
                onInputChange={handleSetCustomReqState}
                placeholder="Леденцы, фотопечать, свой вариант"
                name="decorations"
                hasError={customReqState.errorFields.includes("decorations")}
              />
            </div>
          </div>

          <div className="custom-request__row-wrapper">
            <div className="custom-request__row">
              <h3 className="custom-request__row-label">Надпись на торт</h3>
              <Input
                type="text"
                value={customReqData.textDescription}
                onInputChange={handleSetCustomReqState}
                placeholder="Например: С днём рождения, Маша!"
                name="textDescription"
                hasError={customReqState.errorFields.includes("textDescription")}
              />
            </div>

            <div className="custom-request__row">
              <h3 className="custom-request__row-label">Аллергены</h3>
              <Input
                type="text"
                value={customReqData.allergies}
                onInputChange={handleSetCustomReqState}
                placeholder="Молочные продукты, глютен, аллергий нет"
                name="allergies"
                hasError={customReqState.errorFields.includes("allergies")}
              />
            </div>
          </div>

          <div className="custom-request__row">
            <h3 className="custom-request__row-label">Фото-референс</h3>
            <label htmlFor="custom-request-ref-image" className="custom-request__upload-label">
              {customReqData.refPhoto && customReqData.refPhoto[0].name ? (
                customReqData.refPhoto[0].name
              ) : (
                <>
                  <UploadIcon />
                  Прикрепить фото-референс
                </>
              )}
            </label>
            <input
              id="custom-request-ref-image"
              type="file"
              accept="image/*"
              className="custom-request__upload-input"
              onChange={setRefPhotoOption}
              max={1}
            />
          </div>
        </motion.div>

        {/* STEP 3 */}
        <motion.div
          className="custom-request__step-wrapper step-3"
          initial={false}
          animate={currentStep === "step_3" ? "active" : "in_active"}
          variants={fadeVariant}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div className="custom-request__row-wrapper">
            <div className="custom-request__row">
              <h3 className="custom-request__row-label">Имя</h3>
              <Input
                type="text"
                value={customReqData.name}
                onInputChange={handleSetCustomReqState}
                placeholder="Введите своё имя"
                name="name"
                hasError={customReqState.errorFields.includes("name")}
              />
            </div>

            <div className="custom-request__row">
              <h3 className="custom-request__row-label">Контакты</h3>
              <Input
                type="tel"
                value={
                  customReqData.phoneNumber ? formatPhoneNumber(customReqData.phoneNumber) : ""
                }
                onInputChange={handleSetCustomReqState}
                placeholder="Введите номер телефона"
                name="phoneNumber"
                hasError={customReqState.errorFields.includes("phoneNumber")}
                maxLength={11}
              />
            </div>
          </div>

          <div className="custom-request__row-wrapper">
            <div className="custom-request__row">
              <h3 className="custom-request__row-label">Адрес</h3>
              <Input
                type="text"
                value={customReqData.address}
                onInputChange={handleSetCustomReqState}
                placeholder="Введите свой адрес"
                name="address"
                hasError={customReqState.errorFields.includes("address")}
              />
            </div>

            <div
              className={[
                "custom-request__row",
                customReqState.errorFields.includes("eventDate") ? "error" : "",
              ].join(" ")}
            >
              <h3 className="custom-request__row-label">Дата праздника</h3>
              <DatePicker
                selected={customReqState.selectedDate}
                onChange={setEventDateOption}
                customInput={<CustomDateInput buttonRef={dateButtonRef} />}
                popperTargetRef={dateButtonRef}
                minDate={getFutureDate()}
              />
            </div>
          </div>

          <div className="custom-request__row">
            <h3 className="custom-request__row-label">Повод</h3>
            <Input
              type="text"
              value={customReqData.occassion}
              onInputChange={handleSetCustomReqState}
              placeholder="Укажите повод"
              name="occassion"
              hasError={customReqState.errorFields.includes("occassion")}
            />
          </div>

          {customReqState.showAllowDataProcessError && (
            <span className="custom-request__error-message">
              Дайте согласие на обработку данных
            </span>
          )}
          <div className="custom-request__agreement">
            <input
              type="checkbox"
              checked={customReqState.allowDataProccess}
              onChange={(e) => {
                setCustomReqState((prv) => ({
                  ...prv,
                  allowDataProccess: e.target.checked,
                  showAllowDataProcessError: false,
                }));
              }}
            />
            <p className="custom-request__agreement-text">
              Даю согласие на обработку персональных данных
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

          {isProgressToStep3 ? (
            <button className="custom-request__nav-btn next" onClick={sendRequest}>
              {loading ? <Loader /> : "Рассчитать стоимость"}
            </button>
          ) : (
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
              Дальше
            </button>
          )}
        </div>
      </CustomRequestModal>
    </React.Fragment>
  );
}

export default CustomRequest;

// CUSTOM DROP DOWN
const DropDown: React.FC<{
  placeholder: string;
  value: string;
  lists: { id: string; value: string }[];
  setOption: (value: string) => void;
}> = ({ lists, value, placeholder, setOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen((prv) => !prv);
  };
  const handleSetOption = (value: string) => {
    setOption(value);
    handleIsOpen();
  };

  return (
    <React.Fragment>
      <button className="custom-request__drop-down-wrapper" onClick={handleIsOpen}>
        {value ? value : placeholder}
      </button>

      <motion.ul
        className="custom-request__drop-down"
        initial={false}
        animate={isOpen ? "open" : "close"}
        variants={dropDownVariant}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {lists.map((list) => (
          <li
            key={list.id + list.value}
            className="custom-request__drop-down-item"
            onClick={() => handleSetOption(list.value)}
          >
            {list.value}
          </li>
        ))}
      </motion.ul>
    </React.Fragment>
  );
};

// CUSTOM COMPOMENT FOR REACT DATE INPUT
const CustomDateInput: React.FC<{
  value?: string;
  onClick?: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}> = ({ value, onClick, buttonRef }) => (
  <button className="custom-request__custom-date" ref={buttonRef} onClick={onClick}>
    <span className="custom-request__custom-date-text">{value || "Выберите дату"}</span>
  </button>
);
