import { Home } from '../pages';
import { Login } from '../pages';
import Loader from './Loader';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks';

function App() {
  const auth = useAuth();

  if (auth.loading) {
    // while posts are being fetched we display the loader instead of home component
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
