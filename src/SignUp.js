import React from "react";
import {Link} from "react-router-dom";
import {ROUTES} from './constants';
import firebase from 'firebase/app';
import 'firebase/auth'; 
import './SignUp.css';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            email: "",  
            password: "",
            userName: "",
            confirmPass: "",
            weight: "",
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
        if (this.state.email == null || this.state.password !== this.state.confirmPass) {
            return;
        } else {
            this.handleAdd();
            firebase.auth().createUserWithEmailAndPassword(this.state.email,
            this.state.password)
                .then(user => user.updateProfile({
                    useruid: user.uid,
                    displayName: this.state.displayName
                }))
                .then(() => this.props.history.push(ROUTES.homePage))
                .catch(err => this.setState({fberror: err}))

        }
    }

    handleAdd() {
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
        ref.push(newData);
    }

    render() {
        return (
            <div>
                <header className="jumbotron jumbotron-fluid bg-info text-white">
                    <div className="container">
                        <h1>KSJI</h1>
                    </div>
                </header>
                <main>
                    <div className="container">
                        <div className="form-group-one">
                            <label className="label-one" htmlFor='Full-name'>Full Name</label>
                                <input type='text'
                                    id='name'
                                    className='form-control'
                                    required
                                    // placeholder='Your Full Name'
                                    onInput={evt => this.setState({fullName: evt.target.value})}/>
                        </div>
                        {/* <div className="container"> */}
                            <div className="form-group-two">
                                <label className="label-two" htmlFor="email">Email</label>
                                    <input type="text"
                                        id="email"
                                        className="form-control"
                                        // placeholder="your email address"
                                        required
                                        onInput={evt => this.setState({email: evt.target.value})}/>
                            </div>
                        {/* </div> */}
                        <div className="form-group-three">
                            <label className="label-three" htmlFor='Weight'>Weight</label>
                                <input type='number'
                                    id="weight"
                                    className='form-control'
                                    required
                                    step='.01'
                                    // placeholder=''
                                    onInput={evt => this.setState({weight: evt.target.value})}/>
                            <p className="lbs"> lbs </p>
                        </div>
                        <div className="form-group-four">
                            <label className="label-four" htmlFor='Username'>Username</label>
                                <input type='text'
                                    id='username'
                                    className='form-control'
                                    required
                                    // placeholder='Your Username'
                                    onInput={evt => this.setState({userName: evt.target.value})}/>
                        </div>
                        <div className="form-group-five">
                            <label className="label-five" htmlFor="password">Password</label>
                                <input type="password"
                                    id="password"
                                    className="form-control"
                                    // placeholder="your password"
                                    minLength="6"
                                    onInput={evt => this.setState({password: evt.target.value})}/>
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="confirm password">Confirm Password</label>
                                <input type="password"
                                    id=" confirm password"
                                    className="form-control"
                                    placeholder="confirm your password"
                                    minLength="6"
                                    onInput={evt => this.setState({confirmPass: evt.target.value})}/>
                        </div> */}
                        <div className="form-group">
                            <button type="submit" onClick={() => this.handleSignUp()} className="btn btn-primary">CREATE AN ACCOUNT</button>
                        </div>                      
                            {/* <p>Already have an account? <Link to={ROUTES.signIn}>
                            Sign In! </Link> </p> */}
                    </div>
                </main>
            </div>
        );
    }
}


