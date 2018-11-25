import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";
import Task from "./pages/Task";
import NewTask from "./pages/NewTask"
import NoMatch from "./pages/NoMatch";
// import profSeed from "./profSeed.json"
// import cardSeed from "./cardSeed.json"
import './App.css';

export default class App extends Component {
    state = {
        user: ""
    }

    login = user => {
        this.setState({ user: user })
    }

    logout = () => {
        this.setState({ user: "" })
    }

    render() {
        console.log("user:", this.state.user);
        
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/login" /> } />
                    <Route path="/landing" component={Landing} />
                    <Route path="/profile" render={() => <Profile /> } />
                    <Route path="/marketplace" component={Marketplace} />
                    <Route path="/newtask" render={() => <NewTask />} />
                    <Route path="/login" render={() => <Login getUser={this.login} />} />
                    <Route path="/task/:hash" component={Task} />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        )
    }
}
