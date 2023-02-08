import { Home } from '../pages';
import { Login } from '../pages';
import Loader from './Loader';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks';
import { SignUp } from '../pages/SignUp';

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
