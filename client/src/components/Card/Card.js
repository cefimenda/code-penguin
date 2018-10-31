import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import './Card.css'

export default class Card extends Component {

    render() {
        const {id, activeCard} = this.props
        let chosen = false
        activeCard === id ? chosen = true : chosen = false
        return(
            <React.Fragment>
                <div className={chosen ? 'marg marketcard' : 'marketcard'} style={{ zIndex: `${chosen ? "99" : this.props.zIndex}` }}>
                    <div id={id} className={chosen ? 'isactive front-card' : 'front-card'} onClick={this.props.click}>
                        <h4 id={id} >Description of issue</h4>
                        {chosen ? <p id={id} className="fixed-para-length">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>: ""}
                        {chosen ? <Button content='More' icon='right arrow' labelPosition='right' color='black' compact fluid /> : ""}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}