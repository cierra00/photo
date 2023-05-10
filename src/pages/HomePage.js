import React,{ useEffect, useState } from "react";
import '../App.css'
import { db, auth, storage } from "../config/firebase";
import { ref, uploadBytes, listAll, getDownloadURL , getMetadata} from "firebase/storage";
import {v4} from 'uuid';
import {
  getDocs, collection, addDoc, getDoc, doc, deleteDoc, updateDoc} from "firebase/firestore";
import Photos from '../components/photos/Photos'



  export default function HomePage() {
  const [photograph, setPhotograph] = useState([]);
  const   [newPhotoTitle, setNewPhotoTitle] = useState("");
  const   [newPhotoDescription, setNewPhotoDescription] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const   [newPhotoAlt, setNewPhotoAlt] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [file, setFile] = useState(null);
  const [imageList, setImageList] = useState([]);
  
  
  
  
  
  const photographCollectionRef = collection(db, "photos");
  const imageListRef = ref(storage, 'photoFiles')

  

  const getPhotoList = async ()=>{
    try{
        const data = await getDocs(photographCollectionRef);
        const filteredData = data.docs.map((doc)=> ({...doc.data(), id: doc.id}));
        setPhotograph(filteredData);
        
    }
    catch(err){
        console.error(err);
    }
}
const deletePhoto = async (id)=> {
  try{
    const photoDoc = doc(db, "photos", id);
    await deleteDoc(photoDoc);
    getPhotoList();

  } catch(err){
    console.err(err);
  }
}
    
const updatePhoto = async (id, )=> {
  try{
    const photoDoc = doc(db, "photos", id);
    await updateDoc(photoDoc, {title: updatedTitle});
    getPhotoList();

  } catch(err){
    console.err(err);
  }
}
    useEffect(() =>{
      
        getPhotoList();
        listAll(imageListRef).then((response) => {
          response.items.forEach((item) => {
            getMetadata(item)
            getDownloadURL(item).then((url) => {
              setImageList((prev) => [...prev, url,]);
            
            });
          });
        });
    }, []);

    

  
  

  const uploadFile = async (e) => {
    if(!file) return;
    const filesFolderRef = ref(storage, `photoFiles/${v4() + file.name}`);
    
    
    try{
      await uploadBytes(filesFolderRef, file).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then(url=> setPhotoURL(url))
      });
    
    
    } catch(err) {
      console.err(err)
    }
   
  }

  const onSubmitPhoto = async () => {
    try{
      
        await addDoc(photographCollectionRef, {title: newPhotoTitle, description: newPhotoDescription, url: photoURL, alt: newPhotoAlt, userId: auth?.currentUser?.uid});
        getPhotoList();
    } catch(err){
        console.err(err);
        
    }
}
 
const trigger = async ()=>{
 uploadFile()
await onSubmitPhoto()
}
  return (
    <div className="App">
     
    

      
      
  <label for="images" class="drop-container">
  <span className="drop-title">
  </span>
  </label>
    
  
    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    <button className="drop-title" onClick={uploadFile} >Upload File</button>
       
      <Photos imageList={imageList} />
  </div>
   
  )}


