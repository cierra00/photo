import React,{useState} from 'react';
import FormHeader from '../pages/Sections/FormHeader'
import FormInput from "../pages/Sections//FormInput";
import FormButton from "../pages/Sections/FormButton";
import { UserAuth } from '../components/context/AuthContext';
import { auth, storage} from "../config/firebase";
import {db} from '../config/firebase'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';


import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBBtnGroup, MDBBtn } from 'mdb-react-ui-kit';

import {collection, getDocs, addDoc} from 'firebase/firestore';


export default function ProfilePage() {
//const [name, setName] = useState(auth.currentUser.displayName);
const [newEmail, setNewEmail] = useState("");
const [newName, setNewName]= useState("")
const [photoURL, setPhotoURL] = useState("");
const {updateUser} = UserAuth();
const [file, setFile] = useState(null);
const usersCollectionRef = collection(db, "users")


const uploadFile = async (e) => {
  if(!file) return;
  const filesFolderRef = ref(storage, `photoFiles/profile${file.ext}`);
  try{
    await uploadBytes(filesFolderRef, file).then((snapshot)=>{
    getDownloadURL(snapshot.ref).then(url=> 
      setPhotoURL((prev) =>[...prev, url]))
      
    });
  
  } catch(err) {
    console.err(err)
  }
 
}
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { newEmail};
    console.log(data);
    try {
      await updateUser(newEmail).then((userCredential) => {
      });
    } catch (err) {
      console.log(err);
    }
   
   
  };
  const createUser = async ()=>{
    await addDoc(usersCollectionRef,{name: newName, email: newEmail} )
    setNewName("")
    setNewEmail("")
       }
  return (
    <>
    <h3 className="text-center">Profile</h3>
    <div className="loginForm">
      
      
      <section className="form">
          <FormHeader  />
           <form  className="formStyle" onSubmit={onSubmit}>
          <FormInput
              description="Name"
              type="text"
              className="nameInput input-group- mb-1 "
              placeholder="Enter Your Full Name"
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}/> 
            <FormInput
              description="Email"
              type="email"
              className="emailInput input-group- mb-1"
              placeholder="Enter Your Email"
              id="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            
<FormButton onClick={createUser} title="Edit Profile" /> 
            
          </form></section>
      <section className="vh-100 form-width" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src='../assets/img/profile.png'
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                    <MDBBtnGroup aria-label='Basic example'>
                      <MDBBtn className='btn-sm'>Update Image</MDBBtn>
                     </MDBBtnGroup>
                  
                 
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Name {newName}</MDBTypography>
                        <MDBCardText className="text-muted">{setNewName}</MDBCardText>
                      </MDBCol>
                      
                      
                    </MDBRow>

                    
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{newEmail}</MDBCardText>
                      
                      
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
       
    </div>
    </>
  )}
