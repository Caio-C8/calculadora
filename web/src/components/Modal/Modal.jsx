import React from "react";
import "./Modal.css";

import copyPasteImg from "../../assets/copyPaste.png";
import deleteImg from "../../assets/delete.png";

const Modal = ({ showModal, handleCloseModal }) => {
  if (!showModal) return null;

  const handleCloseModalBackground = (e) => {
    if (e.target.classList.contains("modal-background")) {
      handleCloseModal();
    }
  };

  return (
    <div
      className="modal-background show-background"
      onClick={handleCloseModalBackground}
    >
      <div className="modal show">
        <div className="modal-header">
          <h2>Histórico</h2>
          <button className="btn-close-modal" onClick={handleCloseModal}>
            X
          </button>
        </div>

        <div className="modal-body">
          <div className="expressions">
            <p>10+5+9+8+7+6+5+4+7+8+9+9</p>
            <p>10+5+9+8</p>
            <p>10+5+9+8+7+6+5+4+7+8+9+9</p>
            <p>10+5+9+8</p>
            <p>10+5+9+8+7+6+5+4+7+8+9+9</p>
            <p>10+5+9+8</p>
            <p>10+5+9+8+7+6+5+4+7+8+9+9</p>
            <p>10+5+9+8</p>
            <p>10+5+9+8+7+6+5+4+7+8+9+9</p>
            <p>10+5+9+8</p>
            <p>10+5+9+8+7+6+5+4+7+8+9+9</p>
            <p>10+5+9+8</p>
            <p>10+5+9+8+7+6+5+4+7+8+9+9</p>
            <p>10+5+9+8</p>
            <p>10+5+9+8+7+6+5+4+7+8+9+9</p>
            <p>10+5+9+8</p>
            <p>10+5+9+8+7+6+5+4+7+8+9+9</p>
            <p>10+5+9+8</p>
          </div>

          <div className="results">
            <div className="btns">
              <button className="btn-copy-paste">
                <img
                  className="img-copy-paste"
                  src={copyPasteImg}
                  alt="Copiar Resultado"
                />
              </button>

              <button className="btn-delete">
                <img
                  className="img-bin"
                  src={deleteImg}
                  alt="Apagar Histórico"
                />
              </button>
            </div>

            <div className="result">
              <h2>10+5+9+8</h2>
              <h1>32</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
