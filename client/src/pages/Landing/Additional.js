import React, { Component } from 'react';
import Container from "../../components/Container";
import TitleBox from "../../components/TitleBox";
import './Landing.css';

export default class Main extends Component {
    render() {
        const focus = this.props.side
        return (
        <React.Fragment>
            <Container padding={focus} bgcolor="rgb(32,32,32)">
                <TitleBox title="Additional Resources" titlesize="h2" footer={false}>
                    <ul className="add-info-ul">
                        <li>Code Penguin Heroku: <a href="https://code-penguin.herokuapp.com/" target="_blank" rel="noopener noreferrer">https://code-penguin.herokuapp.com/</a></li>
                        <li>Holochain site: <a href="https://holochain.org/" target="_blank" rel="noopener noreferrer">https://holochain.org/</a></li>
                        <li>Holochain developer site: <a href="https://developer.holochain.org/" target="_blank" rel="noopener noreferrer">https://developer.holochain.org/</a></li>
                        <li>Holochain github: <a href="https://github.com/holochain" target="_blank" rel="noopener noreferrer">https://github.com/holochain</a></li>
                        <li>Other apps from using Holochain: <a href="https://github.com/holochain/apps" target="_blank" rel="noopener noreferrer">https://github.com/holochain/apps</a></li>
                    </ul>
                </TitleBox>
            </Container>
        </React.Fragment>
        );
    }
}
