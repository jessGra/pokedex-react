import ReactDOM from "react-dom";
import "./Modal.css";
const Modal = ({ children, isOpen, closeModal }) => {
  const handleModalContainerClick = (e) => e.stopPropagation(); //detiene la propagacion del close outside para que no afecte al cuerpo del modal
  return ReactDOM.createPortal(
    <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <div className="text-end mb-2">
          <button className="modal-close" onClick={closeModal}>
            X
          </button>
        </div>

        {/* contenido prop children */}
        {children}
      </div>
    </article>,
    document.getElementById("modales-wrapper")
  );
};

export default Modal;
