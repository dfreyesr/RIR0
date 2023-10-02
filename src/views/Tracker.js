import React, { useState, useEffect } from "react";
import "./styles/tracker.scss";
import Menu from "../components/menu";
import Workouts from "./Workouts";
import WorkoutDetail from "./WorkoutDetail";
import WorkoutExercises from "./WorkoutExercises";
import Metrics from "./Metrics";

const Tracker = ({ active }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showWorkoutDetail, setShowWorkoutDetail] = useState(false);
  const [showMetricsDetail, setShowMetricsDetail] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [view, setView] = useState("workout-chooser");

  const todayTimestamp = new Date().getTime();

  const [session, setSession] = useState({
    date: todayTimestamp,
    name: null,
    exercises: [],
  });

  const [workoutsData, setworkoutsData] = useState(
    fetch(
      "https://raw.githubusercontent.com/isis3710-uniandes/ISIS3710_202320_S2_E07_Front/master/endpoints/workouts.json?token=GHSAT0AAAAAACHMZ4QGSVR2LYTJ2KNIOBRSZI2IG3Q",
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

  const [exercisesData, setExersicesData] = useState(
    fetch(
      "https://raw.githubusercontent.com/isis3710-uniandes/ISIS3710_202320_S2_E07_Front/master/endpoints/Exercises.json?token=GHSAT0AAAAAACHMZ4QH3VFGOZU7VP7AAYCIZI2HO4Q",
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
    if (selectedWorkout) {
      setSession((prevState) => ({ ...prevState, name: selectedWorkout }));
    }
  }, [selectedWorkout]);

  useEffect(() => {
    if (selectedExercise) {
      console.log(selectedExercise);
      setSession((prevState) => {
        const exerciseExists =
          prevState.exercises &&
          prevState.exercises.some(
            (exercise) => exercise.name === selectedExercise
          );

        if (!exerciseExists) {
          const newExercise = { name: selectedExercise, metrics: [] };

          return {
            ...prevState,
            exercises: [...(prevState.exercises || []), newExercise],
          };
        }

        return prevState;
      });
    }
  }, [selectedExercise]);

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

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
    setShowMetricsDetail(true);
  };

  const handleBackClick = () => {
    setShowWorkoutDetail(false);
  };
  const handleBackClickOnMetrics = () => {
    setShowMetricsDetail(false);
  };

  const handleBackClickWorkoutMetric = () => {
    if (
      window.confirm(
        "Are you sure you want to quit workout? You will lose your progression!"
      )
    ) {
      setView("workout-chooser");
    }
  };

  const handleButtonClick = () => {
    setView("workout-start");
  };

  const handleSubmit = () => {
    if (window.confirm("Are you sure you want to end training session?!")) {
      alert("/POST\n" + JSON.stringify(session));
      window.location.reload();
    }
  };

  return (
    <div className="default-screen-container">
      {!isMobileView || (isMobileView && !showWorkoutDetail) ? (
        <Menu active="workouts" />
      ) : null}

      {view === "workout-chooser" ? (
        isMobileView ? (
          showWorkoutDetail ? (
            <WorkoutDetail
              workout={selectedWorkout}
              onBackClick={handleBackClick}
              onButtonClick={handleButtonClick}
              exercises={exercisesData}
            />
          ) : (
            <Workouts
              workouts={workoutsData}
              onWorkoutSelect={handleWorkoutSelect}
            />
          )
        ) : (
          <>
            <Workouts
              workouts={workoutsData}
              onWorkoutSelect={handleWorkoutSelect}
            />
            {showWorkoutDetail && (
              <WorkoutDetail
                workout={selectedWorkout}
                onBackClick={handleBackClick}
                onButtonClick={handleButtonClick}
                exercises={exercisesData}
              />
            )}
          </>
        )
      ) : isMobileView ? (
        showMetricsDetail ? (
          <Metrics
            session={session}
            setSession={setSession}
            exercise={selectedExercise}
            onBackClick={handleBackClickOnMetrics}
          />
        ) : (
          <WorkoutExercises
            workout={selectedWorkout}
            exercises={exercisesData}
            onSelectedExercise={handleExerciseSelect}
            onBackClick={handleBackClickWorkoutMetric}
            onSubmitClick={handleSubmit}
          />
        )
      ) : (
        <>
          <WorkoutExercises
            workout={selectedWorkout}
            exercises={exercisesData}
            onSelectedExercise={handleExerciseSelect}
            onBackClick={handleBackClickWorkoutMetric}
            onSubmitClick={handleSubmit}
          />
          {showMetricsDetail && (
            <Metrics
              session={session}
              setSession={setSession}
              exercise={selectedExercise}
              onBackClick={handleBackClickOnMetrics}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Tracker;
