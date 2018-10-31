import React, { Component } from 'react'
import './Container.css';

export default class Container extends Component {
    render() {
        let padd = ""

        if (this.props.padding === "left") {
            padd = "50px 100px 50px 550px" 
        } else if (this.props.padding === "right") {
            padd = "50px 550px 50px 100px" 
        } else {
            padd = "50px 100px" 
        }

        return (
            <div className="main-container" style={{ padding: `${padd}`, backgroundColor: `${this.props.bgcolor}`}}>
                {this.props.children}
            </div>
        )
    }
}
