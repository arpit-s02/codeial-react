import { Home } from '../pages';
import { Login } from '../pages';
import { Settings } from '../pages';
import { SignUp } from '../pages';
import Loader from './Loader';
import Navbar from './Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '../hooks';

function PrivateRoute() {
  const auth = useAuth();

  return auth.user ? <Settings /> : <Navigate to="/login" />;
}

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
          <Route path="/user/settings" element={<PrivateRoute />} />
          <Route path="*" element={<h1> Page Not Found! </h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
