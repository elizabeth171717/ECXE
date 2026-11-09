import { useEffect } from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, children }) {

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}

export default Modal;