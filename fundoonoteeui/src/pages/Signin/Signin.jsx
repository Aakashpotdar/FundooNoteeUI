import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, Navigate } from 'react-router-dom';
import UserService from '../../Service/Userservice';

const userService = new UserService();

export class Signin extends Component{

    constructor(props) {
        super(props);

        this.state = {
            email:'',
            password:'',
            emailError:false,
            passwordError:false,
            type:"password"
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
        error.emailError = this.state.email === '' ? true : false;
        error.passwordError = this.state.password === '' ? true : false;

        this.setState({
            ...error
        })

        isError = error.emailError || error.passwordError
        return isError;
    }

    next = () => {
        console.log("aaa")
        let isValidated = this.validation();
        let data = {
            "email": this.state.email,
            "password": this.state.password
        }

        console.log("tttt",isValidated)
        if (!isValidated) {
            console.log("ddd")
            userService.Signin(data)
            .then((res) => {
                console.log(res);
                localStorage.setItem("token" ,res.data.token)
                this.setState({
                    redirect: true
                })
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    signup = () => {
        this.setState({
          redirectSignup: true
        });
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
        if (this.state.redirect) {
            return <Navigate to="/Dashboard" />
          } else if (this.state.redirectSignup) {
            return <Navigate to="/Signup" />
          }
        return<div className="outer-Box1">
                <div className="content-div">
                    <h3>Fundoo Notes</h3>
                    <h2>Sign In</h2>
                    <h4>Use Your Account Details</h4>
                </div>
                <div className="content-div">
                        <div className="Text-name">
                            <TextField id="outlined-basic" name="email" onChange={(event) => this.changeState(event)} label="Email Id" variant="outlined"/> 
                        </div>
                        <div className="Text-name">
                           <TextField id="outlined-basic" name="password" label="Password" onChange={(event) => this.changeState(event)} variant="outlined" />
                        </div>
                        <div> 
                            <Link to="/forgot" className="link-newuser" href="#" underline="none">{'Forgot Password?'}</Link>
                        </div>
                        <div>
                        <Link className="link-newuser" to="/Signup" underline="none">{'Create New User'}</Link>
                           
                        </div>
                        <Button className="bu" onClick={this.next} variant="contained">Next</Button>
                    </div>
            </div>;
    }
}
export default Signin
