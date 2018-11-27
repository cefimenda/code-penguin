import React, { Component, Fragment } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import Table from '../../components/Table';
import './GitTask.css';
import Task from '../../pages/Task/Task';
import API from '../../utils/API';
import { link } from 'fs';

export default class GitTask extends Component {
  state = {
    // userHistory: {
    //   comments: [],
    //   solutions: [],
    //   title: '',
    //   pebbles: '',
    //   creator: '',
    //   time: ''
    // },
    user: '',
    maxPebbles: '',
    tasks: [],
    solutions: [],
    toggler: 'github solutions'
  };

  componentDidMount = () => {
    this.getHashAndSolutions();
    this.getUserTasks();
  };

  handleToggler = event => {
    this.setState({ toggler: event.target.name }, () => {
      if (this.state.toggler === 'created tasks') {
        this.setState({ solutions: '' });
      } else if (this.state.toggler === 'github solutions') {
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
          // console.log(res.data)
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
        this.setState({
          tasks: res.data.links
        });
        // console.log(res.data);
        console.log(res.data.links);
        // console.log(res.data.links[0].Entry)
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderSolutions = () => {
    return (
      <ul
        className="solution-div"
        style={{ display: `${this.state.toggler === 'github solutions' ? 'block' : 'none'}` }}
      >
        {this.state.solutions.map(solution => (
          <li
            key={solution._id}
            id={solution._id}
            title={solution.title}
            link={solution.link}
            detail={solution.detail}
            date={solution.date}
          />
        ))}
      </ul>
    );
  };

  renderTasks = () => {
    const userTask = this.state.tasks.map((task, i) => (
      <li
        key={i}
        id={i}
        title={task[i].Entry.title}
        detail={task[i].Entry.details}
        date={task[i].Entry.time}
      >
        {task[i].Entry.title}
      </li>
    ));
    return userTask;
  };

  // renderTasks = () => {
  //   let userTask = this.state.tasks.links.map((taskData, i, tasks) => {
  //     return {
  //       key: i,
  //       title: taskData.Entry.title,
  //       detail: taskData.Entry.details
  //     }
  //   })
  //   console.log(userTask)
  // }

  // renderTaskItems = (tasks) => {
  //   let taskItems = []
  //   if (!tasks) return
  //   for(let i = 0; i < tasks.length; i++) {
  //     let title = tasks[i].title
  //     let details = tasks[i].details
  //   }
  //   return taskItems
  // };

  render() {
    // let { solutions, tasks } = this.props
    // let { toggler, user } = this.state;
    let { solutions, tasks, toggler, user } = this.state;


    return (
      <Fragment>
        <div className="toggle-div">
          <div className="git-task-div">
            <Button.Group size="mini" compact>
              <Button
                name="github solutions"
                onClick={this.handleToggler}
                color={toggler === 'github solutions' ? 'teal' : 'grey'}
              >
                {' '}
                Github Solutions{' '}
              </Button>
              <Button.Or />
              <Button
                name="created tasks"
                onClick={this.handleToggler}
                color={toggler === 'created tasks' ? 'teal' : 'grey'}
              >
                {' '}
                Created Tasks{' '}
              </Button>
            </Button.Group>
          </div>
          <div className="show-toggle-div">
            <ul
              className="task-div"
              style={{ display: `${this.state.toggler === 'created tasks' ? 'block' : 'none'}` }}
            >
              {this.renderTasks}
            </ul>
            {/* {this.renderSolutions} */}
          </div>
          {/* <Grid divided="vertically">
            <Grid.Row columns={1}>
              <Grid.Column>
                
              </Grid.Column>
            </Grid.Row>
          </Grid> */}
        </div>
      </Fragment>
    );
  }
}
