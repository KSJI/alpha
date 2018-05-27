import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyBY9kjs_uZLG7g7UA-BQzjKeQkc6vBdquE",
    authDomain: "alpha-153de.firebaseapp.com",
    databaseURL: "https://alpha-153de.firebaseio.com",
    projectId: "alpha-153de",
    storageBucket: "alpha-153de.appspot.com",
    messagingSenderId: "614385670999"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
