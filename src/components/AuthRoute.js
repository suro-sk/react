import React from "react";
import {Route, Redirect} from "react-router";
import {connect} from 'react-redux';


function AuthRoute({path, component: Component, isUserLoggedIn, isPrivate}) {
    return (
        <Route
            path={path}
            render={(props) => {
                if (isUserLoggedIn && !isPrivate) {
                    return <Redirect to='/'/>;
                }

                if (!isUserLoggedIn && isPrivate) {
                    return <Redirect to='/sign-in'/>;
                }

                return <Component {...props}/>;
            }}

        />
    )
}

const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.isUserLoggedIn
    };
}

export default connect(mapStateToProps)(AuthRoute);