import styles from './Categories.module.scss';
import React from 'react';
import { Link, useNavigate, useParams  } from 'react-router-dom';

function CategoryTile() {

  const categories = [
    'Elektronika',
    'Telekomunikacja',
    'Informatyka',
    'Mechanika',
    'Fizyka',
    'Matematyka'
  ]

  const navigate = useNavigate();

  const handleLinkClick = (category) => {
    navigate(`/${category}`);
  }
    
  return (
    <div className={styles.wrapper}>
      <div className={styles.cardsBox}>
        {categories.map((category) => (
          <div className={styles.categoryCard} 
            onClick={() => handleLinkClick(category)}
          >
            <p>{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryTile;
