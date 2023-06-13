"use client"; 

import { useState } from 'react';

const questions = [
  { 
    question: 'What is the capital of France?', 
    options: ['Paris', 'London', 'Berlin', 'Madrid'], 
    answer: 'Paris', 
    scores: { 'Paris': 3, 'London': 1, 'Berlin': 1, 'Madrid': 0 }
  },
  { 
    question: 'What is 2 + 2?', 
    options: ['2', '3', '4', '5'], 
    answer: '4',
    scores: { '2': 0, '3': 1, '4': 3, '5': 0 }
  },
  { 
    question: 'What is the color of the sky?', 
    options: ['Red', 'Blue', 'Green', 'Yellow'], 
    answer: 'Blue',
    scores: { 'Red': 0, 'Blue': 3, 'Green': 1, 'Yellow': 0 }
  },
];

const IndexPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswerOptionClick = (option) => {
    setSelectedOption(option);
    const newScore = score + questions[currentQuestion].scores[option];
    setScore(newScore);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);  // Clear selection for the next question
    } else {
      setShowScore(true);
    }
  };

  const percentageScore = (score / (questions.length * 3)) * 100;

  let bgColor;
  if (percentageScore < 33) {
    bgColor = 'bg-red-500';
  } else if (percentageScore < 66) {
    bgColor = 'bg-yellow-500';
  } else {
    bgColor = 'bg-green-500';
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen text-white ${showScore ? bgColor : 'bg-blue-50 text-blue-700'}`}>
      {showScore ? (
        <div className='text-2xl'>
          You scored {score} out of {questions.length * 3}
        </div>
      ) : (
        <>
          <div className='mb-4'>
            <div className='text-lg'>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='text-xl'>{questions[currentQuestion].question}</div>
          </div>
          <div className='space-y-2'>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option)}
                className={`px-4 py-2 border-2 border-blue-700 rounded ${selectedOption === option ? 'bg-blue-200' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default IndexPage;