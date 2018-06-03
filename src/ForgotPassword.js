import React, { Component } from 'react';
import firebase from 'firebase';
import { ROUTES } from "./constants";
import { HashRouter as Router, Link } from 'react-router-dom';
import { DisplayHeader } from './DisplayHeader';
import './ForgotPassword.css';


export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: ""
        }
    }

    handleReset() {
        // console.log(this.state);
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(this.props.history.push(ROUTES.signIn))
            .catch(function (error) {
                console.log(error)
            });


    }

    render() {
        return (
            <div>
                <DisplayHeader />
                <div className="inputs">
                    <div className="emailInput">
                        <label className="email-label" htmlFor="email">Email</label>
                        <input type="text"
                            id="email"
                            className="form-control"
                            required
                            onInput={evt => this.setState({ email: evt.target.value })} />
                    </div>
                    <div className="usernameInput">
                        <label className="username-label" htmlFor="username">Username</label>
                        <input type='text'
                            id="username"
                            className='form-control'
                            required
                            onInput={evt => this.setState({ username: evt.target.value })} />
                    </div>
                    <p className='notification-message'>An email will be sent to reset your password</p>
                    <div className="button">
                        <button onClick={() => { this.handleReset() }}>RESET PASSWORD</button>
                    </div>
                </div>
            </div>
        )
    }
}