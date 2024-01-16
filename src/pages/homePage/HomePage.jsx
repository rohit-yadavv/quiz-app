import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import { toast } from 'react-toastify';
import styles from "./homePage.module.css";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [, setUser] = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser({ email });
    toast.success("Welcome to Quiz app");
    navigate('/quiz/question/0');
  };

  return (
    <div className={styles.container}>
      <h1>Welcome to Quiz App</h1>
      <div className={styles.loginContainer}>
        <h2>User Detail</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <button type="submit">Start Quiz</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
