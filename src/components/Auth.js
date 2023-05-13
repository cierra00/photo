import { useState, useEffect } from 'react';
import FormButton from "../pages/Sections/FormButton";
import FormHeader from "../pages/Sections/FormHeader";
import FormInput from "../components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import {auth, googleProvider} from '../config/firebase';
import { UserAuth } from './context/AuthContext'
import {signInWithPopup, signOut} from 'firebase/auth';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
   
    const { user, createUser, signIn } = UserAuth();
   
    
    
    
    
    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider );
        } catch (err){
            console.error(err);
        }
    }
    const onFormSwitch = () => {
      setShowRegisterForm((prevState) => !prevState);
      setEmail("");
      setPassword("");
    };
    const onSubmit = async (e) => {
      e.preventDefault();
      const data = { name, email, password, confirmPassword };
      console.log(data);
      try {
        await createUser(email, password).then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/profile");
        });
      } catch (err) {
        console.log(err);
      }
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    };

    const onSignIn = async (e) => {
      e.preventDefault();
      try {
        await signIn(email, password);
        navigate("/home");
      } catch (err) {
        console.log(err);
      }
    };
    const renderForm = () => {
      if (showRegisterForm) {
        return (
          <>
            <div className="box">
            <FormHeader  />< br />
            <form onSubmit={onSubmit}>
              <FormInput
                description="Name"
                type="text"
                className="nameInput"
                placeholder="Enter Your Full Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormInput
                description="Email"
                type="email"
                className="emailInput"
                placeholder="Enter Your Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormInput
                description="Password"
                type="password"
                className="password"
                placeholder="Enter Your Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormInput
                description="Confirm Password"
                type="password"
                className="password"
                placeholder="Confirm Your Password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FormButton title="Register" />
              <div className="registerLink">
                <p>Already have an account ?</p>
                <Link to="#" onClick={onFormSwitch}>
                  Login here!
                </Link>
              </div>
            </form>
            </div>
          </>
        )
      }
      return (
        <>
       
         <div className="box">
         <FormHeader  />
         <h3></h3>
         <h3></h3>
          <form onSubmit={onSignIn}>
          <MDBInput wrapperClass='mb-4'
              description="Email"
              type="email"
              className="emailInput"
              placeholder="Enter Your Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput wrapperClass='mb-4'
              description="Password"
              type="password"
              className="password"
              placeholder="Enter Your Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormButton title="Sign In" onClick={signIn} />
            
            <div className="alternativeLogin">
              <label>Or Sign in with:</label>
              <div className="iconGroup">
                <a href="/"><FaGoogle id="googleIcon" onClick={signInWithGoogle} /></a>
              </div>
              
    
   
            </div>
            <div className="registerLink">
              <Link to="/forgot-password" className="forgotPasswordLink">
                Forgot Password?
              </Link>
              <p>Don't have an account ?</p>
              <Link to="#" id="registerLink" onClick={onFormSwitch}>
                Register Here!
              </Link>
            </div>
          </form>
         </div>
        </>
      );
    };
  useEffect(()=>{
    if(!user){
      navigate("/");
    }
  })
   
    return(
        <>
 <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
  <div className="text-center">
    <div className="loginForm">
        {renderForm()}
      </div>
  </div>
</MDBContainer></>
    )
}