import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Link } from "react-router-dom";
import { ROUTES } from './constants';


const divStyle = {
    width: "239px",
    height: "39px" //i changed the height had to
};
const cardStyle = {
    width: "800px"
};


export default class DisplayAddNewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meal: "",
            file: "",
            imagePreviewUrl: "", //added
            typeOfMeal: "",
            madeFrom: "",
            totalCalories: "",
            fbError: ""
        };
    }

    componentDidMount() {

        var request = require('request'),
            apiKey = 'acc_aa92c5a583de0dc',
            apiSecret = '8c3661efff965c18e29ee167256adb29',
            imageUrl = 'https://firebasestorage.googleapis.com/v0/b/alpha-153de.appspot.com/o/images%2FDeleting%20a%20New%20Post.png?alt=media&token=b5b83565-5a85-40a0-ab63-66b7cdf6c03c';

        request.get('https://api.imagga.com/v1/colors?url=' + encodeURIComponent(imageUrl), function (error, response, body) {
            console.log('Status:', response.statusCode);
            console.log('Headers:', JSON.stringify(response.headers));
            console.log('Response:', body);
        }).auth(apiKey, apiSecret, true);

       // this.authUnlisten = firebase.auth().onAuthStateChanged((user) => {
       //     if (user) {
        //    this.setState(
         //       {displayName : user.displayName,
         //        uid: user.uid,
         //        photoURL: user.photoURL
         //       })
         //   }
        // })
    }

    componentWillUnmount() {
        // this.authUnlisten();
    }

    handleSubmit(evt) {
        // evt.preventDefault();
        // console.log('handle uploading-', this.state.file);
        // Imports the Google Cloud client library
        const vision = require('@google-cloud/vision');

        // Creates a client
        const client = new vision.ImageAnnotatorClient();

        // Performs label detection on the image file
        // client.labelDetection("./imgs/BACKGROUND.png")
        //    .then(results => {
        //        let labels = results[0].labelAnnotations;

        //        console.log('Labels:');
        //        labels.forEach(label => console.log(label.description));
        //    })
        //    .catch(err => {
        //        console.error('ERROR:', err);
        // });
        //    let messageList = {
        //        body: this.state.body,
        //        createdAt : firebase.database.ServerValue.TIMESTAMP,
        //        author : {
        //            displayName: this.state.displayName,
        //            photoURL: this.state.photoURL,
        //            uid: this.state.uid
        //        }
        //    };
        //    this.props.messageRef.push(messageList)
        //       .then(() => this.setState({body: "", fbError: undefined}))
        //       .catch(err => this.setState({fbError: err}));
    }


    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />)
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
                        <button type="button">Cancel</button>
                        <button type="button" onClick={evt => this.handleSubmit()}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}