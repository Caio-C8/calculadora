import React from "react";
import "./Keyboard.css";

import Button from "../Button/Button";

const Keyboard = ({ handleInput }) => {
  const buttons = [
    ["(", ")", "^", "√", "!"],
    ["+/-", "7", "4", "1", "0"],
    ["%", "8", "5", "2", ","],
    ["⌫", "9", "6", "3", "="],
    ["AC", "÷", "x", "-", "+"],
  ];

  const getType = (value) => {
    if ("0123456789".includes(value)) return "calc";
    if ("+-x÷=,".includes(value)) return "symb";
    return "aux";
  };

  return (
    <div className="keyboard">
      <div className="buttons">
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((value) => (
              <Button
                key={value}
                value={value}
                type={getType(value)}
                onClick={() => handleInput(value)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
