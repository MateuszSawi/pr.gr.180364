import styles from './Score.module.scss';
import React from 'react';
import { Link, useNavigate, useParams  } from 'react-router-dom';

function Score(props) {

  const navigate = useNavigate();

  const handleLinkClick = (category) => {
    props.setQuestionsQuantity(0);
    props.setCorrectAnswersCount(0);
    navigate("/");
  }
    
  return (
    <div className={styles.wrapper}>
      <h1>Twój wynik</h1>
      <p>{props.correctAnswersCount}/{props.questionsQuantity}</p>
      <button onClick={() => handleLinkClick()}>Przejdź do kategorii</button>
    </div>
  );
}

export default Score;
