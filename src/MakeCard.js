import React, { Component } from 'react';
import firebase from 'firebase';
import { Card, CardTitle, CardText, CardImg, CardBody } from 'reactstrap';
import './MakeCard.css';
import { Link } from 'react-router-dom';
import { ROUTES } from "./constants";
import DisplayResult from "./DisplayResult";

let values = {
    imgUrl: "",
    imgName: "",
    typeOfMeal: "",
    madeFrom: "",
    totalCalories: "",
    data: [],
    ref: ""
}
export class MakeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: '',
            date: '',
            imgName: '',
            ref: ''
        }
    }

    componentDidMount() {
        // reformat the date
        let date = this.props.post.createdAt;
        date = date.split(" ");
        date = date[1] + " " + date[2] + ", " + date[3]


        // set the state
        this.setState({
            date: date,
            imgUrl: this.props.post.urls,
            imgName: this.props.post.meal
        })
        values = {
            imgUrl: this.props.post.urls,
            imgName: this.props.post.meal,
            typeOfMeal: this.props.post.typeOfMeal,
            madeFrom: this.props.post.madeFrom,
            totalCalories: this.props.post.totalCalories,
            data: this.props.post.data,
            ref: this.props.post.ref
        }
    }




    render() {
        return (
            <Card className="card">
                <CardBody>
                    <CardTitle>{this.state.date}</CardTitle>
                    <CardText>{this.state.imgName}</CardText>
                </CardBody>

                <Link
                    to={{ pathname: ROUTES.results, state: { reference: this.props.reference } }}
                >
                    <CardImg src={this.state.imgUrl} />
                </Link>
                <CardBody>
                </CardBody>
            </Card>
        )
    }
}

export class Hello extends MakeCard {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: "",
            imgName: "",
            typeOfMeal: "",
            madeFrom: "",
            totalCalories: "",
            data: []
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
                    this.setState({
                        imgUrl: snap.urls,
                        imgName:snap.meal,
                        typeOfMeal:snap.typeOfMeal,
                        madeFrom:snap.madeFrom,
                        totalCalories:snap.totalCalories,
                        data:snap.data
                    });
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
        return (
            <div>
                <p>{this.state.imgName}</p>
                <div>
                    <Link
                        to={ROUTES.deleteConfirmation}
                    >
                        <button>Delete</button>
                    </Link>
                </div>

                <img src={this.state.imgUrl} alt="food" />
                <p>colors</p>
                {this.state.data.map(data => <div className="input-color"><div className="color-box" style={{ backgroundColor: data.html_code }}></div></div>
                )}
                <p>percentage</p>
                {this.state.data.map(data => <p>{data.percent} %</p>)}
            </div>
        )
    }

}

export class DeletePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ref: values.ref,
        }
    }

    componentDidMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState(
                    {
                        uid: user.uid,
                    })
            }
        })

    }

    render() {
        return (
            <Card className="card">
                <CardBody>
                    <CardText>Do you want to delete this image?</CardText>
                    <button>No</button>
                    <button>Yes</button>
                </CardBody>
            </Card>
        )
    }

}