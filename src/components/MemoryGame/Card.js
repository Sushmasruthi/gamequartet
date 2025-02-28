import React from 'react';
import './Card.css';

const Card = ({ index, card, isFlipped, onFlip }) => {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => onFlip(index)}>
      <div className="card-inner">
        <div className="card-front">
          ?
        </div>
        <div className="card-back">
          {card.emoji}
        </div>
      </div>
    </div>
  );
};

export default Card;
