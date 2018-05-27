import React from "react";
import {Link} from 'react-router-dom';
import {ROUTES} from "./constants";
import firebase from 'firebase/app';
import 'firebase/auth';
import './SignIn.css';
import './DisplayHeader.css';

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
                this.props.history.push(ROUTES.homePage);
            }
        });
        
    }

    componentWillUnmount() {
        this.authUnlisten();
    }

    handleSignIn() {
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(() => this.props.history.push(ROUTES.homePage))
        .catch(err => this.setState({fberror: err}))
    }
    render() {
        return (
            <div>
                <header className="jumbotron jumbotron-fluid bg-primary text-white">
                    <div className="container">
                        <h1>KSJI</h1>
                    </div>
                </header>
                <main>
                    <div className="container">
                        <div className="form-group-one">
                            <label className="username-input" htmlFor="username">Username</label>
                            <input type="text"
                                id="username"
                                className="form-control"
                                //placeholder="your email address"
                                required 
                               onInput={evt => this.setState({email: evt.target.value})}/>
                        </div>
                        <div className="form-group-two">
                            <label className="password-input" htmlFor="password">Password</label>
                            <input type="password"
                                id="password"
                                className="form-control"
                                //placeholder="your password"
                                minLength="6"
                                onInput={evt => this.setState({password: evt.target.value})}/>
                        </div>
                        {/* <p className="forgot-password"><Link to={ROUTES.forgotPassword}> Forgot Password? </Link> </p> */}
                        <div className="form-group">
                            <button type="submit" onClick={() => this.handleSignIn()} className="btn btn-primary">LOG-IN</button>
                        </div>
                        <p className="new-message">New to KSJI? <Link to={ROUTES.signUp}> Sign Up! </Link> </p>
                    </div>
                </main>
            </div>
        );
    }
}
