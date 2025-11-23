import { createPortal } from "react-dom";
import React, { useState, useEffect } from "react";
import { AnimatePresence, Variants } from "motion/react";
import * as motion from "motion/react-client";
import CloseIcon from "../icons/CloseIcon";
import "./modal.scss";

const varinats: Variants = {
  visible: {
    translateY: 0,
    opacity: 1,
    transition: {
      ease: "easeIn",
      duration: 0.2,
    },
  },
  hidden: {
    translateY: 100,
    opacity: 0,
    transition: {
      ease: "easeOut",
      duration: 0.2,
    },
  },
  fadeIn: {
    opacity: 1,
    transition: {
      ease: "easeIn",
      duration: 0.2,
    },
  },
  fadeOut: {
    opacity: 0,
    transition: {
      ease: "easeOut",
      duration: 0.2,
    },
  },
};

type ModalProps = {
  showModal: boolean;
  handleCloseModal: () => void;
  headingText: string;
  children: React.ReactNode;
};

function Modal({
  showModal,
  headingText,
  handleCloseModal,
  children,
}: ModalProps) {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  if (!isBrowser) {
    return null;
  }

  return createPortal(
    <AnimatePresence initial={false}>
      {showModal && (
        <motion.div className="modal" key="modal">
          <div className="modal__inner-wrapper">
            <motion.div
              className="modal__close-modal"
              role="button"
              onClick={handleCloseModal}
              variants={varinats}
              initial="fadeOut"
              animate="fadeIn"
              exit="fadeOut"
            />
            <motion.div
              className="modal__content-wrapper"
              variants={varinats}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="modal__content">
                <div className="modal__content-header">
                  <button
                    className="modal__close-button"
                    onClick={handleCloseModal}
                  >
                    <CloseIcon />
                  </button>
                  <h3 className="modal__heading-text">{headingText}</h3>
                </div>
                {children}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default Modal;
