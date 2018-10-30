import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";
import NoMatch from "./pages/NoMatch";
import Profseed from "./profseed.json"
import './App.css';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/profile" render={() => <Profile profseed={Profseed} />} />
                    <Route exact path="/marketplace" render={() => <Marketplace profseed={Profseed} />} />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        );
    }
}
