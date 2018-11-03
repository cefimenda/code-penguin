import React, { Component } from 'react'
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
            <div className="fixed-box" style={{ [side] : "7%", boxShadow: `${shadow} 10px 8px #00000091`}}>
                {this.props.children}
            </div>
        )
    }
}
