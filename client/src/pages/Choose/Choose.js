import React, { Component } from 'react';
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import HoverBox from "../../components/HoverBox/HoverBox";
import Profinfo from "../../components/HoverBox/Profileinfo";
import './Choose.css';

export default class Choose extends Component {
    render() {
        const focus = "left"

        return (
            <React.Fragment>
                <Navbar />
                <HoverBox side={focus}>
                    <Profinfo prof={this.props.profseed}/>
                </HoverBox>
                <Container padding={focus} bgcolor="rgb(32,32,32)">
                    <div className="div-404">
                        <h1>Chosen</h1>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}
