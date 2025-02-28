import React, { useState, useEffect, useRef } from 'react';
import './Snake.css';

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

const getRandomFood = () => {
  const min = 1;
  const maxX = (WIDTH / CELL_SIZE) - 1;
  const maxY = (HEIGHT / CELL_SIZE) - 1;
  const x = Math.floor((Math.random() * (maxX - min + 1) + min)) * CELL_SIZE;
  const y = Math.floor((Math.random() * (maxY - min + 1) + min)) * CELL_SIZE;
  return { x, y };
};

const App = () => {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [food, setFood] = useState(getRandomFood());
  const [direction, setDirection] = useState('RIGHT');
  const [speed, setSpeed] = useState(200);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const gameLoop = useRef();
  const touchStartX = useRef();
  const touchStartY = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          if (started) setPaused(!paused);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, paused, started]);

  useEffect(() => {
    if (started && !gameOver && !paused) {
      gameLoop.current = setInterval(() => {
        moveSnake();
      }, speed);
    } else {
      clearInterval(gameLoop.current);
    }

    return () => clearInterval(gameLoop.current);
  }, [snake, direction, started, gameOver, paused]);

  useEffect(() => {
    const handleTouchMove = (e) => {
      const touchMoveX = e.touches[0].clientX;
      const touchMoveY = e.touches[0].clientY;

      const deltaX = touchMoveX - touchStartX.current;
      const deltaY = touchMoveY - touchStartY.current;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0 && direction !== 'LEFT') setDirection('RIGHT');
        else if (deltaX < 0 && direction !== 'RIGHT') setDirection('LEFT');
      } else {
        if (deltaY > 0 && direction !== 'UP') setDirection('DOWN');
        else if (deltaY < 0 && direction !== 'DOWN') setDirection('UP');
      }
    };

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;

      document.addEventListener('touchmove', handleTouchMove);

      e.preventDefault();
    };

    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [direction]);

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'UP':
        head.y -= CELL_SIZE;
        break;
      case 'DOWN':
        head.y += CELL_SIZE;
        break;
      case 'LEFT':
        head.x -= CELL_SIZE;
        break;
      case 'RIGHT':
        head.x += CELL_SIZE;
        break;
      default:
        break;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setFood(getRandomFood());
      setScore(score + 1);
      if ((score + 1) % 5 === 0) {
        setSpeed(speed => Math.max(50, speed - 20)); // Ensure speed doesn't get too fast
      }
    } else {
      newSnake.pop();
    }

    if (head.x < 0 || head.x >= WIDTH || head.y < 0 || head.y >= HEIGHT || checkCollision(newSnake)) {
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('highScore', score);
      }
      clearInterval(gameLoop.current);
    }

    setSnake(newSnake);
  };

  const checkCollision = (snake) => {
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        return true;
      }
    }
    return false;
  };

  const startGame = () => {
    setSnake([{ x: 0, y: 0 }]);
    setFood(getRandomFood());
    setDirection('RIGHT');
    setSpeed(200);
    setGameOver(false);
    setScore(0);
    setStarted(true);
    setPaused(false);
  };

  return (
    <div className="game-container">
      {!started ? (
        <div className="instructions">
          <h1>Instructions</h1>
          <p>Swipe to move the snake:</p>
          <p>⬆️ Swipe up</p>
          <p>⬇️ Swipe down</p>
          <p>⬅️ Swipe left</p>
          <p>➡️ Swipe right</p>
          <button onClick={startGame}>Start the Game</button>
        </div>
      ) : (
        <>
          <div className="game-board" style={{ width: WIDTH, height: HEIGHT }}>
            {snake.map((segment, index) => (
              <div
                key={index}
                className="snake-segment"
                style={{
                  left: `${segment.x}px`,
                  top: `${segment.y}px`,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                }}
              />
            ))}
            <div
              className="food"
              style={{
                left: `${food.x}px`,
                top: `${food.y}px`,
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
            />
          </div>
          <div className="score">
            Score: {score} High Score: {highScore}
          </div>
          {gameOver && (
            <div className="game-over">
              <h1>Game Over</h1>
              <button onClick={startGame}>Restart Game</button>
            </div>
          )}
          {paused && !gameOver && (
            <div className="paused">
              <h1>Paused</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
