import { Home, Login, Settings, SignUp } from '../pages';
import { UserProfile } from '../pages';
import Loader from './Loader';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks';

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
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/user/settings" element={<Settings />} />
          <Route path="*" element={<h1> Page Not Found! </h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
