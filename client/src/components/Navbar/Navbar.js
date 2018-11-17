import React, { Component } from 'react';
import API from '../../utils/API';
import './Navbar.css';

export default class Navbar extends Component {
  state = {
    auth: false,
    slide: 0,
    lastScrollY: 0,
    color: 'transparent',
    userPebbles: '',
    creator: '',
    avatar: 'https://via.placeholder.com/150'
  };

  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidMount = () => {
    this.getHash();
  };

  getHash = () => {
    API.getUser()
      .then(res => {
        let { github } = res.data.userdata[0].Entry || null;
        this.setState({ userPebbles: res.data.pebbles, creator: github || res.data.hash });
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
            .catch(err => {}/*console.log(err)*/);
        }
      })
      .catch(err => {}/*console.log(err)*/);
  };

  handleScroll = () => {
    const { lastScrollY } = this.state;
    const currentScrollY = window.scrollY;

    // navbar color effect
    if (window.scrollY > 10) {
      this.setState({ color: 'rgba(32, 32, 32, 0.9)' });
    } else {
      this.setState({ color: 'transparent' });
    }

    // navbar slide effect
    if (currentScrollY > lastScrollY && window.scrollY > 200) {
      this.setState({ slide: '-80px' });
    } else {
      if (window.scrollY < 800) {
        this.setState({ slide: '0px' });
      }
    }
    this.setState({ lastScrollY: currentScrollY });
  };

  render() {
    return (
      <React.Fragment>
        <div
          id="navigation"
          className="navbar navbar-fixed-top"
          style={{ transform: `translate(0, ${this.state.slide})`, transition: 'all 150ms linear' }}
        >
          <div
            className="navbar-inner"
            style={{ backgroundColor: `${this.state.color}`, transition: 'all 300ms ease-in-out' }}
          >
            <div className="container">
              <nav>
                <ul className="nav">
                  <li key="1">
                    <a href="/">
                      <h4 className="ui white"> Code Penguin</h4>
                    </a>
                  </li>
                  <li key="4" className="float-right">
                    <a href="/landing">
                      <p className={this.props.page === 'Landing' ? 'ui white navbold' : 'ui white'}>About</p>
                    </a>
                  </li>
                  <li key="3" className="float-right">
                    <a href="/">
                      <p className={this.props.page === 'Marketplace' ? 'ui white navbold' : 'ui white'}>
                        Marketplace
                      </p>
                    </a>
                  </li>
                  <li key="2" className="float-right">
                    <a href="/profile">
                      <img
                        className="mini-avatar"
                        width="30px"
                        src={this.state.avatar}
                        alt={this.state.creator}
                      />
                      <p className={this.props.page === 'Profile' ? 'ui white navbold' : 'ui white'}>
                        {this.state.userPebbles}
                      </p>
                      <img
                        className="nav-pebble-img"
                        src="http://pluspng.com/img-png/circle-objects-png-object-256.png"
                        alt="pebbles"
                      />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
