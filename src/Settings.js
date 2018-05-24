import React, { Component } from 'react';
import firebase from 'firebase';
import{HashRouter as Router, Route, Link} from 'react-router-dom';
import { DisplayHeader } from './DisplayHeader';
import './Settings.css';

export default class DisplayEditAccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            weight: 0
        }
    }

    componentWillMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged(user => {
            this.setState({
                email:user.email,
                password:user.password,
                weight:user.weight
            })

            let email = user.email;
            let subEmail= email.substr(0, email.indexOf('@')); 

            this.reference = firebase.database().ref('Profile/' + subEmail + '/Author/Weight');
            this.reference.on('value', (snapshot) => {
                let snap = snapshot.val();
                this.setState({
                    weight: snap,
                });
            })
        })
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
                        <p className="text">Change Password</p> <input type="text" placeholder={this.state.password}></input>
                    </div>
                    <div className="weight">
                        <p className="text">Weight</p> <input type="text" placeholder={this.state.weight}></input> lbs
                    </div>

                    <div className="save">
                        <Router>
                            <Link to="/Homepage"><button>SAVE</button></Link>
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
}