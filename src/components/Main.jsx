import React, { useState, useEffect } from 'react';
import { questionData } from './questions';
import './Main.css';
import { useNavigate } from 'react-router-dom';
const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const questionsPerPage = 1;
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const questionsData = questionData.questions;
  const totalQuestions = questionData.questions.length;
  const answeredQuestions = startIndex;
  const currentQuestion = startIndex + 1;
  const initialTimeInSeconds = 3600;


  const navigate = useNavigate()
  
  const [timeRemaining, setTimeRemaining] = useState(
    parseInt(localStorage.getItem('timeRemaining')) || initialTimeInSeconds
  );
  const [score, setScore] = useState(0);

  useEffect(() => {
    localStorage.setItem('timeRemaining', timeRemaining.toString());

    // Countdown timer logic
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Timer is up, route to the score page and display the score
      navigate(`/score/${score}`);
    }
  }, [timeRemaining, score, navigate]);

  useEffect(() => {
    // Clear local storage when the quiz is completed
    if (answeredQuestions >= totalQuestions) {
      localStorage.removeItem('timeRemaining');
    }
  }, [answeredQuestions, totalQuestions]);

  const padZero = (number) => {
    return number.toString().padStart(2, '0');
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours}:${padZero(minutes)}:${padZero(seconds)}`;
  };

  const handleOptionChange = (questionIndex, optionIndex) => {
    const selectedOption = questionsData[questionIndex].options[optionIndex];
    const correctAnswer = questionsData[questionIndex].answer;
  
    // Check if the selected option is correct
    const isCorrect = selectedOption === correctAnswer;
  
    // Update the score if the answer is correct
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  
    // Update the selected option for the current question
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[currentPage - 1] = optionIndex;
      return newSelectedOptions;
    });
  };
  
  const calculateProgress = () => {
    return Math.floor((answeredQuestions / totalQuestions) * 100);
  };

  const isLastQuestion = currentPage === Math.ceil(totalQuestions / questionsPerPage);

 
  
  const handleSubmit = () => {
    // Handle the form submission here
    console.log('Quiz submitted');
    navigate(`/score/${score}`); // Route to the score page with the score as a parameter
  };

  return (
    <div className="questionContainer">
      <div className="head">
        <p>
          Question {currentQuestion} of {totalQuestions}
        </p>
        <p className="time">
          Time Remaining: <br /> <span className="timer">{formatTime(timeRemaining)}</span>
        </p>
      </div>
      <div className="questions">
        {questionsData.slice(startIndex, endIndex).map((question, questionIndex) => (
          <div key={questionIndex}>
            <h3>
              {currentQuestion}. {question.question}
            </h3>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    value={option}
                    checked={selectedOptions[startIndex] === optionIndex}
                    onChange={() => handleOptionChange(startIndex + questionIndex, optionIndex)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="controls">
        <div>
          <p>Progress: {calculateProgress()}%</p>
        </div>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
        {isLastQuestion ? (
          <>
            <button onClick={handleSubmit}>Submit</button>
          </>
        ) : (
          <button
            disabled={endIndex >= questionsData.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Main;
