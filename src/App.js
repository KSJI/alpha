import React, { Component } from 'react';
import{HashRouter as Router, Switch, Redirect, Route} from 'react-router-dom';
import {ROUTES} from './constants';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import './App.css';
import { Homepage } from './Homepage';
import DisplayAddNewPost from './DisplayAddNewPost';


class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={ROUTES.newPost} component={DisplayAddNewPost} />
                    <Route path={ROUTES.signUp} component={SignUp} />
                    <Redirect to={ROUTES.newPost} />
                </Switch>
            </Router>
        );
    }
}

export default App;
