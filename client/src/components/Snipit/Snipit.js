import React, { Component } from 'react'
import { Grid, Image } from 'semantic-ui-react'
import './Snipit.css';

export default class Snipit extends Component {
  // weight, height, textSide, simg, children

  render() {
    return (
      <div className="snipit-container" style={{ width: `${this.props.width ? this.props.width : "100%"}`, height: `${this.props.height ? this.props.height : "auto"}`}}>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              {this.props.textSide === "left" ? this.props.children : <Image src={this.props.simg} size={this.props.sizing} centered />}
            </Grid.Column>

            <Grid.Column>
            {this.props.textSide === "right" ? this.props.children : <Image src={this.props.simg} size={this.props.sizing} centered />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
