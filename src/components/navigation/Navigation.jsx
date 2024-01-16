/* eslint-disable react/no-unknown-property */
// The above line disables the eslint rule for unknown properties to avoid linting errors for SVG attributes

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

  const notVisitedCount =
    questions.length - visitedQuestions.filter((visited) => visited).length;

  const visitedCount = visitedQuestions.filter((visited) => visited).length;

  return (
    <div className={styles.NavigationContainer}>
      <h2>Choose a Question</h2>
      {/* Display the list of questions as links */}
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
          aria-hidden="true"
          width="100%"
          height="8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Define a pattern for the line */}
          <pattern id="a" width="91" height="8" patternUnits="userSpaceOnUse">
            <g clipPath="url(#clip0_2426_11367)">
              {/* Path for the line pattern */}
              <path
                d="M114 4c-5.067 4.667-10.133 4.667-15.2 0S88.667- ..."
                stroke="#E1E3E1"
                strokeLinecap="square"
              ></path>
            </g>
          </pattern>
          {/* Apply the pattern to fill the rectangle */}
          <rect width="100%" height="100%" fill="url(#a)"></rect>
        </svg>
      </div>

      {/* Display statistics about answered, visited, and not visited questions */}
      <div className={styles.stats}>
        <p>
          Answered:{" "}
          <span style={{ backgroundColor: "#09416a" }}>{answeredCount}</span>{" "}
        </p>
        <p>
          Visited:{" "}
          <span style={{ backgroundColor: "#1da2a1" }}>{visitedCount}</span>
        </p>
        <p>
          Not Visited:{" "}
          <span style={{ backgroundColor: "#e7a529" }}>{notVisitedCount}</span>
        </p>
      </div>
 
      <div className={styles.line}>
        <svg
          aria-hidden="true"
          width="100%"
          height="8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern id="a" width="91" height="8" patternUnits="userSpaceOnUse">
            <g clipPath="url(#clip0_2426_11367)">
              <path
                d="M114 4c-5.067 4.667-10.133 4.667-15.2 0S88.667- ..."
                stroke="#E1E3E1"
                strokeLinecap="square"
              ></path>
            </g>
          </pattern>
          <rect width="100%" height="100%" fill="url(#a)"></rect>
        </svg>
      </div>
    </div>
  );
};

export default Navigation;
