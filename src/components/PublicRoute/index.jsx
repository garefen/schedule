import React from 'react';

import { Redirect } from 'react-router-dom';

const PublicRoute = ({component:Component, cookies }) => {
    return (
        <>
            {cookies.get('userId') ?
                <Redirect to='/' />
            :
                <Component cookies={cookies}/>
            }
        </>
    )
};

export default PublicRoute;
