import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
// import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
// import Marketplace from "./pages/Marketplace";
// import Task from "./pages/Task";
// import NewTask from "./pages/NewTask"
// import NoMatch from "./pages/NoMatch";
// import profSeed from "./profSeed.json"
// import cardSeed from "./cardSeed.json"
import './App.css';



function AuthExample() {
  return (
    <Router>
      <div>
        <AuthButton />
        <ul>
          <li><Link to="/public">Public Page</Link></li>
          <li><Link to="/protected">Protected Page</Link></li>
        </ul>
        <Route path="/public" component={Public} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={Profile} />
        <PrivateRoute path="/landing" component={Landing} />
      </div>
    </Router>
  );
}

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>Welcome!{" "}
        <button onClick={() => { fakeAuth.signout(() => history.push("/")) }} > Sign out </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props => fakeAuth.isAuthenticated ? 
            ( <Component {...props} /> ) : (
              <Redirect to={{  pathname: "/login", state: { from: props.location } }} />
            )} />
    );
}

function Public() {
    return <h3>Public</h3>;
}

function Protected() {
    return <h3>Protected</h3>;
}

class Login extends React.Component {
    state = { redirectToReferrer: false };

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <button onClick={this.login}>Log in</button>
        </div>
        );
    }
}

export default AuthExample;