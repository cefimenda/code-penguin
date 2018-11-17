import React, { Component } from 'react';
import Container from "../../components/Container";
import Snippet from "../../components/Snippet";
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
                res.data.comments.forEach(comment => {
                    API.getUser(comment.Source)
                        .then(user=>{
                            try{
                                comment.Source = user.data.userdata[0].Entry.github
                            }
                            catch(err){
                                comment.Source = comment.Source.substring(0,20) + "...";
                            } 
                            this.setState({testimonials: res.data.comments});
                        })
                        .catch(err=>{

                        });
                });
            })
            .catch(err=>{
                console.log(err);
            });
    }


    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    ///////// This does not seem to be working ///////////////
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.testimonial.trim()==="") return;
        API.createTestimonial(this.state.testimonial)
            .then(res=>{
                this.setState({testimonial: ""});
                this.getTestimonials();
            })
            .catch(err=>{
                console.log(err);
            });
    }
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////

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
        return testimonial
    }

    render() {
        const focus = this.props.side
        return (
        <React.Fragment>
            <Container padding={focus} bgcolor="#111">
                <form className="testimonial-div" onSubmit={this.handleSubmit}>
                    <input name="testimonial" onChange={this.handleChange} placeholder='Enter testimonial here' value={this.state.testimonial} />
                    <button type="button" onClick={this.handleSubmit}>Submit</button>
                </form>
            </Container>
            <Container padding={focus} bgcolor="rgb(32,32,32)">
                {this.createTestimonial(this.state.testimonials)}
            </Container>
        </React.Fragment>
        );
    }
}
