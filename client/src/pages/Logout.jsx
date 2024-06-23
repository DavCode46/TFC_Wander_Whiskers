import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@context/UserContext';

const Logout = () => {
  const { setCurrentUser, setIsSubscribed } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(null);
    setIsSubscribed(false);
    navigate('/');
  }, [setCurrentUser,setIsSubscribed, navigate]);

  return null; 
}

export default Logout;
