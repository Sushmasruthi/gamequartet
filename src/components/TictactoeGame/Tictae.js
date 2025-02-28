import React, { useState } from 'react';
import ModeSelection from './ModeSelection';
import Game from './Game';
import PlayerNameInput from './PlayerNameInput';
import './ds.css';

const App = () => {
  const [mode, setMode] = useState(null);
  const [playerNames, setPlayerNames] = useState(null);

  const handleSelectMode = (selectedMode) => {
    setMode(selectedMode);
    setPlayerNames(null); // Reset player names when a new mode is selected
  };

  const handlePlayerNames = (names) => {
    setPlayerNames(names);
  };

  return (
    <div className="App">
      {!mode ? (
        <ModeSelection onSelectMode={handleSelectMode} />
      ) : !playerNames ? (
        <PlayerNameInput mode={mode} onSetPlayerNames={handlePlayerNames} />
      ) : (
        <Game mode={mode} playerNames={playerNames} />
      )}
    </div>
  );
};

export default App;
