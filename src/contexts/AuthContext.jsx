import { useContext, createContext, useState } from "react";

// Creation of context api
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // States for loading and logging in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // functions to set states
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    //passes states and function as props for the use of other components
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, login, logout, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { AuthProvider };
