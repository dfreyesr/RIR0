import React from 'react';
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


export default Button;
