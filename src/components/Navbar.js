import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index';

const Navbar = () => {
  const auth = useAuth();
  return (
    <div className={styles.navContainer}>
      <div className={styles.navLeft}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>
      <div className={styles.navRight}>
        {auth.user && (
          <div className={styles.userInfo}>
            <div className={styles.userDP}>
              <Link to="/">
                <img
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
                />
              </Link>
            </div>

            <a href="/"> {auth.user.name} </a>
          </div>
        )}
        <ul>
          {auth.user ? (
            <li>
              <button onClick={auth.logout}> Log Out </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <span> Log In </span>
                </Link>
              </li>
              <li>
                <Link to="/signUp">
                  <span> Register </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
