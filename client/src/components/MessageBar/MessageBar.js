import React, { Component } from 'react';
import './MessageBar.css';

export default class Navbar extends Component {
  render() {
    const {isWarning, children, showDiv, handleCancel, handleAccept } = this.props
    return (
        <div className="message-bar" style={{display: `${showDiv ? "block" : "none"}`, backgroundColor: `${isWarning ? "#740b0b" : "#00b5ad"}`, zIndex: "10"}}>
        {isWarning ? 
            <p>{children}
            <span className="msg-btn" style={{right: "30px"}} onClick={handleCancel}><i className="fas fa-times"></i></span>
          </p> : 
          <p>You can earn daily pebbles, do you accept?
            <span className="msg-btn" style={{right: "90px"}} onClick={handleAccept}><i className="fas fa-check"></i></span>
            <span className="msg-btn" style={{right: "30px"}} onClick={handleCancel}><i className="fas fa-times"></i></span>
          </p>}
          
        </div>
    )
  }
}
