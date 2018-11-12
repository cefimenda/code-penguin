import React, { Component } from 'react';
import './Comment.css';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    alert('The value is: ' + this.input.value);
    e.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <div className="main-container">
        <form onSubmit={this.handleSubmit}>
        <label>
          Add Comment:
          <input className="comment" type="text" placeholder="Add Comment" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        </div>
        <textarea name="" id="" cols="90" rows="30"></textarea>
      </React.Fragment>
    );
  }
}
