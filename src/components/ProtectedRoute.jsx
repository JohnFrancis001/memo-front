import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// routes to validate the user's navigation only when the user is logged in otherwise redirect to login page
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  // if user is not logged in and there is not any loading the go to login page
  if (!isLoggedIn && !loading) {
    return <Navigate to="/log" />;
  }

  return children;
};

export default ProtectedRoute;
