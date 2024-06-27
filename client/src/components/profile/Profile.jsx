import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../../context';
import { url } from '../../config';

const Profile = () => {
  const navigate = useNavigate();
  const { user,saveUser } = useGlobalContext(); 
  console.log(user);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName:'',
    firstName: '',
    lastName: '',
    email: '',
  });

  const defaultLink = "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${url}/api/users/${user.userName}`);
        setUserData(response.data);
      } catch (error) {
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]); // Dependency array ensures this effect runs when userId or user changes

  const handleEdit = () => {
    setEditing(true);
    setFormData({
      userName:userData.user.userName,
      firstName: userData.user.firstName,
      lastName: userData.user.lastName,
      email: userData.user.email,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        userName:formData.userName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };
      await axios.put(`${url}/api/users/${user.userName}`, updatedUser);
      if(updatedUser.userName){
        setUserData({ user: { ...userData.user, ...updatedUser } });
        navigate(`/user/${updatedUser.userName}`)
      }
      setEditing(false);
      // Optionally, update local state with new user data
     
    } catch (error) {
      console.error('Failed to update user data', error);
      // Handle error state or display error message
    }
  };

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
    <div className=" h-[600px] mx-auto px-4 py-8 bg-[#EFF9ED]">
     
        <img
          className="w-24 h-24 rounded-full mr-4 ml-24"
          src={userData?.user.profilePhoto || defaultLink}
          onError={(e) => { e.target.src = defaultLink }}
          alt="Profile"
        />
        <div>
          <h1 className="text-3xl ml-16  mt-4 font-bold">{userData.user.userName}</h1>
          {!editing && (
            <button
              className="bg-[#3bb19b] hover:bg-[#0a8a73] text-white font-bold py-2 px-4 rounded mt-8 ml-24"
              onClick={handleEdit}
            >
              Edit Profile
            </button>
          )}
        
      </div>
      {editing && (
        <form onSubmit={handleSubmit}>
          <div className="bg-[#EFF9ED] rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                User Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userName"
                type="text"
                placeholder="User Name"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
      {!editing && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-12">
          <p className="mb-4"><span className="font-bold">Username:</span> {userData.user.userName}</p>
          <p className="mb-4"><span className="font-bold">Firstname:</span> {userData.user.firstName}</p>
          <p className="mb-4"><span className="font-bold">Lastname:</span> {userData.user.lastName}</p>
          <p className="mb-4"><span className="font-bold">Email:</span> {userData.user.email}</p>
          {/* Add more fields as per your user data structure */}
        </div>
      )}
    </div>
  );
};

export default Profile;
