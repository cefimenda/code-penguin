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
        task: {
            comments: [],
            solutions: [],
            tags: [],
            title: "",
            details: "",
            pebbles: "",
            creator: "",
            time: ""
        }
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
        console.log(task.tags);

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
                        <p>{task.tags.map(tag=>"#"+tag).join(" ")}</p>
                        <p>{task.details}</p>
                        <p>{task.creator}</p>
                        <p>{(new Date(task.time)).toString()}</p>
                        <ul>
                            {task.solutions ? task.solutions.map((solution, i)=><li key={i}><a href={solution.Entry.link}>{solution.Entry.text}</a></li>) : ""}
                        </ul>
                        <ul>
                            {task.comments ? task.comments.map((comment, i)=><li key={i}>{comment.Entry.text}</li>) : ""}
                        </ul>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}
