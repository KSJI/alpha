import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { Link } from 'react-router-dom';
import { ROUTES } from "./constants";
import { DisplayHeader } from './DisplayHeader';
import './DisplayResult.css'
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
            key: "",
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

                this.reference2 = firebase.database().ref('Profile/' + subEmail + '/Author/AcceptTerms');
                this.reference2.on('value', (snapshot) => {
                    let snap = snapshot.val();
                    this.setState({acceptTerms : snap});
                    if (this.state.acceptTerms === false) {
                        this.props.history.push(ROUTES.acceptTerms);
                    }
                })

                this.setState(
                    {
                        uid: user.uid,
                        key: this.props.location.state.reference
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
            return (<div className="input-color" key={"color-" + i}><div className="color-box" style={{ backgroundColor: "" + data.html_code }}></div></div>)
        })
        let name = this.state.imgName;
        let imgNameCase = name.charAt(0).toUpperCase() + name.substr(1);
        return (
            <div>
                <DisplayHeader />
                <div className="container">
                    <div className="flex-space" style={{textAlign:"left"}}>
                        <div className="flex-direction-top">
                            <p className='date'>{date}</p>
                            <p className='name'>{imgNameCase}</p>
                            {/* {this.state.typeOfMeal !== "" ? <p>Type of Meal: {this.state.typeOfMeal}</p> : undefined}
                            {this.state.madeFrom !== "" ? <p>Made From: {this.state.madeFrom}</p> : undefined}
                            {this.state.totalCalories !== "" ? <p>Total Calories: {this.state.totalCalories}</p> : undefined} */}
                        </div>
                        <div style={{justifyContent: "flex-end"}}>
                            <Link
                                to={{ pathname: ROUTES.deleteConfirmation, state: {reference: this.reference, key: this.state.key} }}
                            >
                                <button className="fa fa-trash" style={{height: "50%", width: "10%", float: "right", color:"black"}}></button>
                            </Link>
                        </div>
                    </div>
                    <img width="70%" src={this.state.imgUrl} alt="food" />
                </div>
                <div className="container">
                    <div className="flex-container">
                    <p className="color-analysis-label">Color Analysis</p>
                        <div className="flex-direction">
                        <p className='color-label'>Color</p>
                        {colors}
                        </div>
                        <div className="flex-direction">
                        <p className='percentage-label'>Percentage</p>
                        {this.state.data.map((data, i) => <p key={"percent-" + i}>{data.percent}%</p>)}
                        </div>
                        <div className="flex-direction">
                            {this.state.typeOfMeal !== "" ? <p className='meal-label'>Type of Meal: {this.state.typeOfMeal}</p> : undefined}
                            {this.state.madeFrom !== "" ? <p className='made-label'>Made From: {this.state.madeFrom}</p> : undefined}
                            {this.state.totalCalories !== "" ? <p className='calories-label'>Total Calories: {this.state.totalCalories}</p> : undefined}
                        </div>
                    </div>
                </div>
            </div >
        )
    }

}