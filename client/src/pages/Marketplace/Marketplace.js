import React, { Component } from 'react';
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import HoverBox from "../../components/HoverBox/HoverBox";
import Card from '../../components/Card'
import { Menu } from 'semantic-ui-react'
import './Marketplace.css';

export default class Marketplace extends Component {
    state = {
        activeItem: 'home',
        activeCard: "card-id-0",
        datalist: this.props.cardseed,
        currentPage: 1,
        perPage: 5
    }

    handleManuClick = (e, { name }) => this.setState({ activeItem: name })

    handleCardClick = e => {
        if (e.target.id.startsWith('card-id-')) {
            this.setState({activeCard: e.target.id})
        }
    }

    handlePagination = (e) => this.setState({ currentPage: Number(e.target.id), activeCard: "card-id-0"})


    render() {
        const focus = "left"
        const { activeItem, datalist, currentPage, perPage } = this.state

        // Logic for displaying current
        const indexOfLast = currentPage * perPage
        const indexOfFirst = indexOfLast - perPage
        const currentList = datalist.slice(indexOfFirst, indexOfLast)

        const renderCards = currentList.map((card, i) => {
            return <Card key={i} id={`card-id-${i}`} activeCard={this.state.activeCard} click={this.handleCardClick} zIndex={20-i} info={card}/>;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(datalist.length / perPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => <li key={number} id={number} onClick={this.handlePagination}> {number}</li>);

        return (
            <React.Fragment>
                <Navbar page="Marketplace"/>
                <HoverBox side={focus} prof={this.props.profseed} profclass="prof-info">
                    {/* <Menu pointing secondary vertical>
                        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleManuClick}/>
                        <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleManuClick} />
                        <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleManuClick} />
                    </Menu> */}
                </HoverBox>
                <Container padding={focus} bgcolor="rgb(32,32,32)">
                    <div className="cardholder">
                        {renderCards}
                    </div>
                    <div className="pagination-div">
                        {renderPageNumbers}
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}
