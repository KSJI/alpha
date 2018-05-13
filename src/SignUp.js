import React from "react";
import {Link} from "react-router-dom";
import {ROUTES} from './constants';
import firebase from 'firebase/app';
import 'firebase/auth'; 
import md5 from "blueimp-md5";

export default class SignUpView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",  
            password: "",
            displayName: "",
            confirmPass: "" ,
            photoURL: ""
        }
    }

    handleSignUp() {
        if (this.state.email == null || this.state.password !== this.state.confirmPass) {
            return;
        } else {
            let hash = md5(this.state.email);
            firebase.auth().createUserWithEmailAndPassword(this.state.email,
            this.state.password)
                .then(user => user.updateProfile({
                    photoURL: 'https://www.gravatar.com/avatar/' + hash,
                    useruid: user.uid,
                    displayName: this.state.displayName
                }))
                .then(() => this.props.history.push(ROUTES.signIn))
                .catch(err => this.setState({fberror: err}))
        }
    }
    render() {
        return (
            <div>
                <header className="jumbotron jumbotron-fluid bg-info text-white">
                    <div className="container">
                        <h1>Sign Up</h1>
                    </div>
                </header>
                <main>
                    <div className="container">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                                <input type="text"
                                    id="email"
                                    className="form-control"
                                    placeholder="your email address"
                                    required
                                    onInput={evt => this.setState({email: evt.target.value})}/>
                        </div>
                    <div className="form-group">
                        <label htmlFor='display-name'>Display Name</label>
                            <input type='text'
                                className='form-control'
                                required
                                placeholder='Your display Name'
                                onInput={evt => this.setState({displayName: evt.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                            <input type="password"
                                id="password"
                                className="form-control"
                                placeholder="your password"
                                minLength="6"
                                onInput={evt => this.setState({password: evt.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm password">Confirm Password</label>
                            <input type="password"
                                id=" confirm password"
                                className="form-control"
                                placeholder="confirm your password"
                                minLength="6"
                                onInput={evt => this.setState({confirmPass: evt.target.value})}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={() => this.handleSignUp()} className="btn btn-primary">Sign Up</button>
                    </div>                      
                        <p>Already have an account? <Link to={ROUTES.signIn}>
                         Sign In! </Link> </p>
                    </div>
                </main>
            </div>
        );
    }
}


