import React, { useEffect } from "react";

import historyImg from "../assets/history.png";
import tradeThemeImg from "../assets/tradeTheme.png";

const NavBar = ({ handleHistory, handleTradeTheme }) => {
  return (
    <div className="nav-bar">
      <ul>
        <li>
          <button className="nav-btn" onClick={handleHistory}>
            <img className="nav-item" src={historyImg} alt="Histórico" />
          </button>
        </li>

        <li>
          <button className="nav-btn" onClick={handleTradeTheme}>
            <img className="nav-item" src={tradeThemeImg} alt="Trocar tema" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
