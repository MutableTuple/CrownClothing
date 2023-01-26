import { initializeApp } from 'firebase/app';
// creates an app instance based on certain config

// initialize firebaseApp


import { getAuth, 
         signInWithRedirect,
        signInWithPopup, 
        GoogleAuthProvider,createUserWithEmailAndPassword } from  'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';
import { Profiler } from 'react';



const firebaseConfig = {
    apiKey: "AIzaSyDeQo3iskmDs2vb7opFDspZT1AsgMj7Gn8",
    authDomain: "crwn-clothing-db-e36d5.firebaseapp.com",
    projectId: "crwn-clothing-db-e36d5",
    storageBucket: "crwn-clothing-db-e36d5.appspot.com",
    messagingSenderId: "621331433974",
    appId: "1:621331433974:web:d4202d841e73cb31c19fd7"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
  

// we need a provider to use google Auth

const provider = new GoogleAuthProvider();
// const provider_fb = new FacebookAuthProvider();

// setting properties to out provider
provider.setCustomParameters(
    {
        prompt:"select_account"
    }
);

export const auth = getAuth();
// sing in with popup
export const signInWithGooglePopup = () =>signInWithPopup(auth, provider);
// redirect method for sign in
export const signInWithGoogleRedirect = () =>signInWithRedirect(auth, provider);


// creating our Firestore Database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {})=>{
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);


    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot);
    console.log(userSnapShot.exists());

    if(!userSnapShot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } 
        catch(error){
            console.log("error creating the user", error.message)
        }
    }
    return userDocRef;



    // check is user data exists
    
    // if user data not exists create/set the document with the data from the user auth in the collection
    



    // return userDocRef if it does exists
};

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;


    return await createUserWithEmailAndPassword(auth, email, password);

}




