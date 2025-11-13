import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";

interface ModalProps {
  show: boolean;
  headingText: string;
  children: React.ReactNode;
}

function Modal({ show, headingText, children }: ModalProps) {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return null;
  }
  return <div>Modal</div>;
}

export default Modal;
