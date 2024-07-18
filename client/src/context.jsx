import axios from "axios";
import {
  useContext,
  useEffect,
  useState,
  createContext,
  useCallback,
} from "react";
import { url } from "./config";
const AppContext = createContext();

const AppProvider = ({ children }) => {
 
  const [user, setUser] = useState(null);
  const [isLoading,setIsLoading]=useState(true);

  const saveUser = (user) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };
  const fetchUser = useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/api/users/showMe`, {
        withCredentials: true,
      });
      saveUser(data.user);
      
      
    } catch (error) {
      removeUser();
    }
    setIsLoading(false)
  
  }, []);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const logoutUser = async () => {
    try {
      removeUser();
      await axios.delete(`${url}/api/auth/logout`)
      
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <AppContext.Provider
      value={{
        saveUser,
        fetchUser,
        user,
        isLoading,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };