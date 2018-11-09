import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import './TaskBox.css';

export default class TaskBox extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="box">
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <p style={{textAlign:"center"}}>
                  Given an Array and an Example-Array to sort to, write a function that sorts the
                  Array following the Example-Array. Assume Example Array catalogs all elements
                  possibly seen in the input Array. 
                  <br />
                  However, the input Array does not necessarily
                  have to have all elements seen in the Example.
                  <br />
                  Example: Arr: [1,3,4,4,4,4,5]
                  <br />
                  Example Arr: [4,1,2,3,5]
                  <br />
                  Result: [4,4,4,4,1,3,5]
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
