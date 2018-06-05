import React from "react";
import { ROUTES } from './constants';
import firebase from 'firebase/app';
import 'firebase/auth'; 
import './SignUp.css';
import { DisplayHeader } from './DisplayHeader';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            email: "",
            password: "",
            userName: "",
            weight: "",
            useruid: "",
            authorSnap: undefined
        }
    }


    componentWillMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let user = firebase.auth().currentUser;
                this.setState({ currentUser: user });
                this.setState({ displayName: user.displayName });
                this.setState({ useruid: user.uid });
                let ref = firebase.database().ref(`Profile`);
                this.valueListener = ref.on("value",
                    snapshot => this.setState({ authorSnap: snapshot }));
            } else {
                let ref = firebase.database().ref(`Profile`);
                this.valueListener = ref.on("value",
                    snapshot => this.setState({ authorSnap: snapshot }));
            }
        });
    }

    componentWillUnmount() {
        this.authUnlisten();
        if (this.state.messageSnap) {
            let ref = this.state.authorSnap.ref;
            ref.off("value", this.valueListener);
        }
    }

    handleSignUp() {
        if (this.state.email === '' || this.state.password === '' || this.state.fullName === ''
                || this.state.userName === '' || this.state.weight === '' || this.state.weight.includes("e")) {
            return;
        } else {
            firebase.auth().createUserWithEmailAndPassword(this.state.email,
                this.state.password)
                .then(user => user.updateProfile({
                    useruid: user.uid,
                    displayName: this.state.displayName,
                }))
                .then(this.handleAdd())
                .then(this.props.history.push(ROUTES.acceptTerms))
                .catch(err => this.setState({ fberror: err }))
        }
    }

    handleAdd() {
        let email = this.state.email;
        var subEmail = email.substr(0, email.indexOf('@'));
        let ref = this.state.authorSnap.ref;
        let time = firebase.database.ServerValue.TIMESTAMP;
        time = Date(time);
        let newData = {
            Author: {
                Username: this.state.userName,
                Email: this.state.email,
                Weight: this.state.weight,
                AcceptTerms: false
            },
            createdAt: time,
        }
        ref.child(subEmail).set(newData);
    }

    render() {
        return (
            <div>
                <DisplayHeader />
                <div className="container">
                    <div className="form-group-one-signup">
                        <label className="label-one" htmlFor='Full-name'>Full Name</label>
                            <input type='text'
                                id='name-signup'
                                className='form-control'
                                required
                                onInput={evt => this.setState({fullName: evt.target.value})}/>
                    </div>
                    <div className="form-group-two-signup">
                        <label className="label-two" htmlFor="email">Email</label>
                            <input type="text"
                                id="email-signup"
                                className="form-control"
                                required
                                onInput={evt => this.setState({email: evt.target.value})}/>
                    </div>
                    <div className="form-group-three-signup">
                        <label className="label-three" htmlFor='Weight'>Weight</label>
                            <input type='number'
                                id="weight-signup"
                                className='form-control'
                                required
                                min="0"
                                step='.01'
                                onInput={evt => this.setState({weight: evt.target.value})}/>
                        <p className="lb-signup"> lbs </p>
                    </div>
                    <div className="form-group-four-signup">
                        <label className="label-four" htmlFor='Username'>Username</label>
                            <input type='text'
                                id='username-signup'
                                className='form-control'
                                required
                                onInput={evt => this.setState({userName: evt.target.value})}/>
                    </div>
                    <div className="form-group-five-signup">
                        <label className="label-five" htmlFor="password">Password</label>
                            <input type="password"
                                id="password-signup"
                                className="form-control"
                                minLength="6"
                                onInput={evt => this.setState({password: evt.target.value})}/>
                    </div>
                    <div className="form-group-signup" onClick={() => this.handleSignUp()}>
                        <button type="submit" className="btn btn-primary">CREATE AN ACCOUNT</button>
                    </div>                  
                </div>
            </div>
        );
    }
}