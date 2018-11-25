import React, { Component } from 'react';
import Users from '../../userSeed.json'
import './Login.css';

export default class Task extends Component {
    toAnother = () => {
        this.props.changePage("Another")
    }

    toCreate = () => {
        this.props.changePage("Create")
    }

    divClick = e => {
        this.props.getUser(e.target.id)
    }

    render() {
        const renderUser = Users.map((user, i) => {
            return (
                <div className="username" key={i} id={user.userEmail} onClick={this.divClick}>
                    <p id={user.userEmail}>{user.userEmail}</p>
                </div>
            )
        })
        return (
        <React.Fragment>
            <h1>Login</h1>
            <div className="login-user-div">
                {renderUser}
            </div>
            <div className="login-btn-div">
                <button onClick={this.toAnother}>Another Account</button>
            </div>
            <div className="login-btn-div">
                <button onClick={this.toCreate}>Create New Account</button>
            </div>
        </React.Fragment>
        );
    }
}
