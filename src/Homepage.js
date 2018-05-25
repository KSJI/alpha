import React, { Component } from 'react';
import firebase from 'firebase';
import { DisplayHeader } from './DisplayHeader';
import { DisplayCards } from './DisplayCards';

export class Homepage extends Component {

    render() {
        console.log(this.props.history);
        return (
            <div>
                <DisplayHeader />
                <DisplayCards history={this.props.history}/>
            </div >
        )
    }
}

