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
  
  }, []);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const logoutUser = async () => {
    try {
      await axios.delete(`${url}/api/auth/logout`, {
        withCredentials: true,
      });
      removeUser();
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <AppContext.Provider
      value={{
        saveUser,
        user,
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