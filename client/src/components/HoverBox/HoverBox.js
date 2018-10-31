import React, { Component } from 'react'
import Profinfo from "./Profileinfo";
import './HoverBox.css';

export default class HoverBox extends Component {
    render() {
        let side = this.props.side
        let shadow = ""

        if (this.props.side === "right") {
             shadow = "10px" 
        } else {
             shadow = "-10px" 
        }

        return (
            <div className="fixed-box" style={{ [side] : "8%", boxShadow: `${shadow} 10px 8px #00000091`}}>
                {this.props.prof ? <Profinfo prof={this.props.prof} menu= {this.props.children}/> : this.props.children}
            </div>
        )
    }
}
