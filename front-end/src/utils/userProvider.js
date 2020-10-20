import React, { useState } from 'react';
import UserContext from './context';

const UserProvider = (props) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    
    const logIn = (user) => {
        setLoggedIn(true);
        setUser(user);
    }
    
    const logOut = () => {
        setLoggedIn(false);
        setUser(null);
        document.cookie = "Authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    return(
        <UserContext.Provider value = {{
            loggedIn,
            user,
            logIn,
            logOut,
        }}>
        {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider;