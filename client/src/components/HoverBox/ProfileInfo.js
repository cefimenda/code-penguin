import React, { Component } from 'react'
import { Image, Menu } from 'semantic-ui-react'
import './HoverBox.css';

export default class HoverBox extends Component {
    state = {
        activeItem: 'home'
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        return (
            <div className="prof-info">
                <Image src={this.props.prof.img} size="small" centered circular />
                <p>{this.props.prof.name}</p>
                <p><a href={this.props.prof.url} target="_blank" rel="noopener noreferrer" >{this.props.prof.user}</a></p>
                <Menu pointing secondary vertical>
                        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                        <Menu.Item name='solved' active={activeItem === 'solved'} onClick={this.handleItemClick} />
                        {/* <Menu.Item name='setting' active={activeItem === 'setting'} onClick={this.handleItemClick} /> */}
                </Menu>
            </div>
        )
    }
}
