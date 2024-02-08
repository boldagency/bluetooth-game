import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCiE4ksvB-e9Fble9KvWgujaxSjze_lmCk",
    authDomain: "bluetooth-race.firebaseapp.com",
    projectId: "bluetooth-race",
    storageBucket: "bluetooth-race.appspot.com",
    messagingSenderId: "1009985937773",
    appId: "1:1009985937773:web:f8d38a35a9fe8dc0e5ba64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
// export const storyRef = db.collection('sacStory').doc('fFdw4Hg4J0C6EwVeoqZ9');

export function resetRace() {
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    fetch("https://us-central1-bluetooth-race.cloudfunctions.net/app/race-clean", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


export function startRace() {
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    fetch("https://us-central1-bluetooth-race.cloudfunctions.net/app/start-race", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


export function timeUp() {
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    fetch("https://us-central1-bluetooth-race.cloudfunctions.net/app/time-up", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}