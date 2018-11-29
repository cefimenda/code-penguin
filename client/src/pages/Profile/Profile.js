import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import HoverBox from '../../components/HoverBox/HoverBox';
import Table from '../../components/Table';
import GitTask from '../../components/GitTask';
import Modal from '../../components/Modal';
import API from '../../utils/API';
import './Profile.css';

export default class Profile extends Component {
  state = {
    page: 'History',
    creator: '',
    avatar: '/images/penguin.png',
    pebbles: '',
    withdrawals: [],
    deposits: [],
    totalSol: 0,
    totalTask: 0,
    modalOpen: false
  };

  componentDidMount = () => {
    this.getHash();
    this.getTransactions();
  };

  getHash = () => {
    const getUserName = sessionStorage.getItem('user');
    API.getUser()
      .then(res => {
        this.setState({
          creator: `${getUserName === '' ? res.data.hash : getUserName}`,
          pebbles: res.data.pebbles
        });
      })
      .catch(err => console.log(err));
  };

  getTransactions = () => {
    API.getTransactionHistory()
      .then(res => {
        this.setState({
          withdrawals: res.data.withdrawals,
          deposits: res.data.deposits
        });
      })
      .catch(err => console.log(err));
  };

  getTotal = e => {
    const { name, value } = e;
    this.setState({ [name]: value });
  };

  pageChange = () => {
    if (this.state.page === 'Transaction') {
      this.setState({ page: 'History' });
    } else {
      this.setState({ page: 'Transaction' });
    }
  };

  handleModal = () => {
    if (this.state.modalOpen) {
      this.setState({ modalOpen: false });
    } else {
      this.setState({ modalOpen: true });
    }
  };

  render() {
    const focus = 'left';
    let { page, creator, withdrawals, deposits, pebbles, totalSol, totalTask } = this.state;
    let data = withdrawals.concat(deposits);

    return (
      <React.Fragment>
        <Navbar page="Profile" />
        <HoverBox side={focus}>
          <p className="user-edit">
            <i className="fas fa-user-edit" onClick={this.handleModal} />
          </p>
          <div className="user-label">
            <p>
              Hello,
              <br/>
              <span className={`${creator.length >= 20 ? 'span-long-user' : 'span-short-user'}`}>
                {creator}
              </span>
            </p>
            <hr />
          </div>
          <div className="user-stats">
            <p>
              Total Pebble Count: <span>{pebbles}</span>
            </p>
            <p>
              Total Solution Submitions: <span>{totalSol}</span>
            </p>
            <p>
              Total Tasks Created: <span>{totalTask}</span>
            </p>
          </div>
        </HoverBox>
        <Container padding={focus} bgcolor="rgb(32,32,32)">
          <div style={{ position: 'relative', width: '100%', marginTop: '10%' }}>
            {page === 'Transaction' ? (
              <span className="prof-arrows prof-arrows-left" onClick={this.pageChange}>
                <i className="fas fa-arrow-left" />
              </span>
            ) : (
              ''
            )}
            {page === 'History' ? (
              <span className="prof-arrows prof-arrows-right" onClick={this.pageChange}>
                <i className="fas fa-arrow-right" />
              </span>
            ) : (
              ''
            )}
          </div>

          <h2 className="table-header">
            {page === 'Transaction'
              ? 'Pebble Transaction History'
              : 'User History'}
          </h2>
          {page === 'Transaction' ? (
            <Table data={data} deposits={deposits} withdrawals={withdrawals} />
          ) : (
            ''
          )}
          {page === 'History' ? <GitTask getTotal={this.getTotal} /> : ''}
        </Container>
        <Modal
          creator={creator}
          modalOpen={this.state.modalOpen}
          modalfunction={this.handleModal}
        />
      </React.Fragment>
    );
  }
}
