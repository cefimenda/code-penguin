import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import HoverBox from '../../components/HoverBox/HoverBox';
import Main from './MainLogin';
import MessageBar from '../../components/MessageBar';
import Create from './Create';
import Another from './Another';
import './Login.css';

export default class Task extends Component {
    state = {
        redirectToReferrer: false,
        page: "Main",
        showDiv: false,
        message: ""
    };

    componentDidMount = () => {
        this.props.logout();
    }

    changePage = page => {
        this.setState({page: page})
    }

    getUser = user => {
        this.setState({redirectToReferrer: true})
        this.props.getUser(user)
    }

    changeMsg = msg => {
        this.setState({ showDiv: true, message: msg})
    }

    handleCancel = () => {
        this.setState({ showDiv: false})
    }

    render() {
        const { page, redirectToReferrer } = this.state

        if (redirectToReferrer) return <Redirect to="/marketplace" />;

        return (
        <React.Fragment>
            <MessageBar isWarning={true} showDiv={this.state.showDiv} handleCancel={this.handleCancel}>
                {this.state.message}
            </MessageBar>
           <HoverBox>
                {page === "Main" ? <Main changePage={this.changePage} getUser={this.getUser} redirect={this.redirect} /> : page === "Create" ? <Create changePage={this.changePage} getUser={this.getUser} redirect={this.redirect} changeMsg={this.changeMsg}/> : <Another changePage={this.changePage} getUser={this.getUser} redirect={this.redirect} changeMsg={this.changeMsg}/>}
           </HoverBox>
        </React.Fragment>
        )
    }
}
