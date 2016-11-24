import * as firebase from 'firebase';
import config from '../config/firebase';

const firebaseApp = firebase.initializeApp(config);
const database = firebaseApp.database();
const auth = firebaseApp.auth();

module.exports.auth = firebaseApp.auth();
module.exports.database = firebaseApp.database();
