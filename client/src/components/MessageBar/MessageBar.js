import React, { Component } from 'react';
import API from '../../utils/API';
import './MessageBar.css';

export default class Navbar extends Component {
  state = {
    dailytoken: false,
    tokenAmount: 0
  };

  componentDidMount = () => {
    this.canDist()
    this.dist()
  };

  canDist = () => {
    API.canDistribute()
      .then(res => {
        console.log("can dist: ",res);
      })
      .catch(err => console.log(err));
  };

  dist = () => {
    API.distribute()
      .then(res => {
        console.log("dist: ",res);
      })
      .catch(err => console.log(err));
  };

  handleAccept = () => {
    console.log("accepted");
    this.setState({ dailytoken: false})
  }

  handleCancel = () => {
    this.setState({ dailytoken: false})
  }

  render() {
    const { dailytoken, tokenAmount } = this.state
    const {isWarning} = this.props
    if (isWarning) { return (
      <div className="message-bar" style={{backgroundColor: "#740b0b"}}>
        <p>{this.props.children}
          <span className="msg-btn" style={{right: "30px"}} onClick={this.handleCancel}><i className="fas fa-times"></i></span>
        </p>
      </div>
    )} else if (dailytoken) { return (
        <div className="message-bar" style={{backgroundColor: "#00b5ad"}}>
          <p>You can earn <span style={{fontWeight: "bolder"}}> {tokenAmount} </span> pebbles, do you accept?
            <span className="msg-btn" style={{right: "90px"}} onClick={this.handleAccept}><i className="fas fa-check"></i></span>
            <span className="msg-btn" style={{right: "30px"}} onClick={this.handleCancel}><i className="fas fa-times"></i></span>
          </p>
        </div>
    )}
  }
}
