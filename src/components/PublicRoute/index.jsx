import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const PublicRoute = ({component:Component, ...rest }) => {
    const { authTokens } = useAuth();
    
    return (
        <Route {...rest} render={(props) =>
            localStorage.getItem("tokens") ? (
                <Redirect to={{ pathname:"/", state:{ referer: props.location } }} />
            ) : (
                <Component {...props} />
            )
        } />
    )
};

export default PublicRoute;
