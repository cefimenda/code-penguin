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

    gotoTestimonial = () => {
        this.props.handle("testimonial")
    }

    gotoAdditional = () => {
        this.props.handle("additional")
    }

    render() {
        const { currState } = this.props
        return (
            <React.Fragment>
                <h1 className="github-h1">Code Penguin</h1>
                <div className="steps-box">
                    <span onClick={this.gotoInfo} className={`${currState === "info" ? "active" : ""}`}>Information</span>
                    <hr />
                    <span onClick={this.gotoTestimonial} className={`${currState === "testimonial" ? "active" : ""}`}>Testimonials</span>
                    <hr />
                    <span onClick={this.gotoAdditional} className={`${currState === "additional" ? "active" : ""}`}>Additional Resources</span>
                </div>
            </React.Fragment>
        )
    }
}
