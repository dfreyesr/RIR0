import React from "react";
import "./styles/metric_input.scss";
import IconButton from "./icon_button";
import "./styles/text.scss";

const MetricInput = ({ set, weight, setWeight, reps, setReps }) => {
  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleRepsChange = (e) => {
    setReps(e.target.value);
  };

  return (
    <span className="metric-input">
      <span className="metric-input-item">
        <label className="text--body bold">Set</label>
        <input
          readOnly
          className="text--body set-input-not-allowed"
          placeholder={set}
        ></input>
      </span>
      <span className="metric-input-item">
        <label className="text--body bold">Weight</label>
        <input
          className="text--body"
          onChange={handleWeightChange}
          type="number"
          placeholder="(Kg)"
        ></input>
      </span>
      <span className="metric-input-item">
        <label className="text--body bold">Reps</label>
        <input
          className="text--body"
          onChange={handleRepsChange}
          type="number"
          placeholder="0"
        ></input>
      </span>
      <IconButton theme="delete" />
    </span>
  );
};

export default MetricInput;
