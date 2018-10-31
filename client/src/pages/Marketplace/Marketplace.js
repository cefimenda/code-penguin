import React, { Component } from 'react';
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import HoverBox from "../../components/HoverBox";
import Card from '../../components/Card'
import { Menu } from 'semantic-ui-react'
import './Marketplace.css';

export default class Marketplace extends Component {
    state = {
        activeItem: 'home',
        activeCard: "card-id-0"
    }

    handleManuClick = (e, { name }) => this.setState({ activeItem: name })

    handleCardClick = e => {
        console.log(e.target.id);
        
        this.setState({activeCard: e.target.id})
    }

    makeCards = n => {
        let array = []
        for (let i = 0; i < n; i++) {
            array.push(<Card key={i} id={`card-id-${i}`} activeCard={this.state.activeCard} click={this.handleCardClick} zIndex={20-i}/>)
        }
        return array
    }

    render() {
        const focus = "left"
        const { activeItem } = this.state
        return (
            <React.Fragment>
                <Navbar page="Marketplace"/>
                <HoverBox side={focus} prof={this.props.profseed}>
                    <Menu pointing secondary vertical>
                        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleManuClick}/>
                        <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleManuClick} />
                        <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleManuClick} />
                    </Menu>
                </HoverBox>
                <Container padding={focus} bgcolor="rgb(32,32,32)">
                    <div className="cardholder">

                        {this.makeCards(5)}
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}
