import React, { Component } from 'react'
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

    gotoInfo = () => {
        this.props.handle("info")
    }

    gotoTestamonial = () => {
        this.props.handle("testamonial")
    }

    gotoAdditional = () => {
        this.props.handle("additional")
    }

    render() {
        const { currState } = this.props
        return (
            <React.Fragment>
                <h1 className="github-h1">App Info</h1>
                <div className="steps-box">
                    <span onClick={this.gotoInfo} style={{ fontWeight: `${currState === "info" ? "bolder" : "normal"}`}}>Information</span>
                    <hr />
                    <span onClick={this.gotoTestamonial} style={{ fontWeight: `${currState === "testamonial" ? "bolder" : "normal"}`}}>Testamonials</span>
                    <hr />
                    <span onClick={this.gotoAdditional} style={{ fontWeight: `${currState === "additional" ? "bolder" : "normal"}`}}>Additional Resources</span>
                </div>
            </React.Fragment>
        )
    }
}
