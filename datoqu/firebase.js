
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyACpQmyGyVjnfMsI4gPI4LH1YyYh08E4BY",
  authDomain: "datoqu-4b3b9.firebaseapp.com",
  projectId: "datoqu-4b3b9",
  storageBucket: "datoqu-4b3b9.appspot.com",
  messagingSenderId: "328352547735",
  appId: "1:328352547735:web:237651a5f0e8697217fad2",
  measurementId: "G-E9Y8X9EMK2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }
