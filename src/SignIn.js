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
                let email = user.email;
                let subEmail = email.substr(0, email.indexOf('@'));
                this.setState({subEmail:subEmail})

                this.reference = firebase.database().ref('Profile/' + subEmail + '/Author/AcceptTerms');
                this.reference.on('value', (snapshot) => {
                    let snap = snapshot.val();
                    this.setState({acceptTerms:snap})
                })
            }
        });

    }

    componentWillUnmount() {
        this.authUnlisten();
    }

    handleSignIn() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.history.push(ROUTES.acceptTerms))
            .catch(err => this.setState({ fberror: err }))
    }

    render() {
        return (

            <div>
                <DisplayHeader />
                <div className="container">
                    <div className="form-group-one-signin">
                        <label className="username-input" htmlFor="username">Email</label>
                        <input type="text"
                            id="username-signin"
                            className="form-control"
                            onInput={evt => this.setState({ email: evt.target.value })} />
                    </div>
                    <div className="form-group-two-signin">
                        <label className="password-input" htmlFor="password">Password</label>
                        <input type="password"
                            id="password-signin"
                            className="form-control"
                            minLength="6"
                            onInput={evt => this.setState({ password: evt.target.value })} />
                    </div>
                    <div className='forgot-password'>
                        <Link to={ROUTES.forgotPassword}>
                            <p className='forgot-password-message'>Forgot Password?</p>
                        </Link>
                    </div>
                    <div className="form-group-signin" onClick={() => this.handleSignIn()}>
                        <button type="submit" className="btn btn-primary">LOG-IN</button>
                    </div>
                    <p className="new-message">New to KSJI? <Link to={ROUTES.signUp}> Sign Up! </Link> </p>
                </div>  
            </div>
        );
    }
}
