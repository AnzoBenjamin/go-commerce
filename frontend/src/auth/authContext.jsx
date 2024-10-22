import { createContext, useContext, useState } from "react";

// Create context
const AuthContext = createContext();
import PropTypes from 'prop-types';


// Create a custom hook for accessing the context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
// Provide the context to the app
export const AuthProvider = ({ children }) => {
    AuthProvider.propTypes = {
        children: PropTypes.node.isRequired,
      };
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const signup = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  return (
    <AuthContext.Provider value={{ token, login, logout,signup }}>
      {children}
    </AuthContext.Provider>
  );
};
