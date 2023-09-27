import React from 'react';
import './styles/card.scss';
import IconButton from './icon_button'; 
import Text from './text';

const card = ({onClick,toDisplay}) => {
  return (
    <div className='cardwrapper'>
      <div className='image'>
      <img src={toDisplay.image} alt={toDisplay.name}/>
      <div/>
      </div>
      <div className='textwrapper' onClick={onClick}>
        <Text text={toDisplay.name} variant="body-bold"/>
        <Text text={toDisplay.description} variant="caption-light-gray"/>
        <Text text={toDisplay.subdescription} variant="caption-light-gray"/>
      </div>
      <IconButton theme="arrow-right-small" onClick={onClick}/>
    </div>
  )
}


export default card
