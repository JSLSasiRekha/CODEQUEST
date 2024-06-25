import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Main from './components/main/main';
import Merged from './pages/SingleProblem';
import {useGlobalContext } from "./context";
import Profile from './components/profile/Profile'

function App() {
  const { user } = useGlobalContext();
  console.log("hiiii");
  console.log(user);
  return (
    <Router>
      <Routes>
      {user ? (
            <Route path="/" element={<Main />} />
          ) : (
            <Route path="/" element={<Navigate replace to="/login" />} />
          )}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/user/:id" exact element={<Profile/>}/>
        <Route path="/problem/:id" element={<Merged/>}/>
        <Route path="/" element={<Navigate replace to="/login" />} />
        
      </Routes>
     
    </Router>
   
  );
}



export default App;
