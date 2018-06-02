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
        return (
            <Card className="card">
                <CardBody>
                    <CardTitle>{this.state.date}</CardTitle>
                    <CardText>{this.state.imgName}</CardText>
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

// export class Hello extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             imgUrl: "",
//             imgName: "",
//             typeOfMeal: "",
//             madeFrom: "",
//             totalCalories: "",
//             data: [],
//             fileName: "",
//             dataSnap: undefined
//         }
//     }
//     componentDidMount() {
//         this.authUnlisten = firebase.auth().onAuthStateChanged((user) => {
//             if (user) {
//                 let email = user.email;
//                 let subEmail = email.substr(0, email.indexOf('@'));
//                 this.reference = firebase.database().ref('Profile/' + subEmail + '/Posts/' + this.props.location.state.reference);
//                 this.reference.on('value', (snapshot) => {
//                     let snap = snapshot.val();
//                     if (snap !== null) {
//                         this.setState({
//                             imgUrl: snap.urls,
//                             imgName:snap.meal,
//                             typeOfMeal:snap.typeOfMeal,
//                             madeFrom:snap.madeFrom,
//                             totalCalories:snap.totalCalories,
//                             data:snap.data,
//                             fileName: snap.file
//                         });
//                     }
//                 })

//                 this.setState(
//                     {
//                         uid: user.uid,
//                     })
//             }
//         })

//     }
//     componentWillUnmount() {
//         this.authUnlisten();
//     }

//     handleRemove2() {
//         //this.reference.remove();
//     }
//     render() {
//         return (
//             <div>
//                 <p>{this.state.imgName}</p>
//                 <div>
//                     <Link
//                         to={{ pathname: ROUTES.deleteConfirmation, state: {reference: this.reference}}}
//                     >
//                         <button>Delete</button>
//                     </Link>
//                 </div>

//                 <img src={this.state.imgUrl} alt="food" />
//                 <p>colors</p>
//                 {this.state.data.map(data => <div className="input-color"><div className="color-box" style={{ backgroundColor: data.html_code }}></div></div>
//                 )}
//                 <p>percentage</p>
//                 {this.state.data.map(data => <p>{data.percent} %</p>)}
//             </div>
//         )
//     }

// }

export class DeletePost extends React.Component {
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
    handleRemove() {
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var desertRef = storageRef.child('images/' + this.state.fileName);

        //Delete the file
        this.props.location.state.reference.remove().then(
            desertRef.delete().then(function() {
            }).catch(function(error) {
            })
        )

    }

    render() {
        return (
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
        )
    }

}