import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import styles from "./quizPage.module.css";
import { useUser } from "../../context/UserContext"; 
import Navigation from "../../components/navigation/Navigation";
import Loading from "../../components/loadingScreen/Loading";
import { toast } from 'react-toastify';

const QuizPage = () => {
  const [user] = useUser();
  const [questions, setQuestions] = useState([]); 

  const { questionIndex } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState(Array(15).fill(null)); // Initialize with null values
  const [startTime, setStartTime] = useState(null); 

  const getAllQuestions = async () => {
    try { 
      const response = await axios.get("https://opentdb.com/api.php?amount=15");

      const formattedQuestions = response?.data.results.map((question) => ({
        ...question,
        // Extract correct and incorrect answers and shuffle them
        choices: [question.correct_answer, ...question.incorrect_answers].sort(
          () => Math.random() - 0.5
        ),
        question: question.question.replace(/&quot;/g, '"'),
      }));
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } 
  };

  const handleQuizCompletion = () => {
    toast.success("Submitted");
    navigate("/quiz/result", {
      state: { userAnswers, questions, startTime },
    });
  };


  const handleQuizStart = () => {
    setStartTime(new Date()); 
  };

  useEffect(() => {
    getAllQuestions();
    handleQuizStart();  
  }, []);

  useEffect(() => {
    const index = parseInt(questionIndex, 10);
    if (!isNaN(index) && index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
      setVisitedQuestions((prevVisited) => {
        const newVisited = [...prevVisited];
        newVisited[index] = true;
        return newVisited;
      });
    } else {
      navigate("/quiz/question/0");
    }
  }, [questionIndex, questions, navigate]);
 
  const handleNextQuestion = () => {
    const nextIndex = Math.min(currentQuestionIndex + 1, questions.length - 1);
  
    if (currentQuestionIndex === 0) {
      handleQuizStart(); // Set startTime only at the start of the quiz
    }
  
    navigate(`/quiz/question/${nextIndex}`);
  };
  

  const handlePrevQuestion = () => {
    const prevIndex = Math.max(currentQuestionIndex - 1, 0);
    navigate(`/quiz/question/${prevIndex}`);
  };

  const onSelectQuestion = (index) => {
    navigate(`/quiz/question/${index}`);
  };

  const handleAnswer = (answer) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div><Loading/></div>;
  }

  if (!user.email) {
    navigate("/");
    return;
  }
  return (
    <div className={styles.main}>
      <h1>Quiz - {user?.email}</h1>
      <div className={styles.container}> 
        <Navigation
          questions={questions}
          visitedQuestions={visitedQuestions}
          currentQuestionIndex={currentQuestionIndex}
          onSelectQuestion={onSelectQuestion}
          userAnswers={userAnswers}
        />
        <div className={styles.questionContainer}>
          <div className={styles.questions}>
            <p className={styles.question}>{`Q ${currentQuestionIndex + 1}) ${
              currentQuestion.question
            }`}</p>
            <ul className={styles.choices}>
              {currentQuestion.choices &&
                currentQuestion.choices.map((choice, choiceIndex) => (
                  <li key={choiceIndex}>
                    <button
                      className={styles.choiceButton}
                      onClick={() => handleAnswer(choice)}
                    >
                      {choice}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.button}
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous Question
            </button>
            <button
              className={styles.button}
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next Question
            </button>
          </div>
          <button onClick={handleQuizCompletion} className={styles.submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
   
};

export default QuizPage;
