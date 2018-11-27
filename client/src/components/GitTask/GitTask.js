import React, { Component, Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import './GitTask.css';
import API from '../../utils/API';
import { link } from 'fs';

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

  handleToggler = event => {
    this.setState({ toggler: event.target.name }, () => {
      if (this.state.toggler === 'tasks') {
        this.setState({ solutions: '' });
      } else if (this.state.toggler === 'solutions') {
        this.setState({ comments: '' });
      }
    });
  };

  getHashAndSolutions = () => {
    API.getUser()
      .then(res => {
        this.setState({
          user: res.data.hash,
          maxPebbles: res.data.pebbles
        });
        API.getSolutions(res.data.hash).then(res => {
          // console.log(res.data.solutions);
          this.setState({
            solutions: res.data.solutions
          });
        });
      })
      .catch(err => console.log(err));
  };

  getUserTasks = () => {
    API.getMyTasks()
      .then(res => {
        // console.log(res.data.links);
        this.setState({
          tasks: res.data.links
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let { toggler, user } = this.state;

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
              style={{
                display: `${this.state.toggler === 'solutions' ? 'block' : 'none'}`
              }}
            >
              {this.state.solutions.length !== 0
                ? this.state.solutions.map((solution, i) => (
                    <li className="list-titles" key={i}>
                      {/* <i className="user-edit fas fa-link"></i> */}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                          solution.Entry.link.includes('http')
                            ? solution.Entry.link
                            : `https://${solution.Entry.link}`
                        }
                      >
                        {solution.Entry.text}
                      </a>
                    </li>
                  ))
                : 'There are currently no solutions associated with this user.'}
            </ul>

            <ul
              className="task-ul"
              style={{ display: `${this.state.toggler === 'tasks' ? 'block' : 'none'}` }}
            >
              {this.state.tasks.length !== 0
                ? this.state.tasks.map((task, i) => (
                    <li className="list-titles task-text" key={i}>
                      <span className="li-text">Title:</span> {task.Entry.title} <br />
                      <span className="li-text">Details:</span> {task.Entry.details} <br />
                      <span className="li-text">Pebbles:</span> {task.Entry.pebbles}
                    </li>
                  ))
                : 'There are currently no tasks associated with this user.'}
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}
