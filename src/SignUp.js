import React from "react";
import {Link} from "react-router-dom";
import {ROUTES} from './constants';
import firebase from 'firebase/app';
import 'firebase/auth'; 

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
                this.setState({currentUser: user});
                this.setState({displayName: user.displayName});
                this.setState({useruid: user.uid});
                let ref  = firebase.database().ref(`Profile`);
                this.valueListener = ref.on("value", 
                snapshot => this.setState({authorSnap: snapshot}));
            } else {
                let ref  = firebase.database().ref(`Profile`);
                this.valueListener = ref.on("value", 
                snapshot => this.setState({authorSnap: snapshot}));
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
        if (this.state.email == null || this.state.password == null) {
            return;
        } else {
            firebase.auth().createUserWithEmailAndPassword(this.state.email,
            this.state.password)
                .then(user => user.updateProfile({
                    useruid: user.uid,
                    displayName: this.state.displayName,
                }))
                .then(this.handleAdd())
                .then(this.props.history.push(ROUTES.homePage))
                .catch(err => this.setState({fberror: err}))
        }
    }

    handleAdd() {
        let email = this.state.email;
        var subEmail= email.substr(0, email.indexOf('@')); 
        let ref = this.state.authorSnap.ref; 
        let time = firebase.database.ServerValue.TIMESTAMP;
        time = Date(time);
        let newData = {
            Author: {
                Username: this.state.userName,
                Email: this.state.email,
                Weight: this.state.weight
            },
            createdAt: time,
        }
        ref.child(subEmail).set(newData);
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
                    <div className="form-group">
                        <label htmlFor='Full-name'>Full Name</label>
                            <input type='text'
                                className='form-control'
                                required
                                placeholder='Your Full Name'
                                onInput={evt => this.setState({fullName: evt.target.value})}/>
                    </div>
                    <div className="container">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                                <input type="text"
                                    id="email"
                                    className="form-control"
                                    placeholder="your email address"
                                    required
                                    onInput={evt => this.setState({email: evt.target.value})}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor='Weight'>Weight</label>
                            <input type='number'
                                className='form-control'
                                required
                                step='.01'
                                placeholder=''
                                onInput={evt => this.setState({weight: evt.target.value})}/>
                        <p> lb </p>
                    </div>
                    <div className="form-group">
                        <label htmlFor='Username'>Username</label>
                            <input type='text'
                                className='form-control'
                                required
                                placeholder='Your Username'
                                onInput={evt => this.setState({userName: evt.target.value})}/>
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
                        <button type="submit" onClick={() => this.handleSignUp()} className="btn btn-primary">Sign Up</button>
                    </div>                      
                        <p>Already have an account? <Link to={ROUTES.signIn}>
                         Sign In! </Link> </p>
                </main>
            </div>
        );
    }
}