import React, { useRef } from "react";

const Modal = ({ onClose, children }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="modal dialog"
      className={`fixed inset-0 z-50 overflow-auto`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="flex items-center justify-center min-h-screen"
      >
        <div className="relative bg-white p-4 w-full max-w-md mx-auto rounded-xl">
          {children}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-1 right-2"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
