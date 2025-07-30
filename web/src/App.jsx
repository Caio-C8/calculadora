import { useState, useEffect } from "react";

import Calculator from "./pages/Calculator/Calculator";
import Modal from "./components/Modal/Modal";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#000000" : "#FFFFFF");

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <main>
        <Calculator />
        <NavBar
          handleHistory={() => setShowModal(true)}
          handleTradeTheme={() =>
            setTheme((prev) => (prev === "dark" ? "light" : "dark"))
          }
          theme={theme}
        />
      </main>

      <Modal
        showModal={showModal}
        handleCloseModal={() => setShowModal(false)}
      />
    </>
  );
}

export default App;
