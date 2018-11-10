import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";
import Choose from "./pages/Choose";
import Solution from "./pages/Solution"
import NoMatch from "./pages/NoMatch";
import profSeed from "./profSeed.json"
import cardSeed from "./cardSeed.json"
import solutionSeed from "./solutionSeed.json"
import './App.css';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/profile" render={() => <Profile profSeed={profSeed} />} />
                    <Route path="/marketplace" render={() => <Marketplace profSeed={profSeed} cardSeed={cardSeed}/>} />
                    <Route path="/choose/:id" render={() => <Choose profSeed={profSeed} cardSeed={cardSeed}/>} />
                    <Route path="/solution" render={() => <Solution solutionSeed={solutionSeed} />} />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        );
    }
}
