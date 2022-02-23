import React from 'react';
import { TextField } from '@mui/material';
import './ForgotPass.scss'
import UserService from '../../Service/Userservice';
import { Navigate } from 'react-router-dom';

const userService = new UserService();

class ForgotPass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailError: false,
    };
  }

  changeState = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  validation = () => {
    let isError = false;
    const error = this.state;
    error.emailError = this.state.email === '' ? true : false;

    this.setState({
      ...error
    })

    isError = error.emailError
    return isError;
  }

  next = () => {
    let isValidated = this.validation();
    let data = {
      "email": this.state.email
    }
    if (!isValidated) {
      userService.forgotPass(data)
        .then((res) => {
          console.log(res.data);
        }).catch((err) => {
          console.log(err);
        })
    }
  }

  render() {
    return <div>
      <div className='m-container'>
        <div className='item-container'>
          <div className='main-container'>
            <div className='title-sign-in'>
              <p>
                <span style={{ color: "#4285F4" }}>F</span>
                <span style={{ color: "#DB4437" }}>u</span>
                <span style={{ color: "#F4B400" }}>n</span>
                <span style={{ color: "#4285F4" }}>d</span>
                <span style={{ color: "#0F9D58" }}>o</span>
                <span style={{ color: "#DB4437" }}>o</span>
              </p>
            </div>
            <div className='msg-sign-in'>
              <span>Find your email</span>
              <p>Enter your recovery email</p>
            </div>
            <div className='row'>
              <div className='l-row-in'><TextField
                id="outlined-basic"
                label="Email"
                name='email'
                size='medium'
                fullWidth
                variant="outlined"
                error={this.state.emailError}
                helperText={this.state.emailError ? "Email is required" : ''}
                onChange={(event) => this.changeState(event)} /></div>
            </div>
            <div className='row'>
              <div className='btn-cont'>
                <button onClick={this.next}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default ForgotPass;