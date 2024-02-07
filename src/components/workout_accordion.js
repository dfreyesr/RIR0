import React, { useState } from "react";
import ExerciseChart from "../views/ExerciseChart"; // Adjust path as necessary
import Button from "../components/button"; // Adjust path as necessary
import "./styles/global.scss";

const WorkoutAccordion = ({ sessionId, workoutName, exercises }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Function to prepare chart data
  const prepareChartData = (metrics, type) => {
    const labels = metrics.map((metric, index) => `Set ${index + 1}`);
    const data = metrics.map((metric) => metric[type]);

    return {
      labels,
      datasets: [
        {
          label: type === "weight" ? "Weight" : "Reps",
          data,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    };
  };

  return (
    <div className="workout-accordion">
      <Button text={`Session: ${workoutName}`} onClick={toggleAccordion} theme="primary" className="accordion-title">
      </Button>
      {isOpen && (
        <div className="accordion-content">
          {exercises.map((exercise, index) => (
            <div key={index}>
              <h3 className="text--heading">{exercise.exerciseName}</h3>
              <div className="charts-container">
                <ExerciseChart
                  data={prepareChartData(exercise.metrics, "reps")}
                  dataType="reps"
                />
                <ExerciseChart
                  data={prepareChartData(exercise.metrics, "weight")}
                  dataType="weight"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutAccordion;
