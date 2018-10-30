import React, { Component } from 'react';
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import './NoMatch.css';

export default class NoMatch extends Component {
  render() {
    return (
        <React.Fragment>
            <Navbar />
            <Container bgcolor="rgb(32,32,32)">
                <div className="div-404">
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                </div>
            </Container>
        </React.Fragment>
    );
  }
}
