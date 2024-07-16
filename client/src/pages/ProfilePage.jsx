import Profile from '../components/profile/Profile'
import  CircularProgress  from '../components/profile/CircularProgress'
import Navbar from '../components/navbar/Navbar'
import Calendar from '../components/profile/Calender'
import SubmittedQuestions from '../components/profile/Submissions'
import Card from '../components/profile/Card'
import { FaFireAlt } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { useGlobalContext } from "../context";
import {useEffect} from 'react';
import axios from "axios";
import { url } from "../config";

const ProfilePage=()=>{
  const { user,saveUser } = useGlobalContext();
  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${url}/api/users/${user.userName}`, {
        withCredentials: true,
      });
      saveUser(data.user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }; 
  useEffect(() => {
  
  
    fetchUser();
  }, [user]);
      
      
return(
    <>
    <Navbar/>
    <div className='flex'>
    <div className='w-1/4 m-3'>
    <Profile/>
    </div>
    <div className='w-3/4 m-3'>
    <div className='flex gap-3'>
     <CircularProgress/>
     <div className=''>
     <p className='text-5xl mt-6 ml-16 text-[#3bb19b] font-bold'>YOUR STANDINGS</p>
  <div className='flex gap-3 h-[150px] mt-8'>
     <Card type={'Rank'} component={<FaCode/>} count={user.points}/>
     <Card type={'streak'} component={<FaFireAlt />} count={user.streak}/>
     <Card type={'problems'} component={<FaCode/>} count={user.easySolved+user.mediumSolved+user.hardSolved}/>
     </div>
     </div>
     </div>
    
    <div className='mt-3'>
    < Calendar/>
    <SubmittedQuestions />
    </div>
   
    </div>
   
    </div>
  
    </>
)
}
export default ProfilePage