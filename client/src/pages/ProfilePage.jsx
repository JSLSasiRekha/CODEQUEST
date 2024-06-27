import Profile from '../components/profile/Profile'
import  CircularProgress  from '../components/profile/CircularProgress'
import Navbar from '../components/navbar/Navbar'
import Calendar from '../components/profile/Calender'
import SubmittedQuestions from '../components/profile/Submissions'
import Card from '../components/profile/Card'
import { FaFireAlt } from "react-icons/fa";
import { FaCode } from "react-icons/fa";

const ProfilePage=()=>{
    const specificQuestionsWithStatus = [
        {
          title: 'Two Sum Problem ',
          status: 'Accepted',
        },
        {
          title: 'Find an Element in an Array',
          status: 'Compilation Error',
        },
        {
          title: 'Reverse a Linked List ',
          status: 'Execution Error',
        },
        {
          title: 'Implement a Stack using Arrays',
          status: 'Accepted',
        },
        {
          title: 'Check if a Binary Tree is Balanced - Accepted',
          status: 'Accepted',
        },
        {
          title: 'Merge Two Sorted Arrays - Compilation Error',
          status: 'Compilation Error',
        },
        {
          title: 'Find the Longest Substring Without Repeating Characters - Accepted',
          status: 'Accepted',
        }
      ];
      
    
      
      
      
      
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
     <Card type={'Rank'} component={<FaCode/>} count={6}/>
     <Card type={'streak'} component={<FaFireAlt />} count={7}/>
     <Card type={'problems'} component={<FaCode/>} count={280}/>
     </div>
     </div>
     </div>
    
    <div className='mt-3'>
    < Calendar/>
    <SubmittedQuestions questions={specificQuestionsWithStatus}/>
    </div>
   
    </div>
   
    </div>
  
    </>
)
}
export default ProfilePage