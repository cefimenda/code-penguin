import React, { Component } from 'react';
import './Login.css';
import API from '../../utils/API';

export default class Task extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        repassword: ""
    }
    componentDidMount(){
        this.loginInput.focus();
    }

    toMain = () => {
        this.props.changePage("Main")
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = () => {
        const { username, email, password, repassword} = this.state
        if (password === repassword) {
            console.log(`username: ${username}, email: ${email}, pasword: ${password}, repass: ${repassword}`);
            API.createAccount({
                username,
                credentials: {
                    email,
                    password
                }
            })
                .then(res=>{
                    console.log(res);
                    this.props.redirect();
                })
                .catch(err=>{
                    console.log(err);
                })
        } else {
            alert("The passwords do not match")
        }
    }

    render() {
        return (
        <React.Fragment>
            <h1>Create New Account</h1>
            <div className="login-user-div login-create-div">
                <input type="text" name="username" onChange={this.handleChange} placeholder="Username" ref={(input) => { this.loginInput = input }} required />
                <input type="text" name="email" onChange={this.handleChange} placeholder="Email" required />
                <input type="password" name="password" onChange={this.handleChange} placeholder="Password" required />
                <input type="password" name="repassword" onChange={this.handleChange} placeholder="Password again" required />
                <button onClick={this.handleSubmit} >Submit</button>
            </div>
            <div className="login-btn-div" style={{position: "absolute", bottom: "20px", left: "30px"}}>
                <button className="back-btn" onClick={this.toMain}><i className="fas fa-arrow-left"></i></button>
            </div>
        </React.Fragment>
        );
    }
}
