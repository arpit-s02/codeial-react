import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
        <div className={styles.userInfo}>
          <div className={styles.userDP}>
            <Link to="/">
              <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
              />
            </Link>
          </div>

          <a href="/"> Arpit </a>
        </div>
        <ul>
          <li>
            <Link to="/login">
              <span> Log In </span>
            </Link>
          </li>
          <li>
            <a href="/">
              <span> Log Out </span>
            </a>
          </li>
          <li>
            <a href="/">
              <span> Register </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
