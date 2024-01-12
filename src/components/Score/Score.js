import styles from './Score.module.scss';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams  } from 'react-router-dom';

function Score(props) {

  // const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  const handleLinkClick = () => {
    props.setQuestionsQuantity(0);
    props.setCorrectAnswersCount(0);
    navigate("/");
  }

  const questions = props.questions || [];
    
  return (
    <div className={styles.wrapper}>
      <h1>Twój wynik</h1>
      <p>{props.correctAnswersCount}/{questions.length}</p>
      <button onClick={handleLinkClick}>Przejdź do kategorii</button>

      {questions.map((question, index) => (
        <div key={index} className={styles.questionCard}>
          <p>{index + 1}. {question.question_text}</p>
          {question.answers.map(ans => (
            <>
              {ans.is_correct &&
                <p>Poprawna odpowiedź: <strong>{ans.answer_text}</strong></p>
              }
            </>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Score;
