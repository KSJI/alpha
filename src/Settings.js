import React, { Component } from 'react';
import firebase from 'firebase';
import { HashRouter as Router, Link } from 'react-router-dom';
import { DisplayHeader } from './DisplayHeader';
import './Settings.css';
import { ROUTES } from "./constants";


export default class DisplayEditAccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            weight: 0,
            newEmail: '',
            newPassword: '',
            newWeight: ''
        }
    }

    componentWillMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    email: user.email,
                    password: user.password,
                    weight: user.weight,
                    username: user.username
                })

                let email = user.email;
                let subEmail = email.substr(0, email.indexOf('@'));

                this.reference = firebase.database().ref('Profile/' + subEmail + '/Author/Weight');
                this.reference.on('value', (snapshot) => {
                    let snap = snapshot.val();
                    this.setState({
                        weight: snap,
                    });
                })

                this.reference2 = firebase.database().ref('Profile/' + subEmail + '/Author/AcceptTerms');
                this.reference2.on('value', (snapshot) => {
                    let snap = snapshot.val();
                    this.setState({acceptTerms : snap});
                    console.log(snap);
                    if (this.state.acceptTerms === false) {
                        this.props.history.push(ROUTES.acceptTerms);
                    }
                })
            } else {
                this.props.history.push(ROUTES.signIn);
            }
        })
    }

    componentWillUnmount() {
        this.authUnlisten();
    }


    updateSettings() {
        if (this.state.newEmail !== '') {
            function sleep(milliseconds) {
                var start = new Date().getTime();
                for (var i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - start) > milliseconds) {
                        break;
                    }
                }
            }
            let user = firebase.auth().currentUser;

            // Grab the old data
            let email = user.email;
            let subEmail = email.substr(0, email.indexOf('@'));
            this.reference = firebase.database().ref('Profile/' + subEmail);
            this.reference.on('value', (snapshot) => {
                let snap = snapshot.val();
                this.setState({
                    oldData: snap,
                })
                // Set up the new email
                email = this.state.newEmail;
                let tempEmail = email.substr(0, email.indexOf('@'));

                // Create a new node in the firebase database that reflects the new email
                let ref = firebase.database().ref('Profile/' + tempEmail);
                console.log(snap);
                ref.set(snap);
            })



            // Have the user reenter their password
            let text = prompt(
                'What is your current password?',
            );

            // what to pass into reauth
            let credential = firebase.auth.EmailAuthProvider.credential(
                this.state.email,
                text
            );

            user.reauthenticateAndRetrieveDataWithCredential(credential).catch(function (error) {
                console.log(error);
            });

            user.updateEmail(this.state.newEmail).then(
                console.log('success')
            )

            sleep(2000);
        }

        if (this.state.newPassword !== '') {
            let user = firebase.auth().currentUser;

            if (this.state.newEmail !== '') {
                // Have the user reenter their password
                let text = prompt(
                    'What is your current password?',
                );

                // what to pass into reauth
                let credential = firebase.auth.EmailAuthProvider.credential(
                    this.state.newEmail,
                    text
                );

                user.reauthenticateAndRetrieveDataWithCredential(credential).catch(function (error) {
                    console.log(error);
                });
            } else {
                // Have the user reenter their password
                let text = prompt(
                    'What is your current password?',
                );

                // what to pass into reauth
                let credential = firebase.auth.EmailAuthProvider.credential(
                    user.email,
                    text
                );

                user.reauthenticateAndRetrieveDataWithCredential(credential).catch(function (error) {
                    console.log(error);
                });
            }


            user.updatePassword(this.state.newPassword).then(
                console.log('success')
            )
        }

        if (this.state.newWeight !== '') {
            if (this.state.newEmail !== '') {
                let email = this.state.newEmail;
                let subEmail = email.substr(0, email.indexOf('@'));

                this.reference = firebase.database().ref('Profile/' + subEmail + '/Author');
                this.reference.update({ Weight: this.state.newWeight })
            } else {
                let user = firebase.auth().currentUser;
                let email = user.email;
                let subEmail = email.substr(0, email.indexOf('@'));

                this.reference = firebase.database().ref('Profile/' + subEmail + '/Author');
                this.reference.update({ Weight: this.state.newWeight })
            }

        }
    }

    handleAdd() {
        let email = this.state.newEmail;
        var subEmail = email.substr(0, email.indexOf('@'));
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

    handleChange(event) {
        let value = event.target.value;
        let field = event.target.name;

        let change = {};
        change[field] = value;
        this.setState(change);
    }

    render() {

        return (
            <div>
                <DisplayHeader />
                <div className="container">
                    <div className="email-settings">
                        <label className="email-label" htmlFor="email">Email</label>
                        <input type="text"
                            id="email-input"
                            placeholder={this.state.email}
                            name="newEmail"
                            onChange={(event) => { this.handleChange(event) }}>
                        </input><i id="icon-one" className="fas fa-pencil-alt"></i>
                    </div>
                    <div className="password-settings">
                        <label className="password-label" htmlFor="password">Change Password</label>
                        <input type="password"
                            id="password-change"
                            name="newPassword"
                            placeholder="*******"
                            onChange={(event) => { this.handleChange(event) }}>
                        </input><i id="icon-two" className="fas fa-pencil-alt"></i>
                    </div>
                    <div className="weight-settings">
                        <label className="weight-label" htmlFor="weight">Weight</label>
                        <input type="text"
                            id="weight-input"
                            placeholder={this.state.weight}
                            name="newWeight"
                            onChange={(event) => { this.handleChange(event) }}>
                        </input> 
                        <p className="lb-settings"> lbs </p>
                        <i id="icon-three" className="fas fa-pencil-alt"></i>
                    </div>

                    <div className="save">
                        <Router>
                            <Link to="/Homepage"><button onClick={() => this.updateSettings()}>SAVE</button></Link>
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
}