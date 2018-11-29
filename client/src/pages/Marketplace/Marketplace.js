import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import HoverBox from '../../components/HoverBox/HoverBox';
import MarketInfo from '../../components/HoverBox/MarketInfo';
import Card from '../../components/Card';
import './Marketplace.css';
import API from '../../utils/API';

export default class Marketplace extends Component {
  state = {
    loggedIn: true,
    activeCard: 'card-id-0',
    fullList: '',
    dataList: [],
    currentPage: 1,
    perPage: 5
  };

  componentDidMount = () => {
    this.getCards(); //get all the info in the database
    API.getUser()
      .then(res=>{
        // console.log(res);
        if(res.data){

        }
        else{
          API.autoLogin()
            .then(res=>{
              // console.log(res);
              if(res.data){

              }
              else{
                this.setState({
                  loggedIn: false
                });
              }
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  };

  // Data retrieval
  getCards = () => {
    API.getTasks()
      .then(res => {
        if (res.data.length === 0) {
          return;
        }
        res.data.tasks.forEach(task=>{
          API.getUser(task.Entry.creator)
            .then(user=>{
              task.Entry.creatorName = user.data.userdata.username;
              console.log(task);
            })
        })
        this.setState({ dataList: res.data.tasks, fullList: res.data.tasks });
      })
      .catch(err => console.log(err));
  };

  // Filter Functions
  filterCreator = name => {
    const { fullList } = this.state;
    const newArray = fullList.filter(cardinfo => cardinfo.Entry.creatorName.includes(name));
    this.setState({ dataList: newArray });
  };

  filterDate = date => {
    // RejEx needed because Js date concersion with "-" is a day behind
    const startDate = new Date(date.start.replace(/-/g, '/'));
    const endDate = new Date(date.end.replace(/-/g, '/'));

    const { fullList } = this.state;
    const newArray = fullList.filter(cardinfo => {
      let cdate = new Date(cardinfo.Entry.time);
      return cdate >= startDate && cdate <= endDate;
    });
    this.setState({ dataList: newArray });
  };

  filterTag = tag => {
    const { fullList } = this.state;
    const newArray = fullList.filter(cardinfo => cardinfo.Entry.tags.includes(tag));
    this.setState({ dataList: newArray });
  };

  filterPebbles = pebbleCount => {
    const { fullList } = this.state;
    const newArray = fullList.filter(cardinfo => cardinfo.Entry.pebbles === parseInt(pebbleCount));
    this.setState({ dataList: newArray });
  };

  clearFilter = () => {
    this.setState({ dataList: this.state.fullList });
  };

  // Sort functions
  sortDate = order => {
    let data = this.state.dataList;
    if (order === 'newest-oldest') {
      data.sort((a, b) => {
        return new Date(b.Entry.time).getTime() - new Date(a.Entry.time).getTime();
      });
      this.setState({ dataList: data, activeCard: 'card-id-0', currentPage: 1 });
    } else if (order === 'oldest-newest') {
      data.sort((a, b) => {
        return new Date(a.Entry.time).getTime() - new Date(b.Entry.time).getTime();
      });
      this.setState({ dataList: data, activeCard: 'card-id-0', currentPage: 1 });
    }
  };

  sortTitle = order => {
    let data = this.state.dataList;
    if (order === 'a-z') {
      data.sort((a, b) => {
        var textA = a.Entry.title.toUpperCase();
        var textB = b.Entry.title.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      this.setState({ dataList: data, activeCard: 'card-id-0', currentPage: 1 });
    } else if (order === 'z-a') {
      data.sort((a, b) => {
        var textA = a.Entry.title.toUpperCase();
        var textB = b.Entry.title.toUpperCase();
        return textB < textA ? -1 : textB > textA ? 1 : 0;
      });
      this.setState({ dataList: data, activeCard: 'card-id-0', currentPage: 1 });
    }
  };

  sortPebbles = order => {
    let data = this.state.dataList;
    if (order === 'min-max') {
      data.sort((a, b) => {
        var min = a.Entry.pebbles;
        var max = b.Entry.pebbles;
        return min < max ? -1 : min > max ? 1 : 0;
      });
      this.setState({ dataList: data, activeCard: 'card-id-0', currentPage: 1 });
    } else if (order === 'max-min') {
      data.sort((a, b) => {
        var min = a.Entry.pebbles;
        var max = b.Entry.pebbles;
        return max < min ? -1 : max > min ? 1 : 0;
      });
      this.setState({ dataList: data, activeCard: 'card-id-0', currentPage: 1 });
    }
  };

  // changes state active card to card that is clicked
  handleCardClick = e => {
    if (e.target.id.startsWith('card-id-')) {
      this.setState({ activeCard: e.target.id });
    }
  };

  // changes the info on card depending on which pagination btn is clicked
  handlePagination = e =>
    this.setState({ currentPage: Number(e.target.id), activeCard: 'card-id-0' });

  render() {

    if (!this.state.loggedIn) return <Redirect to="/login" />;
    
    const focus = 'left';

    // Logic for getting the current card data
    const { dataList, currentPage, perPage } = this.state;
    let currentList = [];
    let dataListLength = 0;
    if (dataList){
      const indexOfLast = currentPage * perPage;
      const indexOfFirst = indexOfLast - perPage;
      currentList = dataList.slice(indexOfFirst, indexOfLast);
      dataListLength = dataList.length;
    }

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataListLength / perPage); i++) {
      pageNumbers.push(i);
    }

    // renders the cards
    const renderCards = currentList.map((card, i) => {
      return (
        <Card
          key={i}
          id={`card-id-${i}`}
          hash={card.Hash}
          activeCard={this.state.activeCard}
          click={this.handleCardClick}
          zIndex={20 - i}
          info={card.Entry || card}
        />
      );
    });

    // renders the pagination btns
    const renderPageNumbers = pageNumbers.map(number => (
      <li key={number} id={number} onClick={this.handlePagination}>
        {' '}
        {number}
      </li>
    ));

    return (
      <React.Fragment>
        <Navbar page="Marketplace"/>
        <HoverBox side={focus}>
          <MarketInfo
            prof={this.props.profSeed}
            filterCreator={this.filterCreator}
            filterDate={this.filterDate}
            filterTag={this.filterTag}
            filterPebbles={this.filterPebbles}
            clearFilter={this.clearFilter}
            sortDate={this.sortDate}
            sortTitle={this.sortTitle}
            sortPebbles={this.sortPebbles}
          />
        </HoverBox>
        <Container padding="market" bgcolor="rgb(32,32,32)">
          <div className="cardholder">
            <div className="new-task-div">
              <a href="/newtask">
                <button className="new-task-btn">+ New Task</button>
              </a>
            </div>
            {renderCards}
          </div>
          <div className="pagination-div">{renderPageNumbers}</div>
        </Container>
      </React.Fragment>
    );
  }
}
