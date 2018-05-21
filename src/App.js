import React, { Component } from 'react';
<<<<<<< HEAD
import{HashRouter as Router, Switch, Redirect, Route} from 'react-router-dom';
import {ROUTES} from './constants';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
=======
>>>>>>> kyle
import './App.css';
import { Homepage } from './Homepage';


class App extends Component {
<<<<<<< HEAD
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={ROUTES.signIn} component={SignIn} />
                    <Route path={ROUTES.signUp} component={SignUp} />
                    <Redirect to={ROUTES.signIn} />
                </Switch>
            </Router>
        );
    }
=======
  render() {
    return (
      <div>
        <Homepage />
      </div>
    );
  }
>>>>>>> kyle
}

export default App;
