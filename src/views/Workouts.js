import React, { useState, useEffect } from "react";
import "./styles/global.scss";
import IconButton from "../components/icon_button";
import SearchBar from "../components/search_bar";
import Card from "../components/card";
import AddWorkoutPopup from "./AddWorkout.js"; // Import the popup component
import Loader from "../components/loader";

const Workouts = ({ workouts, onWorkoutSelect }) => {
  const [showPopup, setShowPopup] = useState(false); // State for controlling the popup visibility
  const [filteredItems, setFilteredItems] = useState([]);
  const [workoutsList, setWorkoutsList] = useState([]);

  useEffect(() => {
    console.log("workouts");
    console.log(workouts);
            setWorkoutsList(workouts);
            setFilteredItems(workouts);
            


    
  }, [workouts]);

  const handleAddWorkout = () => {
    setShowPopup(true); // Show the popup when the "Add Workout" button is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup when needed
  };

  const handleCardClick = (workout) => {
    onWorkoutSelect(workout);
  };

  const handleOnSearch = (value) => {
    const filtered = workoutsList.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(value ? filtered : workoutsList);
};


  return (
    <div className="default-screen-component-container">
      <span className="action-button">
        <IconButton theme="add" onClick={handleAddWorkout} />
      </span>
      <h1 className="text--heading">Workouts</h1>
      <SearchBar onSearch={handleOnSearch} />
      {filteredItems.map((workout) => (
        <Card
          key={workout.name}
          toDisplay={workout}
          onClick={() => handleCardClick(workout)}
        />
      ))}
      {showPopup && <AddWorkoutPopup onClose={handleClosePopup} />}{" "}
    </div>
  );
};

export default Workouts;

