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
            let date = this.props.post.createdAt;
            date = date.split(" ");
            date = date[1] + " " + date[2] + ", " + date[3]


            this.setState({
                date: date,
                imgUrl: this.props.post.urls,
                imgName: this.props.post.meal
            })
        })
    }

    componentWillUnmount() {
        this.authUnlisten();
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


// export class DeletePost extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             fileName: ""
//         }
//     }

//     componentDidMount() {
//         this.authUnlisten = firebase.auth().onAuthStateChanged((user) => {
//             if (user) {
//                 this.props.location.state.reference.on('value', (snapshot) => {
//                     let snap = snapshot.val();
//                     if (snap !== null) {
//                     this.setState({
//                         fileName: snap.file
//                     });
//                     }
//                 })
//                 this.setState(
//                     {
//                         uid: user.uid,
//                     })
//             }
//         })
//     }
//     handleRemove() {
//         var storage = firebase.storage();
//         var storageRef = storage.ref();
//         var desertRef = storageRef.child('images/' + this.state.fileName);

//         //Delete the file
//         this.props.location.state.reference.remove().then(
//             desertRef.delete().then(function() {
//             }).catch(function(error) {
//             })
//         )

//     }

//     render() {
//         return (
//             <Card className="card">
//                 <CardBody>
//                     <CardText>Do you want to delete this image?</CardText>
//                     <button>No</button>
//                     <Link
//                         to={{pathname: ROUTES.homePage}}
//                         onClick={() => this.handleRemove()}
//                     >
//                         <button>Yes</button>
//                     </Link>
//                 </CardBody>
//             </Card>
//         )
//     }

// }