import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';
import { requestGetUserInfo } from '../constants/Api'

export default class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verified: true
        }
    }

    render() {
        const { path, Component } = this.props;
        let token = Cookie.get("SESSION_ID")
        let hasToken = token ? true : false
        return (
            <Route path={path} exact
                render={(props) => (
                    hasToken == true ?
                        <Component {...this.props} /> :
                        <Redirect to='/' />
                )} />
        )
    }

}