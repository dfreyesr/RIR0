import React, { useState, useEffect } from "react";
import "./styles/global.scss";
import SearchBar from "../components/search_bar";
import Card from "../components/card";
import Loader from "../components/loader";

const Exercises = ({ exercises, onExerciseSelect }) => {
  const [showPopup, setShowPopup] = useState(false); // State for controlling the popup visibility
  const [filteredItems, setFilteredItems] = useState([]);
  const [exercisesList, setExercisesList] = useState(exercises); // Initialize with exercises directly
  const [loading, setLoading] = useState(false); // Set loading to false initially

  useEffect(() => {
    // No need to treat 'exercises' as a promise here
    setExercisesList(exercises);
    setFilteredItems(exercises);
    setLoading(false);
  }, [exercises]);

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup when needed
  };

  const handleCardClick = (exercise) => {
    onExerciseSelect(exercise);
  };

  const handleOnSearch = (value) => {
    const filtered = exercisesList.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(value ? filtered : exercisesList);
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="default-screen-component-container">
      <span className="action-button">{/* ... */}</span>
      <h1 className="text--heading">Exercises</h1>
      <SearchBar onSearch={handleOnSearch} />
      {filteredItems.map((exercise) => (
        <Card
          key={exercise.name}
          toDisplay={exercise}
          onClick={() => handleCardClick(exercise)}
        />
      ))}
    </div>
  );
};

export default Exercises;
