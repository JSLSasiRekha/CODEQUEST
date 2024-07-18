import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Main from './components/main/main';
import Merged from './pages/SingleProblem';
import {useGlobalContext } from "./context";
import ProfilePage from './pages/ProfilePage'
import AdminDashboard from './pages/AdminDashboard';
import AllProblems from './pages/Allproblems';
import Leaderoard from './pages/Leaderboard';
import CreateProblem from './components/admin/createProblem';
import EditProblem from './components/admin/EditProblem';


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
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin/add" element={<CreateProblem/>}/>
        <Route path="/admin/problem/:slug" element={<EditProblem/>}/>
        <Route path="/leaderboard" element={<Leaderoard/>}/>
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/allproblems" exact element={<AllProblems/>} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/user/:username" exact element={<ProfilePage/>}/>
        <Route path="/problem/:slug" element={<Merged/>}/>
    
        
      </Routes>
     
    </Router>
  
   
  );
}
}



export default App;
