import { useState } from "react";
import ProductInfoBtn from "../product-info-btn/ProductInfoBtn";
import Modal from "@/components/modal/Modal";
import "./storage-info.scss";

function StorageInfo() {
  const [showModal, setShowModal] = useState(false);
  const handleSetShowModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="storage-info">
      <ProductInfoBtn
        buttonText="Хранение"
        handleOnClick={handleSetShowModal}
      />
      <Modal
        showModal={showModal}
        handleCloseModal={handleSetShowModal}
        headingText="Хранение"
      >
        <div className="storage-info__wrapper">
          <h5 className="storage-info__heading">
            Мы заботимся о каждом торте так же, как вы — о празднике{" "}
          </h5>
          <p className="storage-info__text p1">
            Каждый десерт аккуратно упакован в фирменную коробку, чтобы
            сохранить свежесть, нежность крема и красоту оформления.
          </p>
          <p className="storage-info__text p2">
            Храните торт в холодильнике при <b>+2…+6°C</b> и наслаждайтесь им в
            течение <b> 3 дней </b>п осле доставки.
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default StorageInfo;
