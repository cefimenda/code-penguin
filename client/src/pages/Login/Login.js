import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import HoverBox from '../../components/HoverBox/HoverBox';
import Main from './MainLogin';
import Create from './Create';
import Another from './Another';
import './Login.css';

export default class Task extends Component {
    state = {
        redirectToReferrer: false,
        page: "Main"
    };

    componentDidMount = () => {
        this.props.logout()
      };

    changePage = page => {
        this.setState({page: page})
    }

    getUser = user => {
        this.setState({redirectToReferrer: true})
        this.props.getUser(user)
    }

    redirect = () =>{ 
        this.setState({redirectToReferrer: true});
    }

    render() {
        const { page, redirectToReferrer } = this.state

        if (redirectToReferrer) return <Redirect to="/marketplace" />;

        return (
        <React.Fragment>
           <HoverBox>
                {page === "Main" ? <Main changePage={this.changePage} getUser={this.getUser} redirect={this.redirect}/> : page === "Create" ? <Create changePage={this.changePage} getUser={this.getUser}/> : <Another changePage={this.changePage} getUser={this.getUser}/>}
           </HoverBox>
        </React.Fragment>
        )
    }
}
