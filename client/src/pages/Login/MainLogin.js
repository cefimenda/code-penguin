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
                res.data.forEach(e=>{
                    API.getUser(e.Hash)
                        .then(userData=>{
                            e.Entry.username = userData.data.userdata.username;
                            this.setState({
                                users: res.data
                            });
                        })
                });
            })
            .catch(err => console.log(err));
    }

    toAnother = () => {
        this.props.changePage("Another")
    }

    toCreate = () => {
        this.props.changePage("Create")
    }

    divClick = e => {
        const username = e.target.textContent
        API.idLogin(e.target.id)
            .then(res=>{
                this.props.getUser(username)
                // console.log(res);
                // this.props.redirect();
            })
            .catch(err => console.log(err));
    }

    render() {
        const renderUser = this.state.users.map((user, i) => {
            return (
                <div className="username" key={i} id={user.Hash} name={user.Entry.username} onClick={this.divClick}>
                    <p id={user.Hash} name={user.Entry.username}>{user.Entry.username}</p>
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
