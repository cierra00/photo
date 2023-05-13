import React from 'react'
import {storage} from '../../config/firebase'

import {v4} from 'uuid';

export default function Photos({photograph, description, alt, key, id, imageList}) {
  const deletePhoto = async (url)=>{
    console.log(url)
  }
  return (
   
    <>
  <main className="cards">
    <div className="wrapper">
      <div>
        {imageList.map((url, index)=> (
          
          <><img key={v4} src={url}  alt={alt} /><button>Delete</button></>
          
        
          ))} 
      </div>
    </div>
  </main>
  </>
  

    
  )
}
