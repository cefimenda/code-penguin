import React, { Component } from 'react'
import './Container.css';

export default class Container extends Component {
  state = {
    padd: ""
  }
  
  componentDidMount() {
    if (this.props.padding === "left") {
      this.setState({ padd: "50px 100px 50px 550px" });
    } else if (this.props.padding === "right") {
      this.setState({ padd: "50px 550px 50px 100px" });
    } else {
      this.setState({ padd: "50px 100px" });
    }
  }


  render() {
    return (
      <div className="main-container" style={{ padding: `${this.state.padd}`, backgroundColor: `${this.props.bgcolor}`}}>
        {this.props.children}
      </div>
    )
  }
}
