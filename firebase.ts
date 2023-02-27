import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe1BSzLzfXElIxJ76xTEfuudU75E_imqI",
  authDomain: "chatgpt-messenger-clone-e2b51.firebaseapp.com",
  projectId: "chatgpt-messenger-clone-e2b51",
  storageBucket: "chatgpt-messenger-clone-e2b51.appspot.com",
  messagingSenderId: "713712818964",
  appId: "1:713712818964:web:d831806ae5d03982ea0001"
};

// Initialize Firebase
// if there is an app already initialized tell us the initialized length of the apps
// get the current else initialize a new app. singleton pattern- single instance of app
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app) //get the database from the store app

export { db }