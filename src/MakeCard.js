import React, { Component } from 'react';
import firebase from 'firebase';
import { Card, CardTitle, CardText, CardImg, CardBody } from 'reactstrap';
import './MakeCard.css';

export class MakeCard extends Component {
    render() {
        return (
            <Card className="card">
                <CardBody>
                    <CardTitle>{this.props.post}</CardTitle>
                </CardBody>
                <CardImg src="" />
                <CardBody>
                    <CardText></CardText>
                </CardBody>
            </Card>
        )
    }
}

