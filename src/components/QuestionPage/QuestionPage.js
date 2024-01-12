import styles from './QuestionPage.module.scss';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams  } from 'react-router-dom';
import axios from 'axios';

function QuestionPage(props) {
  // const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  // const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const navigate = useNavigate();
  const { category } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    props.setCorrectAnswersCount(0)
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/category-questions/?category_id=${category}`);
        setIsLoading(true); // Włącz loader
        setTimeout(() => {
          const questionsWithShuffledAnswers = response.data.map(question => ({
            ...question,
            answers: shuffleArray([...question.answers])
          }));
          props.setQuestions(questionsWithShuffledAnswers);
          setCurrentQuestionIndex(0);
          setIsLoading(false); // Wyłącz loader po mieszaniu
        }, 500);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [category]);
  
  const handleAnswer = (selectedAnswerId) => {
    setSelectedAnswer(selectedAnswerId);
    const currentQuestion = props.questions[currentQuestionIndex];
    const isCorrect = currentQuestion.answers.find(answer => answer.answer_id === selectedAnswerId).is_correct;

    setIsAnswered(true);
    if (isCorrect) {
      props.setCorrectAnswersCount(count => count + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < props.questions.length - 1) {
        setCurrentQuestionIndex(currentIndex => currentIndex + 1);
        setIsAnswered(false);
        setSelectedAnswer(null);
      } else {
        navigate(`/${category}/wynik`);
      }
    }, 2000);
  };

  if (props.questions.length === 0 || currentQuestionIndex >= props.questions.length) {
    return <div>Loading...</div>;
  }

  const currentQuestion = props.questions[currentQuestionIndex];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  if (isLoading) {
    return (
    <div className={styles.wrapper}>
      <div className={styles.loader}></div>
    </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <h1>Pytanie {currentQuestionIndex + 1}</h1>
      <h2>{currentQuestion.question_text}</h2>
      {currentQuestion.answers.map(ans => (
        <button
          key={ans.answer_id}
          onClick={() => handleAnswer(ans.answer_id)}
          className={
            isAnswered && selectedAnswer === ans.answer_id
              ? (ans.is_correct ? styles.correct : styles.incorrect)
              : ''
          }
          disabled={isAnswered}
        >
          <p>{ans.answer_text}</p>
        </button>
      ))}
    </div>
  );
}


export default QuestionPage;
