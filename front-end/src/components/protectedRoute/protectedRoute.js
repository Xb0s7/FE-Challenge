import React from 'react';
import {Redirect} from 'react-router-dom';

const ProtectedRoute = ({component}) => {
    const Component = component;
    const isAuthenticated = document.cookie;
    
    return isAuthenticated ? (
        <Component/>
    ) : (
        <Redirect to={{ pathname: '/login'}}/>
    )
}

export default ProtectedRoute;