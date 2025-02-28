import React, { useState } from 'react';
import './Mode.css';

const ModeSelection = ({ onSelectMode }) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [isMultiplayer, setIsMultiplayer] = useState(false); // New state to track if multiplayer is selected

  const handleStart = (mode) => {
    if (mode === 'single') {
      onSelectMode(mode, player1, 'Diya');
    } else {
      onSelectMode(mode, player1, player2);
    }
  };

  return (
    <div className="mode-selection">
      <h1>Select Mode</h1>
      <div className="input-group">
        
        {isMultiplayer && (  // Render Player 2 input only if multiplayer is selected
          <input 
            type="text" 
            placeholder="Player 2 Name" 
            value={player2} 
            onChange={(e) => setPlayer2(e.target.value)} 
          />
        )}
      </div>
      <div className="button-group">
        <button 
          onClick={() => {
            setIsMultiplayer(false);  // Set to single-player mode
            handleStart('single');
          }}
        >
          Single Player
        </button>
        <button 
          onClick={() => {
            setIsMultiplayer(true);  // Set to multiplayer mode
            handleStart('multi');
          }}
        >
          Multiplayer
        </button>
      </div>
    </div>
  );
};

export default ModeSelection;
