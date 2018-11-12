import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import TaskBox from '../../components/TaskBox';
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
        toggler: 'solutions'
    };

    componentDidMount = () => {
        this.getInfo();
        console.log('solutions', this.state.task.solutions);
        console.log('comments', this.state.task.comments);
    };

    getInfo = () => {
        API.getTask(this.props.match.params.hash)
            .then(res => {
                this.setState({ task: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    };

    handleButton = event => {
        this.setState({ toggler: event.target.name });
    };

    render() {
        var { task } = this.state;
        return (
        <React.Fragment>
            <Navbar />
            <Container bgcolor="rgb(32,32,32)">
                <TaskBox>
                    <div className="title-div">
                        <h2 className="task-title">{task.title}</h2>
                    </div>
                    <div className="pebble-div">
                        <span> {task.pebbles === '' || task.pebbles === undefined ? '0' : `${task.pebbles}`} </span>
                        <img className="task-pebble-img" src="http://pluspng.com/img-png/circle-objects-png-object-256.png" alt="pebbles" />
                    </div>
                    <div className="sol-com-btn-div">
                        <Button.Group size="mini" compact>
                            <Button name="solutions" onClick={this.handleButton} color={this.state.toggler === 'solutions' ? 'teal' : 'grey'}> Solutions </Button>
                            <Button.Or />
                            <Button name="comments" onClick={this.handleButton} color={this.state.toggler === 'comments' ? 'teal' : 'grey'} > Comments </Button>
                        </Button.Group>
                    </div>
                    <Grid divided="vertically">
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <div className="task-problem">
                                    <div className="tag-div-box">
                                        <p>{task.tags.map(tag => '#' + tag).join(' ')}</p>
                                    </div>
                                    <h4>Details:</h4>
                                    <p className="detail-p">{task.details}</p>
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <ul style={{ display: `${this.state.toggler === 'solutions' ? 'block' : 'none'}` }}>
                                    {task.solutions.length !== 0 ? task.solutions.map((solution, i) => ( <li key={i}> <a href={solution.Entry.link}>{solution.Entry.text}</a> </li>)) : <p>There are currently no solutions</p>}
                                </ul>
                                <ul  style={{ display: `${this.state.toggler === 'comments' ? 'block' : 'none'}` }} >
                                    {task.comments !== 0 ? task.comments.map((comment, i) => <li key={i}>{comment.Entry.text}</li>) : <p>There are currently no comments</p>}
                                </ul>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <div className="creator-info-div">
                        <p>Creator: {task.creator}</p>
                        <p>Created: {new Date(task.time).toString()}</p>
                    </div>
                </TaskBox>
            </Container>
        </React.Fragment>
        );
    }
}
