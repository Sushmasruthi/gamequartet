// src/Board.js
import React, { useState, useEffect } from 'react';
import './Board.css';

const Board = () => {
  const [tiles, setTiles] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(15);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    const shuffledTiles = shuffleTiles(generateTiles());
    setTiles(shuffledTiles);
    setEmptyIndex(shuffledTiles.indexOf(16));
  }, []);

  useEffect(() => {
    let timer;
    if (!isSolved) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSolved]);

  const generateTiles = () => {
    return [...Array(16).keys()].map(i => i + 1);
  };

  const shuffleTiles = (tiles) => {
    let shuffled = [...tiles];
    do {
      shuffled.sort(() => Math.random() - 0.5);
    } while (!isSolvable(shuffled));
    return shuffled;
  };

  const isSolvable = (tiles) => {
    let inversions = 0;
    for (let i = 0; i < tiles.length - 1; i++) {
      for (let j = i + 1; j < tiles.length; j++) {
        if (tiles[i] !== 16 && tiles[j] !== 16 && tiles[i] > tiles[j]) {
          inversions++;
        }
      }
    }
    const row = Math.floor(tiles.indexOf(16) / 4) + 1;
    return (inversions + row) % 2 === 0;
  };

  const handleClick = (index) => {
    if (isMovable(index) && !isSolved) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setEmptyIndex(index);
      setMoves(moves + 1);
      if (checkSolved(newTiles)) {
        setIsSolved(true);
      }
    }
  };

  const isMovable = (index) => {
    const rowDiff = Math.abs(Math.floor(index / 4) - Math.floor(emptyIndex / 4));
    const colDiff = Math.abs((index % 4) - (emptyIndex % 4));
    return (rowDiff + colDiff) === 1;
  };

  const checkSolved = (tiles) => {
    for (let i = 0; i < 15; i++) {
      if (tiles[i] !== i + 1) return false;
    }
    return true;
  };

  const resetGame = () => {
    const shuffledTiles = shuffleTiles(generateTiles());
    setTiles(shuffledTiles);
    setEmptyIndex(shuffledTiles.indexOf(16));
    setMoves(0);
    setSeconds(0);
    setIsSolved(false);
  };

  return (
    <div>
      <div className="info">
        <div className="moves">Moves: {moves}</div>
        <div className="timer">Time: {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}</div>
      </div>
      {isSolved ? <h2 className="congrats-message">Congratulations! You solved the puzzle!</h2> : null}
      <div className="board">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`tile ${tile === 16 ? 'empty' : ''}`}
            onClick={() => handleClick(index)}
          >
            {tile !== 16 ? tile : ''}
          </div>
        ))}
      </div>
      {isSolved ? <button className="reset-button" onClick={resetGame}>Play Again</button> : null}
    </div>
  );
};

export default Board;
