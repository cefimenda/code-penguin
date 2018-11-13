import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import HoverBox from '../../components/HoverBox/HoverBox';
import ProfileInfo from '../../components/HoverBox/ProfileInfo';
import API from '../../utils/API';
import './Profile.css';

export default class Profile extends Component {
  state = {
    creator: '',
    pebbles: '',
    withdrawals: [],
    deposits: []
  };

  componentDidMount = () => {
    this.getHash();
  };

  getHash = () => {
    API.getUser()
      .then(res => {
        this.setState({
          creator: res.data.userdata.Entry.github || res.data.hash,
          pebbles: res.data.pebbles
        });
      })
      .catch(err => console.log(err));
  };

  getTransactions = () => {
    API.getTransactions().then(res => {
      this.setState({
        withdrawals: res.data.withdrawals,
        deposits: res.data.deposits
      });
    });
  };

  render() {
    const focus = 'left';

    return (
      <React.Fragment>
        <Navbar page="Profile" />
        <HoverBox side={focus}>
          {/* <ProfileInfo prof={this.props.profSeed}/> */}
          <div className="input-div" style={{ margin: '10px 0' }}>
            <div className="label">
              <label>Hi Code Penguin User</label>
            </div>
            <span className="span-user">{this.state.creator}</span>
            <span className="span-pebbles">Pebble Count {this.state.pebbles}</span>
          </div>
        </HoverBox>
        <Container padding={focus} bgcolor="rgb(32,32,32)">
          <div className="div-404">
            <h2>Pebble Transaction History</h2>

            <table>
              <tr>
                <th>Date</th>
                <th>Task Name</th>
                <th>Pebbles</th>
              </tr>
              <tr>
                <td>10/31/18</td>
                <td>How to JavaScript</td>
                <td>+25</td>
              </tr>
              <tr>
                <td>11/2/18</td>
                <td>Learn React</td>
                <td>+100</td>
              </tr>
              <tr>
                <td>12/1/18</td>
                <td>Graduation</td>
                <td>+200</td>
              </tr>
            </table>

          </div>
        </Container>
      </React.Fragment>
    );
  }
}
