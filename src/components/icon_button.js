import React from "react";
import "./styles/icon_button.scss";

const IconButton = ({ onClick, theme }) => {
  const getIcon = (theme) => {
    switch (theme) {
      case "add":
        return "add";
      case "edit":
        return "edit";
      case "arrow-left":
        return "chevron_left";
      case "arrow-right":
        return "chevron_right";
      case "arrow-right-small":
        return "chevron_right";
      case "delete":
        return "delete";
      case "delete-white":
        return "delete";
      case "menu":
        return "menu";
      case "close":
        return "close";
      default:
        return "add";
    }
  };

  return (
    <button
      className={`iconbutton ${theme && `iconbutton--${theme}`}`}
      onClick={onClick}
    >
      <span className="material-symbols-rounded">{getIcon(theme)}</span>
    </button>
  );
};


IconButton.defaultProps = {
  theme: "add",
};

export default IconButton;
