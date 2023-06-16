"use client"; 

import React, { useState, useRef, useEffect } from 'react';
// Replace this with the path to your image or URL
import successImage from '../../public/3.png'
import Confetti from 'react-confetti';

const questions = [
  { 
    question: 'How would you describe the level of enthusiasm your customers show towards your product?', 
    options: ['No visible excitement or enthusiasm', 'Some interest but no strong reactions', 'Moderate interest and occasional excitement', 'High level of interest and frequent signs of excitement', 'Extreme enthusiasm; customers express things like "Where have you been all my life?"'], 
    scores: { 'No visible excitement or enthusiasm': 1, 'Some interest but no strong reactions': 2, 'Moderate interest and occasional excitement': 3, 'High level of interest and frequent signs of excitement': 4, 'Extreme enthusiasm; customers express things like "Where have you been all my life?"': 5 }
  },
  { 
    question: 'Are your customers willing to pay for your product?', 
    options: ['No, they are not willing to pay for the product', 'They are hesitant and need convincing to pay', 'They are willing to pay, but not at the desired price point', 'They are willing to pay at the desired price point', 'They are willing to pay even before the product is launched'],
    scores: { 'No, they are not willing to pay for the product': 1, 'They are hesitant and need convincing to pay': 2, 'They are willing to pay, but not at the desired price point': 3, 'They are willing to pay at the desired price point': 4, 'They are willing to pay even before the product is launched': 5 }
  },
  { 
    question: 'How many of your customers keep using your product over time?', 
    options: ['Very few customers return', 'Some customers return, but most do not', 'About half of the customers return', 'Most customers return and use the product', 'Nearly all customers return and continue to use the product'], 
    scores: { 'Very few customers return': 1, 'Some customers return, but most do not': 2, 'About half of the customers return': 3, 'Most customers return and use the product': 4, 'Nearly all customers return and continue to use the product': 5 }
  },
  { 
    question: 'Would your users be very disappointed if your product went away?', 
    options: ['No, they would not care', 'A few might be slightly disappointed', 'Some would be somewhat disappointed', 'Most would be very disappointed', 'Nearly all would be very disappointed'], 
    scores: { 'No, they would not care': 1, 'A few might be slightly disappointed': 2, 'Some would be somewhat disappointed': 3, 'Most would be very disappointed': 4, 'Nearly all would be very disappointed': 5 }
  },
  { 
    question: 'How is your product growing?', 
    options: ['There is no growth', 'There is some growth, but it is slow', 'There is moderate growth', 'There is rapid growth', 'There is exponential growth driven by word of mouth'], 
    scores: { 'There is no growth': 1, 'There is some growth, but it is slow': 2, 'There is moderate growth': 3, 'There is rapid growth': 4, 'There is exponential growth driven by word of mouth': 5 }
  },
  { 
    question: 'Are the costs of acquiring a new customer less than the lifetime value of that customer?', 
    options: ['No, the costs are significantly higher', 'The costs are slightly higher', 'The costs are about the same', 'The costs are slightly less', 'The costs are significantly less'], 
    scores: { 'No, the costs are significantly higher': 1, 'The costs are slightly higher': 2, 'The costs are about the same': 3, 'The costs are slightly less': 4, 'The costs are significantly less': 5 }
  }
];

const IndexPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const confettiRef = useRef(null);

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, []);

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

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
  };

  const percentageScore = (score / (questions.length * 5)) * 100;

  let bgColor;
  let textMessage;
  let scoreImage;
  let confettiEffect;
  if (percentageScore < 33) {
    bgColor = 'bg-red-500';
    textMessage = "You need more practice!";
  } else if (percentageScore < 66) {
    bgColor = 'bg-yellow-500';
    textMessage = "Good job, but you can do better!";
  } else {
    bgColor = 'bg-green-500';
    textMessage = "Excellent work!";
    scoreImage = <img src={successImage} alt="success" className="w-40 h-40 mt-4" />;
    confettiEffect = <Confetti numberOfPieces={150} width={width} height={height} friction={0.97} />;
  }

 return (
    <div className={`flex flex-col items-center justify-center min-h-screen text-black ${showScore ? bgColor : 'bg-blue-50 text-blue-700'}`} ref={confettiRef}>
      {showScore ? (
        <div className='text-2xl'>
          <div>You scored {score} out of {questions.length * 5}</div>
          <div>{textMessage}</div>
          {scoreImage}
          {confettiEffect}
          <button onClick={resetGame} className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded">Reset Quiz</button>
        </div>
      ) : (
        <>
          <div className='mb-4'>
            <div className='text-lg'>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='text-xl'>{questions[currentQuestion].question}</div>
          </div>
          <div className='flex flex-col space-y-2'>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option)}
                className={`w-full px-4 py-2 border-2 border-white-700 rounded ${selectedOption === option ? 'bg-blue-200' : ''}`}
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
