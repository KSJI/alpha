import React, { Component } from 'react';
import firebase from 'firebase';
import { DisplayHeader } from './DisplayHeader';
import { DisplayCards } from './DisplayCards';

import {DisplayEditAccountSettings} from './Settings.js';  // REMOVE BEFORE SUBMITTING

export class Homepage extends Component {

    render() {
        return (
            <div>
                <DisplayHeader />
                <DisplayCards history={this.props.history}/> {/*Change back to DisplayCards*/}
            </div >
        )
    }
}

