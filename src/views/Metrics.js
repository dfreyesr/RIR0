import React from "react";
import "./styles/global.scss";
import Button from "../components/button";
import MetricInput from "../components/metric_input";
import IconButton from "../components/icon_button";

const Metrics = ({ session, setSession, exercise: exerciseName,onBackClick }) => {
  
  const isMobile = window.innerWidth <= 768;

  const currentExercise = session && session.exercises 
    ? session.exercises.find(e => e.name === exerciseName) 
    : null;

  if (!currentExercise) {
    return <div>Error: Exercise not found!</div>;
  }

  const addSet = () => {
    currentExercise.metrics.push({
      set: (currentExercise.metrics.length + 1).toString(),
      weight: "",
      reps: ""
    });
    setSession({ ...session });
  };

  const updateMetric = (set, updatedMetric) => {
    const metricToUpdate = currentExercise.metrics.find(m => m.set === set);
    Object.assign(metricToUpdate, updatedMetric);
    setSession({ ...session });
  };

  const deleteMetric = (setToDelete) => {
    currentExercise.metrics = currentExercise.metrics.filter(m => m.set !== setToDelete);
    currentExercise.metrics.forEach((metric, index) => {
      metric.set = (index + 1).toString();
    });
    setSession({ ...session });
  };

  return (
    <div className="default-screen-component-container flex-sized-box">
      {isMobile && ( 
        <span className="back-button">
          <IconButton theme="arrow-left" onClick={onBackClick} />
        </span>
      )}
      <span className="text--subheading">Register Metrics</span>
      <span className="text--title center">{exerciseName}</span>
      {currentExercise.metrics.map((metric, index) => (
        <MetricInput
          key={index}
          metrics={metric}
          setMetrics={(updatedMetric) => updateMetric(metric.set, updatedMetric)}
          onClick={() => deleteMetric(metric.set)}
        />
      ))}
      
      <Button text="Add set" theme="secondary" onClick={addSet} />
    </div>
  );
};

export default Metrics;
