import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import {ROUTER} from "@constants/Constant";

// Component
import Header from '@components/Header';
import NavBar from '@components/NavBar';
import PrivateRoute from './PrivateRoute'

// Screen
import HomeScreen from '@screens/Home';
import ProgressScreen from '@screens/Progress';
import UserHomeScreen from '@screens/UserHome'
import { Home } from '@material-ui/icons';

export class AppNavigator extends Component {

    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route path="/" exact component={HomeScreen} />
                    <PrivateRoute Component={MainNavigator} />
                </Switch>
            </Router>
        )
    }
}

class MainNavigator extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <NavBar Component={
                    <Switch>
                        <PrivateRoute path={ROUTER.USER_HOME} exact Component={UserHomeScreen} />
                        <PrivateRoute path={ROUTER.PROGRESS} exact Component={ProgressScreen} />
                    </Switch>
                } />
            </>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator)
