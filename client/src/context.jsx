import axios from "axios";
import {
  useContext,
  useState,
  createContext,
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