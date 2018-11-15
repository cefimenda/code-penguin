import React, { Component } from 'react'
import { Image, Button } from 'semantic-ui-react';
import './HoverBox.css';

export default class HoverBox extends Component {

    handleButton = event => {
        const { name } = event.target
        if (name === "Signup") {
            window.location.pathname = "/profile"
        } else if (name === "Login"){
            window.location.pathname = "/"
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <h1 className="github-h1">Login with Github</h1>
                <Image src="https://magentys.io/wp-content/uploads/2017/04/github-logo-1.png" size="small" centered />
                <Button.Group fluid>
                    <Button name="Signup" onClick={this.handleButton}>Sign Up</Button>
                    <Button.Or />
                    <Button name="Login" onClick={this.handleButton} color='teal'>Login</Button>
                </Button.Group>
            </React.Fragment>
        )
    }
}
