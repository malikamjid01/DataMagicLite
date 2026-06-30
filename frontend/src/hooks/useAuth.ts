import { useAuthContext } from '../context/AuthContext';

const useAuth = () => {
  const {
    user,
    isLoading,
    isAuthenticated,
    loginUser,
    signupUser,
    logoutUser,
  } = useAuthContext();

  return {
    user,
    isLoading,
    isAuthenticated,
    loginUser,
    signupUser,
    logoutUser,
  };
};

export default useAuth;