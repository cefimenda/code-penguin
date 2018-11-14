import React, { Component } from 'react';
import './SolutionComment.css';

export default class SolutionComment extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.solution ? 
                    <a className="solution-link" href={this.props.solutionLink.includes("http") ? this.props.solutionLink : `https://${this.props.solutionLink}`} target="_blank" rel="noopener noreferrer" >
                        <li className= "solution-box"> 
                            {this.props.solutionText}
                        </li>
                    </a> : 
                    <li className="comment-box"> 
                        {this.props.commentText} 
                    </li>
                }
            </React.Fragment>
        );
    }
}
