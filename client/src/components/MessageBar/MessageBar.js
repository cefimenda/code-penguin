import React, { Component } from 'react';
import API from '../../utils/API';
import './MessageBar.css';

export default class Navbar extends Component {
  state = {
    dailytoken: false
  };

  componentDidMount = () => {
    this.canDist()
  };

  canDist = () => {
    API.canDistribute()
      .then(res => {
        this.setState({dailytoken: res.data})
      })
      .catch(err => console.log(err));
  };

  handleAccept = () => {
    API.distribute()
    .then(() => this.setState({ dailytoken: false}))
    .catch(err => console.log(err));
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
    )}
     return (
        <div className="message-bar" style={{display: `${dailytoken ? "block" : "none"}`, backgroundColor: "#00b5ad"}}>
          <p>You can earn daily pebbles, do you accept?
            <span className="msg-btn" style={{right: "90px"}} onClick={this.handleAccept}><i className="fas fa-check"></i></span>
            <span className="msg-btn" style={{right: "30px"}} onClick={this.handleCancel}><i className="fas fa-times"></i></span>
          </p>
        </div>
    )
  }
}
