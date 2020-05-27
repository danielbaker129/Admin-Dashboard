import firebase from 'firebase';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: 'admin-dashboard-baker',
    storageBucket: "admin-dashboard-baker.appspot.com",
    messagingSenderId: "584485989794",
    appId: "1:584485989794:web:32e4d6cc12b6ab528796fb",
    measurementId: "G-9S4QQQJMWH"
};
firebase.initializeApp(config);

const db = firebase.firestore();

export default db;