import { useEffect, useState } from "react";
import { Auth } from "./components/Auth";
import { db, auth, storage } from "./config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import {
  getDocs, collection, addDoc, getDoc, doc, deleteDoc, updateDoc} from "firebase/firestore";


function App() {
  const [photograph, setPhotograph] = useState([]);
  const   [newPhotoTitle, setNewPhotoTitle] = useState("");
  const   [newPhotoDescription, setNewPhotoDescription] = useState("");
  const   [newPhotoAlt, setNewPhotoAlt] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [file, setFile] = useState("");
  
  
  const photographCollectionRef = collection(db, "photos");
  

  

  const getPhotoList = async ()=>{
    try{
        const data = await getDocs(photographCollectionRef);
        const filteredData = data.docs.map((doc)=> ({...doc.data(), id: doc.id}));
        setPhotograph(filteredData);
        console.log(filteredData);
    }
    catch(err){
        console.error(err);
    }
}
    

    useEffect(() =>{
        
        getPhotoList();
    }, []);

    const onSubmitPhoto = async () => {
      try{
          await addDoc(photographCollectionRef, {title: newPhotoTitle, description: newPhotoDescription, alt: newPhotoAlt, userId: auth?.currentUser?.uid});
          getPhotoList();
      } catch(err){
          console.err(err);
          
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

  const uploadFile = async () => {
    if(!file) return;
    const filesFolderRef = ref(storage, `photoFiles/${file.name}`);
    try{
      await uploadBytes(filesFolderRef, file);
    } catch(err) {
      console.err(err);
    }
  }

  return (
    <div className="App">
      <Auth />
      <input type="text" placeholder='Photo Title...' onChange={(e)=> setNewPhotoTitle(e.target.value)} />
      <textarea name="" placeholder='Description' onChange={(e)=> setNewPhotoDescription(e.target.value)}></textarea>
      <input type="text" placeholder='Photo Alt...'onChange={(e)=> setNewPhotoAlt(e.target.value)} />
      <button onClick={onSubmitPhoto}>Submit Photo</button>
      {photograph.map((photo)=> (
        <>
        <h3 style={{color: "green"}}>{photo.title}</h3>
       
        <p>Description: {photo.description}</p>
        <p>Alt: {photo.alt}</p>
        <button onClick={() => deletePhoto(photo.id)}>Delete</button>
        <br />
        <input placeholder="New Title..." onChange={(e) => setUpdatedTitle(e.target.value)}/>
        
      <button onClick={() => updatePhoto(photo.id)}>Update Title</button>
        </>
        

      ))}
  <div>
    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    <button onClick={uploadFile} >Upload File</button>

  </div>
    </div>
  );
}

export default App;
