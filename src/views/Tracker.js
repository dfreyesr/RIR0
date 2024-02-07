
import React, { useState, useEffect } from "react";
import "./styles/tracker.scss";
import Menu from "../components/menu";
import Workouts from "./Workouts";
import WorkoutDetail from "./WorkoutDetail";
import WorkoutExercises from "./WorkoutExercises";
import Metrics from "./Metrics";
import { useNavigate } from "react-router-dom";

const Tracker = ({ active }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showWorkoutDetail, setShowWorkoutDetail] = useState(false);
  const [showMetricsDetail, setShowMetricsDetail] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [view, setView] = useState("workout-chooser");

  const navigate = useNavigate();

  const todayTimestamp = new Date().getTime();

  const [session, setSession] = useState({
    date: todayTimestamp,
    name: null,
    exercises: [],
    user: localStorage.getItem("email"),
  });

  const userId =  localStorage.getItem("userId");

  const [loading, setLoading] = useState(true);

  const API_BASE_URL_WORKOUTS = `${process.env.REACT_APP_API_URL}api/workouts`;

  const [workoutsData, setWorkoutsData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authenticated. Please log in.");
      navigate("/log-in");
      return;
    }
  
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(API_BASE_URL_WORKOUTS, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem('email');
          localStorage.removeItem('userId');
          alert("Your session has expired. Please log in again.");
          navigate("/log-in");
          return;
        }
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json(); // Convert response to JSON
        console.log(data); // Log the data for debugging
        
        setWorkoutsData(data); // Set the workouts data with the JSON object
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the workouts data:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false here
      }
    };
  
    fetchWorkouts();
  }, []);

  useEffect(() => {
    if (selectedExercise) {
      setSession((prevState) => {
        const exerciseExists = prevState.exercises.some(
          (exercise) => exercise.id === selectedExercise.id
        );
  
        if (!exerciseExists) {
          const newExercise = { id: selectedExercise.id, name: selectedExercise.name, metrics: [] };
          return {
            ...prevState,
            exercises: [...prevState.exercises, newExercise],
          };
        }
  
        return prevState;
      });
    }
  }, [selectedExercise]);
  
  
  

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
          prevState.exercises.some(
            (exercise) => exercise.name === selectedExercise
          );

        if (!exerciseExists) {
          const newExercise = { name: selectedExercise, metrics: [] };
          return {
            ...prevState,
            exercises: [...prevState.exercises, newExercise],
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
    if (window.confirm("Are you sure you want to quit workout? You will lose your progression!")) {
      setView("workout-chooser");
    }
  };

  const handleButtonClick = () => {
    setView("workout-start");
  };

  const handleSubmit = async () => {
    if (window.confirm("Are you sure you want to end training session?!")) {
      const transformedSession = {
        user: { userId: userId },
        workout: { workoutId: session.name.id },
        exerciseMetrics: session.exercises.map(exercise => ({
          exerciseID: exercise.name, 
          metrics: exercise.metrics.map(metric => ({
            set: parseInt(metric.set),
            weight: parseFloat(metric.weight),
            reps: parseInt(metric.reps)
          }))
        }))
      };
  
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}training-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`, // Include authorization token if needed
          },
          body: JSON.stringify(transformedSession)
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log('Training session created:', data);
        alert(JSON.stringify(transformedSession));
        window.location.reload();
      } catch (error) {
        console.error('Error creating training session:', error);
      }
    }
  };
  

  if (loading) {
    return <div>Loading...</div>; // Or use a loader component
  }

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
            exercises={workoutsData} // Assuming exercises data is handled here
            onSelectedExercise={handleExerciseSelect}
            onBackClick={handleBackClickWorkoutMetric}
            onSubmitClick={handleSubmit}
          />
        )
      ) : (
        <>
          <WorkoutExercises
            workout={selectedWorkout}
            exercises={workoutsData} // Assuming exercises data is handled here
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