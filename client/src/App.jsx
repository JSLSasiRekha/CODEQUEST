import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Main from './components/main/main';
import Merged from './pages/SingleProblem';
import {useGlobalContext } from "./context";
import ProfilePage from './pages/ProfilePage'

function App() {
  const { user,isLoading } = useGlobalContext();
  console.log(user);
  if (isLoading) {
    return (
      <h1 className="text-2xl text-center text-blue-600 my-40">Loading...</h1>
    );
  }else{
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
        <Route path="/user/:username" exact element={<ProfilePage/>}/>
        <Route path="/problem/:id" element={<Merged/>}/>
        <Route path="/" element={<Navigate replace to="/login" />} />
        
      </Routes>
     
    </Router>
  
   
  );
}
}



export default App;
