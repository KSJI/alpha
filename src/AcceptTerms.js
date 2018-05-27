import React from "react";
import {Link} from 'react-router-dom';
import {ROUTES} from "./constants";
import firebase from 'firebase/app';
import { DisplayHeader } from './DisplayHeader';
import 'firebase/auth';

export default class AcceptTerms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            acceptTerms: ''
        }
    }

    componentWillMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    email: user.email,
                    password: user.password,
                    weight: user.weight,
                    username: user.username,
                    acceptTerms: user.acceptTerms
                })

                let email = user.email;
                let subEmail = email.substr(0, email.indexOf('@'));

                this.reference = firebase.database().ref('Profile/' + subEmail + '/Author/AcceptTerms');
                this.reference.on('value', (snapshot) => {
                    let snap = snapshot.val();
                    console.log(snap);
                    console.log(this.state.acceptTerms);
                })
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
            </div>
        );
    }
}
