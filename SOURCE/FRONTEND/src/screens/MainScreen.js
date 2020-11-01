import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import { ROUTER } from '../constants/Constant';
import { requestGetUserInfo } from '../constants/Api';
import reactotron from '../ReactotronConfig';
export default class UserScreen extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <Link to={ROUTER.HOME}
                        href='    '
                    >
                        <a
                            className="App-link"
                        >
                            HOME SCREEN
                        </a>
                    </Link>
                    <Link to={ROUTER.USER} >
                        <a
                            className="App-link"
                        >
                            USER SCREEN
                        </a>
                    </Link>
                </header>
            </div>
        )
    }
}
