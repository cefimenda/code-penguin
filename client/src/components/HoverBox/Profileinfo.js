import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'
import './HoverBox.css';

export default class HoverBox extends Component {
    render() {
        return (
            <div className="prof-info">
                <Image src={this.props.prof.img} size="small" centered circular />
                <p>{this.props.prof.name}</p>
                <p><a href={this.props.prof.url} target="_blank" rel="noopener noreferrer" >{this.props.prof.url}</a></p>
                {this.props.menu}
            </div>
        )
    }
}
