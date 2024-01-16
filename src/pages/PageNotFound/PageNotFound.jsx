import styles from "./PageNotFound.module.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <h3>Page Not Found</h3>
      <Link className={styles.link} to='/'>Start a Quiz</Link>
    </div>
  );
};
 
export default PageNotFound;
