import React, { Component } from 'react';
import{HashRouter as Router, Switch, Redirect, Route} from 'react-router-dom';
import {ROUTES} from './constants';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import './App.css';


class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={ROUTES.signUp} component={SignUp} />
                    <Route path={ROUTES.signIn} component={SignIn} />
                    <Redirect to={ROUTES.signIn} />
                </Switch>
            </Router>
        );
    }
}

export default App;
