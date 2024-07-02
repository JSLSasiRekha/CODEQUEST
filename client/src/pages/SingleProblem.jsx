import SingleProblem from '../components/Singleproblem/singleproblemComp';
import Compiler from '../components/Singleproblem/Compiler'
import {useParams } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import  { useState, useEffect } from 'react';
import { url } from "../config";
import axios from 'axios'; 

const Merged=()=>{
    const [problem, setProblem] = useState(null);
    const {slug} = useParams();
   
    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`${url}/api/problems/${slug}`); // Replace with your API endpoint
                console.log(response.data.problem);
                setProblem(response.data.problem); 
                
            } catch (error) {
                console.error('Error fetching problem:', error);
            }
        };

        fetchProblem();
    }, [slug]); 

    if (!problem) {
        return <div>Problem not found</div>;
    }
    return<>
    <Navbar/>
    <div className='flex bg-[#F1F8E8]'>
        <div className='w-1/2 p-10'>
        <SingleProblem  problem={problem}/>
        </div>
        <div className='w-1/2'>
        <Compiler/>
        </div>
        
        
    </div>
    </>
}
export default Merged;