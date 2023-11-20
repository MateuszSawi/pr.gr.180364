import styles from './QuestionPage.module.scss';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams  } from 'react-router-dom';
import axios from 'axios';

function QuestionPage(props) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  // const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    // axios.get("http://localhost:8000/get_info/", { 
    //     params: {
    //         category : category
    //     }
    //   })
    //   .then(response => {
    //     setQuestions(response.data.questions);  
    //     console.log(questions)
    //     setQuestionsQuantity(questions.length)
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

      setQuestions([
        {
          q: 'Przykładowe pytanie 1',
          ans1: 'Odpowiedź 1',
          ans2: 'Odpowiedź 2',
          ans3: 'Odpowiedź 3',
          correctans: 'Odpowiedź 1'
        },
        {
          q: 'Przykładowe pytanie 2',
          ans1: 'Odpowiedź 1',
          ans2: 'Odpowiedź 2',
          ans3: 'Odpowiedź 3',
          correctans: 'Odpowiedź 1'
        }
      ]);

        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsAnswered(false);

        console.log(questions.length)
  }, [category]);

  props.setQuestionsQuantity(questions.length);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === questions[currentQuestionIndex].correctans) {
      console.log('DOBRZE');
      props.setCorrectAnswersCount(count => count + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentIndex => currentIndex + 1);
        setIsAnswered(false);
        setSelectedAnswer(null);
      } else {
        // Przekierowanie do strony wyników
        navigate(`/${category}/wynik`);
      }
    }, 2000);
  };

  const currentQuestion = questions[currentQuestionIndex];

  // Sprawdź, czy pytanie istnieje
  if (!currentQuestion) return <div>Loading...</div>;

  // Teraz możesz bezpiecznie sprawdzić, czy odpowiedź jest poprawna
  const isCorrectAnswer = selectedAnswer === currentQuestion.correctans;

  

  const handleLinkClick = (category) => {
    navigate(`/${category}/wynik`);
  }

  return (
    <div className={styles.wrapper}>
      <h1>{category}</h1>
      <h2>{currentQuestion.q}</h2>
      {['ans1', 'ans2', 'ans3'].map(ans => {

      return (
        <button
          key={ans}
          onClick={() => handleAnswer(currentQuestion[ans])}
          className={
            isAnswered && selectedAnswer === currentQuestion[ans]
              ? (isCorrectAnswer ? styles.correct : styles.incorrect)
              : ''
          }
          disabled={isAnswered}
        >
          <p>{currentQuestion[ans]}</p>
        </button>
        )})}
    </div>
  );
}

export default QuestionPage;
