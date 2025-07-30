import React from "react";
import "./Display.css";

const Display = ({ value, onFocus, onBlur, inputRef }) => {
  return (
    <input
      className="display"
      type="text"
      value={value}
      readOnly
      ref={inputRef}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default Display;
