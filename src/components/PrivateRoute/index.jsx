import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const PrivateRoute = ({component:Component, ...rest }) => {
    const { authTokens } = useAuth();
    
    return (
        <Route {...rest} render={(props) =>
            localStorage.getItem("tokens") ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname:"/login", state:{ referer: props.location } }} />
            )
        } />
    )
};

export default PrivateRoute;
