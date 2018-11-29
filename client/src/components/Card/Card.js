import React, { Component } from 'react'
import API from '../../utils/API'
import './Card.css'

export default class Card extends Component {
    state= {
        cardflip: true,
        date: this.props.info.time,
        creatorUser: ""
    }

    componentDidMount = () => {
        let { date } = this.state
        date = new Date(date)
        let dd = date.getDate()
        let mm = date.getMonth()+1
        let hh = date.getHours()
        let min = date.getMinutes()
        let AMPM = "AM"
        const yyyy = date.getFullYear()
        const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        if(dd < 10) { dd=`0${dd}`}
        if(mm < 10) { mm=`0${mm}`}
        if(min < 10) { min=`0${min}`}
        if(hh === 0) { hh = 12}
        if(hh > 12) {
            hh = hh-12
            AMPM = "PM"
        }
        this.setState({ date: `${months[mm]} ${dd}, ${yyyy} ${hh}:${min} ${AMPM}`}) 
        this.getCreatorUser(this.props.info.creator)
    }

    getCreatorUser = (creatorHash) => {
        API.getUser(creatorHash)
          .then(res=>{
            this.setState({creatorUser: res.data.userdata.username})
          })
          .catch(err => console.log(err));
      }

    handleFlip = () => {
        if(this.state.cardflip) {
            this.setState({cardflip: false})
        } else {
            this.setState({cardflip: true})
        }
    }

    handleChoose = () => {
        const { hash } = this.props
        window.location.pathname = `/task/${hash}`
    }

    render() {
        const {id, activeCard} = this.props
        let chosen = false
        activeCard === id ? chosen = true : chosen = false
        return(
            <React.Fragment>
                <div className={chosen ? `marg marketcard` : 'marketcard'} style={{ zIndex: `${chosen ? "99" : this.props.zIndex}` }}>
                    <div className={chosen ? `backactive front-card` : 'front-card'} onClick={chosen ? this.handleFlip : this.props.click} style={{transform: `${this.state.cardflip && chosen ? "perspective(600px) rotateY( 0deg)" : ""}`}}>
                        {chosen ? 
                            <div className="fixed-para-length">
                                <p id={id} >{this.props.info.details}</p>
                                <hr className="card-hr"/>
                                <p className="card-creator">By: {this.state.creatorUser !== "" ? this.state.creatorUser : this.props.info.creator} <br /> {this.state.date}</p>
                            </div>
                        : ""}
                        <button className="choose-card-btn" onClick={this.handleChoose}>View</button>
                        <button className="flip-card-btn" onClick={this.handleFlip}><img className="card-arrow-img" src="/images/arrow.png" alt="arrow-img"></img></button>
                    </div>
                    <div id={id} className={chosen ? `isactive front-card` : 'front-card'} onClick={chosen ? this.handleFlip : this.props.click} style={{transform: `${chosen ? this.state.cardflip ? "" : "perspective(600px) rotateY( -180deg)" : ""}`}}>
                        <h3 id={id} >{this.props.info.title}</h3>
                        <span className="card-pebbles">{this.props.info.pebbles} </span>
                        <img className="card-pebble-img" src='http://pluspng.com/img-png/circle-objects-png-object-256.png' alt="pebbles"/>
                        {chosen ? 
                            <div>
                                <p className="card-tags"><strong><u>TAGS</u></strong>: {this.props.info.tags.join(", ")}</p>
                                <button className="flip-card-btn" onClick={this.handleFlip}><img className="card-arrow-img" src="/images/arrow.png" alt="arrow-img"></img></button>
                            </div>
                        : ""}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}