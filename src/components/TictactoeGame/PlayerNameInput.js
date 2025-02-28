import React, { useState } from 'react';
import './ds.css';

const PlayerNameInput = ({ mode, onSetPlayerNames }) => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'single') {
      onSetPlayerNames([player1, 'Diya']);
    } else {
      onSetPlayerNames([player1, player2]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="player-name-input">
      <div>
        <label>
          Player 1 Name:
          <input
            type="text"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            required
            placeholder="Enter Player 1 Name"
          />
        </label>
      </div>
      {mode === 'multi' && (
        <div>
          <label>
            Player 2 Name:
            <input
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              required
              placeholder="Enter Player 2 Name"
            />
          </label>
        </div>
      )}
      <button type="submit">Start Game</button>
    </form>
  );
};

export default PlayerNameInput;
