import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Main from './components/main/main';

function App() {
  const user = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
