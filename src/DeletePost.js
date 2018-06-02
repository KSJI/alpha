import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { Card, CardText, CardBody } from 'reactstrap';
import 'firebase/firestore';
import { Link } from 'react-router-dom';
import { ROUTES } from "./constants";
import { DisplayHeader } from './DisplayHeader';
import './DisplayResult.css'

export default class DeletePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: "",
            reference: "",
            imgUrl: ""
        }
    }

    componentDidMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.location.state.reference.on('value', (snapshot) => {
                    let snap = snapshot.val();
                    if (snap !== null) {
                    this.setState({
                        fileName: snap.file,
                        imgUrl: snap.urls
                    });
                    }
                })
                this.setState(
                    {
                        uid: user.uid,
                        reference: this.props.location.state.key
                    })
            }
        })
    }

    componentWillUnmount() {
        this.authUnlisten();
    }

    handleRemove() {
        // var storage = firebase.storage();
        // var storageRef = storage.ref();
        // var desertRef = storageRef.child('images/' + this.state.fileName);

        //Delete the file
        this.props.location.state.reference.remove();
    }

    render() {
        return (
            <div>
            <DisplayHeader/>
            <Card className="container">
                <CardBody>
                    <CardText>Are you sure you would like delete this post?</CardText>
                    <img width="70%" src={this.state.imgUrl} alt="food" />
                    <Link
                    to={{ pathname: ROUTES.results, state: {reference: this.state.reference}}}
                    >
                    <button>Cancel</button>
                    </Link>
                    <Link
                        to={{pathname: ROUTES.homePage}}
                        onClick={() => this.handleRemove()}
                    >
                        <button>Yes</button>
                    </Link>
                </CardBody>
            </Card>
            </div>
        )
    }

}