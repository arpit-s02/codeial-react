import { useEffect } from 'react';
import { getPosts } from '../api';

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
      <h1> Hello World </h1>
    </div>
  );
}

export default App;
