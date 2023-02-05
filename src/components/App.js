import { useEffect } from 'react';
import { getPosts } from '../api';
import { Home } from '../pages';

function App() {
  useEffect(() => {
    const fetchPosts = async () => {
      const postsResponse = await getPosts();
      console.log('postsResponse', postsResponse);
    };

    fetchPosts();
  }, []);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
