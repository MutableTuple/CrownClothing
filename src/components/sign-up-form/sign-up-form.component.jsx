import { useState } from "react";
import FormInput from '../form-input/form-input.component';
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email:'',
    password:'',
    confirmPassword:''
}

// useState is used to track state of a function component
// setState() allows you to change state in a React class component

export const SignUpFormEmailPassword = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password,confirmPassword} = formFields;
    console.log(formFields);
    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async(event) =>{
        event.preventDefault();
        if(password != confirmPassword){
            alert("password donot match")
            return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();

        }
        catch(err){
            if(err.code === "auth/email-already-in-use"){
                alert("cannot create user, email already in use!");
            }
            else{
            }
        }

        
    }



    const handleChange =(event) =>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value})
    }

    return (
        <div className="sign-up-container">
            <h2> Don't have an account </h2>
            <h1>Sign up with your email & Password</h1>
            <form onSubmit={handleSubmit}>     
                <FormInput type="text" required onChange={handleChange} name="displayName" value={displayName} label = "Display Name"/>
                <FormInput type="email" required onChange={handleChange} name="email" value={email} label = "Email"/>
                <FormInput type="password" required onChange={handleChange} name="password" value={password} label = "Password"/>
                <FormInput type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} label = "Confirm Password"/>
                <Button type='submit'>Sign Up</Button>
            </form>

            <h2>I already have an account</h2>
            <h1>Sign in with your email & Password</h1>
            <form onSubmit={handleSubmit}>     
                <FormInput type="email" required onChange={handleChange} name="email" value={email} label = "Email"/>
                <FormInput type="password" required onChange={handleChange} name="password" value={password} label = "Password"/>
                <Button type='submit'>Sign In</Button>
                <Button buttonType="google" type='submit'>Sign In with Google</Button>
            </form>
            
        </div>
    );
};
