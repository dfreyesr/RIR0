import React from "react";
import "./styles/metric_input.scss";
import IconButton from "./icon_button";
import "./styles/text.scss";

const MetricInput = ({ setMetrics, metrics, onClick }) => {
  
  const handleWeightChange = (e) => {
    setMetrics({ ...metrics, weight: e.target.value });
  };

  const handleRepsChange = (e) => {
    setMetrics({ ...metrics, reps: e.target.value });
  };

  const handleDelete = () => {
    onClick(metrics.set);
  }

  return (
    <span className="metric-input">
      <span className="metric-input-item">
        <label className="text--body bold">Set</label>
        <input
          readOnly
          className="text--body set-input-not-allowed"
          placeholder={metrics.set}
        ></input>
      </span>
      <span className="metric-input-item">
        <label className="text--body bold">Weight</label>
        <input
          className="text--body"
          onChange={handleWeightChange}
          type="number"
          placeholder="0 (Kg)"
          value={metrics.weight}
        ></input>
      </span>
      <span className="metric-input-item">
        <label className="text--body bold">Reps</label>
        <input
          className="text--body"
          onChange={handleRepsChange}
          type="number"
          placeholder="0"
          value={metrics.reps}
        ></input>
      </span>
      <IconButton onClick={handleDelete} theme="delete-white" />
    </span>
  );
};

export default MetricInput;
