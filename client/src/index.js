import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import Test from './test';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Test />, document.getElementById('root'));

serviceWorker.unregister();
