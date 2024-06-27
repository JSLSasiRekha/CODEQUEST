import Profile from '../components/profile/Profile'
import  CircularProgress  from '../components/profile/CircularProgress'
import Navbar from '../components/navbar/Navbar'
import Calendar from '../components/profile/Calender'
import SubmittedQuestions from '../components/profile/Submissions'

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
    <div className='w-1/4'>
     <CircularProgress/>
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