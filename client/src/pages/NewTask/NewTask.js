import React, { Component } from 'react';
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import Task from "../../components/TaskBox";
import API from "../../utils/API";
import './NewTask.css';

export default class Profile extends Component {
    state = {
        creator: "",
        pebbles: "",
        title: "",
        details: "",
        tags: "",
    }
    componentDidMount = () => {
        this.getHash();
    }

    getHash = () => {
        API.getUser()
        .then(res => {
            this.setState({ creator: res.data });
        }
        ).catch(err =>
            console.log(err)
        );
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleKeyPress = (event) => {
        console.log(event.key);
    }

    handleSubmit = e => {
        e.preventDefault();
        const { creator, pebbles, title, details, tags} = this.state
        
         console.log("Creator", creator);
         console.log("Pebbles", pebbles);
         console.log("Title", title);
         console.log("Details", details);
         console.log("Tags", tags);
        //  str.split("#");  .trim()

        //  window.location.pathname = `/marketplace`
    };
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Container bgcolor="rgb(32,32,32)">
                    <Task>
                        <h2 className="new-task-title">New Task</h2>
                        <form>
                        <div className="input-div" style={{ margin: "10px 0" }}>
                                <div className="label-div" >
                                    <label>User Hash:</label>
                                </div>
                                <span className="span-hash">{this.state.creator}</span>
                            </div>
                            <div className="input-div" style={{ margin: "10px 0" }}>
                                <div className="label-div">
                                    <label>Pebbles:</label>
                                </div>
                                <input type="number" name="pebbles" placeholder='(ex. 200)' onChange={this.handleChange} style={{ width: "100px" }} value={this.state.pebbles}/>
                            </div>
                            <div className="input-div">
                                <div className="label-div">
                                    <label>Title:</label>
                                </div>
                                <input name="title" onChange={this.handleChange} placeholder='Enter short description' value={this.state.title}/>
                            </div>
                            <div className="input-div">
                                <div className="label-div">
                                    <label>Tags:</label>
                                </div>
                                <input  name="tags" onKeyPress={this.handleKeyPress} placeholder='Tags enter # (ex. #HTML #JS #CSS)'/>
                            </div>
                            <div className="input-div">
                                <div className="label-div textarea-label">
                                    <label>Details:</label>
                                </div>
                                <textarea  name="details" onChange={this.handleChange} placeholder='Please enter a detail description of what is needed' value={this.state.details}/>
                            </div>
                            <button className="submit-new-task" onClick={this.handleSubmit} >Submit</button>
                        </form>
                    </Task>
                </Container>
            </React.Fragment>
        );
    }
}
