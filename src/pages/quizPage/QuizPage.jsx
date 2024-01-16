import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { toast } from 'react-toastify';
import styles from "./quizPage.module.css";
import Navigation from "../../components/navigation/Navigation";
import Loading from "../../components/loadingScreen/Loading";
 
const QuizPage = () => {
  // Retrieve user information from context
  const [user] = useUser();

  // State variables to manage quiz data
  const [questions, setQuestions] = useState([]);
  const { questionIndex } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState(Array(15).fill(null)); // Initialize with null values
  const [startTime, setStartTime] = useState(null);

  // Function to fetch quiz questions from an external API
  const getAllQuestions = async () => {
    try {
      const response = await axios.get("https://opentdb.com/api.php?amount=15");

      // Format questions and choices for better usability
      const formattedQuestions = response?.data.results.map((question) => ({
        ...question,
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

  // Function to handle quiz completion and navigate to the result page
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

  // Effect to update the current question and visited status when the URL parameter changes
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

  // Function to navigate to a specific question
  const navigateToQuestion = (index) => {
    navigate(`/quiz/question/${index}`);
  };

  // Function to handle user's answer to the current question
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

  // Redirect to home if user is not authenticated
  if (!user.email) {
    navigate("/");
    return null;
  }
 
  return (
    <div className={styles.main}>
      <h1>Quiz - {user.email}</h1>
      <div className={styles.container}>
        {/* Navigation component to display question list and user progress */}
        <Navigation
          questions={questions}
          visitedQuestions={visitedQuestions}
          currentQuestionIndex={currentQuestionIndex}
          onSelectQuestion={navigateToQuestion}
          userAnswers={userAnswers}
        />
        {/* Display the current question and answer choices */}
        <div className={styles.questionContainer}>
          <div className={styles.questions}>
            <p className={styles.question}>{`Q ${currentQuestionIndex + 1}) ${currentQuestion.question}`}</p>
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
          {/* Navigation buttons to move between questions */}
          <div className={styles.buttonsContainer}>
            <button
              className={styles.button}
              onClick={() => navigateToQuestion(currentQuestionIndex - 1)}
              disabled={currentQuestionIndex === 0}
            >
              Previous Question
            </button>
            <button
              className={styles.button}
              onClick={() => navigateToQuestion(currentQuestionIndex + 1)}
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
