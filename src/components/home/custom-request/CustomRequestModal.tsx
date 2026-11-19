import { createPortal } from "react-dom";
import React, { useState, useEffect } from "react";
import { AnimatePresence, Variants } from "motion/react";
import * as motion from "motion/react-client";
import "./custom-request.scss";
import CloseIcon from "@/components/icons/CloseIcon";

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
  children: React.ReactNode;
};

function CustomRequestModal({ showModal, handleCloseModal, children }: ModalProps) {
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
        <motion.div className="custom-request-modal" key="modal">
          <div className="custom-request-modal__inner-wrapper">
            <motion.div
              className="custom-request-modal__close-modal"
              role="button"
              onClick={handleCloseModal}
              variants={varinats}
              initial="fadeOut"
              animate="fadeIn"
              exit="fadeOut"
            />
            <motion.div
              className="custom-request-modal__content-wrapper"
              variants={varinats}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="custom-request-modal__content">
                <button className="custom-request-modal__close-button" onClick={handleCloseModal}>
                  <CloseIcon />
                </button>
                {children}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default CustomRequestModal;
