import React from 'react';

import { Redirect } from 'react-router-dom';

const PrivateRoute = ({component:Component, cookies }) => {
    return (
        <>
            {cookies.get('userId') ?
                <Component cookies={cookies}/>
            :
                <Redirect to='/login' />
            }
        </>
    )
};

export default PrivateRoute;
