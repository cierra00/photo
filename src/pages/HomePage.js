import React,{ useEffect, useState } from "react";
import { db, auth, storage } from "../config/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid';
import {
  getDocs, collection, addDoc, doc, deleteDoc, updateDoc} from "firebase/firestore";
import Photos from '../components/photos/Photos'



  export default function HomePage() {
  const [photograph, setPhotograph] = useState([]);
  const [photoURL, setPhotoURL] = useState("");
  const [file, setFile] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "photoFiles");
  

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item, key) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
         
        });
      });
    });
  }, []);

  
  

  const uploadFile = async (e) => {
    if(!file) return;
    const filesFolderRef = ref(storage, `photoFiles/${file.name}`);
    try{
      await uploadBytes(filesFolderRef, file).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then(url=> 
        setPhotoURL((prev) =>[...prev, url]))
        
      });
    
    } catch(err) {
      console.err(err)
    }
   
  }

  
 // Delete a file from Firebase Storage based on its URL
function deleteFileByUrl(url) {
  // Convert the URL to a StorageReference object
  const ref = storage.refFromURL(url);

  // Delete the file
  ref.delete()
    .then(() => {
      console.log(`File ${url} deleted successfully`);
    })
    .catch((error) => {
      console.error(error);
    });
}

  return (
    <div className="app">
      
      
  
    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    <button className="drop-title" onClick={uploadFile} >Upload File</button>
      <Photos imageList={imageList}  key={v4()}/>
      
  </div>
   
  )}


