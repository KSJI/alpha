import React from "react";
import { Link } from 'react-router-dom';
import { ROUTES } from "./constants";
import firebase from 'firebase/app';
import { DisplayHeader } from './DisplayHeader';
import 'firebase/auth';
import './SignIn.css';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    componentDidMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.history.push({ state: { pwd: this.state.password }, pathname: ROUTES.homePage });
            }
        });

    }

    componentWillUnmount() {

        // this.authUnlisten();
    }

    handleSignIn() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.history.push({ state: { pwd: this.state.password }, pathname: ROUTES.acceptTerms }))
            .catch(err => this.setState({ fberror: err }))
    }
    render() {
        return (

            <div>
                <DisplayHeader />
                <div className="container">
                    <div className="form-group-one">
                        <label className="username-input" htmlFor="username">Username</label>
                        <input type="text"
                            id="username"
                            className="form-control"
                            //placeholder="your email address"
                            required
                            onInput={evt => this.setState({ email: evt.target.value })} />
                    </div>
                    <div className="form-group-two">
                        <label className="password-input" htmlFor="password">Password</label>
                        <input type="password"
                            id="password"
                            className="form-control"
                            //placeholder="your password"
                            minLength="6"
                            onInput={evt => this.setState({ password: evt.target.value })} />
                    </div>
                    <div>
                        <Link to={ROUTES.forgotPassword}>
                            <p className='forgot-password'>Forgot Password?</p>
                        </Link>
                    </div>
                    
                    <div className="form-group">
                        <button type="submit" onClick={() => this.handleSignIn()} className="btn btn-primary">LOG-IN</button>
                    </div>
                    <p className="new-message">New to KSJI? <Link to={ROUTES.signUp}> Sign Up! </Link> </p>
                </div>
            </div>
        );
    }
}
