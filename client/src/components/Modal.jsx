import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, closeModal }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50"
      style={{ zIndex: 1000 }}
    >
      <div className="w-full max-w-sm bg-white p-2 rounded-md shadow-md">
        {React.cloneElement(children, { closeModal })}
      </div>
    </div>,
    elRef.current,
  );
};
export default Modal;
