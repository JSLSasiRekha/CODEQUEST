import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../context';
import {url} from '../../config'


const Profile = () => {
  const { user } = useGlobalContext(); // Accessing user data from global context
  // Assuming userId is part of the URL path
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${url}/api/users/${user._id}`); // Replace with your actual endpoint
        setUserData(response.data); // Assuming response.data contains user information
      } catch (error) {
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [ user]); // Dependency array ensures this effect runs when userId or user changes

  if (!user) {
    return <div>Please log in to view this page.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {userData && (
        <div>
          <p>Username: {userData.firstName}{userData.lastName}</p>
          <p>Email: {userData.email}</p>
          {/* Add more fields as per your user data structure */}
        </div>
      )}
    </div>
  );
};

export default Profile;
