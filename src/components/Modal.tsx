import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useTodoStore from "../store/todoStore";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { theme } = useTodoStore(state => ({
    theme: state.theme,
  }));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className={`${
          theme === "dark"
            ? "bg-customBlack border-2 border-white rounded-lg shadow-lg w-full max-w-md p-4"
            : "bg-white rounded-lg shadow-lg w-full max-w-md p-4"
        }`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
