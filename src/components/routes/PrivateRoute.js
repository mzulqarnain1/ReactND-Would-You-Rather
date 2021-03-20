import React from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        rest.isLogin
            ? <Component {...props}/>
            : <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
    )}/>
)

function mapStateToProps({authedUser}) {
    return {
        isLogin: authedUser
    }
}

export default connect(mapStateToProps)(PrivateRoute)

