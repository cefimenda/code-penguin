import React, { Component } from 'react';
import './Login.css';
import API from '../../utils/API';

export default class Task extends Component {

    state = {
        users: []
    }

    componentDidMount = () => {
        API.getUsernames()
            .then(res=>{
                console.log(res.data);
                this.setState({
                    users: res.data
                });
            })
            .catch(err=>{
                console.log(err);
            });
    }

    toAnother = () => {
        this.props.changePage("Another")
    }

    toCreate = () => {
        this.props.changePage("Create")
    }

    divClick = e => {
        API.idLogin(e.target.id)
            .then(res=>{
                console.log(res);
                this.props.redirect();
            })
            .catch(err=>{
                console.log(err);
            });
    }

    render() {
        const renderUser = this.state.users.map((user, i) => {
            return (
                <div className="username" key={i} id={user.Hash} onClick={this.divClick}>
                    <p id={user.Entry.username}>{user.Entry.username}</p>
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
