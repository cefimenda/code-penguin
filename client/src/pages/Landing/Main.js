import React, { Component } from 'react';
import Container from "../../components/Container";
import Snippet from "../../components/Snippet";
import './Landing.css';

export default class Main extends Component {
    render() {
        const focus = this.props.side
        return (
        <React.Fragment>
            <Container padding={focus} bgcolor="rgb(32,32,32)">
                <Snippet width="100%" textSide="left" padding="15px">
                    <h3>Why Penguins?</h3>
                    <p>
                        Penguins are renowned in the animal kingdom for their generosity and we wanted our community to incorporate 
                        that pay-it-forward spirit. Penguins famously find the prettiest pebbles they can to give to others. Technically, 
                        their goal is to mate, but let's not stretch the metaphor too far.
                    </p>
                </Snippet>

                <Snippet width="100%" textSide="right" simg="https://i.gifer.com/4m3b.gif" sizing="small" padding="15px">
                    <h3>What are Pebbles?</h3>
                    <p>
                        The "currency" of Code Penguin is the pebble. Pebbles are earned by submitting solutions to others' problems. Pebbles 
                        are spent to "buy" solutions for problems of your own. Pebbles are powered by blockchain technology, but they aren't 
                        a cryptocurrency. They cannot be mined or traded for other currencies. They can only be traded for solutions to problems.
                    </p>
                </Snippet>

                <Snippet width="100%" textSide="left" simg="https://techflourish.com/images/clear-background-pumpkin-spice-latte-clipart-8.png" sizing="medium" padding="15px">
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
                </Snippet>

                <Snippet width="100%" textSide="right" sizing="small" padding="15px">
                    <h3>Solutions</h3>
                    <p>
                        Solutions are rated by the user who originally posed the problem. Solutions are given a zero if they simply do not get the job done. Other solutions 
                        are graded on a scale of 1-10 based on how satisfactory the solution is. Pebbles are divvied up percentage-wise to solvers. If someone scores a 7/10 
                        on their solution, 70% of the prize goes to them, and the remaining 30% is left waiting for someone else to come in to put the finishing touches on. 
                        If the problem is closed without a 100% solution, the remainder is divvied up among all active users of the platform.
                    </p>
                </Snippet>
            </Container>
        </React.Fragment>
        );
    }
}
