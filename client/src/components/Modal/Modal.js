import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import "./Modal.css"

class ModalExampleDimmer extends Component {
  state = {
    userusername: '',
    useremail: '',
    password: '',
    repassword: ''
  };

  show = dimmer => () =>
    this.setState({
      dimmer,
      open: true
    });

  close = () =>
    this.setState({
      open: false
    });

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.close();
  };

  render() {
    const { creator, modalOpen, modalfunction } = this.props;
    const { userusername, useremail, password, repassword } = this.state

    return (
      <div>
        <Button className="ui button edit-btn" onClick={this.show('blurring')}>
          <i className="user-edit fas fa-user-edit" />
        </Button>

        <Modal
          dimmer={dimmer}
          open={open}
          onClose={this.close}
          style={{
            width: '50%',
            textAlign: 'center'
          }}
        >
          <Modal.Header
            style={{
              backgroundColor: '#00b5ad',
              color: 'white',
              letterSpacing: '3px'
            }}
          >
            Update Your Profile
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header
                style={{
                  letterSpacing: '2px'
                }}
              >
                Current Username:
              </Header>
              <input
                style={{
                  border: 'none',
                  padding: '5px',
                  borderBottom: '2px solid #00b5ad',
                  borderRadius: '5px',
                  letterSpacing: '2px',
                  width: '200px',
                  marginBottom: '10px',
                  outline: 'none'
                }}
                type="text"
                name="creator"
                value={this.state.creator}
                placeholder={this.props.creator}
                onChange={this.handleChange}
              />
              <Header
                style={{
                  letterSpacing: '2px'
                }}
              >
                Current Email Address:
              </Header>
              <input
                style={{
                  border: 'none',
                  padding: '5px',
                  borderRadius: '5px',
                  borderBottom: '2px solid #00b5ad',
                  letterSpacing: '2px',
                  width: '200px',
                  outline: 'none'
                }}
                type="text"
                name="email"
                value={this.state.email}
                // placeholder={this.props.creator}
                onChange={this.handleChange}
              />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions className="submit-btn">
            <Button
              style={{
                backgroundColor: '#00b5ad',
                color: 'white'
              }}
              icon="checkmark"
              labelPosition="right"
              content="Save"
              onClick={this.handleSubmit}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ModalExampleDimmer;
