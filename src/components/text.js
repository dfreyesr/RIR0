import React from "react";
import './styles/text.scss';
import PropTypes from 'prop-types';

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
