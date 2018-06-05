import React from "react";
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { ROUTES } from "./constants";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { DisplayHeader } from './DisplayHeader';
import './DisplayAddNewPost.css'
import Route from "react-router-dom/Route";



const divStyle = {
    width: "239px",
    height: "39px" //i changed the height had to
};



export default class DisplayAddNewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            meal: "",
            file: "",
            imagePreviewUrl: "", //added
            typeOfMeal: "",
            madeFrom: "",
            totalCalories: "",
            uid: "",
            data: [],
            isLoading: true,
            urls: "",
            fbError: ""
        };
    }
    componentDidMount() {
        this.authUnlisten = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    uid: user.uid,
                    email: user.email
                })
                let email = user.email;
                let subEmail = email.substr(0, email.indexOf('@'));
                
                this.reference2 = firebase.database().ref('Profile/' + subEmail + '/Author/AcceptTerms');
                this.reference2.on('value', (snapshot) => {
                    let snap = snapshot.val();
                    this.setState({acceptTerms : snap});
                    if (this.state.acceptTerms === false) {
                        this.props.history.push(ROUTES.acceptTerms);
                    }
                })
            } else {
                this.props.history.push(ROUTES.signIn);
            }
        })
    }

    componentWillUnmount() {
        this.authUnlisten();
    }




    handleSubmit() {
        var storageRef = firebase.storage().ref();
        var file = this.state.file;
        var metadata = { contentType: 'image/png', };
        var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
        uploadTask.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    break;
                default:
                    break;
            }
        }, function (error) {
            // Handle unsuccessful uploads
            console.log(error)

            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // User canceled the upload
                    break;
                case 'storage/object_not_found':
                    // User canceled the upload
                    break;

                case 'storage/bucket_not_found':
                    // User canceled the upload
                    break;

                case 'storage/quota_exceeded':
                    // User canceled the upload
                    break;

                case 'storage/unauthenticated':
                    // User canceled the upload
                    break;

                case 'storage/invalid_checksum':
                    // User canceled the upload
                    break;

                case 'storage/retry_limit_exceeded':
                    // User canceled the upload
                    break;

                case 'storage/invalid_event_name':
                    // User canceled the upload
                    break;

                case 'storage/invalid_url':
                    // User canceled the upload
                    break;

                case 'storage/invalid-argument':
                    break;

                case 'storage/no_default_bucket':
                    // User canceled the upload
                    break;

                case 'storage/cannot_slice_blob':
                    // User canceled the upload
                    break;

                case 'storage/server_wrong_file_size	':
                    // User canceled the upload
                    break;
                default:
                    console.log('no errors');

            }
        }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                this.setState({ urls: downloadURL })
                var request = require('request'),
                    apiKey = 'acc_ed444d09ca5972e',
                    apiSecret = '4244876bb30509de06e9cd4ed7c94396',
                    imageUrl = downloadURL;

                request.get('https://api.imagga.com/v1/colors?url=' + encodeURIComponent(imageUrl), (error, response, body) => {
                    var data = JSON.parse(response.body);
                    data = data.results[0].info.image_colors
                    this.setState({ data: data });
                    if (this.state.urls !== "") {
                        this.props.history.push(ROUTES.homePage)
                    }
                    let email = this.state.email;
                    var subEmail = email.substr(0, email.indexOf('@'));
                    let time = firebase.database.ServerValue.TIMESTAMP;
                    time = Date(time);
                    let fileName = this.state.file;
                    let newData = {
                        email: this.state.email,
                        meal: this.state.meal,
                        typeOfMeal: this.state.typeOfMeal,
                        madeFrom: this.state.madeFrom,
                        totalCalories: this.state.totalCalories,
                        data: this.state.data,
                        urls: this.state.urls,
                        file: fileName.name,
                        createdAt: time
                    }
                    this.reference = firebase.database().ref('Profile/' + subEmail + "/Posts");
                    // put together the data
                    this.reference.push(newData);
                }).auth(apiKey, apiSecret, true)
            })
        })
    }

    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    render() {
        //new date source code from w3resource
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth();
        var month = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var yyyy = today.getFullYear();

        today = month[mm] + ' ' + dd + ', ' + yyyy;
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        let checkMeal = this.state.meal.length > 0;
        let checkUrl = this.state.urls.length > 0;

        if (imagePreviewUrl) {
            $imagePreview = (<img className="imgPreview.img" alt="preview of what is being displayed" src={imagePreviewUrl} />)
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for preview </div>)
        }
        return (
            <div>
                <DisplayHeader />
                <div className="container">
                    <div>
                        <p className="flex-start-date">{today}</p>
                        <div className="input-group">
                            <div className="flex-start">
                                <p>Meal: </p>
                                <input type="text" style={divStyle}
                                    className="meal-form-control"
                                    value={this.state.meal}
                                    onInput={evt => this.setState({
                                        meal: evt.target.value
                                    })}
                                // placeholder="type here"
                                />
                            </div>
                            <div className="PreviewComponenet">
                                <div className="imgPreview">  {$imagePreview}
                                </div>
                                <div className="flex-start-file">
                                    <p>File to upload: </p>
                                    <input type="file" style={divStyle}
                                        accept="image/*"
                                        className="form-control-upload"
                                        onChange={evt => this.handleImageChange(evt)}
                                    />
                                </div>
                            </div>
                            <p className="flex-start">Food Information</p>
                            <div style={{ paddingLeft: "4%" }}>
                                <div className="flex-start">
                                    <p>Type of Meal:</p>
                                    <input type="text" style={divStyle}
                                        className="form-control-meal"
                                        value={this.state.typeOfMeal}
                                        onInput={evt => this.setState({
                                            typeOfMeal: evt.target.value
                                        })}
                                    />
                                    <p className='optional'>*optional*</p>
                                </div>
                                <div className="flex-start">
                                    <p>Made From:</p>
                                    <input type="text" style={divStyle}
                                        className="form-control-made"
                                        value={this.state.madeFrom}
                                        onInput={evt => this.setState({
                                            madeFrom: evt.target.value
                                        })}

                                    />
                                    <p className='optional'>*optional*</p>
                                </div>
                                <div className="flex-start">
                                    <p>Total Calories: </p>
                                    <input type="number" style={divStyle}
                                        min="0"
                                        step="0.01"
                                        className="form-control-calories"
                                        value={this.state.totalCalories}
                                        onInput={evt => this.setState({
                                            totalCalories: evt.target.value
                                        })}
                                    />
                                    <p className='optional'>*optional*</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='two-buttons'>
                        <div className='cancelButton' onClick={() => {this.props.history.push(ROUTES.homePage)}}>
                            <Link to={ROUTES.homePage}><button type="button">CANCEL</button></Link>
                        </div>
                        <div className='submitButton' onClick={evt => this.handleSubmit(evt)}>
                            <button disabled={!checkMeal && !checkUrl} type="button">SUBMIT</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
