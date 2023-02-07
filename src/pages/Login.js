import { useState } from 'react';
import styles from '../styles/logInSignUp.module.css';
import { login } from '../api';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const handleSubmit = async (e) => {
    // to prevent the page from reloading when submitting the form
    e.preventDefault();
    setLoggingIn(true);

    // check whether user exists or not in the API
    const response = await login(email, password);
    console.log(response);

    setLoggingIn(false);
  };

  return (
    <div className={styles.logInSignUpBackground}>
      <div className={styles.logInSignUpContainer}>
        <h1> Log In </h1>
        <div className={styles.logInSignUpForm}>
          <form onSubmit={handleSubmit}>
            <div className={styles.logInSignUpField}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.logInSignUpField}>
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className={
                loggingIn ? styles.submitButtonLoggingIn : styles.submitButton
              }
              disabled={loggingIn}
            >
              {' '}
              {loggingIn ? 'Logging In...' : 'Log In'}{' '}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
