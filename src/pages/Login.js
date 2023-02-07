import styles from '../styles/logInSignUp.module.css';

export const Login = () => {
  return (
    <div className={styles.logInSignUpBackground}>
      <div className={styles.logInSignUpContainer}>
        <h1> Log In </h1>
        <div className={styles.logInSignUpForm}>
          <form>
            <div className={styles.logInSignUpField}>
              <input type="email" placeholder="Email" name="email" required />
            </div>

            <div className={styles.logInSignUpField}>
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
              />
            </div>

            <button className={styles.submitButton}> Log In </button>
          </form>
        </div>
      </div>
    </div>
  );
};
