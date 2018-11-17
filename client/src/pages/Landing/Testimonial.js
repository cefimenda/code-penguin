import React, { Component } from 'react';
import Container from "../../components/Container";
import Snippet from "../../components/Snippet";
import TestSeed from "../../testimonialSeed.json"
import Quote from "../../images/quotation-open.png";
import './Landing.css';

export default class Main extends Component {
    state = {
        testimonial: ""
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = () => {
        console.log(this.state.testimonial);
    }

    createTestimonial = array => {
        let testamonal = []
        for (let i = 0; i < array.length; i++) {
            testamonal.push(
                <Snippet width="100%" textSide={i % 2 === 0 ? "left" : "right"}>
                    <div className="test-quote">
                        <img src={Quote} alt="quote mark" />
                        <p className="test-data">{array[i].testimonial}</p>
                        <p className="test-author">--{array[i].author}</p>
                    </div>
                </Snippet>
            )
        }
        // array.forEach(data => {
        //     testamonal.push(
        //             <div className="test-quote">
        //                 <img src={Quote} alt="quote mark" />
        //                 <p className="test-data">{data.testimonial}</p>
        //                 <p className="test-author">--{data.author}</p>
        //             </div>
        //     )
        // })
        return testamonal
    }

    render() {
        const focus = this.props.side
        return (
        <React.Fragment>
            <Container padding={focus} bgcolor="#111">
                <div className="testimonial-div">
                    <input name="testimonial" onChange={this.handleChange} placeholder='Enter testamonal here' value={this.state.testimonial} />
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
            </Container>
            <Container padding={focus} bgcolor="rgb(32,32,32)">
                {this.createTestimonial(TestSeed)}
            </Container>
        </React.Fragment>
        );
    }
}
