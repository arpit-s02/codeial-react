import { useState } from 'react';
import styles from '../styles/logInSignUp.module.css';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    // to prevent the page from reloading when submitting the form
    e.preventDefault();

    if (password !== confirmPassword) {
      return window.alert('Password and Confirm Password do not match!');
    }

    setSigningUp(true);

    const response = await auth.signUp(name, email, password, confirmPassword);
    setSigningUp(false);

    if (response.success) {
      console.log(response);
      navigate('/login');
    } else {
      return window.alert(response.message);
    }
  };

  return (
    <div className={styles.logInSignUpBackground}>
      <div className={styles.logInSignUpContainer}>
        <h1> Sign Up </h1>
        <div className={styles.logInSignUpForm}>
          <form onSubmit={handleSubmit}>
            <div className={styles.logInSignUpField}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.logInSignUpField}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
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
                autoComplete="new-password"
              />
            </div>

            <div className={styles.logInSignUpField}>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <button
              className={
                signingUp ? styles.submitButtonLoggingIn : styles.submitButton
              }
              disabled={signingUp}
            >
              {' '}
              {signingUp ? 'Signing Up...' : 'Sign Up'}{' '}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
