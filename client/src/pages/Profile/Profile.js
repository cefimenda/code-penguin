import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import HoverBox from '../../components/HoverBox/HoverBox';
import Table from '../../components/Table';
// import ProfileInfo from '../../components/HoverBox/ProfileInfo';
import API from '../../utils/API';
import './Profile.css';

export default class Profile extends Component {
  state = {
    creator: '',
    avatar: 'https://via.placeholder.com/150',
    pebbles: '',
    withdrawals: [],
    deposits: [],
    hasGithub: false,
    taskTitle: ''
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
              // console.log(res);
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
      // let wdTitle = res.data.withdrawals.map(wd => {
  	  // console.log(wd.Hash)
      //   let title = await API.getTransactionTitle(wd.Hash)
      //   // console.log('title', title)
      //     console.log(title)
      //   return wd = {...wd, title}
      // })

      // console.log(wdTitle)
      let dTitle = res.data.deposits.map(wd => {
        let title = API.getTransactionTitle(wd.Hash).then(console.log)
        return {...wd, title }
      })
      this.setState({
        withdrawals: res.data.withdrawals,
        deposits: dTitle
      });
    }).catch(err => console.log(err))
  };

  // getTransactions = () => {
  //   API.getTransactionHistory()
  //     .then(res => {
  //       let wdTitle = res.data.withdrawals.map(async wd => {
  //         console.log(wd.Hash);
  //         let title = await API.getTransactionTitle(wd.Hash);
  //         console.log(title);
  //         return { ...wd, title };
  //       });
  //       this.setState({
  //         taskTitle: wdTitle,
  //         withdrawals: res.data.withdrawals,
  //         deposits: res.data.deposits
  //       });
  //     })
  //     .catch(err => console.log(err));
  // };


  // getTransactions = () => {
  //   API.getTransactionHistory()
  //     .then(res => {
  //       let arrayData = []
  //       res.data.withdrawals.forEach( wd => {
  //         arrayData.push({type:"withdraw", hash: wd.Hash})
  //       })

  //       res.data.deposits.forEach( dp => {
  //         arrayData.push({type:"deposit", hash: dp.Hash})
  //       })
  //       this.setState({
  //         withdrawals: res.data.withdrawals,
  //         deposits: res.data.deposits
  //       });
  //       return arrayData
  //     })
  //     .then(res => {
  //       console.log(res)
  //       this.getTitle(res)
  //     })
  //     .catch(err => console.log(err));
  // };

  getTitle = hash => {
    hash.forEach( data => {
      // console.log(data.type);
      API.getTransactionTitle(data.hash)
      .then(res => {
        console.log(res.data.taskTitle);
        this.setState({
          taskTitle: res.data.taskTitle
        })
      })
    })
  }

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
    console.log(this.state.taskTitle)
    const focus = 'left';
    let { withdrawals, deposits, taskTitle } = this.state;
    let data = withdrawals.concat(deposits);
    return (
      <React.Fragment>
        <Navbar page="Profile" />
        <HoverBox side={focus}>
          {/* <ProfileInfo prof={this.props.profSeed}/> */}
          <div className="input-div" style={{ margin: '10px 0' }}>
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
            {/* <span className="span-user">QmWtWoTu6qeSkiSBW7F7sKnrEYowfunci5BLHzpZDuxTjy</span> */}
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
          <Table data={data} deposits={deposits} withdrawals={withdrawals} taskTitle={taskTitle} getTitle={this.getTitle.bind(this)}/>
        </Container>
      </React.Fragment>
    );
  }
}

// res.data.deposits/withdrawals.Entry.time/pebbles/origin
// {
//   "deposits": [
//     {
//       "Entry": {
//         "destination": "QmXNJrCDFCpqFVRcWQ3Tr6uZ7N6GZ5ssQfKcMUzqQTiJaX",
//         "origin": "QmTHhcNysEfNUyAczp9j9ACJW1jMho4yYnEzUinAMSqFg6",
//         "pebbles": 1000,
//         "time": 1542075242085
//       },
//       "EntryType": "transaction",
//       "Hash": "QmbAa5qeHUFRJ49PcnwGWj8px7EbhFyUrAaNaw31cq4dHd",
//       "Source": "QmXNJrCDFCpqFVRcWQ3Tr6uZ7N6GZ5ssQfKcMUzqQTiJaX"
//     }
//   ],
//   "withdrawals": [
//     {
//       "Entry": {
//         "destination": "QmdgL2Vcuyg9aoCp5E1f8pTq9W11YWkBp2pRT4resVwjsU",
//         "origin": "QmXNJrCDFCpqFVRcWQ3Tr6uZ7N6GZ5ssQfKcMUzqQTiJaX",
//         "pebbles": 25,
//         "time": 1542075242136
//       },
//       "EntryType": "transaction",
//       "Hash": "QmWZJsc9FhvmKJEjnXo3ro1LQ7oQHEew4MapuCwfXgPc2n",
//       "Source": "QmXNJrCDFCpqFVRcWQ3Tr6uZ7N6GZ5ssQfKcMUzqQTiJaX"
//     },
//     {
//       "Entry": {
//         "destination": "QmbmgjGku2sQRtKF849ZtWWfhFHhacjracUMPU9AWVauyi",
//         "origin": "QmXNJrCDFCpqFVRcWQ3Tr6uZ7N6GZ5ssQfKcMUzqQTiJaX",
//         "pebbles": 200,
//         "time": 1542075242244
//       },
//       "EntryType": "transaction",
//       "Hash": "QmRbPRJYK2aQq949BHohRxLy2fXuzQPViUEEDnHX3iwNqy",
//       "Source": "QmXNJrCDFCpqFVRcWQ3Tr6uZ7N6GZ5ssQfKcMUzqQTiJaX"
//     }
//   ]
// }
