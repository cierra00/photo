import React,{useState} from 'react'
import { db } from '../config/firebase';
import { doc,addDoc, collection, updateDoc } from 'firebase/firestore';

export default function Profile() {
    const   [newName, setNewName] = useState("");
    const   [newEmail, setNewEmail] = useState("");
    const   [newPhotoAlt, setNewPhotoAlt] = useState("");

    const photoCollectionRef = collection(db, "photos")
    const updateProfile = async (id, )=> {
        try{
          const photoDoc = doc(db, "profile", id);
          await updateDoc(photoDoc, {name: newName});
         // getPhotoList();
      
        } catch(err){
          console.err(err);
        }
      }

    const onSubmitPhoto = async () => {
        try{
            await addDoc(photoCollectionRef, {name: newName, email: newEmail, alt: newPhotoAlt})
        } catch(err){
            console.err(err);
            
        }
    }

  return (
    <div className="container profile-container">
       
    <div className="profile-info">
        <h4>Name</h4>
        <h4>Email</h4>
        
    </div>
    <div className="profile">
      
      <input type="text" placeholder='Name...' onChange={(e)=> setNewName(e.target.value)} />
      <input type="text" placeholder='Email...' onChange={(e)=> setNewEmail(e.target.value)} />
      <button onSubmit={updateProfile}>Update Profile</button>
      
    </div>
    </div>
  )
}
