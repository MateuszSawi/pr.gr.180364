import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Categories from './components/Categories/Categories';
import QuestionPage from './components/QuestionPage/QuestionPage';
import Score from './components/Score/Score';

function App() {

  const [questionsQuantity, setQuestionsQuantity] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [questions, setQuestions] = useState([]);

  return (
    <div className='container'>
      <Routes>
        <Route path="/" element={<Categories />} />
        
        <Route path="/:category" element={<QuestionPage
          setQuestionsQuantity={setQuestionsQuantity}
          setCorrectAnswersCount={setCorrectAnswersCount}

          questions={questions}
          setQuestions={setQuestions}
        />} />

        <Route path="/:category/wynik" element={<Score 
          questionsQuantity={questionsQuantity}
          correctAnswersCount={correctAnswersCount}
          setQuestionsQuantity={setQuestionsQuantity}
          setCorrectAnswersCount={setCorrectAnswersCount}

          questions={questions}
          setQuestions={setQuestions}
        />} />
      </Routes>
    </div>
  );
}

export default App;
