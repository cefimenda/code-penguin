import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";
import Choose from "./pages/Choose";
import NoMatch from "./pages/NoMatch";
import Profseed from "./profseed.json"
import Cardseed from "./cardseed.json"
import './App.css';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/profile" render={() => <Profile profseed={Profseed} />} />
                    <Route path="/marketplace" render={() => <Marketplace profseed={Profseed} cardseed={Cardseed}/>} />
                    <Route path="/choose/:id" render={() => <Choose profseed={Profseed} cardseed={Cardseed}/>} />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        );
    }
}
