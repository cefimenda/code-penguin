import React, { Component } from 'react'
import './Navbar.css';

export default class Navbar extends Component {
    state = {
        auth: false,
        slide: 0,
        lastScrollY: 0,
        color: "transparent"
    };
    
    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    createli = () => {
        if (this.props.landing === "true") {
            return (<li key="1"><a href="/"><h4 className="ui white"> Code Penguin</h4></a></li>)
        } else {
            return (
                <React.Fragment>
                    <li key="1"><a href="/"><h4 className="ui white"> Code Penguin</h4></a></li>
                    <li key="4" className="float-right"><a href="/landing"><p className="ui white">Log off</p></a></li>
                    <li key="3" className="float-right"><a href="/"><p className={this.props.page === "Marketplace" ? "ui white navbold" : "ui white"}>Marketplace</p></a></li>
                    <li key="2" className="float-right"><a href="/profile"><p className={this.props.page === "Profile" ? "ui white navbold" : "ui white"}>Profile</p></a></li>
                </React.Fragment>
            )
        }
    }
    
    handleScroll = () => {
        const { lastScrollY } = this.state; 
        const currentScrollY = window.scrollY;
        
        // navbar color effect
        if (window.scrollY > 10) {
            this.setState({ color: 'rgba(32, 32, 32, 0.9)' });
        } else {
            this.setState({ color: 'transparent' });
        }

        // navbar slide effect
        if (currentScrollY > lastScrollY && window.scrollY > 200) {
            this.setState({ slide: '-80px' });
        } else {
            if (window.scrollY < 800) {
                this.setState({ slide: '0px' });
            }
        }
        this.setState({ lastScrollY: currentScrollY });
    };


    render() {
        return (
            <React.Fragment>
                <div id="navigation" className="navbar navbar-fixed-top" style={{ transform: `translate(0, ${this.state.slide})`, transition: 'all 150ms linear' }}>
                    <div className="navbar-inner" style={{ backgroundColor: `${this.state.color}`, transition: 'all 300ms ease-in-out'}}>
                        <div className="container">
                            <nav>
                                <ul className="nav">
                                    {this.createli()}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
