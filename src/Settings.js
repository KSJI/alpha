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
                    weight: user.weight
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

        }

        if (this.state.newPassword !== '') {
            let user = firebase.auth().currentUser;
            user.updatePassword(this.state.newPassword).then(
                console.log('success')
            )
        }

        if (this.state.newWeight !== '') {
            
        }
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
                <div className="settings">
                    <div className="email">
                        <p className="text">Email</p> <input type="text" placeholder={this.state.email}></input>
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
                        <p className="text">Weight</p> <input type="text" placeholder={this.state.weight}></input> lbs
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