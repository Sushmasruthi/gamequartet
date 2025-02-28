import React from 'react';
import { Link } from 'react-router-dom';
import './GameSelection.css';

// Importing images from the local directory
import puzzleImg from './images/mem.jpeg';
import tictactoeImg from './images/OIP.jpeg';
import snakeImg from './images/snake.jpeg';
import memoryImg from './images/mat.png';

const games = [
  {
    id: 1,
    title: '15 Puzzle',
    image: puzzleImg, // Use imported image
    path: '/puzzle',
  },
  {
    id: 2,
    title: 'Tic-Tac-Toe',
    image: tictactoeImg, // Use imported image
    path: '/tictactoe',
  },
  {
    id: 3,
    title: 'Snake Game',
    image: snakeImg, // Use imported image
    path: '/snake',
  },
  {
    id: 4,
    title: 'Memory Game',
    image: memoryImg, // Use imported image
    path: '/memory',
  },
];

const GameSelection = () => {
  return (
    <div className="game-selection">
      <h1>Welcome to the Game Hub!!!</h1>
      <div className="game-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <img src={game.image} alt={game.title} />
            <h2>{game.title}</h2>
            <Link to={game.path}>
              <button>Play {game.title}</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSelection;
