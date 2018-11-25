import React, { Component } from 'react';
import './Login.css';

export default class Task extends Component {
    state = {
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
        const { email, password, repassword} = this.state
        if (password === repassword) {
            console.log(`email: ${email}, pasword: ${password}, repass: ${repassword}`);
        } else {
            alert("The passwords do not match")
        }
    }

    render() {
        return (
        <React.Fragment>
            <h1>Create New Account</h1>
            <div className="login-user-div">
                <input type="text" name="email" onChange={this.handleChange} value={this.state.pebbles} placeholder="Please enter email" ref={(input) => { this.loginInput = input }} required />
                <input type="password" name="password" onChange={this.handleChange} value={this.state.pebbles} placeholder="Please enter password" required />
                <input type="password" name="repassword" onChange={this.handleChange} value={this.state.pebbles} placeholder="Please re-enter password" required />
                <button onClick={this.handleSubmit} >Submit</button>
            </div>
            <div className="login-btn-div" style={{position: "absolute", bottom: "20px", left: "30px"}}>
                <button className="back-btn" onClick={this.toMain}><i className="fas fa-arrow-left"></i></button>
            </div>
        </React.Fragment>
        );
    }
}
