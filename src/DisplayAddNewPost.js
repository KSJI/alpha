import React from "react";
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { ROUTES } from "./constants";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';



const divStyle = {
    width: "239px",
    height: "39px" //i changed the height had to
};
const cardStyle = {
    width: "75%"
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
                this.setState(
                    {
                        uid: user.uid,
                        email: user.email
                    })
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
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                default:
                    console.log("Working");
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
                    console.log(this.state);
                    if (this.state.urls !== "") {
                        this.props.history.push(ROUTES.homePage)
                    }
                    let email = this.state.email;
                    var subEmail = email.substr(0, email.indexOf('@'));
                    let time = firebase.database.ServerValue.TIMESTAMP;
                    time = Date(time);
                    let fileName = this.state.file;
                    console.log(this.state.urls);
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

    /* addData(uploadTask) {
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
                //console.log(data.results[0].info.image_colors);
                this.setState({ data: data });
                console.log(this.state);
                let email = this.state.email;
                var subEmail = email.substr(0, email.indexOf('@'));
                let time = firebase.database.ServerValue.TIMESTAMP;
                time = Date(time);
                console.log(this.state.urls);
                let newData = {
                    email: this.state.email,
                    meal: this.state.meal,
                    typeOfMeal: this.state.typeOfMeal,
                    madeFrom: this.state.madeFrom,
                    totalCalories: this.state.totalCalories,
                    data: this.state.data,
                    urls: this.state.urls,
                    createdAt: time
                }
                this.reference = firebase.database().ref('Profile/' + subEmail + "/Posts");
                // put together the data
                this.reference.push(newData);
            }).auth(apiKey, apiSecret, true)
        })
    } */

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
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img alt="preview of what is being displayed" src={imagePreviewUrl} />)
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for preview </div>)
        }
        return (
            <div className="d-flex justify-content-center p-5">
                <div className="card d-flex justify-content-center" style={cardStyle}>
                    <div className="card-body">
                        <div className="input-group pb-3 d-flex flex-column">
                            <div className="d-flex">
                                <p>meal: </p>
                                <input type="text" style={divStyle}
                                    className="form-control"
                                    value={this.state.meal}
                                    onInput={evt => this.setState({
                                        meal: evt.target.value
                                    })}
                                    placeholder="type here"
                                />
                            </div>
                            <div className="PreviewComponenet">
                                <div className="imgPreview">  {$imagePreview}
                                </div>
                                <div className="d-flex">
                                    <p>File to upload: </p>
                                    <input type="file" style={divStyle}
                                        className="form-control"
                                        onChange={evt => this.handleImageChange(evt)}
                                    />
                                </div>
                            </div>
                            <p>Food Information</p>
                            <div className="d-flex">
                                <p>Type of Meal: </p>
                                <input type="text" style={divStyle}
                                    className="form-control"
                                    value={this.state.typeOfMeal}
                                    onInput={evt => this.setState({
                                        typeOfMeal: evt.target.value
                                    })}
                                    placeholder="type here"
                                />
                                <p className="ml-2">*optional*</p>
                            </div>
                            <div className="d-flex">
                                <p>Made From: </p>
                                <input type="text" style={divStyle}
                                    className="form-control"
                                    value={this.state.madeFrom}
                                    onInput={evt => this.setState({
                                        madeFrom: evt.target.value
                                    })}
                                    placeholder="type here"
                                />
                            </div>
                            <div className="d-flex">
                                <p>Total Calories: </p>
                                <input type="text" style={divStyle}
                                    className="form-control"
                                    value={this.state.totalCalories}
                                    onInput={evt => this.setState({
                                        totalCalories: evt.target.value
                                    })}
                                    placeholder="type here"
                                />
                                <p className="ml-2">*optional*</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex">
                        <Link to={ROUTES.homePage}><button type="button">Cancel</button></Link>
                        <button type="button" onClick={evt => this.handleSubmit(evt)}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}
