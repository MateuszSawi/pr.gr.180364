import styles from './Categories.module.scss';
import React from 'react';
import { Link, useNavigate, useParams  } from 'react-router-dom';

function CategoryTile() {

  const categories = [
    {
      category: "Elektronika", 
      category_id: 1
    },
    {
      category: "Telekomunikacja", 
      category_id: 2
    },
    {
      category: "Informatyka", 
      category_id: 3
    },
    {
      category: "Mechanika", 
      category_id: 4
    },
    {
      category: "Fizyka", 
      category_id: 5
    },
    {
      category: "Matematyka", 
      category_id: 6
    }
  ]

  const navigate = useNavigate();

  const handleLinkClick = (category) => {
    navigate(`/${category}`);
  }
    
  return (
    <div className={styles.wrapper}>
      <div className={styles.cardsBox}>
        {categories.map((item) => (
          <div className={styles.categoryCard} 
            onClick={() => handleLinkClick(item.category_id)}
          >
            <p>{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryTile;
