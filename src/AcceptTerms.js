import React from "react";
import {Link} from 'react-router-dom';
import {ROUTES} from "./constants";
import firebase from 'firebase/app';
import { DisplayHeader } from './DisplayHeader';
import 'firebase/auth';
import './AcceptTerms.css';


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
                <div className='container'>
                    <p className='warning'> 
                        WARNING: 
                        Please be aware of your daily consumptions. 
                        This is a fun website to help encourage people to 
                        live a healthier lifestyle not for bulimia, 
                        anorexia, etc. </p>
                    
                    <p className='accept'> I accept the terms and conditions of this warning </p>
                </div>
            </div>
        );
    }
}
