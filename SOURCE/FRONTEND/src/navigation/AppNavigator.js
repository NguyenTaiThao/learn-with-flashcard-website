import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ROUTER } from "@constants/Constant";

// Component
import Header from "@components/Header";
import NavBar from "@components/NavBar";
import PrivateRoute from "./PrivateRoute";

// Screen
import HomeScreen from "@screens/Home";
import ProgressScreen from "@screens/Progress";
import UserHomeScreen from "@screens/UserHome";
import CreateSetScreen from "@screens/CreateSet";
import LearnScreen from "@screens/Learn";
import FolderScreen from "@screens/Folder";
import FolderCreateScreen from "@screens/CreateFolder";
import FolderContentScreen from "@screens/FolderContent";
import SearchScreen from "@screens/Search";

export class AppNavigator extends Component {
    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route path="/" exact component={HomeScreen} />
                    <Route path={ROUTER.SEARCH} component={SearchScreen} />
                    <PrivateRoute Component={MainNavigator} />
                </Switch>
            </Router>
        );
    }
}

class MainNavigator extends Component {
    render() {
        return (
            <>
                <NavBar
                    Component={
                        <Switch>
                            <PrivateRoute
                                path={ROUTER.USER_HOME}
                                exact
                                Component={ProgressScreen}
                            />
                            <PrivateRoute
                                path={ROUTER.CREATE_SET}
                                exact
                                Component={CreateSetScreen}
                            />
                            <PrivateRoute
                                path={ROUTER.SET_LEARNED}
                                exact
                                Component={FolderScreen}
                                screen="learned"
                            />
                            <PrivateRoute
                                path={ROUTER.SET}
                                exact
                                Component={FolderScreen}
                                screen="made"
                            />
                            <PrivateRoute
                                path={ROUTER.FOLDER}
                                exact
                                Component={FolderScreen}
                                screen="folder"
                            />
                            <PrivateRoute
                                path={ROUTER.LEARN}
                                exact
                                Component={LearnScreen}
                            />
                            <PrivateRoute
                                path={ROUTER.FOLDER_CONTENT}
                                exact
                                Component={FolderContentScreen}
                            />
                            <PrivateRoute
                                path={ROUTER.FOLDER_CREATE}
                                exact
                                Component={FolderCreateScreen}
                            />
                            <PrivateRoute
                                path={ROUTER.RECENT_ACT}
                                exact
                                Component={FolderScreen}
                                screen="recentActivities"
                            />
                        </Switch>
                    }
                />
            </>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
