import React, { useState, useEffect, useRef, useMemo } from "react";
import "./Modal.css";

import copyPasteImg from "../../assets/copyPaste.png";
import deleteImg from "../../assets/delete.png";
import historyImg from "../../assets/history.png";

import {
  getHistory,
  deleteHistory,
  deleteCalculation,
} from "../../services/useFastApi";

const Modal = ({
  showModal,
  handleCloseModal,
  refreshHistory,
  setRefreshHistory,
}) => {
  if (!showModal) return null;
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const cacheRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);

    if (!refreshHistory && cacheRef.current) {
      setHistory(cacheRef.current);
      setIsLoading(false);
      return;
    }

    const loadHistory = async () => {
      const response = await getHistory();
      const newData = response.data || [];

      setHistory(newData);
      cacheRef.current = newData;
      setSelected(null);
      setRefreshHistory(false);
      setIsLoading(false);
    };

    loadHistory();
  }, [refreshHistory]);

  const handleCloseModalBackground = (e) => {
    if (e.target.classList.contains("modal-background")) {
      handleCloseModal();
    }
  };

  const handleDeleteHistory = async () => {
    const confirm = window.confirm("Limpar todo o histórico?");

    if (!confirm) return;

    await deleteHistory();

    setHistory([]);
    cacheRef.current = null;
    setSelected(null);
    setIsLoading(false);
  };

  const handleDeleteCalculation = async (calcId) => {
    const confirm = window.confirm("Deletar este cálculo?");

    if (!confirm) return;

    await deleteCalculation(calcId);

    setRefreshHistory(true);
    setSelected(null);
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
          {isLoading ? (
            <div className="loading">
              <div className="custom-loader"></div>
            </div>
          ) : history.length > 0 ? (
            <>
              <div className="expressions">
                <div className="expression-list">
                  {history
                    .slice()
                    .sort(
                      (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    )
                    .map((calculation, index) => (
                      <p key={index} onClick={() => setSelected(calculation)}>
                        {calculation.expression}
                      </p>
                    ))}
                </div>

                <div style={{ paddingTop: "10px", width: "100%" }}>
                  <button
                    className="btn-clean-history"
                    onClick={handleDeleteHistory}
                  >
                    Limpar histórico
                  </button>
                </div>
              </div>

              <div className="results">
                {selected ? (
                  <>
                    <div className="btns">
                      <button className="btn-copy-paste">
                        <img
                          className="img-copy-paste"
                          src={copyPasteImg}
                          alt="Copiar Resultado"
                        />
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteCalculation(selected.id)}
                      >
                        <img
                          className="img-bin"
                          src={deleteImg}
                          alt="Apagar Histórico"
                        />
                      </button>
                    </div>

                    <div className="result">
                      <h2>{selected.expression}</h2>
                      <h1>{selected.result}</h1>
                    </div>
                  </>
                ) : (
                  <div className="no-expression">
                    <h3>Selecione uma expressão</h3>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="no-history">
              <img className="history-img" src={historyImg} alt="Histórico" />
              <h1>Sem histórico</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
