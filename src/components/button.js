import React from 'react';
import PropTypes from 'prop-types';
import './styles/button.scss';

const Button = ({ text, onClick, theme }) => {
  return (
    <button 
      className={`button ${theme && `button--${theme}`}`} 
      onClick={onClick}
    >
      {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(['primary', 'secondary', 'no-background','add-image','primary-landing','secondary-landing'])
}

Button.defaultProps = {
  theme: 'primary' 
}

export default Button;
