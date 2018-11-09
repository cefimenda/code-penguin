import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import SolveBox from '../../components/SolveBox';
import TaskBox from '../../components/TaskBox';
import './Solution.css';

export default class Solution extends Component {
  render() {
    const focus = 'center';

    return (
      <React.Fragment>
        <Navbar page="Solution" />

        <Container padding={focus} bgcolor="rgb(32,32,32)">
          <div className="solutionPage">
            <h1 className="taskTitle">Task</h1>
            <TaskBox />
            <h1 className="solTitle">Solution</h1>
            <SolveBox side={focus} />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
