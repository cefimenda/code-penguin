import React, { Component } from 'react'
// import { Image } from 'semantic-ui-react'
import './Card.css'

export default class Card extends Component {
    state= {
        cardflip: true
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
        // window.location.pathname = `/choose`
        window.location.pathname = `/task/${hash}`
    }

    render() {
        const {id, activeCard} = this.props
        let chosen = false
        activeCard === id ? chosen = true : chosen = false
        return(
            <React.Fragment>
                <div className={chosen ? `marg marketcard` : 'marketcard'} style={{ zIndex: `${chosen ? "99" : this.props.zIndex}` }}>
                    <div className={chosen ? `backactive front-card` : 'front-card'} style={{transform: `${this.state.cardflip && chosen ? "perspective(600px) rotateY( 0deg)" : ""}`}}>
                        {chosen ? <p id={id} className="fixed-para-length">{this.props.info.details}</p>: ""}
                        <button className="choose-card-btn" onClick={this.handleChoose}>Choose</button>
                        <button className="flip-card-btn" onClick={this.handleFlip}><i className="fas fa-arrow-right"></i></button>
                    </div>
                    <div id={id} className={chosen ? `isactive front-card` : 'front-card'} onClick={this.props.click} style={{transform: `${chosen ? this.state.cardflip ? "" : "perspective(600px) rotateY( -180deg)" : ""}`}}>
                        <h3 id={id} >{this.props.info.title}</h3>
                        {chosen ? <p className="card-tags"><strong><u>TAGS</u></strong>: {this.props.info.tags.join(", ")}</p> : ""}
                        {chosen ?  <div><p className="card-pebbles">{this.props.info.pebbles}</p> <img className="card-pebble-img" src='http://pluspng.com/img-png/circle-objects-png-object-256.png' alt="pebbles"/></div> : ""}
                        {chosen ? <p className="card-creator">-- {this.props.info.creator}</p> : ""}
                        {chosen ? <p className="time-stamp">{this.props.info.time}</p> : ""}
                        {chosen ? <button className="flip-card-btn" onClick={this.handleFlip}><i className="fas fa-arrow-right"></i></button> : ""}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}