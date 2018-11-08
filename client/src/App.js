import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";
import Choose from "./pages/Choose";
import Solution from "./pages/Solution"
import NoMatch from "./pages/NoMatch";
import Profseed from "./profSeed.json"
import Cardseed from "./cardSeed.json"
import Solutionseed from "./solutionSeed.json"
import './App.css';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/profile" render={() => <Profile profSeed={Profseed} />} />
                    <Route path="/marketplace" render={() => <Marketplace profSeed={Profseed} cardSeed={Cardseed}/>} />
                    <Route path="/choose/:id" render={() => <Choose profSeed={Profseed} cardSeed={Cardseed}/>} />
                    <Route path="/solution" render={() => <Solution solutionSeed={Solutionseed} />} />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        );
    }
}
