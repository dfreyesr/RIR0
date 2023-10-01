import React, { useState, useEffect } from "react";
import "./styles/tracker.scss";
import Menu from "../components/menu";
import Workouts from "./Workouts";
import WorkoutDetail from "./WorkoutDetail";

const Workout = ({ active }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showWorkoutDetail, setShowWorkoutDetail] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [view, setView] = useState("workout-chooser");

  const [data, setData] = useState(
    fetch(
      "https://raw.githubusercontent.com/isis3710-uniandes/ISIS3710_202320_S2_E07_Front/master/endpoints/workouts.json?token=GHSAT0AAAAAACHMZ4QHUOI2Z5HN6YAN4RSMZIZ5D7A",
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

  const handleWorkoutSelect = (workout) => {
    setSelectedWorkout(workout);
    setShowWorkoutDetail(true);
  };

  const handleBackClick = () => {
    setShowWorkoutDetail(false);
  };

  const handleButtonClick = (workout) => {
    console.log(workout);
    setView("workout-start");
  };

  return (
    <div className="default-screen-container">
      {!isMobileView || (isMobileView && !showWorkoutDetail) ? (
        <Menu active={active} />
      ) : null}

      {view === "workout-chooser" ? (
        isMobileView ? (
          showWorkoutDetail ? (
            <WorkoutDetail
              workout={selectedWorkout}
              onBackClick={handleBackClick}
              onButtonClick={handleButtonClick}
            />
          ) : (
            <Workouts workouts={data} onWorkoutSelect={handleWorkoutSelect} />
          )
        ) : (
          <>
            <Workouts workouts={data} onWorkoutSelect={handleWorkoutSelect} />
            {showWorkoutDetail && (
              <WorkoutDetail
                workout={selectedWorkout}
                onBackClick={handleBackClick}
                onButtonClick={handleButtonClick}
              />
            )}
          </>
        )
      ) : (
        <div>Add metrics</div>
      )}
    </div>
  );
};

export default Workout;