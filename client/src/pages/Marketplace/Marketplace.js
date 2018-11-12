import React, { Component } from 'react';
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import HoverBox from "../../components/HoverBox/HoverBox";
import MarketInfo from "../../components/HoverBox/MarketInfo";
import Card from '../../components/Card'
import './Marketplace.css';
import API from "../../utils/API";

export default class Marketplace extends Component {
    state = {
        activeCard: "card-id-0",
        dataList: this.props.cardSeed,
        currentPage: 1,
        perPage: 5
    }

    componentDidMount = () => {
        this.getCards(); //get all the info in the database
    }

    // Data retrieval
    getCards = () => {
        API.getTasks()
            .then(res => {
                if(res.data.length===0) { return; }
                this.setState({ dataList: res.data.links });
            }
        )
            .catch(err =>
            console.log(err)
        );
    }

    // Filter Functions
    filterCreator = name => {
        const { cardSeed } = this.props
        const newArray = cardSeed.filter(cardinfo => cardinfo.creator.includes(name));
        this.setState({ dataList: newArray })
    }

    filterDate = date => {
        // RejEx needed because Js date concersion with "-" is a day behind
        const startDate = new Date(date.start.replace(/-/g, '/'))
        const endDate = new Date(date.end.replace(/-/g, '/'))

        const { cardSeed } = this.props
        const newArray = cardSeed.filter(cardinfo => {
            let cdate = new Date(cardinfo.time)
            return cdate >= startDate && cdate <= endDate;
        });
        this.setState({ dataList: newArray })
    }

    filtertag = tag => {
        const { cardSeed } = this.props
        const newArray = cardSeed.filter(cardinfo => cardinfo.tags.includes(tag));
        this.setState({ dataList: newArray })
    }

    clearFilter = () => {
        this.setState({dataList: this.props.cardSeed})
    }


    // Sort functions
    sortDate = (order) => {
        let data = this.state.dataList
        if (order === "newest-oldest") {
            data.sort((a,b) => {
                return new Date(b.time).getTime() - new Date(a.time).getTime();
            })
            this.setState({dataList: data, activeCard: "card-id-0", currentPage: 1})
        } else if (order === "oldest-newest") {
            data.sort((a,b) => {
                return new Date(a.time).getTime() - new Date(b.time).getTime();
            })
            this.setState({dataList: data, activeCard: "card-id-0", currentPage: 1})
        }
        
    }

    sortTitle = (order) => {
        let data = this.state.dataList
        if (order === "a-z") {
            data.sort((a,b) => {
                var textA = a.title.toUpperCase();
                var textB = b.title.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
            this.setState({dataList: data, activeCard: "card-id-0", currentPage: 1})
        } else if (order === "z-a") {
            data.sort((a,b) => {
                var textA = a.title.toUpperCase();
                var textB = b.title.toUpperCase();
                return (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
            })
            this.setState({dataList: data, activeCard: "card-id-0", currentPage: 1})
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
        const { dataList, currentPage, perPage } = this.state
        const indexOfLast = currentPage * perPage
        const indexOfFirst = indexOfLast - perPage
        const currentList = dataList.slice(indexOfFirst, indexOfLast)

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(dataList.length / perPage); i++) {
            pageNumbers.push(i);
        }

        // renders the cards
        const renderCards = currentList.map((card, i) => {
            return <Card key={i} id={`card-id-${i}`} hash={card.Hash} activeCard={this.state.activeCard} click={this.handleCardClick} zIndex={20-i} info={card.Entry || card}/>;
        });

        // renders the pagination btns
        const renderPageNumbers = pageNumbers.map(number => <li key={number} id={number} onClick={this.handlePagination}> {number}</li>);

        return (
            <React.Fragment>
                <Navbar page="Marketplace"/>
                <HoverBox side={focus}>
                    <MarketInfo prof={this.props.profSeed} filterCreator={this.filterCreator} filterDate={this.filterDate} filtertag={this.filtertag} clearFilter={this.clearFilter} sortDate={this.sortDate} sortTitle={this.sortTitle}/>
                </HoverBox>
                <Container padding={focus} bgcolor="rgb(32,32,32)">
                    
                    <div className="cardholder">
                    <div className="new-task-div">
                        <a href="/newtask"><button className="new-task-btn">+ New Task</button></a>
                    </div>
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
