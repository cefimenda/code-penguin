import React, { Component } from 'react';
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import HoverBox from "../../components/HoverBox";
import { Menu } from 'semantic-ui-react'
import './Marketplace.css';

export default class Marketplace extends Component {
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
                        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} color="white"/>
                        <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
                        <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
                    </Menu>
                </HoverBox>
                <Container padding={this.state.focus} bgcolor="rgb(32,32,32)">
                    <div className="div-404">
                        <h1>Marketplace</h1>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}
