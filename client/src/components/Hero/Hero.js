import React, { Component } from 'react';
import PostPage from './Posts';
import './Hero.css';

export default class Hero extends Component {
  render() {
    return (
      <React.Fragment>
        <section
          id="hero"
          style={{
            background: `url(${this.props.heroimg}) no-repeat center center fixed`,
            backgroundSize: 'cover'
          }}
        >
          <div className="hero-inner">
            <PostPage />
          </div>
        </section>
        <div className="heightblock" />
      </React.Fragment>
    );
  }
}
