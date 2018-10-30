import React, { Component } from 'react'
import Profinfo from "./Profileinfo";
import './HoverBox.css';

export default class HoverBox extends Component {
    state = {
        side: "",
        shadow: ""
    }
    componentDidMount() {
        // control shadow box
        this.setState({ side: this.props.side });
        if (this.props.side === "right") {
            this.setState({ shadow: "10px" })
        } else {
            this.setState({ shadow: "-10px" })
        }
    }


    render() {
        return (
            <div className="fixed-box" style={{ [this.state.side] : "8%", boxShadow: `${this.state.shadow} 10px 8px #00000091`}}>
                {this.props.prof ? <Profinfo prof={this.props.prof} menu= {this.props.children}/> : this.props.children}
            </div>
        )
    }
}
