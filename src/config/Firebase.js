import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAhbVzTs9NjHcZq5CWuKyAHGM1lfQ5I5q4",
    authDomain: "cyberrakshak-a0322.firebaseapp.com",
    projectId: "cyberrakshak-a0322",
    storageBucket: "cyberrakshak-a0322.appspot.com",
    messagingSenderId: "664593644587",
    appId: "1:664593644587:web:b18824d4fa82df3547be6e"
  };
  //firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };