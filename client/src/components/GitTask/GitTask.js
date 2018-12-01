import React, { Component, Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import './GitTask.css';
import API from '../../utils/API';
// import { link } from 'fs';

export default class GitTask extends Component {
  state = {
    user: '',
    maxPebbles: '',
    tasks: [],
    solutions: [],
    toggler: 'solutions'
  };

  componentDidMount = () => {
    this.getHashAndSolutions();
    this.getUserTasks();
  };

  handleToggler = e => {
    const { name } = e.target
    this.setState({ toggler: name });
  };

  getSolutions = res => {
    this.setState({
      user: res.data.hash,
      maxPebbles: res.data.pebbles
    });
    API.getSolutions(res.data.hash).then(res => {
      const value = res.data.solutions.length;
      this.props.getTotal({ name: 'totalSol', value });
      res.data.solutions.sort((a,b)=>b.Entry.time-a.Entry.time);
      this.setState({ solutions: res.data.solutions });
    });
  }

  getHashAndSolutions = () => {
    if (this.props.user === "isUser") {
      API.getUser()
        .then(this.getSolutions)
        .catch(err => console.log(err));
    } else {
      API.getUser(this.props.user)
        .then(this.getSolutions)
        .catch(err => console.log(err));
    }
    
  };

  getTasks = res => {
    const value = res.data.links.length;
    this.props.getTotal({ name: 'totalTask', value });
    res.data.links.sort((a,b)=>b.Entry.time-a.Entry.time);
    this.setState({ tasks: res.data.links });
  }

  getUserTasks = () => {
    if (this.props.user === "isUser") {
      API.getMyTasks()
        .then(this.getTasks)
        .catch(err => console.log(err));
    } else {
      API.getMyTasks(this.props.user)
        .then(this.getTasks)
        .catch(err => console.log(err));
    }
  };

  render() {
    let { toggler } = this.state;

    return (
      <Fragment>
        <div className="toggle-div">
          <div className="git-task-div">
            <Button.Group size="mini" compact>
              <Button
                name="solutions"
                onClick={this.handleToggler}
                color={toggler === 'solutions' ? 'teal' : 'grey'}
              >
                Solutions
              </Button>
              <Button.Or />
              <Button
                name="tasks"
                onClick={this.handleToggler}
                color={toggler === 'tasks' ? 'teal' : 'grey'}
              >
                Tasks
              </Button>
            </Button.Group>
          </div>
          <div className="show-toggle-div">
            <ul
              className="solution-ul"
              style={{ display: `${this.state.toggler === 'solutions' ? 'block' : 'none'}` }}
            >
              {this.state.solutions.length !== 0
                ? this.state.solutions.map((solution, i) => (
                    <a
                      key={i}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={
                        solution.Entry.link.includes('http')
                          ? solution.Entry.link
                          : `https://${solution.Entry.link}`
                      }
                    >
                      <li className="list-titles">
                        {solution.Entry.text}
                        <p className="li-text li-text-right">
                          -- Submitted on: {new Date(solution.Entry.time).toLocaleDateString()}
                        </p>
                      </li>
                    </a>
                  ))
                : 'There are currently no solutions associated with this user.'}
            </ul>

            <ul
              className="task-ul"
              style={{ display: `${this.state.toggler === 'tasks' ? 'block' : 'none'}` }}
            >
              {this.state.tasks.length !== 0
                ? this.state.tasks.map((task, i) => (
                    <a key={i} href={`task/${task.Hash}`}>
                      <li className="list-titles">
                        <p className="li-text">Title: {task.Entry.title}</p>
                        <p className="li-text li-text-right">Pebbles: {task.Entry.pebbles}</p>
                        <p className="li-text li-text-right">
                          Created on: {new Date(task.Entry.time).toLocaleDateString()}
                        </p>
                      </li>
                    </a>
                  ))
                : 'There are currently no tasks associated with this user.'}
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}
