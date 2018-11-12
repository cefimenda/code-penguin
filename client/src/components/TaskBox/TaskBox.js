import React, { Component } from 'react';
import './TaskBox.css';

export default class TaskBox extends Component {
    render() {
        return (
            <div className="task-div">
                {this.props.children}
            </div>
        );
    }
}
