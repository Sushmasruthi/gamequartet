// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameSelection from './components/GameSelection';
 import SnakeGame from'./components/SnakeGame/Snake';
 import Memorygame from'./components/MemoryGame/Memory';
import Puzzlegame from'./components/PuzzleGame/puzzle';
import Tictae from'./components/TictactoeGame/Tictae';
import './App.css';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameSelection />} />
         <Route path="/Snake" element={<SnakeGame />} /> 
        <Route path="/Memory" element={<Memorygame />} />
        <Route path="/puzzle" element={<Puzzlegame/>}/>
        <Route path="/tictactoe" element={<Tictae/>}/>
      </Routes>
    </Router>
  );
};

export default App;
