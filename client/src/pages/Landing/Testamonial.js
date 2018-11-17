import React, { Component } from 'react';
import Container from "../../components/Container";
import Snippet from "../../components/Snippet";
import TestSeed from "../../testamonialSeed.json"
import Quote from "../../images/quotation-open.png";
import './Landing.css';

export default class Main extends Component {
    state = {
        testamonial: ""
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = () => {
        console.log(this.state.testamonial);
    }

    createTestamonial = array => {
        let testamonal = []
        for (let i = 0; i < array.length; i++) {
            testamonal.push(
                <Snippet width="100%" textSide={i % 2 === 0 ? "left" : "right"} key={`snipit-${i}`}>
                    <div className="test-quote">
                        <img src={Quote} alt="quote mark" />
                        <p className="test-data">{array[i].testamonial}</p>
                        <p className="test-author">-- {array[i].author}</p>
                    </div>
                </Snippet>
            )
        }
        return testamonal
    }

    render() {
        const focus = this.props.side
        return (
        <React.Fragment>
            <Container padding={focus} bgcolor="#111">
                <div className="testamonial-div">
                    <input name="testamonial" onChange={this.handleChange} placeholder='Enter testamonal here' value={this.state.testamonial} />
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
            </Container>
            <Container padding={focus} bgcolor="rgb(32,32,32)">
                {this.createTestamonial(TestSeed)}
            </Container>
        </React.Fragment>
        );
    }
}
