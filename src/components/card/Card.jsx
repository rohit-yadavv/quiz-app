import styles from "./card.module.css";

const Card = ({title, count, level, total, color}) => { 
  return (
    <div className={styles.wrapper}>
      <p>{title}</p>
      <p style={{color:`${color}`}} className={styles.count}>{count}/{total}</p>
      <div className={styles.levelWrapper}>
        <div style={{width:`${level}%`, backgroundColor:`${color}`}} className={styles.level} 
        ></div>
      </div>
    </div>
  );
};

export default Card;
