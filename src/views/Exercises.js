import React, { useState, useEffect } from "react";
import Menu from "../components/menu";
import ExerciseDetail from "./ExerciseDetail";
import ExerciseList from "./ExerciseList";
import { useNavigate } from "react-router-dom"; 
const Exercises = () => {

  const API_BASE_URL = `${process.env.REACT_APP_API_URL}api/exercises`;
  const navigate = useNavigate();

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showExerciseDetail, setShowExerciseDetail] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [exercisesData, setExercisesData] = useState([]); // Initialize as an empty array


  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("You are not authenticated. Please log in.");
      navigate('/log-in');
      return;
    }
  
    const fetchExercises = async () => {
      try {
        const response = await fetch(API_BASE_URL, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 401) {
          // Token has expired, clear it from localStorage
          localStorage.removeItem("token");
          localStorage.removeItem('email');
          localStorage.removeItem('userId');
          alert("Your session has expired. Please log in again.");
          // You can redirect the user 
          navigate('/log-in');
          return;
        }
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        setExercisesData(data); // Update state with fetched data
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      }
    };
  
    fetchExercises();
  }, []);
  

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
    setShowExerciseDetail(true);
  };

  const handleBackClick = () => {
    setShowExerciseDetail(false);
  };

  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <div>Please log in to view this page.</div>;
  }

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
