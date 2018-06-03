import React, { Component } from 'react';
import firebase from 'firebase';
import { MakeCard } from './MakeCard';
import { HashRouter as Router, Link } from '../node_modules/react-router-dom';
import { Col } from 'reactstrap';
import { ROUTES } from './constants';
import './DisplayCards.css';

export class DisplayCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
    }

    componentWillMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    email: user.email,
                    password: user.password,
                    weight: user.weight
                })

                let email = user.email;
                let subEmail = email.substr(0, email.indexOf('@'));

                this.reference = firebase.database().ref('Profile/' + subEmail + '/Posts');
                this.reference.on('value', (snapshot) => {
                    let snap = snapshot.val();
                    if (snap !== null) {
                        let revCards = [];
                        for (var i = Object.keys(snap).length - 1; i >= 0; i--) {
                            let snapKey = Object.keys(snap)[i];
                            let val = Object.values(snap)[i];
                            let ret = {}
                            ret[snapKey] = val
                            revCards.push(ret)
                        }
                        this.setState({
                            cards: revCards
                        })
                    }



                })
            }
        })
    }

    componentWillUnmount() {
        this.authUnlisten();
    }

    render() {
        /*
            Make a card for each entry in firebase
        */
        let cards = []
        this.state.cards.forEach((d, i) => {
            cards.push(<MakeCard key={"post-" + i} post={Object.values(d)} reference={Object.keys(d)} />)
        })

        return (
            <div className="wrapper">
                <Col className="cards-col">
                    {cards}
                </Col>
                <Router>
                    <Col className="settings-col1">
                        <Link to="/Settings" style={{ color: 'black', padding: "5%"}}><i className="fas fa-cog fa-2x"></i></Link>{" "}
                        <button type="button" className="signoutbutton" onClick={() => {
                            firebase.auth().signOut()
                                .then(this.props.history.push(ROUTES.signIn));
                        }}>SIGN OUT</button>
                    </Col>
                </Router>
                <Col className="settings-col2">
                    <Link to={ROUTES.displayAddNewPost}>
                        <button>UPLOAD A NEW POST</button>
                    </Link>
                </Col>
            </div>
        )
    }
}

