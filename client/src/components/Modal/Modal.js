import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import API from '../../utils/API';
import './Modal.css';

class ModalExampleDimmer extends Component {
  state = {
    userusername: '',
    useremail: '',
    password: '',
    repassword: '',
    showerr: false,
    errmsg: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    if (name === 'userusername') {
      this.setState({ userusername: value, useremail: '', password: '', repassword: '' });
    } else if (name === 'useremail') {
      this.setState({ userusername: '', useremail: value, password: '', repassword: '' });
    } else {
      this.setState({ userusername: '', useremail: '', [name]: value });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.userusername !== '' && this.state.userusername) {
      await API.createUserData({
        'type': 'username', 'data': this.state.userusername
      });
    }
    if (this.state.useremail !== '' && this.state.password !== '' && this.state.useremail && this.state.password && this.state.password === this.state.repassword) {
      await API.updateCredentials({ 'email': this.state.useremail, 'password': this.state.password });
    }
    this.props.modalfunction();
  };

  render() {
    const { creator, modalOpen, modalfunction } = this.props;
    const { userusername, useremail, password, repassword, showerr, errmsg } = this.state;

    return (
      <Modal dimmer="blurring" open={modalOpen} onClose={modalfunction} basic size="small">
        <Modal.Header
          style={{
            color: 'white',
            letterSpacing: '3px'
          }}
        >Update Profile Information
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p className="modal-label">Edit Username:</p>
            <input
              type="text"
              name="userusername"
              value={userusername}
              placeholder={creator}
              onChange={this.handleChange}
            />{' '}
            <br />
            <p className="modal-or center">--------------- or ---------------</p>
            <p className="modal-label">Edit Email:</p>
            <input
              type="text"
              name="useremail"
              value={useremail}
              placeholder={`enter new email address here`}
              onChange={this.handleChange}
            />{' '}
            <br />
            <p className="modal-or center">--------------- or ---------------</p>
            <p className="modal-label">Edit Password:</p>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="enter new password here"
              onChange={this.handleChange}
            />{' '}
            <br />
            <input
              type="password"
              name="repassword"
              value={repassword}
              placeholder="please re-enter new password here"
              onChange={this.handleChange}
            />{' '}
            <br />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions className="submit-btn">
          {showerr ? <p className="modal-err">{errmsg}</p> : ""}
          <button className="ui right modal-submit-btn-close" onClick={modalfunction}>
            Close <i aria-hidden="true" className="remove icon" />
          </button>
          <button className="ui right modal-submit-btn" onClick={this.handleSubmit}>
            Submit <i aria-hidden="true" className="checkmark icon" />
          </button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalExampleDimmer;
