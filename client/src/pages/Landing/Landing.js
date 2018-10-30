import React, { Component } from 'react';
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Container from "../../components/Container";
import Snipit from "../../components/Snipit";
import HoverBox from "../../components/HoverBox";
import { Image, Button } from 'semantic-ui-react';
import './Landing.css';

export default class App extends Component {
  state = {
    Hero: "https://images.unsplash.com/photo-1536242918817-db5e93c7a0e4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5b334adee965d8d086cb0ad8bc445ce4&auto=format&fit=crop&w=1950&q=80",
    focus: "right"
  }
    ////////////////////////////////////////////////////////
    // TODO: Need to figure out to to log in with Github ///
    // IDEA: https://www.npmjs.com/package/passport-github /
    // For now it is to get to marketplace and portfolio ///
    ////////////////////////////////////////////////////////
    handlebtn = event => {
        const { name } = event.target
        if (name === "Signup") {
            window.location.pathname = "/profile"
        } else if (name === "Login"){
            window.location.pathname = "/marketplace"
        }
    }
  
    render() {
        return (
        <React.Fragment>
            <Navbar landing="true" />
            <Hero heroimg={this.state.Hero} />
            <HoverBox side={this.state.focus}> 
                <h1 className="github-h1">Login with Github</h1>
                <Image src="https://magentys.io/wp-content/uploads/2017/04/github-logo-1.png" size="small" centered />
                <Button.Group fluid>
                    <Button name="Signup" onClick={this.handlebtn}>Sign Up</Button>
                    <Button.Or />
                    <Button name="Login" onClick={this.handlebtn} color='teal'>Login</Button>
                </Button.Group>
            </HoverBox>
            <Container padding={this.state.focus} bgcolor="rgb(32,32,32)">
                <Snipit width="100%" textSide="left">
                    <h3>Why Penguins?</h3>
                    <p>
                        Penguins are renowned in the animal kingdom for their generosity and we wanted our community to incorporate 
                        that pay-it-forward spirit. Penguins famously find the prettiest pebbles they can to give to others. Technically, 
                        their goal is to mate, but let's not stretch the metaphor too far.
                    </p>
                </Snipit>

                <Snipit width="100%" textSide="right" simg="https://i.gifer.com/4m3b.gif" sizing="small">
                    <h3>What are Pebbles?</h3>
                    <p>
                        The "currency" of Code Penguin is the pebble. Pebbles are earned by submitting solutions to others' problems. Pebbles 
                        are spent to "buy" solutions for problems of your own. Pebbles are powered by blockchain technology, but they aren't 
                        a cryptocurrency. They cannot be mined or traded for other currencies. They can only be traded for solutions to problems.
                    </p>
                </Snipit>

                <Snipit width="100%" textSide="left" simg="https://techflourish.com/images/clear-background-pumpkin-spice-latte-clipart-8.png" sizing="medium">
                    <h3>Problems</h3>
                    <p>
                        Problems penguins pose range from simple tasks to full-fledged projects. The key to a good Code Penguin problem is that it be 
                        not easily Googleable. Our primary goal is to build a huge repository of unanswered questions and undiscovered solutions, to 
                        help further build the open source community of developers.
                    </p>
                    <br />
                    <p><strong><u>Problems can be things like</u>:</strong></p>
                    <ul>
                        <li>"I need someone to build a design forward front end UI component library that doesn't depend on JQuery"</li>
                        <li>"There's a bug with this NPM module that's impeding progress on my project but I don't have the know-how to fix it myself... Is someone else up to the challenge?"</li>
                        <li>"My current algorithm isn't scalable because of its less-than-ideal efficiency. Can anyone come up with a dramatically improved one?"</li>
                        <li>There are no good tutorials about migrating from this SQL database to a noSQL one and I can't figure it out on my own. Would someone put together a quick tutorial?"</li>
                    </ul>
                    <br />
                    <p>
                        If you find an open problem that has yet to find a satisfactory solution, you can work on solving it yourself to get some pebbles, or 
                        you can throw down some pebbles of your own and become a backer, adding to the value of that problem for any would-be solver.
                    </p>
                </Snipit>

                <Snipit width="100%" textSide="right" sizing="small">
                    <h3>Solutions</h3>
                    <p>
                        Solutions are rated by the user who originally posed the problem. Solutions are given a zero if they simply do not get the job done. Other solutions 
                        are graded on a scale of 1-10 based on how satisfactory the solution is. Pebbles are divvied up percentage-wise to solvers. If someone scores a 7/10 
                        on their solution, 70% of the prize goes to them, and the remaining 30% is left waiting for someone else to come in to put the finishing touches on. 
                        If the problem is closed without a 100% solution, the remainder is divvied up among all active users of the platform.
                    </p>
                </Snipit>
            </Container>
            <Container bgcolor="#111">
                <p>&copy; 2018 By Coding Penguins</p>
            </Container>
        </React.Fragment>
        );
    }
}
