import React, { Component } from 'react';
import './SolveBox.css';

export default class SolveBox extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    //link to HoloChain
    alert('The value is: ' + this.input.value);
    e.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <div className="main-container">
        <form onSubmit={this.handleSubmit}>
        <label>
          Insert Solution Link:
          <input className="urlBox" type="text" placeholder="Github Url Only" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
          {/* <iframe
            title="codesandbox"
            className="codesandbox"
            src="https://codesandbox.io/embed/new?codemirror=1"
            style={{
              width: '100%',
              height: '500px',
              marginTop: '10px',
              border: '0',
              borderRadius: '4px',
              overflow: 'hidden'
            }}
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          /> */}
        </div>
        {/* <textarea name="" id="" cols="90" rows="30"></textarea> */}
      </React.Fragment>
    );
  }
}
