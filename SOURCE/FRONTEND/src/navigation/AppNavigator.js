import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

// Component
import Header from '@components/Header';
import NavBar from '@components/NavBar';
import PrivateRoute from './PrivateRoute'

// Screen
import HomeScreen from '@screens/HomeScreen';
import UserScreen from '@screens/UserScreen';
import MainScreen from '@screens/MainScreen';

export class AppNavigator extends Component {

    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route path="/" exact component={MainScreen} />
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
                        <PrivateRoute path='/Home' exact Component={MainScreen} />
                        <PrivateRoute path='/User' exact Component={UserScreen} />
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
