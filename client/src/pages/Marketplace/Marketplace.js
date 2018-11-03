import React, { Component } from 'react';
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import HoverBox from "../../components/HoverBox/HoverBox";
import Markinfo from "../../components/HoverBox/Marketinfo";
import Card from '../../components/Card'
import './Marketplace.css';

export default class Marketplace extends Component {
    state = {
        activeCard: "card-id-0",
        datalist: this.props.cardseed,
        currentPage: 1,
        perPage: 5
    }

    // Filter Functions
    filtercreator = name => {
        const { cardseed } = this.props
        const newArray = cardseed.filter(cardinfo => cardinfo.creator.includes(name));
        this.setState({ datalist: newArray })
    }

    filterdate = date => {
        // RejEx needed because Js date concersion with "-" is a day behind
        const startDate = new Date(date.start.replace(/-/g, '/'))
        const endDate = new Date(date.end.replace(/-/g, '/'))

        const { cardseed } = this.props
        const newArray = cardseed.filter(cardinfo => {
            let cdate = new Date(cardinfo.time)
            return cdate >= startDate && cdate <= endDate;
        });
        this.setState({ datalist: newArray })
    }

    filtertag = tag => {
        const { cardseed } = this.props
        const newArray = cardseed.filter(cardinfo => cardinfo.tags.includes(tag));
        this.setState({ datalist: newArray })
    }

    clearfilter = () => {
        this.setState({datalist: this.props.cardseed})
    }


    // Sort functions
    sortdate = (order) => {
        let data = this.state.datalist
        if (order === "newest-oldest") {
            data.sort((a,b) => {
                return new Date(b.time).getTime() - new Date(a.time).getTime();
            })
            this.setState({datalist: data, activeCard: "card-id-0", currentPage: 1})
        } else if (order === "oldest-newest") {
            data.sort((a,b) => {
                return new Date(a.time).getTime() - new Date(b.time).getTime();
            })
            this.setState({datalist: data, activeCard: "card-id-0", currentPage: 1})
        }
        
    }

    sorttitle = (order) => {
        let data = this.state.datalist
        if (order === "a-z") {
            data.sort((a,b) => {
                var textA = a.title.toUpperCase();
                var textB = b.title.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
            this.setState({datalist: data, activeCard: "card-id-0", currentPage: 1})
        } else if (order === "z-a") {
            data.sort((a,b) => {
                var textA = a.title.toUpperCase();
                var textB = b.title.toUpperCase();
                return (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
            })
            this.setState({datalist: data, activeCard: "card-id-0", currentPage: 1})
        }
        
    }

    // changes state active card to card that is clicked
    handleCardClick = e => {
        if (e.target.id.startsWith('card-id-')) {
            this.setState({activeCard: e.target.id})
        }
    }

    // changes the info on card depending on which pagination btn is clicked
    handlePagination = (e) => this.setState({ currentPage: Number(e.target.id), activeCard: "card-id-0"})


    render() {
        const focus = "left"

        // Logic for getting the current card data
        const { datalist, currentPage, perPage } = this.state
        const indexOfLast = currentPage * perPage
        const indexOfFirst = indexOfLast - perPage
        const currentList = datalist.slice(indexOfFirst, indexOfLast)

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(datalist.length / perPage); i++) {
            pageNumbers.push(i);
        }

        // renders the cards
        const renderCards = currentList.map((card, i) => {
            return <Card key={i} id={`card-id-${i}`} activeCard={this.state.activeCard} click={this.handleCardClick} zIndex={20-i} info={card}/>;
        });

        // renders the pagination btns
        const renderPageNumbers = pageNumbers.map(number => <li key={number} id={number} onClick={this.handlePagination}> {number}</li>);

        return (
            <React.Fragment>
                <Navbar page="Marketplace"/>
                <HoverBox side={focus}>
                    <Markinfo prof={this.props.profseed} filtercreator={this.filtercreator} filterdate={this.filterdate} filtertag={this.filtertag} clearfilter={this.clearfilter} sortdate={this.sortdate} sorttitle={this.sorttitle}/>
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
