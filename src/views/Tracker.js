import React, { useState, useEffect } from "react";
import "./styles/tracker.scss";
import Menu from "../components/menu";
import Workouts from "./Workouts";
import WorkoutDetail from "./WorkoutDetail";

const Tracker = ({ active }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showWorkoutDetail, setShowWorkoutDetail] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768); 
  
  const [data, setData] = useState(
    fetch("https://my.api.mockaroo.com/workouts?key=f97b3370", {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
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


  return (
    <div className="default-screen-container">
      {!isMobileView || (isMobileView && !showWorkoutDetail) ? (
        <Menu active={active} />
      ) : null}

      {isMobileView ? (
        showWorkoutDetail ? (
          <WorkoutDetail
            workout={selectedWorkout}
            onBackClick={handleBackClick}
          />
        ) : (
          <Workouts
            workouts={data}
            onWorkoutSelect={handleWorkoutSelect}
          />
        )
      ) : (
        <>
          <Workouts
            workouts={data}
            onWorkoutSelect={handleWorkoutSelect}
          />
          {showWorkoutDetail && (
            <WorkoutDetail
              workout={selectedWorkout}
              onBackClick={handleBackClick}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Tracker;
