import React, { Component } from 'react';
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import HoverBox from "../../components/HoverBox/HoverBox";
import ProfileInfo from "../../components/HoverBox/ProfileInfo";
import profSeed from "../../profSeed.json";
import './Task.css';
import API from '../../utils/API';

export default class Task extends Component {

    state = {
        task: {}
    }

    componentDidMount = () => {
        this.getInfo();
    }

    getInfo = () => {
        API.getTask(this.props.match.params.hash)
            .then(res=>{
                console.log(res.data);
                this.setState({
                    task: res.data
                })
            })
            .catch(err=>{

            });
    }

    render() {
        const focus = "left"
        var {task} = this.state;

        return (
            <React.Fragment>
                <Navbar />
                <HoverBox side={focus}>
                    <ProfileInfo prof={profSeed}/>
                </HoverBox>
                <Container padding={focus} bgcolor="rgb(32,32,32)">
                    <div className="div-404">
                        <h1>{task.title}</h1>
                        <h2>{task.pebbles}<img className="task-pebble-img" src='http://pluspng.com/img-png/circle-objects-png-object-256.png' alt="pebbles"/></h2>
                        <p>{JSON.stringify(task.tags)}</p>
                        <p>{task.details}</p>
                        <p>{task.creator}</p>
                        <p>{(new Date(task.time)).toString()}</p>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}
