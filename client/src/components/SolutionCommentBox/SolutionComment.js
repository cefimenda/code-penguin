import React, { Component } from 'react';
import './SolutionComment.css';

export default class SolutionComment extends Component {
    handleReward = () => {
        this.props.reward(this.props.solHash)
    }

    render() {
        return (
            <React.Fragment>
                {this.props.solution ? 
                    <div className="show-div">
                        {this.props.isCreator && this.props.rewardHash === "" ? <button onClick={this.handleReward}><i className="fas fa-check"></i></button> : ""}
                        <a className="solution-link" href={this.props.solutionInfo.link.includes("http") ? this.props.solutionInfo.link : `https://${this.props.solutionInfo.link}`} target="_blank" rel="noopener noreferrer" >
                            <li className= {this.props.solHash === this.props.rewardHash ? "reward-box" : "solution-box" }> 
                                <span>{this.props.solutionInfo.text}</span>
                            </li>
                        </a>
                    </div>
                     : 
                    <li className="comment-box"> 
                        {this.props.commentText} 
                    </li>
                }
            </React.Fragment>
        );
    }
}
