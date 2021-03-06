import React, { Component } from 'react';
import API from '../../utils/API';
import './SolutionComment.css';

export default class SolutionComment extends Component {
    state = {
        username: '',
        userHash: this.props.creatorHash
    }
    handleReward = () => {
        this.props.reward(this.props.solHash)
    }

    componentDidMount = () => {
        API.getUser(this.props.creatorHash)
            .then(res=>{
                this.setState({userName: res.data.userdata.username})
            })
            .catch(err => console.log(err));
    }

    render() {
        const {solution, isCreator, rewardHash, solutionInfo, solHash, commentText} = this.props
        return (
            <React.Fragment>
                {solution ? 
                    <div className="show-div">
                        {isCreator && rewardHash === "" ? <button onClick={this.handleReward}><i className="fas fa-check"></i></button> : ""}
                        <a className="solution-link" href={solutionInfo.link.includes("http") ? solutionInfo.link : `https://${solutionInfo.link}`} target="_blank" rel="noopener noreferrer" >
                            <li className= {solHash === rewardHash ? "reward-box" : "solution-box" }> 
                                <span>{solutionInfo.text}</span>
                                <p className="sol-user">-- <a className="user-link" href={`/user/${this.state.userHash}`}>{this.state.userName}</a></p>
                            </li>
                        </a>
                    </div>
                     : 
                    <li className="comment-box"> 
                        {commentText} 
                        <p className="sol-user">-- <a className="user-link" href={`/user/${this.state.userHash}`}>{this.state.userName}</a></p>
                    </li>
                }
            </React.Fragment>
        );
    }
}
