import styles from '../styles/comment.module.css';

const Comment = ({ comment }) => {
  return (
    <div className={styles.prevComments}>
      <div className={styles.commentUserInfo}>
        <span className={styles.userName}> {comment.user.name} </span>
        <span className={styles.commentTime}> a minute ago </span>
      </div>
      <div className={styles.comment}>
        <span>{comment.content}</span>
      </div>
    </div>
  );
};

export default Comment;
