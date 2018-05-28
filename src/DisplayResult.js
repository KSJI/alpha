import React from "react";
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

export default class DisplayResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meal: "",
            file: "",
            imagePreviewUrl: "", //added
            typeOfMeal: "",
            madeFrom: "",
            totalCalories: "",
            uid: "",
            data: [],
            isLoading: true,
            urls: "",
            fbError: ""
        };
    }
    componentDidMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
            this.setState(
                {uid: user.uid
                })
            }
        })
        
    }

    componentWillUnmount() {
        this.authUnlisten();
    }    
}