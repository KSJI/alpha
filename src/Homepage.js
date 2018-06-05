import React, { Component } from 'react';
import { DisplayHeader } from './DisplayHeader';
import { DisplayCards } from './DisplayCards';
import './HomePage.css';
import firebase from 'firebase';
import { ROUTES } from "./constants";


export class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ""
        };
    }

    componentWillMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let email = user.email;
                let subEmail = email.substr(0, email.indexOf('@'));

                this.reference2 = firebase.database().ref('Profile/' + subEmail + '/Author/AcceptTerms');
                this.reference2.on('value', (snapshot) => {
                    let snap = snapshot.val();
                    this.setState({ acceptTerms: snap });
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

    
    render() {
        return (
            <div>
                <DisplayHeader />
                <DisplayCards history={this.props.history} />
            </div >
        )
    }
}

