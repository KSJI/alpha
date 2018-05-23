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
        this.reference = firebase.database().ref("posts");
        this.reference.on('value', (snapshot) => {
            let ref = snapshot.val();
            this.setState({
                cards: ref
            });
        })
    }


    render() {
        /*
            Make a card for each entry in firebase
        */
        let cards = this.state.cards === null ? [] : Object.keys(this.state.cards).map((d) => {
            return (
                <MakeCard key={"post-" + d} post={this.state.cards[d]} />
            )
        })

        return (
            <div className="wrapper">
                <Col className="cards-col">
                    {cards}
                </Col>
                <Router>
                    <Col className="settings-col">
                        <Link to="/Settings" style={{ color: 'black' }}><i className="fas fa-cog fa-lg"></i></Link>{" "}
                        <button type="button" className="btn btn-primary" onClick={() => {
                            firebase.auth().signOut()
                            .then(this.props.history.push(ROUTES.signIn));
                        }}>SIGN OUT</button>
                    </Col>
                </Router>
                <Col className="settings-col">
                    <button>ADD A POST</button>
                </Col>
            </div>
        )
    }
}

