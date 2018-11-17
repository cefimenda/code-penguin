import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import HoverBox from '../../components/HoverBox/HoverBox';
import Table from '../../components/Table';
import API from '../../utils/API';
import './Profile.css';

export default class Profile extends Component {
  state = {
    creator: '',
    avatar: 'https://via.placeholder.com/150',
    pebbles: '',
    withdrawals: [],
    deposits: [],
    hasGithub: false
  };

  componentDidMount = () => {
    this.getHash();
    this.getTransactions();
  };

  getHash = () => {
    API.getUser()
      .then(res => {
        let { github } = res.data.userdata[0].Entry || null;
        this.setState({
          creator: github || res.data.hash,
          pebbles: res.data.pebbles
        });
        if (github) {
          this.setState({
            hasGithub: true
          });
          API.getGithub(github)
            .then(res => {
              this.setState({
                avatar: res.data.avatar_url
              });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  getTransactions = () => {
    API.getTransactionHistory().then(res => {
      this.setState({
        withdrawals: res.data.withdrawals,
        deposits: res.data.deposits
      });
    })
    .catch(err => console.log(err))
  };

  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.setUserData({
      github: this.state.creator
    })
      .then(res => {
        this.getHash();
      })
      .catch(err => {});
  };

  
  render() {
    const focus = 'left';
    let { withdrawals, deposits } = this.state;
    let data = withdrawals.concat(deposits);
    return (
      <React.Fragment>
        <Navbar page="Profile" />
        <HoverBox side={focus}>
          <div className="profile-div" style={{ margin: '10px 0' }}>
            {this.state.hasGithub ? (
              <div>
                <div className="label">
                  <label>Hello, </label>
                </div>
                <span className="span-user">{this.state.creator.toUpperCase()}</span>
              </div>
            ) : (
              <div>
                <div className="label">
                  <label>Add your github username?</label>
                  <form onSubmit={this.state.handleFormSubmit}>
                    <input
                      value={this.state.creator}
                      name="creator"
                      type="text"
                      onChange={this.handleInputChange}
                      placeholder="username"
                    />
                    <button onClick={this.handleFormSubmit}>Submit</button>
                  </form>
                </div>
              </div>
            )}
            <img
              className="avatar"
              width="150px"
              src={this.state.avatar}
              alt={this.state.creator}
            />
            <span className="span-pebbles">Today's Pebble Count {this.state.pebbles}</span>
          </div>
        </HoverBox>
        <Container padding={focus} bgcolor="rgb(32,32,32)">
          <h2 className="table-header">Pebble Transaction History</h2>
          <Table data={data} deposits={deposits} withdrawals={withdrawals}/>
        </Container>
      </React.Fragment>
    );
  }
}
