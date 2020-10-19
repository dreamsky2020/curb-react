import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const RestrictedRoute = ({component: Component, auth: {isAuthenticated}, ...rest}) =>(
    <Route {...rest} render={props =>
        JSON.parse(localStorage.getItem("token")) === 1 || isAuthenticated  ? <Component {...props} /> : <Redirect to={{ pathname: '/signin', state: {from: props.location} }} />}
    />
);


// RestrictedRoute.propTypes = {
//     auth: PropTypes.bool.isRequired
//     }

const mapStateToProps = state => ({
    auth: state.auth
});

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated
// })

export default connect(mapStateToProps)(RestrictedRoute)