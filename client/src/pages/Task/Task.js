import React, { Component } from 'react';
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import TaskBox from "../../components/TaskBox";
import { Button, Grid } from 'semantic-ui-react';
import './Task.css';
import API from '../../utils/API';
export default class Task extends Component {
    state = {
        task: {
            comments: [],
            solutions: [],
            tags: [],
            title: "",
            details: "",
            pebbles: "",
            creator: "",
            time: ""
        },
        toggler: "solutions"
    }
    componentDidMount = () => {
        this.getInfo();
        console.log("pebbles", this.state.task.pebbles === "");
        
    }
    getInfo = () => {
        API.getTask(this.props.match.params.hash)
            .then(res=>{
                console.log(res.data);
                this.setState({
                    task: res.data
                })
            })
            .catch(err=>{
                console.log(err);
            });
    }
    handleButton = event => {
        this.setState({ toggler: event.target.name }, () => {console.log(this.state.toggler);
        });
    }
    render() {
        var {task} = this.state;
        console.log(task.tags);
        return (
            <React.Fragment>
                <Navbar />
                <Container bgcolor="rgb(32,32,32)">
                    <TaskBox>
                    <Grid divided='vertically'>
                        <Grid.Row columns={2}>
                        <Grid.Column>
                            <div className="task-problem">
                                <h1>{task.title}</h1>
                                <div className="pebble-div">
                                    <span>{task.pebbles === "" || task.pebbles === undefined ? "0" : `${task.pebbles}`}</span><img className="task-pebble-img" src='http://pluspng.com/img-png/circle-objects-png-object-256.png' alt="pebbles"/>
                                </div>
                                <p>{task.tags.map(tag=>"#"+tag).join(" ")}</p>
                                <p>{task.details}</p>
                                <p>{task.creator}</p>
                                <p>{(new Date(task.time)).toString()}</p>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <Button.Group size='mini' floated='right' compact>
                                <Button name="solutions" onClick={this.handleButton} color={this.state.toggler === "solutions" ? "teal" : "grey"}>Solutions</Button>
                                <Button.Or />
                                <Button name="comments" onClick={this.handleButton} color={this.state.toggler === "comments" ? "teal" : "grey"}>Comments</Button>
                            </Button.Group>
                            <ul style={{display: `${this.state.toggler === "solutions" ? "block" : "none"}`}}>
                                {task.solutions ? task.solutions.map((solution, i)=><li key={i}><a href={solution.Entry.link}>{solution.Entry.text}</a></li>) : <p>There are currently no solutions</p>}
                            </ul>
                            <ul style={{display: `${this.state.toggler === "comments" ? "block" : "none"}`}}>
                                {task.comments ? task.comments.map((comment, i)=><li key={i}>{comment.Entry.text}</li>) : <p>There are currently no comments</p>}
                            </ul>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    </TaskBox>
                </Container>
            </React.Fragment>
        );
    }
}