import { auth,signInWithGooglePopup,createUserDocumentFromAuth,signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils";
import { useEffect } from "react";
import {getRedirectResult} from  'firebase/auth'
import { getAuth } from "firebase/auth";
import { validateArgCount } from "@firebase/util";
import {SignUpFormEmailPassword} from '../../components/sign-up-form/sign-up-form.component';


const SignIn = () =>{
    // useEffect( ()=>{
    //     const response = await getRedirectResult(auth);
    //     console.log(response);
    // },[]);
    // empty array means run this 
    // function one time when this component mounts for the first time




    const logGoogleUser = async() =>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    const logGoogleRedirectUser = async() =>{
        const {user} = await signInWithGoogleRedirect();
        console.log({user})
    }
    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with google popup
            </button>
            <SignUpFormEmailPassword />
      
        </div>
    )
}


export default SignIn;