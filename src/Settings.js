import React, { Component } from 'react';
import firebase from 'firebase';
import { DisplayHeader } from './DisplayHeader';
import './Settings.css';

export class DisplayEditAccountSettings extends Component {
    render() {
        return (
            <div>
                <DisplayHeader />
                <div className="settings">
                    <div className="email">
                        <p className="text">Email</p> <input type="text"></input>
                    </div>
                    <div className="password">
                        <p className="text">Change Password</p> <input type="text"></input>
                    </div>
                    <div className="weight">
                        <p className="text">Weight</p> <input type="text"></input> lbs
                    </div>

                    <div className="save">
                        <button>SAVE</button>
                    </div>
                </div>
            </div>
        )
    }
}