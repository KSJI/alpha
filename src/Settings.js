import React, { Component } from 'react';
import firebase from 'firebase';
import { DisplayHeader } from './DisplayHeader';
import './Settings.css';

export class DisplayEditAccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            weight: 0
        }
    }

    componentDidMount() {
        let user =  firebase.auth().currentUser;
        console.log(user);
        this.setState({
            email: "email", //user.email
            password:"the", //user.password
            weight:123 //user.weight
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
                        <button>SAVE</button>
                    </div>
                </div>
            </div>
        )
    }
}