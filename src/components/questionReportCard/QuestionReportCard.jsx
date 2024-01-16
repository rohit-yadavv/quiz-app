import styles from "./questionReportCard.module.css";

const QuestionReportCard = ({ index, question, correctAnswer, userAnswer }) => {
  if (userAnswer == null) {
    userAnswer = "Didn't Attempted";
  }

  const isCorrect = correctAnswer === userAnswer;
  const color = isCorrect ? "green" : "red";

  return (
    <div className={styles.wrapper}>
      <p style={{ fontWeight: "bold", color }}>{`Q${
        index + 1
      }: ${question}`}</p>
      <div className={styles.answersContainer}>
        <p className={styles.userAnswer}>{`Your Answer : ${userAnswer}`}</p> 
        <p className={styles.correctAnswer}>
          Correct Answer : &nbsp;
          <span style={{ fontWeight: "bold" }}>{ correctAnswer}</span>
        </p>
      </div>
    </div>
  );
};

export default QuestionReportCard;
