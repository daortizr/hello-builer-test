import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import { getAuth, signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAKZmMzPQ6IHQq-tAwniKdx3rpIJ6Vvvfo",
    authDomain: "hello-build-test-7c2b7.firebaseapp.com",
    projectId: "hello-build-test-7c2b7",
    storageBucket: "hello-build-test-7c2b7.appspot.com",
    messagingSenderId: "9925137921",
    appId: "1:9925137921:web:226a538225869de320d200",
    measurementId: "G-D3PK629P55"
  };

firebase.initializeApp(firebaseConfig);

const firebaseAuth = firebase.auth();

export { firebaseAuth, getAuth, signInWithPopup, signOut, GithubAuthProvider, firebase as default };