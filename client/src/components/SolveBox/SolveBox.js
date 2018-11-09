import React, { Component } from 'react';
import './SolveBox.css';

export default class SolveBox extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="main-container">
          <iframe
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
          />
        </div>
        {/* <textarea name="" id="" cols="90" rows="30"></textarea> */}
        {/* <iframe width="100%" height="300" src="//jsfiddle.net/reactjs/69z2wepo/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe> */}
      </React.Fragment>
    );
  }
}
