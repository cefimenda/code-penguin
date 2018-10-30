import React, { Component } from 'react';
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import HoverBox from "../../components/HoverBox";
import { Menu } from 'semantic-ui-react'
import './Profile.css';

export default class Profile extends Component {
    state = {
        focus: "left",
        activeItem: 'home'
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <React.Fragment>
                <Navbar />
                <HoverBox side={this.state.focus} prof={this.props.profseed}>
                    <Menu pointing secondary vertical>
                        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                        <Menu.Item name='solved' active={activeItem === 'solved'} onClick={this.handleItemClick} />
                        <Menu.Item name='setting' active={activeItem === 'setting'} onClick={this.handleItemClick} />
                    </Menu>
                </HoverBox>
                <Container padding={this.state.focus} bgcolor="rgb(32,32,32)">
                    <div className="div-404">
                        <h1>Portfolio</h1>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}
