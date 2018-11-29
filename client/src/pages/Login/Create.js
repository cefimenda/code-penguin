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

    handleSubmit = event => {
        event.preventDefault()
        const { username, email, password, repassword} = this.state
        if (username.length >= 6) {
            if (email.includes('@')) {
                if (password === repassword && password.length > 0) {
                    API.createAccount({
                        username,
                        credentials: {
                            email,
                            password
                        }
                    })
                        .then(res=>{
                            this.props.getUser(username)
                            // console.log(res);
                            // this.props.redirect();
                        })
                        .catch(err => console.log(err));
                } else {
                    this.props.changeMsg("The passwords do not match or is empty")
                }
            } else {
                this.props.changeMsg("Please enter real email")
            }
        } else {
            this.props.changeMsg("Please enter a username with more than 6 characters")
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
        <React.Fragment>
            <h1>Create New Account</h1>
            <form>
                <div className="login-user-div login-create-div">
                    <input type="text" name="username" onChange={this.handleChange} placeholder="Username" ref={(input) => { this.loginInput = input }} required />
                    <input type="text" name="email" onChange={this.handleChange} placeholder="Email" required />
                    <input type="password" name="password" onChange={this.handleChange} placeholder="Password" required />
                    <input type="password" name="repassword" onChange={this.handleChange} placeholder="Password again" required />
                    <button onClick={this.handleSubmit} >Submit</button>
                    <p className="notice">*Your login credentials are never saved to the chain.</p>
                </div>
            </form>
            <div className="login-btn-div" style={{position: "absolute", bottom: "20px", left: "30px"}}>
                <button className="back-btn" onClick={this.toMain}><i className="fas fa-arrow-left"></i></button>
            </div>
            
        </React.Fragment>
        );
    }
}
