import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

// The context api to get the current logged in user.
export const UserProvider = ({ children }) => {
  const [name, setName] = useState(null);

  // the function to trigger the endpoint to get the name.
  const getUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/name`, {
        withCredentials: true,
      });
      // console.log(response.data.user.username);
      await setName(response.data.user.username);
      // console.log(response.data);
    } catch (e) {
      console.error("Failed to fetch user:", e.response?.data || e.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ name, getUser, setName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
