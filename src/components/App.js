import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Home } from '../pages';
import Loader from './Loader';
import Navbar from './Navbar';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetching posts from the API
    const fetchPosts = async () => {
      const postsResponse = await getPosts();

      if (postsResponse.success) {
        // if posts are successfully fetched we set the state of posts as the posts received
        setPosts(postsResponse.data.posts);

        // when posts are received we set loading as false
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    // while posts are being fetched we display the loader instead of home component
    return <Loader />;
  }

  return (
    <div className="App">
      <Navbar />
      <Home posts={posts} />
    </div>
  );
}

export default App;
