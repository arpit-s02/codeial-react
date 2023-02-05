import styles from '../styles/home.module.css';

export const Home = () => {
  return (
    <div>
      <div className={styles.postContainer}>
        <div className={styles.postUserInfoContainer}>
          <div className={styles.postUserDP}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
              alt="User dp"
            />
          </div>
          <div className={styles.postUserInfo}>
            <span>
              {' '}
              <b> Arpit </b>{' '}
            </span>
            <span className={styles.postTime}> a minute ago </span>
          </div>
        </div>
        <div className={styles.postContentContainer}>
          <div className={styles.postContent}>
            <h1> Post Content </h1>
          </div>
          <div className={styles.postLikesComments}>
            <button className={styles.button}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
                alt="Like Button"
              />
            </button>
            <span className={styles.numLikes}> 5 </span>
            <button className={styles.button}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3193/3193015.png"
                alt="Like Button"
              />
            </button>
            <span className={styles.numComments}> 2 </span>
          </div>
        </div>
        <div className={styles.commentsContainer}>
          <div>
            <textarea
              name="comment"
              placeholder="Add a comment..."
              className={styles.addComment}
            ></textarea>
          </div>
          <div className={styles.prevComments}>
            <div className={styles.commentUserInfo}>
              <span className={styles.userName}> Bill </span>
              <span className={styles.commentTime}> a minute ago </span>
            </div>
            <div className={styles.comment}>
              <span>Random Comment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
