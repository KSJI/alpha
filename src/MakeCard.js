import React, { Component } from 'react';
import firebase from 'firebase';
import { Card, CardTitle, CardText, CardImg, CardBody } from 'reactstrap';
import './MakeCard.css';

export class MakeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl:'',
            date:'',
            imgName:''
        }
    }

    render() {
        return (
            <Card className="card">
                <CardBody>
                    <CardTitle></CardTitle>
                </CardBody>
                <CardImg src="" />
                <CardBody>
                    <CardText></CardText>
                </CardBody>
            </Card>
        )
    }
}

