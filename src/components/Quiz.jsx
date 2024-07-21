import React, { useState, useEffect } from 'react';
import Quiz from 'react-quiz-component';
import '../components/Quiz.css';
import {motion} from 'framer-motion';
import { fadeIn } from './variants';

function QuizSection() {
  const [quizData, setQuizData] = useState(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    fetch('/questions.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setQuizData(data);
      })
      .catch(error => {
        console.error('Error loading questions:', error);
        setError(error.message);
      });
  }, []);

  const handleQuizFinish = (obj) => {
    console.log('Quiz finished:', obj);
    setScore(obj.correctPoints);
  };

  const startQuiz = () => {
    setShowQuiz(true);
  };

  return (
<div className="quiz-section">
    {!showQuiz ? (
      <>
        <motion.div
        variants={fadeIn("left",0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{once:false,amount:0.7}}
        
        className="cybersecurity-intro">
          <motion.h2
          variants={fadeIn("up",0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once:false,amount:0.7}}
          
          
          style={{color: "white"}}>Cybersecurity: Safeguarding Our Digital World</motion.h2>
          <p>
            Are you ready to test your knowledge on cybersecurity?
            Click the button below to start a quiz and see how much you know about protecting yourself and others in the digital realm!
          </p>
          <motion.button
          variants={fadeIn("up",0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once:false,amount:0.7}}
          
          className="start-quiz-btn" onClick={startQuiz}>Test myself</motion.button>
        </motion.div>
        <motion.div
        variants={fadeIn("left",0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once:false,amount:0.7}}

        
        
        className='parent-container'>
         
          <img className='quizimg' src="./src/assets/quizmain.png" alt="img" />
        </motion.div>
      </>
      ) : (
        <div className="quiz-container">
          <div className="light"></div>
          <div className="quiz-content">
            {error && <div className="error-message">Error loading quiz: {error}</div>}
            {!quizData && <div className="loading-message">Loading quiz...</div>}
            {quizData && (
              <>
                <h1>{quizData.quizTitle}</h1>
                <p>{quizData.quizSynopsis}</p>
                <Quiz
                  quiz={quizData}
                  shuffle={true}
                  showDefaultResult={false}
                  onComplete={handleQuizFinish}
                />
                <div className="score">Current Score: {score}</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizSection;