import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";  // Import the AuthContext
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const { token } = useAuth();

  // If no token exists, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the requested route
  return children;
};

export default ProtectedRoute;
