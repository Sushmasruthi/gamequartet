import React from 'react';
import './Welcome.css';

const Welcome = ({ setDifficulty }) => {
  return (
    <div className="Welcome">
      <h1>Welcome to the Memory Game</h1>
      <div className="difficulty-buttons">
        <button className="easy-button" onClick={() => setDifficulty('easy')}>Easy</button>
        <button className="medium-button" onClick={() => setDifficulty('medium')}>Medium</button>
        <button className="hard-button" onClick={() => setDifficulty('hard')}>Hard</button>
      </div>
    </div>
  );
};

export default Welcome;
