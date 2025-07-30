import React, { useState, useEffect, useRef } from "react";
import "./Calculator.css";

import Display from "../../components/Display/Display";
import Keyboard from "../../components/Keyboard/Keyboard";

import {
  addDigitToDisplay,
  deleteDigitFromDisplay,
  changeSign,
  expressionResult,
} from "../../features";

const Calculator = () => {
  const [expression, setExpression] = useState(["0"]);
  const displayValue = expression.join("");
  const [isFocused, setIsFocused] = useState(false);
  const displayRef = useRef(null);

  const handleInput = (digit) => {
    let newExpression = [...expression];

    if (digit === "AC") {
      newExpression = ["0"];
    } else if (digit === "⌫") {
      newExpression = deleteDigitFromDisplay(newExpression);
    } else if (digit === "+/-") {
      newExpression = changeSign(newExpression);
    } else if (digit === "=") {
      newExpression = expressionResult(newExpression);
    } else {
      newExpression = addDigitToDisplay(digit, newExpression);
    }

    setExpression([...newExpression]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFocused) {
        return;
      }

      const key = e.key;
      const symbols = {
        "+": "+",
        "-": "-",
        "*": "x",
        "/": "÷",
        "%": "%",
        "&": "^",
        "(": "(",
        ")": ")",
        "!": "!",
        r: "√",
        ",": ",",
      };

      if (!isNaN(key)) {
        handleInput(key);
        e.preventDefault();
      } else if (key in symbols) {
        handleInput(symbols[key]);
        e.preventDefault();
      } else if (key === "Enter") {
        handleInput("=");
        e.preventDefault();
      } else if (key === "Backspace") {
        handleInput("⌫");
        e.preventDefault();
      } else if (key === "Escape") {
        handleInput("AC");
        e.preventDefault();
      } else {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [expression, isFocused]);

  return (
    <div className="calculator">
      <Display
        value={displayValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        inputRef={displayRef}
      />
      <Keyboard handleInput={handleInput} />
    </div>
  );
};

export default Calculator;
