/* eslint-disable react/no-unknown-property */
import { Link } from "react-router-dom";
import styles from "./navigation.module.css";

const Navigation = ({
  questions,
  visitedQuestions,
  currentQuestionIndex,
  onSelectQuestion,
  userAnswers,
}) => {
  const answeredCount = userAnswers.filter((answer) => answer !== null).length; 
  const notVisitedCount = questions.length - visitedQuestions.filter((visited) => visited).length;
  const visitedCount = visitedQuestions.filter((visited) => visited).length;

  return (
    <div className={styles.NavigationContainer}>
      <h2>Choose a Question</h2>
      <ul className={styles.questionNavigation}>
        {questions.map((question, index) => (
          <li key={index}>
            <Link
              to={`/quiz/question/${index}`}
              className={`question-link ${
                visitedQuestions[index] ? "visited" : ""
              } ${currentQuestionIndex === index ? "current" : ""} ${
                userAnswers[index] !== null ? "answered" : ""
              }`}
              onClick={() => onSelectQuestion(index)}
            >
              {`${index + 1}`}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.line}>
        <svg
          _ngcontent-yro-c18=""
          aria-hidden="true"
          width="100%"
          height="8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern
            _ngcontent-yro-c18=""
            id="a"
            width="91"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <g _ngcontent-yro-c18="" clipPath="url(#clip0_2426_11367)">
              <path
                _ngcontent-yro-c18=""
                d="M114 4c-5.067 4.667-10.133 4.667-15.2 0S88.667-.667 83.6 4 73.467 8.667 68.4 4 58.267-.667 53.2 4 43.067 8.667 38 4 27.867-.667 22.8 4 12.667 8.667 7.6 4-2.533-.667-7.6 4s-10.133 4.667-15.2 0S-32.933-.667-38 4s-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0"
                stroke="#E1E3E1"
                strokeLinecap="square"
              ></path>
            </g>
          </pattern>
          <rect
            _ngcontent-yro-c18=""
            width="100%"
            height="100%"
            fill="url(#a)"
          ></rect>
        </svg>
      </div>

      <div className={styles.stats}>
        <p>Answered: <span style={{backgroundColor:'#09416a'}}>{answeredCount}</span> </p> 
        <p>Visited: <span style={{backgroundColor:'#1da2a1'}}>{visitedCount}</span></p>
        <p>Not Visited: <span style={{backgroundColor:'#e7a529'}}>{notVisitedCount}</span></p>
      </div>
      <div className={styles.line}>
        <svg
          _ngcontent-yro-c18=""
          aria-hidden="true"
          width="100%"
          height="8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern
            _ngcontent-yro-c18=""
            id="a"
            width="91"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <g _ngcontent-yro-c18="" clipPath="url(#clip0_2426_11367)">
              <path
                _ngcontent-yro-c18=""
                d="M114 4c-5.067 4.667-10.133 4.667-15.2 0S88.667-.667 83.6 4 73.467 8.667 68.4 4 58.267-.667 53.2 4 43.067 8.667 38 4 27.867-.667 22.8 4 12.667 8.667 7.6 4-2.533-.667-7.6 4s-10.133 4.667-15.2 0S-32.933-.667-38 4s-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0"
                stroke="#E1E3E1"
                strokeLinecap="square"
              ></path>
            </g>
          </pattern>
          <rect
            _ngcontent-yro-c18=""
            width="100%"
            height="100%"
            fill="url(#a)"
          ></rect>
        </svg>
      </div>
    </div>
  );
};

export default Navigation;
