import React from "react";
import {ROUTES} from "./constants";
import firebase from 'firebase/app';
import { DisplayHeader } from './DisplayHeader';
import 'firebase/auth';
import './AcceptTerms.css';


export default class AcceptTerms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            acceptTerms: false,
            checked: false,
            subEmail: '',
        }
    }

    componentWillMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    email: user.email,
                    weight: user.weight,
                    username: user.username,
                })

                let email = user.email;
                let subEmail = email.substr(0, email.indexOf('@'));
                this.setState({subEmail:subEmail})

                this.reference = firebase.database().ref('Profile/' + subEmail + '/Author/AcceptTerms');
                this.reference.on('value', (snapshot) => {
                    let snap = snapshot.val();
                    this.setState({acceptTerms : snap})
                })
                console.log(this.state.acceptTerms);
                if (this.state.acceptTerms) {
                    this.props.history.push(ROUTES.homePage);
                }
               
            }
        })
    }

    componentWillUnmount() {
        this.authUnlisten();
    }

    handleCheck() {
        this.setState({checked : !this.state.checked})
        console.log(this.state.checked);
    }

    handleContinue() {
        console.log(this.state.checked);
        if (this.state.checked) {
            this.reference = firebase.database().ref('Profile/' + this.state.subEmail + '/Author/AcceptTerms');
            this.reference.update({
                AcceptTerms: this.state.checked
            });
            this.props.history.push(ROUTES.homePage);
        }
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
		                <div className="tag">Checkbox Big</div>
		                <input type="checkbox" onClick={() => this.handleCheck()} id="checkbox-2-1" className="regular-checkbox big-checkbox" />
                    <p className='accept'> I accept the terms and conditions of this warning </p>
                    <button type="submit" onClick={() => this.handleContinue()} className="btn btn-primary">Continue</button>
                </div>
            </div>
        );
    }
}
