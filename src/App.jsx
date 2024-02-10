import triange from "./assets/images/bg-triangle.svg";
import rules from "./assets/images/image-rules.svg";
import close from "./assets/images/icon-close.svg";
import paper from "./assets/images/icon-paper.svg";
import scissors from "./assets/images/icon-scissors.svg";
import rock from "./assets/images/icon-rock.svg";
import { useState, useEffect } from "react";

export default function App() {
  const [winner, setWinner] = useState(null);
  const [housePick, setHousePick] = useState(null);
  const [gesture, setGesture] = useState(null);
  const [score, setScore] = useState(0);

  const playAgain = function () {
    if (winner === "user" || winner === "draw") {
      setGesture(null);
      setHousePick(null);
    }

    if (winner === "house") {
      setGesture(null);
      setHousePick(null);
      setScore(0);
    }
  };

  return (
    <>
      <div className="main-container">
        <Header
          winner={winner}
          housePick={housePick}
          score={score}
          setScore={setScore}
        />
        <Gestures
          winner={winner}
          setWinner={setWinner}
          housePick={housePick}
          setHousePick={setHousePick}
          gesture={gesture}
          setGesture={setGesture}
          playAgain={playAgain}
        />
      </div>
      <Rules />
    </>
  );
}

function Header({ winner, score, setScore }) {
  useEffect(() => {
    const setScored = function () {
      if (winner === "user") setScore((score) => score + 1);
    };
    setScored();
  }, [winner]);

  return (
    <div className="header">
      <h1>ROCK PAPER SCISSORS</h1>
      <div className="score">
        <span>SCORE</span>
        <h2>{score}</h2>
      </div>
    </div>
  );
}

function Gestures({
  winner,
  setWinner,
  housePick,
  setHousePick,
  gesture,
  setGesture,
  playAgain,
}) {
  const handleGestureClick = (event) => {
    const dataName = event.target.getAttribute("data-name");
    if (dataName === "paper") {
      setGesture(paper);
    } else if (dataName === "scissors") {
      setGesture(scissors);
    } else if (dataName === "rock") {
      setGesture(rock);
    }
  };

  useEffect(() => {
    const randomiseHousePick = function () {
      function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      const randomNumber = getRandomNumber(1, 3);

      if (randomNumber === 1) {
        setHousePick(paper);
      } else if (randomNumber === 2) {
        setHousePick(scissors);
      } else if (randomNumber === 3) {
        setHousePick(rock);
      }
    };

    gesture ? setTimeout(randomiseHousePick, 1000) : "";
  }, [gesture]);

  return (
    <div className="gesture-container">
      {gesture ? (
        <Decision
          gesture={gesture}
          housePick={housePick}
          setHousePick={setHousePick}
          setGesture={setGesture}
          winner={winner}
          setWinner={setWinner}
          playAgain={playAgain}
        />
      ) : (
        <Options handleGestureClick={handleGestureClick} />
      )}
    </div>
  );
}

function Options({ handleGestureClick }) {
  return (
    <>
      <div className="gesture-background">
        <img src={triange} alt="Tringle background" />
      </div>
      <div className="gesture-grid-container">
        <div className="gesture-grid">
          <div
            className="paper set-am outside"
            data-name="paper"
            onClick={handleGestureClick}
          >
            <div className="gesture set-am" data-name="paper">
              <img src={paper} alt="paper gesture" data-name="paper" />
            </div>
          </div>
          <div
            className="scissors set-am outside"
            data-name="scissors"
            onClick={handleGestureClick}
          >
            <div className="gesture set-am" data-name="scissors">
              <img src={scissors} alt="scissors gesture" data-name="scissors" />
            </div>
          </div>
          <div
            className="rock set-am outside span-2"
            data-name="rock"
            onClick={handleGestureClick}
          >
            <div className="gesture set-am" data-name="rock">
              <img src={rock} alt="rock gesture" data-name="rock" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Decision({
  gesture,
  housePick,
  winner,
  setWinner,
  setHousePick,
  setGesture,
  playAgain,
}) {
  useEffect(() => {
    const gameDecision = function () {
      let userDecision;
      let houseDecision;
      if (gesture === rock) {
        userDecision = "rock";
      } else if (gesture === paper) {
        userDecision = "paper";
      } else if (gesture === scissors) {
        userDecision = "scissors";
      }
      if (housePick === rock) {
        houseDecision = "rock";
      } else if (housePick === paper) {
        houseDecision = "paper";
      } else if (housePick === scissors) {
        houseDecision = "scissors";
      }
      const outcomes = {
        rock: { beats: "scissors" },
        paper: { beats: "rock" },
        scissors: { beats: "paper" },
      };

      // Determine winner
      if (userDecision === houseDecision) {
        return setWinner("draw");
      } else if (outcomes[userDecision].beats === houseDecision) {
        return setWinner("user");
      } else {
        return setWinner("house");
      }
    };

    gesture && gameDecision();
    // gesture && setTimeout(gameDecision, 7000);
  }, [gesture, housePick]);

  return (
    <div className="decision-grid">
      <div className="user-pick">
        <div className="flex-container">
          <h4>YOU PICKED</h4>
          <div className="responsivenes">
            <div
              className={`pick-image set-am outside outside-increase  ${
                gesture === paper
                  ? "paper"
                  : gesture === scissors
                  ? "scissors"
                  : "rock"
              } ${winner === "user" ? "winner" : ""}`}
            >
              <div className="gesture gesture-increase set-am">
                <img src={gesture} alt="user-pick" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {housePick && (
        <div className="game-decision">
          <div className="game-decision-container">
            {winner && (
              <h4>
                YOU
                {winner === "user"
                  ? " WIN"
                  : winner === "house"
                  ? " LOSE"
                  : " DRAW"}
              </h4>
            )}
            <button className="primary" onClick={playAgain}>
              PLAY AGAIN
            </button>
          </div>
        </div>
      )}

      <div className="computer-pick">
        <div className="flex-container">
          <h4>HOUSE PICK</h4>
          <div className="responsivenes">
            {housePick && (
              <div
                className={`pick-image set-am outside outside-increase ${
                  housePick === paper
                    ? "paper"
                    : housePick === scissors
                    ? "scissors"
                    : "rock"
                } ${winner === "house" ? "winner" : ""}`}
              >
                <div className="gesture gesture-increase set-am">
                  <img src={housePick} alt="house-pick" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Rules() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open ? (
        <div className="rules-box">
          <div className="rules">
            <div className="top">
              <h2>RULES</h2>
              <img onClick={() => setOpen(!open)} src={close} alt="clos-icon" />
            </div>
            <div className="rules-img">
              <img src={rules} alt="Rules-Img" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="button-box">
        <button className="rules" onClick={() => setOpen(!open)}>
          RULES
        </button>
      </div>
    </>
  );
}
