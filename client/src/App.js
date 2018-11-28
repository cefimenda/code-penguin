import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile2";
import Marketplace from "./pages/Marketplace";
import Task from "./pages/Task";
import NewTask from "./pages/NewTask"
import NoMatch from "./pages/NoMatch";
import API from "./utils/API";
import './App.css';

export default class App extends Component {
    login = user => {
        sessionStorage.setItem('user', user);
    }

    logout = () => {
        API.logout()
            .then(res=>{
                sessionStorage.clear();
            })
            .catch(err=>{
                console.log(err);
            })
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/marketplace" /> } />
                    <Route path="/landing" component={Landing} />
                    <Route path="/profile" render={() => <Profile otherUser={true} /> } />
                    <Route exact path="/profile/:user" render={() => <Profile otherUser={true} /> } />
                    <Route path="/marketplace" component={Marketplace} />
                    <Route path="/newtask" render={() => <NewTask />} />
                    <Route path="/login" render={() => <Login getUser={this.login} logout={this.logout}/>} />
                    <Route path="/logoff" render={() => <Redirect to="/login" /> } />} />
                    <Route path="/task/:hash" component={Task} />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        )
    }
}
