import React, { Component } from 'react'
import './Hero.css';

export default class Hero extends Component {
  render() {
    return (
        <React.Fragment>
            <section id="hero" style={{ background: `url(${this.props.heroimg}) no-repeat center center fixed`, backgroundSize: "cover"}}>
              <div className="hero-inner">
                  <p>A developer community dedicated to</p>
                  <p><u>Requesting</u>, <u>Creating</u> and <u>Trading</u></p>
                  <p>solutions to coding conundrums.</p>
              </div>
            </section>
            <div className="heightblock"></div>
        </React.Fragment>
    )
  }
}
