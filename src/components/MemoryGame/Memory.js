import React, { useState, useEffect } from 'react';
import Welcome from './Welcome';
import Card from './Card';
import './Memory.css';
import Confetti from 'react-confetti';

const emojiList = ['😀', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🥰', '😍', '🥳'];

const App = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (difficulty) initializeGame(difficulty);
  }, [difficulty]);

  const initializeGame = (level) => {
    let pairs = [];
    if (level === 'easy') {
      pairs = emojiList.slice(0, 4); // 4 pairs -> 8 cards
    } else if (level === 'medium') {
      pairs = emojiList.slice(0, 8); // 8 pairs -> 16 cards
    } else if (level === 'hard') {
      pairs = emojiList.slice(0, 12); // 12 pairs -> 24 cards
    }

    const initialCards = [...pairs, ...pairs].sort(() => Math.random() - 0.5);
    setCards(initialCards.map((emoji, index) => ({ id: index, emoji })));
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
  };

  const handleFlip = (index) => {
    if (flippedCards.length === 2) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);
    setMoves(moves + 1);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        setMatchedPairs([...matchedPairs, cards[firstIndex].emoji]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const allMatched = matchedPairs.length === cards.length / 2;

  return (
    <div className="App">
      {difficulty === null ? (
        <Welcome setDifficulty={setDifficulty} />
      ) : (
        <>
          <h1>Memory Game</h1>
          <p>Moves: {moves}</p>
          <button className="restart-button" onClick={() => initializeGame(difficulty)}>Restart Game</button>&nbsp;
          
          <div className={`card-grid ${difficulty}`}>
            {cards.map((card, index) => (
              <Card
                key={index}
                index={index}
                card={card}
                isFlipped={flippedCards.includes(index) || matchedPairs.includes(card.emoji)}
                onFlip={handleFlip}
              />
            ))}
          </div><button className="back-button" onClick={() => setDifficulty(null)}>Back</button>
          {allMatched && (
            <>
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
