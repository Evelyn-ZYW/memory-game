import { useState, useEffect } from "react";
import SingleCard from "./comps/SingleCard";
import "./App.css";

const cardImages = [
  { src: "/img/orange.png", matched: false },
  { src: "/img/pear.png", matched: false },
  { src: "/img/grape.png", matched: false },
  { src: "/img/olive.png", matched: false },
  { src: "/img/banana.png", matched: false },
  { src: "/img/lemon.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matchQty, setMatchQty] = useState(0);

  const shuffleCards = () => {
    const randomCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(randomCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn(0);
    setMatchQty(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        console.log("match");
        resetCards();
        setMatchQty((prev) => prev + 1);
      } else {
        console.log("no match");
        setTimeout(() => {
          resetCards();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetCards = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prev) => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turn}</p>
      <p>Matched: {matchQty}</p>
      <p>Remaining: {6 - matchQty}</p>
      <p>{matchQty === 6 ? "GAME OVER!" : ""}</p>
    </div>
  );
}

export default App;
