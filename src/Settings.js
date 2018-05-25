import React, { Component } from 'react';
import firebase from 'firebase';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { DisplayHeader } from './DisplayHeader';
import './Settings.css';

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
            }
        })
    }

    updateSettings() {
        if (this.state.newEmail !== '') {
            let user = firebase.auth().currentUser;
            // Get the current email node, (erase it?)
            // Concatenate the new email address
            // Add a new entry into the authentication
            // Add the new node in the database

            // user.reauthenticateAndRetrieveDataWithCredential(credential).then(function () {
            //     // User re-authenticated.
            // }).catch(function (error) {
            //     // An error happened.
            // });

            user.updateEmail(this.state.newEmail).then(
                console.log('success')
            )




            // let user = firebase.auth().currentUser;
            // let ref = firebase.database().ref(`Profile`);
            // this.valueListener = ref.on("value",
            //     snapshot => this.setState({ authorSnap: snapshot }));

            // let email = this.state.newEmail;
            // var subEmail = email.substr(0, email.indexOf('@'));
            // ref = this.state.authorSnap.ref;
            // let time = firebase.database.ServerValue.TIMESTAMP;
            // time = Date(time);
            // let newData = {
            //     Author: {
            //         Username: this.state.userName,
            //         Email: this.state.email,
            //         Weight: this.state.weight
            //     },
            //     createdAt: time,
            // }
            // ref.child(subEmail).set(newData);
        }

        if (this.state.newPassword !== '') {
            let user = firebase.auth().currentUser;
            user.updatePassword(this.state.newPassword).then(
                console.log('success')
            )
        }

        if (this.state.newWeight !== '') {
            let user = firebase.auth().currentUser;
            let email = user.email;
            let subEmail = email.substr(0, email.indexOf('@'));

            this.reference = firebase.database().ref('Profile/' + subEmail + '/Author');
            this.reference.update({ Weight: this.state.newWeight })
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
        console.log(change);
    }

    render() {
        return (
            <div>
                <DisplayHeader />
                <div className="settings">
                    <div className="email">
                        <p className="text">Email</p>
                        <input type="text"
                            placeholder={this.state.email}
                            name="newEmail"
                            onChange={(event) => { this.handleChange(event) }}>
                        </input>
                    </div>
                    <div className="password">
                        <p className="text">Change Password</p>
                        <input type="password"
                            name="newPassword"
                            placeholder="*******"
                            onChange={(event) => { this.handleChange(event) }}>
                        </input>
                    </div>
                    <div className="weight">
                        <p className="text">Weight</p>
                        <input type="text"
                            placeholder={this.state.weight}
                            name="newWeight"
                            onChange={(event) => { this.handleChange(event) }}>
                        </input> lbs
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