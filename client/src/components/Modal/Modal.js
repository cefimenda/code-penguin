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
    }  else {
      this.setState({ userusername: '', [name]: value });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { userusername, useremail, password, repassword } = this.state
    this.setState({ showerr: false})
    if ( userusername === '' && useremail === '' && password === '') {
      this.setState({ showerr: true, errmsg: "Please add text"})
    } else {
      if (userusername !== '' && userusername) {
        await API.createUserData({
          'type': 'username', 'data': userusername
        });
        this.props.modalfunction();
      } else {
        if (useremail !== '' && password !== '' && useremail && password) {
          if (useremail.includes('@') && useremail.includes('.')) {
            if (password === repassword) {
              await API.updateCredentials({ 'email': useremail, 'password': password });
              this.props.modalfunction();
            } else {
              this.setState({ showerr: true, errmsg: "Your passwords do not match"})
            }
          } else {
            this.setState({ showerr: true, errmsg: "Must be an email"})
          }
        } else {
          this.setState({ showerr: true, errmsg: "Must add email and password to make this change"})
        }
        
      }
    }

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
            <p className="modal-label">Edit Email and Password:</p>
            <input
              type="text"
              name="useremail"
              value={useremail}
              placeholder={`enter new email address here`}
              onChange={this.handleChange}
            />{' '}
            <br />
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
          {showerr ? <p className="modal-err">* {errmsg}</p> : ""}
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
