import React, { useState, useEffect } from "react";
import "./styles/tracker.scss";
import Menu from "../components/menu";
import ExerciseDetail from "./ExerciseDetail";
import ExerciseList from "./ExerciseList";

const Exercises = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showExerciseDetail, setShowExerciseDetail] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const [exercisesData, setExercisesData] = useState(
    fetch(
      "https://raw.githubusercontent.com/isis3710-uniandes/ISIS3710_202320_S2_E07_Front/master/endpoints/Exercises.json?token=GHSAT0AAAAAACHMZ4QHF6JAIFHIUAMMDJD6ZI2LEQA",
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
        throw error;
      })
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
    setShowExerciseDetail(true);
  };

  const handleBackClick = () => {
    setShowExerciseDetail(false);
  };

  return (
    <div className="default-screen-container">
      {!isMobileView || (isMobileView && !showExerciseDetail) ? (
        <Menu active="exercises" />
      ) : null}

      {isMobileView ? (
        showExerciseDetail ? (
          <ExerciseDetail
            onBackClick={handleBackClick}
            exercise={selectedExercise}
          />
        ) : (
          <ExerciseList
            exercises={exercisesData}
            onExerciseSelect={handleExerciseSelect}
          />
        )
      ) : (
        <>
          <ExerciseList
            exercises={exercisesData}
            onExerciseSelect={handleExerciseSelect}
          />
          {showExerciseDetail && (
            <ExerciseDetail
              onBackClick={handleBackClick}
              exercise={selectedExercise}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Exercises;
