import React, { Component } from 'react';
import Navbar from "../../components/Navbar";
import MessageBar from '../../components/MessageBar';
import Container from "../../components/Container";
import Task from "../../components/TaskBox";
import API from "../../utils/API";
import './NewTask.css';

export default class Profile extends Component {
    state = {
        creator: "",
        maxPebbles: "",
        pebbles: "",
        title: "",
        details: "",
        tags: "",
        showDiv: false,
        message: ""
    }
    
    componentDidMount = () => {
        this.getHash();
    }

    getHash = () => {
        API.getUser()
            .then(res => {
                this.setState({
                    creator: res.data.hash,
                    maxPebbles: res.data.pebbles
                });
            }
            ).catch(err =>
                console.log(err)
            );
    }

    createTask = task => {
        API.createTask(task)
            .then(res => {
                // console.log(res);
                window.location.pathname = `/task/${res.data}`
            }
            ).catch(err =>
                console.log(err)
            );
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = e => {
        e.preventDefault();
        let { pebbles, title, details, tags, maxPebbles } = this.state
        pebbles = parseInt(pebbles)

        if ( maxPebbles === 0) {
            this.setState({ showDiv: true, message: "You have 0 pebbles"})
        } else {
            if (pebbles !== "" && title !== "" && details !== "" && tags !== "") {
                if (pebbles <= parseInt(maxPebbles) && pebbles >= 1 && Number.isInteger(pebbles)) {
                    let tagarr = tags.split("#")
                    tagarr = tagarr.filter((entry) => { return entry.trim() !== '' }).map(e => e.trim().replace(/[,]/g, ""))
                    const task = { pebbles, title, details, tags: tagarr }
                    this.createTask(task);
                } else {
                    this.setState({ showDiv: true, message: `Pebble needs to be an interger between 1 - ${maxPebbles}`})
                }
            } else {
                this.setState({ showDiv: true, message: "Please enter all field"})
            }
        }
        
    }

    handleCancel = () => {
        this.setState({ showDiv: false})
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <MessageBar isWarning={true} showDiv={this.state.showDiv} handleCancel={this.handleCancel}>
                    {this.state.message}
                </MessageBar>
                <Container bgcolor="rgb(32,32,32)">
                    <Task>
                        <div className="task-padd">
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
                                    <input type="number" name="pebbles" placeholder={`( ${this.state.maxPebbles} max )`} onChange={this.handleChange} style={{ width: "100px" }} value={this.state.pebbles} required />
                                </div>
                                <div className="input-div">
                                    <div className="label-div">
                                        <label>Title:</label>
                                    </div>
                                    <input name="title" onChange={this.handleChange} placeholder='Enter short description' value={this.state.title} required />
                                </div>
                                <div className="input-div">
                                    <div className="label-div">
                                        <label>Tags:</label>
                                    </div>
                                    <input name="tags" onChange={this.handleChange} placeholder='Tags enter # (ex. #HTML #JS #CSS)' value={this.state.tags} required /> {/*onKeyPress={this.handleKeyPress}*/}
                                </div>
                                <div className="input-div">
                                    <div className="label-div textarea-label">
                                        <label>Details:</label>
                                    </div>
                                    <textarea name="details" onChange={this.handleChange} placeholder='Please enter a detail description of what is needed' value={this.state.details} required />
                                </div>
                                <button className="submit-new-task" onClick={this.handleSubmit} >Submit</button>
                            </form>
                        </div>

                    </Task>
                </Container>
            </React.Fragment>
        );
    }
}
