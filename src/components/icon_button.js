import React from "react";
import PropTypes from "prop-types";
import "./styles/icon_button.scss";

const IconButton = ({ onClick, theme }) => {

  const getIcon = (theme) => {
    switch(theme) {
      case 'add':
        return 'add';
      case 'edit':
        return 'edit';
      case 'arrow-right':
        return 'chevron_right';
      case 'arrow-right-small':
        return 'chevron_right';
        case 'delete':
          return 'delete';
      default:
        return 'add'; 
    }
  };

  return (
    <button 
      className={`iconbutton ${theme && `iconbutton--${theme}`}`}
      onClick={onClick}
    >
      <span class="material-symbols-rounded">{getIcon(theme)}</span>
    </button>
  );
};

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(["add", "edit", "arrow-right","arrow-right-small"]),
};

IconButton.defaultProps = {
  theme: "add",
};

export default IconButton;
