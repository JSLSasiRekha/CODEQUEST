import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../config";
import Navbar from "../components/navbar/Navbar";

const Leaderboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch user data from the API using axios
        const fetchData = async () => {
            try {
                const  response  = await axios.get(`${url}/api/users/allusers`, {
                    withCredentials: true,
                  });
                // Sort users by points in descending order
                console.log("res",response);
                const sortedUsers = response.data.sort((a, b) => b.points - a.points);
                setUsers(sortedUsers);
                console.log(users)
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
                <table className="min-w-full odd:bg-gray-400">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b-2 border-gray-300">Rank</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300">Name</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300">Points</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {users.map((user, index) => (
                            <tr key={user.userName} className={`text-center ${index % 2 === 0 ? 'bg-[#a1eec5]' : 'bg-[#f2f4f1]'}`}>
                                <td className="py-2 px-4 border-b border-gray-200">
                               #{index + 1}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.userName} 
                                    {index === 0 ? '🥇 ' : index === 1 ? '🥈 ' : index === 2? '🥉 ' : ''}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Leaderboard;
