import styles from '../styles/home.module.css';
import Comment from '../components/Comment';
import { getPosts } from '../api';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    // fetching posts from the API
    const fetchPosts = async () => {
      const postsResponse = await getPosts();

      if (postsResponse.success) {
        // if posts are successfully fetched we set the state of posts as the posts received
        setPosts(postsResponse.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <Loader />;
  }

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
              <span className={styles.numComments}>
                {' '}
                {post.comments.length}{' '}
              </span>
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
              <Comment comment={comment} key={`comment-${comment._id}`} />
            ))}
          </div>
        </div>
      ))}
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={true}
      />
    </div>
  );
};
