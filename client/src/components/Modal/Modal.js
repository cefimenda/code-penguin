import React, { Component } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';

class ModalExampleDimmer extends Component {
  state = {
    open: false,
    creator: '',
    email: ''
  };

  show = dimmer => () => 
    this.setState({ 
      dimmer, open: true 
    });

  close = () => 
    this.setState({ 
      open: false 
    });

  handleChange = e => {
    const {name, value} = e.target
    this.setState({ [name]: value })
  };

  handleSubmit = e => {
    e.preventDefault()
    this.close()
  }

  render() {
    const { open, dimmer } = this.state;
    const { creator } = this.props;

    return (
      <div>
        <Button className="ui button edit-btn" onClick={this.show('blurring')}>
          <i className="user-edit fas fa-user-edit" />
        </Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Update Your User Name</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Current User Name: {creator.toUpperCase()}</Header>
              <input
                type="text"
                name="creator"
                value={this.state.creator}
                placeholder={this.props.creator}
                onChange={this.handleChange}
              />
              <Header>Current Email Address: {creator.toUpperCase()}</Header>
              <input
                type="text"
                name="email"
                value={this.state.email}
                // placeholder={this.props.creator}
                onChange={this.handleChange}
              />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions className="submit-btn">
            <Button icon="checkmark" labelPosition="right" content="Submit" onClick={this.handleSubmit} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ModalExampleDimmer;
