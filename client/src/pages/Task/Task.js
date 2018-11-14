import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import TaskBox from '../../components/TaskBox';
import SolutionCommentBox from '../../components/SolutionComentBox';
import { Button, Grid } from 'semantic-ui-react';
import './Task.css';
import API from '../../utils/API';

export default class Task extends Component {
    state = {
        task: {
            comments: [],
            solutions: [],
            tags: [],
            title: '',
            details: '',
            pebbles: '',
            creator: '',
            time: ''
        },
        toggler: 'solutions',
        newComment: '',
        newSolutionLink: '',
        newSolutionDes: ''
    };

    componentDidMount = () => {
        this.getInfo();
    };

    getInfo = () => {
        API.getTask(this.props.match.params.hash)
            .then(res => {
                let rawdata = res.data
                // let date = new Date(rawdata.time)
                // let dd = date.getDate()
                // let mm = date.getMonth()+1
                // let hh = date.getHours()
                // let min = date.getMinutes()
                // let AMPM = "AM"
                // const yyyy = date.getFullYear()
                // const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                // if(dd < 10) { dd=`0${dd}`}
                // if(mm < 10) { mm=`0${mm}`}
                // if(min < 10) { min=`0${min}`}
                // if(hh === 0) { hh = 12}
                // if(hh > 12) {
                //     hh = hh-12
                //     AMPM = "PM"
                // }
                // rawdata.time = `${months[mm]} ${dd}, ${yyyy} ${hh}:${min} ${AMPM}`
                let date = new Date(res.data.time)
                rawdata.time = `${date.toDateString()}, ${date.toLocaleTimeString()}`
                this.setState({ task: rawdata });
            })
            .catch(err => {
                console.log(err);
            });
    };

    handleToggle = event => {
        this.setState({ toggler: event.target.name }, () => {
            if (this.state.toggler === "comments") {
                this.setState({ newSolutionLink: "", newSolutionDes: "" });
            } else if (this.state.toggler === "solutions") {
                this.setState({ newComment: "" });
            }
        });
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = () => {
        const task = this.props.match.params.hash
        if (this.state.toggler === "solutions") {
            if (this.state.newSolutionLink.includes("github") && this.state.newSolutionLink.includes(".com")) {
                const text = this.state.newSolutionDes
                const link = this.state.newSolutionLink
                this.addSolution({task, text, link})
            } else {
                alert(`Please add a github link`)
            }
            
        } else if (this.state.toggler === "comments") {
            const ctext = this.state.newComment
            this.addSolution({page: task, text: ctext})
        }
    }

    handleClear = () => {
        this.setState({ newComment: "", newSolutionLink: "", newSolutionDes: ""})
    }

    addSolution = solution => {
        API.createSolution(solution)
            .then(res => {
                this.handleClear()
                this.getInfo()
            }).catch(err =>
                console.log(err)
            );
    }

    addComment = comment => {
        API.createComment(comment)
            .then(res => {
                this.handleClear()
                this.getInfo()
            }).catch(err =>
                console.log(err)
            );
    }

    render() {
        var { task } = this.state;
        return (
        <React.Fragment>
            <Navbar />
            <Container bgcolor="rgb(32,32,32)">
                <TaskBox>
                <div className="pebble-div">
                    <span> {task.pebbles === '' || task.pebbles === undefined ? '0' : `${task.pebbles}`} </span>
                    <img className="task-pebble-img" src="http://pluspng.com/img-png/circle-objects-png-object-256.png" alt="pebbles" />
                </div>
                    <div className="sol-com-btn-div">
                        <Button.Group size="mini" compact>
                            <Button name="solutions" onClick={this.handleToggle} color={this.state.toggler === 'solutions' ? 'teal' : 'grey'}> Solutions </Button>
                            <Button.Or />
                            <Button name="comments" onClick={this.handleToggle} color={this.state.toggler === 'comments' ? 'teal' : 'grey'} > Comments </Button>
                        </Button.Group>
                    </div>
                    <Grid divided="vertically">
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <div className="task-problem">
                                    <h2>{task.title}</h2>
                                    <div className="creator-info-div">
                                        <p>Creator: {task.creator}</p>
                                        <p>Created: {task.time}</p>
                                    </div>
                                    <div className="div-blue-box">
                                        <p style={{wordSpacing: "7px"}}>{task.tags.map(tag => '#' + tag).join(' ')}</p>
                                    </div>
                                    <h4>Details:</h4>
                                    <div className="div-blue-box" style={{minHeight: "50%"}}>
                                        <p>{task.details}</p>
                                    </div>
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div className="sol-col-show-div">
                                    <ul style={{ display: `${this.state.toggler === 'solutions' ? 'block' : 'none'}` }}>
                                        {task.solutions.length !== 0 ? task.solutions.map((solution, i) => ( <SolutionCommentBox solution={true} solutionText={solution.Entry.text} solutionLink={solution.Entry.link} key={i}/> )) : <p>There are currently no solutions</p>}
                                    </ul>
                                    <ul  style={{ display: `${this.state.toggler === 'comments' ? 'block' : 'none'}` }} >
                                        {task.comments.length !== 0 ? task.comments.map((comment, i) => <SolutionCommentBox solution={false} commentText={comment.Entry.text} key={i}/> ) : <p>There are currently no comments</p>}
                                    </ul>
                                </div>
                                <div className="sol-com-input-div">
                                    <input type="text" placeholder="Enter Solution description" name="newSolutionDes" value={this.state.newSolutionDes} onChange={this.handleChange} style={{display: `${this.state.toggler === "solutions" ? "block" : "none"}`}}/>
                                    <input type="text" placeholder="Enter Solution link here" name="newSolutionLink" value={this.state.newSolutionLink} onChange={this.handleChange} style={{display: `${this.state.toggler === "solutions" ? "block" : "none"}`}}/>
                                    <textarea type="text" placeholder="Write your comment here" name="newComment" value={this.state.newComment} onChange={this.handleChange} style={{display: `${this.state.toggler === "comments" ? "block" : "none"}`}}/>
                                    <button className="task-submit" onClick={this.handleSubmit}>Submit</button>
                                    <button className="task-clear" onClick={this.handleClear}>Clear</button>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </TaskBox>
            </Container>
        </React.Fragment>
        );
    }
}
