import styles from './Score.module.scss';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams  } from 'react-router-dom';

function Score(props) {

  // const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  const handleLinkClick = (category) => {
    props.setQuestionsQuantity(0);
    props.setCorrectAnswersCount(0);
    navigate("/");
  }

  const questions = [
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
  ];
    
  return (
    <div className={styles.wrapper}>
      <h1>Twój wynik</h1>
      <p>{props.correctAnswersCount}/{props.questionsQuantity}</p>
      <button onClick={() => handleLinkClick()}>Przejdź do kategorii</button>

        {questions.map((question, index) => (
          <div className={styles.questionCard}>
            <p>{index + 1}. {question.q}</p>
            <p>Poprawna odpowiedź: <strong>{question.correctans}</strong></p>
          </div>
        ))}
    </div>
  );
}

export default Score;
