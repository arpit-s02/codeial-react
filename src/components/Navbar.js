import styles from '../styles/navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navLeft}>
        <a href="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </a>
      </div>
      <div className={styles.navRight}>
        <div className={styles.userInfo}>
          <div className={styles.userDP}>
            <a href="/">
              <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
              />
            </a>
          </div>

          <a href="/"> Arpit </a>
        </div>
        <ul>
          <li>
            <a href="/">
              <span> Log In </span>
            </a>
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
