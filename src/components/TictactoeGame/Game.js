import React, { useState, useEffect } from 'react';
import Board from './Board';
import { calculateWinner, getComputerMove } from './helpers';
import './Game.css';

const Game = ({ mode, playerNames }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    if (mode === 'single' && !xIsNext) {
      const timeoutId = setTimeout(() => {
        const computerMove = getComputerMove(squares);
        if (computerMove !== null) {
          handleClick(computerMove);
        }
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [xIsNext, mode, squares]);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(squares);
  const isDraw = squares.every(square => square !== null) && !winner;

  let status;
  if (winner) {
    status = `Winner: ${winner === 'X' ? playerNames[0] : playerNames[1]}`;
  } else if (isDraw) {
    status = 'Draw!';
  } else {
    status = `Current player: ${xIsNext ? playerNames[0] : playerNames[1]}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className={`status ${winner ? 'celebrate' : ''}`}>{status}</div>
        {(winner || isDraw) && (
          <button className="restart-button" onClick={restartGame}>Restart</button>
        )}
      </div>
      {winner && <div className="celebration">Congratulations, {winner === 'X' ? playerNames[0] : playerNames[1]}!</div>}
    </div>
  );
};

export default Game;
