import React from "react";
import './styles/text.scss';

const Text = ({ text,variant }) => {
  return (
    <div className={`${variant && `text--${variant}`}`}>
      {text}
    </div>
  );
};
  
  
  Text.defaultProps = {
    variant: 'body'
  };

export default Text;
