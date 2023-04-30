import React, {useEffect, useState} from 'react'
import {db} from '../config/firebase';
import {getDocs, collection} from 'firebase/firestore';

function Read() {
    const [photograph, setPhotograph] = useState([]);
    
    const photographCollectionRef = collection(db, "photos")
   
    useEffect(() =>{
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
        getPhotoList();
    }, [])
   

  return (
    <div>
      {photograph.map((photo)=> (
        <>
        <h3 style={{color: "green"}}>{photo.title}</h3>
       
        <p>Description: {photo.Description}</p>
        </>
        

      ))}
    </div>
  )
}

export default Read
