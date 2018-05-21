import React, { Component } from 'react';
import {HashRouter as Router, Switch, Redirect, Route} from "react-router-dom"
import {ROUTES} from "./constants";
import DisplayAddNewPost from "./DisplayAddNewPost";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={ROUTES.displayAddNewPost} component={DisplayAddNewPost} />
        </Switch>
      </Router>
    );
  }
}

export default App;
