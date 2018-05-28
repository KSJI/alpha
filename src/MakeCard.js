import React, { Component } from 'react';
import firebase from 'firebase';
import { Card, CardTitle, CardText, CardImg, CardBody } from 'reactstrap';
import './MakeCard.css';

export class MakeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: '',
            date: '',
            imgName: ''
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
    }



    render() {
        return (
            // <Link to={ROUTES.viewPost}> // might not be viewPost
                <Card className="card">
                    <CardBody>
                        <CardTitle>{this.state.date}</CardTitle>
                        <CardText>{this.state.imgName}</CardText>
                    </CardBody>
                    <CardImg src={this.state.imgUrl} />
                    <CardBody>
                    </CardBody>
                </Card>
            // </Link>
        )
    }
}

