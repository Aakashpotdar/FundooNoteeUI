import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import UserService from '../../Service/Userservice';
import "./Signup.scss";

const userService = new UserService();

export class Signup extends Component{

    constructor(props) {
        super(props);

        this.state ={
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirm:'',
            firstNameError:false,
            lastNameError:false,
            emailError:false,
            passwordError:false,
            confirmError:false,
            type: "password"
        };
    }

    changeState = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    validation = () => {
        let isError = false;
        const error = this.state;
        error.firstNameError = this.state.firstName === '' ? true : false;
        error.lastNameError = this.state.lastName === '' ? true : false;
        // error.emailError = this.state.email === '' ? true : false;
        error.passwordError = this.state.password === '' ? true : false;
        error.confirmError = this.state.confirm === '' ? true : false;

        this.setState({
            ...error
        })

        isError = error.firstNameError || error.lastNameError || error.emailError || error.passwordError || error.confirmError
        return isError;
    }

    next = () => {
        let isValidated = this.validation();
        let data = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email": this.state.email,
            "password": this.state.password
        }
        
        if (!isValidated) {
            userService.Signup(data)
            .then((res) => {
                console.log(res.data);
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

    render(){
        return<div className="outer-Box out">
            <div className="dev">
                <div className="content-div">
                    <h3>Fundoo Notes</h3>
                    <h2>Create New User</h2>
                    <div className="Textname-fild">
                        <div className="Text-name">
                            <TextField 
                                name='firstName'
                                size="small"
                                label="First name"
                                error={this.state.firstNameError}
                                helperText={this.state.firstNameError ? "First Name is required":''}
                                onChange={(event) => this.changeState(event)}
                                variant="outlined" />   
                            <TextField 
                                name='lastName'
                                size="small" 
                                label="Last name"
                                error={this.state.lastNameError}
                                helperText={this.state.lastNameError ? "Last Name is required" : ''}
                                onChange={(event) => this.changeState(event)} 
                                variant="outlined" />
                        </div>
                        <div className="div-user">
                           <TextField 
                                label="Username" 
                                name='email'
                                helperText="You can use letter, numbers & periods" 
                                fullWidth 
                                size='small' 
                                fullWidth
                                variant="outlined"
                                error={this.state.emailError}
                                //helperText={this.state.emailError ? "Email is required" : ''}
                                onChange={(event) => this.changeState(event)} />
                        </div>
                    </div>
                    <div className="div-link"> 
                        <div>{'Use my current Email Address instead'}</div>
                    </div>
                    <div >
                        <div>
                            <TextField 
                                type={this.state.type} 
                                className="div-password"
                                label="Password" 
                                name='password'
                                size='small' 
                                variant="outlined"
                                error={this.state.passwordError}
                                helperText={this.state.passwordError ? "Password is required" : ''}
                                onChange={(event) => this.changeState(event)} />
                             <TextField 
                                type={this.state.type}
                                className="div-password" 
                                id="outlined-basic" 
                                label="Confirm" 
                                name='confirm'
                                size='small' 
                                variant="outlined"
                                error={this.state.confirmError}
                                helperText={this.state.confirmError ? "Confirm password is required" : ''}
                                onChange={(event) => this.changeState(event)} />
                        </div>
                        <div className="checkbox">
                        <FormControlLabel control={<Checkbox />} label="Show Password" />
                        </div>
                    </div>
                    <div>
                        <Link  to="/Signin"  className="link-newuser"underline="none">{'SignIn Insted'}</Link>    
                        <Button className="bu" variant="contained" onClick={this.next}>Next</Button>
                     </div>
                </div>
                <div className="div-img">
                    <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt="" width="244" height="244" class="j9NuTc TrZEUc"/>
                    <div>
                    One account. All of Fundoo working for you.
                    </div>
                </div> 
            </div>    
        </div>
    }
}
export default Signup