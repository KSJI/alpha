import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { Link } from 'react-router-dom';
import { ROUTES } from "./constants";
import { DisplayHeader } from './DisplayHeader';
//import 'bootstrap/dist/css/bootstrap.min.css';

export default class DisplayResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: "",
            imgName: "",
            typeOfMeal: "",
            madeFrom: "",
            totalCalories: "",
            data: [],
            createdAt: "",
            fileName: "",
            dataSnap: undefined
        }
    }
    componentDidMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let email = user.email;
                let subEmail = email.substr(0, email.indexOf('@'));
                this.reference = firebase.database().ref('Profile/' + subEmail + '/Posts/' + this.props.location.state.reference);
                this.reference.on('value', (snapshot) => {
                    let snap = snapshot.val();
                    if (snap !== null) {
                        this.setState({
                            imgUrl: snap.urls,
                            imgName: snap.meal,
                            typeOfMeal: snap.typeOfMeal,
                            madeFrom: snap.madeFrom,
                            totalCalories: snap.totalCalories,
                            createdAt: snap.createdAt,
                            data: snap.data,
                            fileName: snap.file
                        });
                    }
                })

                this.setState(
                    {
                        uid: user.uid,
                    })
            }
        })

    }
    componentWillUnmount() {
        this.authUnlisten();
    }

    render() {
        let date = this.state.createdAt;
        date = date.split(" ");
        date = date[1] + " " + date[2] + ", " + date[3]
        let colors = this.state.data.map((data, i) => {
            console.log(data);
            return (<div className="input-color" key={"color-" + i}><div className="color-box" style={{ backgroundColor: data.html_code }}></div></div>)
        })

        return (
            <div>
                <DisplayHeader />
                <div className="container">
                    <p>{date}</p>
                    <p>{this.state.imgName}</p>
                    <p>{this.state.typeOfMeal}</p>
                    <p>{this.state.madeFrom}</p>
                    <p>{this.state.totalCalories}</p>
                    <div>
                        <Link
                            to={{ pathname: ROUTES.deleteConfirmation, state: { reference: this.reference } }}
                        >
                            <button>Delete</button>
                        </Link>
                    </div>
                    <img width="80%" src={this.state.imgUrl} alt="food" />
                </div>
                <div className="container">
                    <p>colors</p>
                    {colors}
                    <p>percentage</p>
                    {this.state.data.map((data, i) => <p key={"percent-" + i}>{data.percent}%</p>)}
                </div>
            </div >
        )
    }

}