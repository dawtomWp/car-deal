import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAebBxM978q8-oRBn8T7J8IHEkobUATKtQ",
    authDomain: "car-deals-78387.firebaseapp.com",
    projectId: "car-deals-78387",
    storageBucket: "car-deals-78387.appspot.com",
    messagingSenderId: "357626886168",
    appId: "1:357626886168:web:b4ba32d0c8a8f50ee3eb6d"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();