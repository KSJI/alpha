import React, { Component } from 'react';
import{HashRouter as Router, Switch, Redirect, Route} from 'react-router-dom';
import {ROUTES} from './constants';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AcceptTerms from './AcceptTerms';
import DisplayEditAccountSettings from "./Settings";
import ForgotPassword from "./ForgotPassword";
import './App.css';
import { Homepage } from './Homepage';
import DisplayAddNewPost from './DisplayAddNewPost';


class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={ROUTES.signIn} component={SignIn} />
                    <Route path={ROUTES.signUp} component={SignUp} />
                    <Route path={ROUTES.acceptTerms} component={AcceptTerms} />
                    <Route path={ROUTES.homePage} component={Homepage} />
                    <Route path={ROUTES.displayEditAccountSettings} component={DisplayEditAccountSettings} />
                    <Route path={ROUTES.newPost} component={DisplayAddNewPost} />
                    <Route path={ROUTES.forgotPassword} component={ForgotPassword} />
                    <Redirect to={ROUTES.signIn} />
                </Switch>
            </Router>
        );
    }
}

export default App;
