import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { Card, CardText, CardBody } from 'reactstrap';
import 'firebase/firestore';
import { Link } from 'react-router-dom';
import { ROUTES } from "./constants";
import { DisplayHeader } from './DisplayHeader';


export default class DeletePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: ""
        }
    }

    componentDidMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.location.state.reference.on('value', (snapshot) => {
                    let snap = snapshot.val();
                    if (snap !== null) {
                    this.setState({
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
            <Card className="card">
                <CardBody>
                    <CardText>Do you want to delete this image?</CardText>
                    <button>No</button>
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