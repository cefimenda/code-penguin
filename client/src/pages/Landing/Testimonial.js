import React, { Component } from 'react';
import Container from "../../components/Container";
import Snippet from "../../components/Snippet";
import TestSeed from "../../testimonialSeed.json"
import Quote from "../../images/quotation-open.png";
import API from "../../utils/API";
import './Landing.css';

export default class Main extends Component {
    state = {
        testimonials: [],
        testimonial: ""
    }

    componentDidMount = () => {
        this.getTestimonials();
    }

    getTestimonials = () => {
        API.getTestimonials()
            .then(res=>{
                console.log(res.data);
                this.setState({testimonials: res.data.comments});
            })
            .catch(err=>{
                console.log(err);
            });
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = () => {
        API.createTestimonial(this.state.testimonial)
            .then(res=>{
                this.setState({testimonial: ""});
                this.getTestimonials();
            })
            .catch(err=>{
                console.log(err);
            });
    }

    createTestimonial = array => {
        let testimonial = []
        for (let i = 0; i < array.length; i++) {
            testimonial.push(
                <Snippet key={i} width="100%" textSide={i % 2 === 0 ? "left" : "right"}>
                    <div className="test-quote">
                        <img src={Quote} alt="quote mark" />
                        <p className="test-data">{array[i].Entry.text}</p>
                        <p className="test-author">--{array[i].Source}</p>
                    </div>
                </Snippet>
            )
        }
        // array.forEach(data => {
        //     testimonial.push(
        //             <div className="test-quote">
        //                 <img src={Quote} alt="quote mark" />
        //                 <p className="test-data">{data.testimonial}</p>
        //                 <p className="test-author">--{data.author}</p>
        //             </div>
        //     )
        // })
        return testimonial
    }

    render() {
        const focus = this.props.side
        return (
        <React.Fragment>
            <Container padding={focus} bgcolor="#111">
                <div className="testimonial-div">
                    <input name="testimonial" onChange={this.handleChange} placeholder='Enter testimonial here' value={this.state.testimonial} />
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
            </Container>
            <Container padding={focus} bgcolor="rgb(32,32,32)">
                {this.createTestimonial(this.state.testimonials)}
            </Container>
        </React.Fragment>
        );
    }
}
