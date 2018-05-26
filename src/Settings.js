import React, { Component } from 'react';
import firebase from 'firebase';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { DisplayHeader } from './DisplayHeader';
import './Settings.css';

export default class DisplayEditAccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            weight: 0,
            newEmail: '',
            newPassword: '',
            newWeight: ''
        }
    }

    componentWillMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    email: user.email,
                    password: user.password,
                    weight: user.weight,
                    username: user.username
                })

                let email = user.email;
                let subEmail = email.substr(0, email.indexOf('@'));

                this.reference = firebase.database().ref('Profile/' + subEmail + '/Author/Weight');
                this.reference.on('value', (snapshot) => {
                    let snap = snapshot.val();
                    this.setState({
                        weight: snap,
                    });
                })
            }
        })
    }


    updateSettings() {
        if (this.state.newEmail !== '') {
            function sleep(milliseconds) {
                var start = new Date().getTime();
                for (var i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - start) > milliseconds) {
                        break;
                    }
                }
            }
            let user = firebase.auth().currentUser;

            // Grab the old data
            let email = user.email;
            let subEmail = email.substr(0, email.indexOf('@'));
            this.reference = firebase.database().ref('Profile/' + subEmail);
            this.reference.on('value', (snapshot) => {
                let snap = snapshot.val();
                this.setState({
                    oldData: snap,
                })
                // Set up the new email
                email = this.state.newEmail;
                let tempEmail = email.substr(0, email.indexOf('@'));
                console.log(tempEmail);

                // Create a new node in the firebase database that reflects the new email
                let ref = firebase.database().ref('Profile/' + tempEmail);
                console.log(ref);
                ref.set(this.state.oldData);
            })


            // // Set up the new email
            // email = this.state.newEmail;
            // let tempEmail = email.substr(0, email.indexOf('@'));

            // // Create a new node in the firebase database that reflects the new email
            // let ref = firebase.database().ref('Profile/');
            // ref.push({ tempEmail: this.state.oldData });

            // let ref = firebase.database().ref('Profile');
            // this.valueListener = ref.on("value",
            //     snapshot => {
            //         let snap = snapshot.val();
            //         this.setState({
            //             newSnap: snap
            //         });
            //         // sleep(500);
            //         email = user.email;
            //         let subEmail = email.substr(0, email.indexOf('@'));
            //         this.reference = firebase.database().ref('Profile/' + subEmail);
            //         this.reference.on('value', (snapshot) => {
            //             let snap = snapshot.val();
            //             this.setState({
            //                 oldData: snap,
            //             });
            //             sleep(1000);
            //             ref = snap;
            //             console.log(ref);
            //             ref.set({ tempEmail: this.state.oldSnap });
            //         })

            //     });

            // Grab the old data
            // email = user.email;
            // let subEmail = email.substr(0, email.indexOf('@'));
            // this.reference = firebase.database().ref('Profile/' + subEmail);
            // this.reference.on('value', (snapshot) => {
            //     let snap = snapshot.val();
            //     this.setState({
            //         oldData: snap,
            //     });
            //     sleep(500);
            // })

            // Have the user reenter their password
            let text = prompt(
                'What is your password?',
            );

            console.log(this.state.email, this.state.newEmail);
            // what to pass into reauth
            let credential = firebase.auth.EmailAuthProvider.credential(
                this.state.newEmail,
                text
            );

            user.reauthenticateAndRetrieveDataWithCredential(credential).catch(function (error) {
                console.log(error);
            });

            user.updateEmail(this.state.newEmail).then(
                console.log('success')
            )



            sleep(2000);

            // ref = this.state.newSnap;
            // console.log(ref);
            // ref.child(tempEmail).set(this.state.oldSnap);

            // this.state.newSnap.ref.child(tempEmail).set(this.state.oldData);


            // let ref = firebase.database().ref(`Profile`);
            // this.valueListener = ref.on("value",
            //     snapshot => this.setState({ authorSnap: snapshot }));

            // email = this.state.newEmail;
            // subEmail = email.substr(0, email.indexOf('@'));
            // ref = this.state.authorSnap.ref;
            // let time = firebase.database.ServerValue.TIMESTAMP;
            // time = Date(time);
            // let newData = {
            //     Author: {
            //         Username: this.state.userName,
            //         Email: this.state.email,
            //         Weight: this.state.weight
            //     },
            //     createdAt: time,
            // }
            // ref.child(subEmail).set(newData);



            // this.reference = firebase.database().ref('Profile');
            // this.reference.on('value', (snapshot) => {
            //     let snap = snapshot.val();
            //     this.setState({
            //         newSnap: snap,
            //     });
            // })
            // this.reference.child(subEmail).set(this.state.oldData);






            /*
 
 
            // Concatenate the new email
            let email = this.state.newEmail;
            var subEmail = email.substr(0, email.indexOf('@'));
            console.log(subEmail);
 
            // Get current data at the current node
 
            // Add a new node into the database
 
            this.reference = firebase.database().ref('Profile/');
 
 
            ref = this.state.authorSnap.ref;
            let time = firebase.database.ServerValue.TIMESTAMP;
            time = Date(time);
            let newData = {
                Author: {
                    Username: this.state.userName,
                    Email: this.state.email,
                    Weight: this.state.weight
                },
                createdAt: time,
            }
            ref.child(subEmail).set(newData);
 
 
            */

            // let user = firebase.auth().currentUser;
            // let ref = firebase.database().ref(`Profile`);
            // this.valueListener = ref.on("value",
            //     snapshot => this.setState({ authorSnap: snapshot }));

            // let email = this.state.newEmail;
            // var subEmail = email.substr(0, email.indexOf('@'));
            // ref = this.state.authorSnap.ref;
            // let time = firebase.database.ServerValue.TIMESTAMP;
            // time = Date(time);
            // let newData = {
            //     Author: {
            //         Username: this.state.userName,
            //         Email: this.state.email,
            //         Weight: this.state.weight
            //     },
            //     createdAt: time,
            // }
            // ref.child(subEmail).set(newData);
        }

        if (this.state.newPassword !== '') {
            let user = firebase.auth().currentUser;
            user.updatePassword(this.state.newPassword).then(
                console.log('success')
            )
        }

        if (this.state.newWeight !== '') {
            let user = firebase.auth().currentUser;
            let email = user.email;
            let subEmail = email.substr(0, email.indexOf('@'));

            this.reference = firebase.database().ref('Profile/' + subEmail + '/Author');
            this.reference.update({ Weight: this.state.newWeight })
        }
    }

    handleAdd() {
        let email = this.state.newEmail;
        var subEmail = email.substr(0, email.indexOf('@'));
        let ref = this.state.authorSnap.ref;
        let time = firebase.database.ServerValue.TIMESTAMP;
        time = Date(time);
        let newData = {
            Author: {
                Username: this.state.userName,
                Email: this.state.email,
                Weight: this.state.weight
            },
            createdAt: time,
        }
        ref.child(subEmail).set(newData);
    }

    handleChange(event) {
        let value = event.target.value;
        let field = event.target.name;

        let change = {};
        change[field] = value;
        this.setState(change);
    }

    render() {

        return (
            <div>
                <DisplayHeader />
                <div className="settings">
                    <div className="email">
                        <p className="text">Email</p>
                        <input type="text"
                            placeholder={this.state.email}
                            name="newEmail"
                            onChange={(event) => { this.handleChange(event) }}>
                        </input>
                    </div>
                    <div className="password">
                        <p className="text">Change Password</p>
                        <input type="password"
                            name="newPassword"
                            placeholder="*******"
                            onChange={(event) => { this.handleChange(event) }}>
                        </input>
                    </div>
                    <div className="weight">
                        <p className="text">Weight</p>
                        <input type="text"
                            placeholder={this.state.weight}
                            name="newWeight"
                            onChange={(event) => { this.handleChange(event) }}>
                        </input> lbs
                    </div>

                    <div className="save">
                        <Router>
                            <Link to="/Homepage"><button onClick={() => this.updateSettings()}>SAVE</button></Link>
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
}