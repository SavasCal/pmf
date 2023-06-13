import { useState } from 'react';

// Define your questions, choices and scores here
const QUESTIONS = [
  {
    question: 'What is your favorite color?',
    answers: [
      { text: 'Blue', score: 1 },
      { text: 'Red', score: 2 },
      { text: 'Green', score: 3 },
    ],
  },
  {
    question: 'What is your favorite animal?',
    answers: [
      { text: 'Dog', score: 2 },
      { text: 'Cat', score: 1 },
      { text: 'Bird', score: 3 },
    ],
  },
  // Add more questions as needed
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (score) => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
    setScore(score + score);
  };

  return (
    <div className="container">
      {showScore ? (
        <div>You scored {score} out of {QUESTIONS.length * 3 /* max score per question */}</div>
      ) : (
        <div>
          <div className="question-section">
            <h1>{QUESTIONS[currentQuestion].question}</h1>
          </div>
          <div className="answer-section">
            {QUESTIONS[currentQuestion].answers.map((answer, index) => (
              <button onClick={() => handleAnswerClick(answer.score)} key={index}>
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
