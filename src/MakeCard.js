import React, { Component } from 'react';
import firebase from 'firebase';
import { Card, CardTitle, CardText, CardImg, CardBody } from 'reactstrap';
import './MakeCard.css';
import { Link } from 'react-router-dom';
import { ROUTES } from "./constants";

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
        this.authUnlisten = firebase.auth().onAuthStateChanged((user) => {
            let date = this.props.post[0].createdAt;
            date = date.split(" ");
            date = date[1] + " " + date[2] + ", " + date[3]


            // set the state
            this.setState({
                date: date,
                imgUrl: this.props.post[0].urls,
                imgName: this.props.post[0].meal
            })
        })
    }

    componentWillUnmount() {
        this.authUnlisten();
    }



    render() {
        let name = this.state.imgName;
        let imgNameCase = name.charAt(0).toUpperCase() + name.substr(1);
        return (
            <Card className="card">
                <CardBody>
                    <CardTitle>{this.state.date}</CardTitle>
                    <CardText>{imgNameCase}</CardText>
                </CardBody>

                <Link
                    to={{ pathname: ROUTES.results, state: { reference: this.props.reference } }}
                >
                    <CardImg width="90%" src={this.state.imgUrl} />
                </Link>
                <CardBody>
                </CardBody>
            </Card>
        )
    }
}
