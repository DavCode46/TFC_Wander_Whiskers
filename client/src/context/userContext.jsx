import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [isSubscribed, setIsSubscribed] = useState(JSON.parse(localStorage.getItem('isSubscribed'))); 

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    useEffect(() => {
        try {
            const fetchUser = async () => {
                if(currentUser) {
                const res = await axios.get(
                    `${import.meta.env.VITE_REACT_APP_URL}/users/${currentUser.id}`,
                    { withCredentials: true, headers: { Authorization: `Bearer ${currentUser.token}` } }
                  );
                  const { isSubscribed } = res.data;
                  setIsSubscribed(isSubscribed); 
                  localStorage.setItem('isSubscribed', JSON.stringify(isSubscribed))
                }
            }

            fetchUser()
        } catch(err) {
            // console.log(err);
        }
    }, [isSubscribed, currentUser])

    // Función para actualizar el estado de suscripción
    const updateSubscriptionStatus = (status) => {
        setIsSubscribed(status);
    };

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, isSubscribed, setIsSubscribed, updateSubscriptionStatus }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
