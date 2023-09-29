import React, { useEffect,useState } from "react";
import IconButton from "./icon_button";
import "./styles/menu.scss";

const Menu = ({ active , onClick}) => {

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const menuButton = document.querySelector(".menu-button");

    const handleScroll = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        const scrollPercentage =
          window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight);
        const opacity = Math.min(1, scrollPercentage * 10) ;
        const opacityShadow = Math.min(1, scrollPercentage * 10) * 0.4;
        menuButton.style.backgroundColor = `rgba(66, 66, 66, ${opacity})`;
        menuButton.style.boxShadow = `2px 2px 4px rgba(0, 0, 0, ${opacityShadow})`;

      } else {
        menuButton.style.backgroundColor = "transparent";
        menuButton.style.boxShadow = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHomeButton = () => {
    onClick('home');
  }

  const handleWorkoutsButton = () => {
    onClick('workouts');
  }

  const handleExerciseButton = () => {
    onClick('exercises');
  }

  const handleProfileButton = () => {
    onClick('profile');
  }

  const handleMenuState = () => {
    setIsShown(!isShown);
  }



  return (
    <>
      <span className="menu-button">
        <IconButton onClick={handleMenuState} theme="menu" />
      </span>
      <div className={`menu ${isShown ? "shown" : ""}`}>
        <span className="close-button">
          <IconButton onClick={handleMenuState} theme="close" />
        </span>
        <div className="menu-items">
          <div className={`menu-item ${"home"===active ? "active" : ""}`} onClick={handleHomeButton}>
            <span className="material-symbols-rounded">home</span>
            <span className="menu-item-name">Home</span>
          </div>
          <div className={`menu-item ${"workouts"===active ? "active" : ""}`}  onClick={handleWorkoutsButton}>
            <span className="material-symbols-rounded">fitness_center</span>
            <span className="menu-item-name">Workouts</span>
          </div>
          <div className={`menu-item ${"exercises"===active ? "active" : ""}`}  onClick={handleExerciseButton}>
            <span className="material-symbols-rounded">list</span>
            <span className="menu-item-name">Exercises</span>
          </div>
          <div className={`menu-item ${"profile"===active ? "active" : ""}`}  onClick={handleProfileButton}>
            <span className="material-symbols-rounded">account_circle</span>
            <span className="menu-item-name">Profile</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;