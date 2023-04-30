import React,{useState} from 'react'
import { db } from '../config/firebase';
import { auth } from '../components/Auth'
import { addDoc, collection } from 'firebase/firestore';

const Create = () => {
    const   [newPhotoTitle, setNewPhotoTitle] = useState("");
    const   [newPhotoDescription, setNewPhotoDescription] = useState("");
    const   [newPhotoAlt, setNewPhotoAlt] = useState("");

    const photoCollectionRef = collection(db, "photos")

    const onSubmitPhoto = async () => {
        try{
            await addDoc(photoCollectionRef, {title: newPhotoTitle, description: newPhotoDescription, alt: newPhotoAlt})
        } catch(err){
            console.err(err);
            
        }
    }

  return (
    <div>
      <>
      <input type="text" placeholder='Photo Title...' onChange={(e)=> setNewPhotoTitle(e.target.value)} />
      <textarea name="" placeholder='Description' onChange={(e)=> setNewPhotoDescription(e.target.value)}></textarea>
      <input type="text" placeholder='Photo Alt...'onChange={(e)=> setNewPhotoAlt(e.target.value)} />
      <button onSubmit={onSubmitPhoto}>Submit Photo</button>
      </>
    </div>
  )
}

export default Create
