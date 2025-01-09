import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBBnpxtapp1VNrQ4KRgp45-bqp6X8gvQvs',
  authDomain: 'halabi-547fd.firebaseapp.com',
  databaseURL: 'https://halabi-547fd.firebaseio.com',
  projectId: 'halabi-547fd',
  storageBucket: 'halabi-547fd.appspot.com',
  messagingSenderId: 'sender-id',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);  