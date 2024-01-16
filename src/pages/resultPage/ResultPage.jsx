import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./resultPage.module.css";
import Card from "../../components/card/Card";
import { useUser } from "../../context/UserContext";
import Loading from "../../components/loadingScreen/Loading";
import QuestionReportCard from "../../components/questionReportCard/QuestionReportCard";
 
const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useUser();
  const { userAnswers = [], questions = [], startTime } = location.state || {};

  // Redirect to home if user is not authenticated
  useEffect(() => {
    if (!user.email) {
      navigate("/");
    }
  }, [user.email, navigate]);

  // Display loading screen if no answers or questions are available
  if (!userAnswers.length || !questions.length) {
    return <Loading />;
  }

  // Calculate the number of correct answers
  const correctAnswersCount = userAnswers.reduce((count, userAnswer, index) => (
    userAnswer === questions[index].correct_answer ? count + 1 : count
  ), 0);

  // Calculate the number of questions attempted
  const questionsAttempted = userAnswers.filter(answer => answer !== null).length;

  // Calculate the time taken for the quiz
  const endTime = new Date();
  const timeDiff = endTime - startTime;
  const timeTakenInSeconds = Math.floor(timeDiff / 1000);
  const minutesUsed = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const secondsUsed = Math.floor((timeDiff % (1000 * 60)) / 1000);
  const formattedTimeTaken = `${minutesUsed}:${secondsUsed < 10 ? "0" : ""}${secondsUsed}`;
  const timeTakenLevel = 100 - ((30 * 60 - timeTakenInSeconds) / (30 * 60)) * 100;
 
  return (
    <div className={styles.mainWrapper}>
      <h1 className={styles.heading}>Test Summary of {user.email}</h1>
      <div className={styles.cardsWrapper}> 
        <Card
          title="Total Marks"
          color="#1da2a1"
          total={15}
          count={correctAnswersCount}
          level={(correctAnswersCount / 15) * 100}
        /> 
        <Card
          title="Questions Attempted"
          color="#09416a"
          total={15}
          count={questionsAttempted}
          level={(questionsAttempted / 15) * 100}
        /> 
        <Card
          title="Total Correct"
          color="#e7a529"
          total={15}
          count={correctAnswersCount}
          level={(correctAnswersCount / 15) * 100}
        /> 
        <Card
          title="Total Incorrect"
          color="#FF5378"
          total={15}
          count={15 - correctAnswersCount}
          level={((15 - correctAnswersCount) / 15) * 100}
        /> 
        <Card
          title="Time Taken"
          color="#1EA5FF"
          total="30:00"
          count={formattedTimeTaken}
          level={timeTakenLevel}
        />
      </div> 
      <div className={styles.questionsWrapper}>
        <h1 className={styles.heading}>Solutions</h1>
        {questions.map((question, index) => (
          <QuestionReportCard
            key={index}
            index={index}
            question={question.question}
            correctAnswer={question.correct_answer}
            userAnswer={userAnswers[index]}
          />
        ))}
      </div> 
      <Link className={styles.link} to="/quiz/question/0">
        Give Another Quiz
      </Link>
    </div>
  );
};

export default ResultPage;
