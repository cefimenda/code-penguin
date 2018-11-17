import React, { Component } from 'react'
import './TitleBox.css';

export default class Container extends Component {
    render() {
        const { title, children, titlesize, footer } = this.props
        return (
            <div className="title-box" style={{paddingBottom: `${footer ? "60px" : "10px" }`}}>
                <div className="title-div">
                    {titlesize === "h2" ? <h2>{title}</h2> : titlesize === "h3" ? <h3>{title}</h3> : titlesize === "h4" ? <h4>{title}</h4> : <h5>{title}</h5> }
                </div>
                <div className="info-div">
                    {children}
                </div>
            </div>
        )
    }
}
