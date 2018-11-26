import React, { Component } from 'react'
import './HoverBox.css';

export default class HoverBox extends Component {
    render() {
        let side = this.props.side
        let shadow = ""

        if (this.props.side === "left") {
             shadow = "-10px" 
        } else {
             shadow = "10px" 
        }

        return (
            <React.Fragment>
                {side === "left" || side === "right" ? 
                <div className="fixed-box" style={{ [side] : "5%", boxShadow: `${shadow} 10px 8px #00000091`}}>
                    {this.props.children}
                </div> : 
                <div className="fixed-box-login" >
                    {this.props.children}
                </div>}
            </React.Fragment>

        )
    }
}
