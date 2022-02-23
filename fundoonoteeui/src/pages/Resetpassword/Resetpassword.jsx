
import React from 'react';
import { TextField, FormControlLabel, Checkbox } from '@mui/material';
import { Navigate } from 'react-router-dom';
import UserService from '../../Service/Userservice';

const userService = new UserService();

class ResetPass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      confirm: '',
      passwordError: false,
      confirmError: false,
      type: "password",
      redirect: false
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
    error.passwordError = this.state.password === '' ? true : false;
    error.confirmError = this.state.confirm === '' ? true : false;

    this.setState({
      ...error
    })

    isError = error.passwordError || error.confirmError
    return isError;
  }

  next = () => {
    let isValidated = this.validation();
    let data = {
      "password": this.state.password
    }

    if (!isValidated) {
      userService.ResetPassword(data)
        .then((res) => {
          console.log(res.data);
          this.setState({
            redirect: true
          })
        }).catch((err) => {
          console.log(err);
        })
    }
  }

  showPassword = (event) => {
    event.target.checked ?
      this.setState({
        type: "text"
      }) : this.setState({
        type: "password"
      })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/Signin" />
    }
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
              <span>Reset Password</span>
              <p>Enter your Password</p>
            </div>
            <div className='row-pass'>
              <div className='l-row-in'><TextField
                type={this.state.type}
                id="outlined-basic"
                label="Password"
                name='password'
                size='medium'
                fullWidth
                variant="outlined"
                error={this.state.passwordError}
                helperText={this.state.passwordError ? "Password is required" : ''}
                onChange={(event) => this.changeState(event)} /></div>
            </div>
            <div className='row-pass'>
              <div className='l-row-in'><TextField
                type={this.state.type}
                id="outlined-basic"
                label="Confirm"
                name='confirm'
                size='medium'
                fullWidth
                variant="outlined"
                error={this.state.confirmError}
                helperText={this.state.confirmError ? "Confirm password is required" : ''}
                onChange={(event) => this.changeState(event)} /></div>
            </div>
            <div className='checkbox'>
              <FormControlLabel control={<Checkbox onChange={this.showPassword} />} label="Show Password" />
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

export default ResetPass;