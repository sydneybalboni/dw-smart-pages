import React, { useState } from 'react';
import "../styles/Trivia.css"; // Import the CSS for the Trivia component

const Trivia = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "What is the only Great Lake entirely in the US?",
      options: ["Lake Superior", "Lake Huron", "Lake Michigan", "Lake Erie"],
      correctAnswer: 2, // Index of the correct option
    },
    {
      question: "Which of these states touch Lake Michigan?",
      options: ["Iowa", "Minnesota", "Indiana", "Texas"],
      correctAnswer: 2,
    },
    {
      question: "The lakes are home to about how many shipwrecks?",
      options: ["150 or less", "400", "4000", "6000 or more"],
      correctAnswer: 3,
    },
  ];

  const handleAnswer = (index) => {
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResultMessage = () => {
    if (score === 3) return "Are you a genius? You got all of them right!";
    if (score === 2) return "Great job!";
    if (score === 1) return "Good job, but I know you can do better!";
    return "Better luck next time! Keep trying.";
  };
  

  return (
    <div className="trivia-section">
      <h2>Trivia!</h2>
      {!showResult ? (
        <>
      <div className="trivia-score">
        <span>Great Lakes Future</span>
        <span>Score: {score}</span> {/* Display the current score */}
      </div>      
          <div className="trivia-question">
            {questions[currentQuestion].question}
          </div>
          <div className="trivia-options">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)}>
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="trivia-result">
          <h3 className="commitment-message">Whoa, that's commitment!</h3> {/* Message above the pink box */}
          <div className="result-box">
            You've completed the trivia!
          </div>
          <p className="result-message">{getResultMessage()}</p> {/* Result message */}
          <div className="score-box">Your Score: {score} / {questions.length}</div> {/* Score in blue box */}
        </div>
      )}
    </div>
  );
};

export default Trivia;
