import  { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { url } from "../../config";
import AdminProblemHeading from './AdminProblemHeading'


const AdminAllproblems = () => {
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get(`${url}/api/problems/allproblems`); // Replace with your API endpoint
                setProblems(response.data.problems); // Assuming response.data contains an object with 'problems' array
            } catch (error) {
                console.error('Error fetching problems:', error);
            }
        };

        fetchProblems();
    }, []); // Empty dependency array ensures this runs once on component mount

    return (
        <div className='mt-5'>
            <ul>
                {problems.map(problem => (
                    <li key={problem._id}> {/* Assuming each problem has a unique '_id' */}
                        <AdminProblemHeading
                         id={problem._id}
                         title={problem.title}
                         companies={problem.companies}
                         difficulty={problem.difficulty}
                         tags={problem.tags}
                         slug={problem.slug}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminAllproblems;
