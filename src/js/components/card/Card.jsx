import React from 'react';

const Card = ({ imageSrc, handleClick, title }) => {
  return(
    <div className='card' onClick={handleClick}>
      <img className='card-image' src={imageSrc} />
      <h2>{title}</h2>
    </div>
  );
};

export default Card;
