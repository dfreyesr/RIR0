import React, { useState } from "react";
import "./styles/checkbox.scss";

function Checkbox({ label, isChecked, setChecked }) {
  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setChecked(newCheckedState);
  };

  return (
    <div className="checkbox-container">
      <label className="form-control">
      <input onChange={handleCheckboxChange} className="checkbox-input" type="checkbox" name="checkbox" />
      {label}
    </label>
    </div>
  );
}

export default Checkbox;
