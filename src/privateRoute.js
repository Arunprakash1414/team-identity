
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';


const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => (
        // true ? <Component {...props} /> : <Redirect to="/" />
        Cookies.get("name") ? <Component {...props} /> : <Redirect to="/" />

    )} />
}
export default PrivateRoute;