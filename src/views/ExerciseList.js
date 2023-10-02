import React, { useState, useEffect } from "react";
import "./styles/global.scss";
import IconButton from "../components/icon_button";
import SearchBar from "../components/search_bar";
import Card from "../components/card";
import AddWorkoutPopup from "./AddWorkout.js"; 
import Loader from "../components/loader";

const Exercises = ({ exercises, onExerciseSelect }) => {
  const [showPopup, setShowPopup] = useState(false); // State for controlling the popup visibility
  const [filteredItems, setFilteredItems] = useState([]);
  const [exercisesList, setExercisesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    exercises
      .then(data => {
        setExercisesList(data);
        setFilteredItems(data)
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching exercises:", error);
        setLoading(false);
      });
  }, [exercises]);

  const handleAddExercise = () => {
    setShowPopup(true); // Show the popup when the "Add exercise" button is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup when needed
  };

  const handleCardClick = (exercise) => {
    onExerciseSelect(exercise);
  };

  const handleOnSearch = (value) => {
    const filtered = exercisesList.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(value ? filtered : exercisesList);
};


  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="default-screen-component-container">
      <span className="action-button">
        <IconButton theme="add" onClick={handleAddExercise} />
      </span>
      <h1 className="text--heading">Exercises</h1>
      <SearchBar onSearch={handleOnSearch} />
      {filteredItems.map((exercise) => (
        <Card
          key={exercise.name}
          toDisplay={exercise}
          onClick={() => handleCardClick(exercise)}
        />
      ))}
      {showPopup && <AddWorkoutPopup onClose={handleClosePopup} />}{" "}
    </div>
  );
};

export default Exercises;

