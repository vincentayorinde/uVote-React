import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

const PrivateRoute = ({component: Component, auth, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props => {
                if(auth.isLoading){
                    return <h1>Loading...</h1>
                }else if(!auth.isAuthenticated){
                    return <Redirect to="/signin" />
                }else{
                    return <Component {...props} />
                }
            }}
        />
    )
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(PrivateRoute);