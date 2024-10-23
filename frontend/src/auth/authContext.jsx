import { createContext, useContext, useState } from "react";

import PropTypes from 'prop-types';
// Create context
const AuthContext = createContext();


// Create a custom hook for accessing the context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
// Provide the context to the app
export const AuthProvider = ({ children }) => {
    AuthProvider.propTypes = {
        children: PropTypes.node.isRequired,
      };
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);


  const login = (token, userData) => {
    setToken(token);
    setUser(userData)
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const signup = (token, userData) => {
    setToken(token);
    setUser(userData)
    localStorage.setItem("token", token);
  };
  return (
    <AuthContext.Provider value={{ token, login, logout,signup, user }}>
      {children}
    </AuthContext.Provider>
  );
};
