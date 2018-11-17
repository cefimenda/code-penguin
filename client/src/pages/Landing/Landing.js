import React, { Component } from 'react';
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Container from "../../components/Container";
import HoverBox from "../../components/HoverBox/HoverBox";
import LandingInfo from "../../components/HoverBox/LandingInfo";
import Main from "./Main"
import Testamonial from "./Testamonial"
import Additional from "./Additional"
import './Landing.css';

export default class App extends Component {
    state = {
        page: "info"
    }

    handleState = state => {
        this.setState({ page: state })
    }

    render() {
        const focus = "right"
        return (
        <React.Fragment>
            <Navbar page="Landing" />
            <Hero heroimg="https://images.unsplash.com/photo-1536242918817-db5e93c7a0e4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5b334adee965d8d086cb0ad8bc445ce4&auto=format&fit=crop&w=1950&q=80" />
            <HoverBox side={focus}> 
                <LandingInfo handle={this.handleState} currState={this.state.page} />
            </HoverBox>
            {this.state.page === "testamonial" ? <Testamonial side={focus}/> : this.state.page === "additional" ? <Additional side={focus}/> : <Main side={focus}/> }
            <Container bgcolor="#111">
                <p>&copy; 2018 By Coding Penguins</p>
            </Container>
        </React.Fragment>
        );
    }
}
