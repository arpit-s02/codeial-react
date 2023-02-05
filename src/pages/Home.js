import styles from '../styles/home.module.css';
import PropTypes from 'prop-types';

export const Home = ({ posts }) => {
  return (
    <div className={styles.homeContainer}>
      {/* rendering posts one by one */}
      {posts.map((post) => (
        <div className={styles.postContainer} key={`post-${post._id}`}>
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
                <b> {post.user.name} </b>{' '}
              </span>
              <span className={styles.postTime}> a minute ago </span>
            </div>
          </div>
          <div className={styles.postContentContainer}>
            <div className={styles.postContent}>
              <h1> {post.content} </h1>
            </div>
            <div className={styles.postLikesComments}>
              <button className={styles.button}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
                  alt="Like Button"
                />
              </button>
              <span className={styles.numLikes}> {post.likes.length} </span>
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

            {/* rendering comments one by one in each post */}
            {post.comments.map((comment) => (
              <div
                className={styles.prevComments}
                key={`comment-${comment._id}`}
              >
                <div className={styles.commentUserInfo}>
                  <span className={styles.userName}> {comment.user.name} </span>
                  <span className={styles.commentTime}> a minute ago </span>
                </div>
                <div className={styles.comment}>
                  <span>{comment.content}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// validating props
Home.propTypes = {
  posts: PropTypes.array.isRequired,
};
