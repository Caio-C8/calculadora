import React from "react";
import "./Button.css";

const Button = ({ value, type, onClick }) => {
  return (
    <input
      className={`btn ${type}`}
      type="button"
      value={value}
      onClick={onClick}
    />
  );
};

export default Button;
