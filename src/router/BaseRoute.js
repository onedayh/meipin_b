import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import store from '../store';


const BaseRoute = ({component: Component, ...rest}) => {
    const isLogin = Boolean(store.getState().user);
    return (
        <Route {...rest} render={props => (
            isLogin
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        )}/>
    )
}




export default BaseRoute