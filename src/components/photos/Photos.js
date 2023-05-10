import React from 'react'

import {v4} from 'uuid';

export default function Photos({photograph, description, alt, id, imageList, deletePhoto}) {
  return (
    
    <main className="cards">
    {imageList.map((url)=> {
          return <><img src={url}  key={v4()} alt={alt} />
          <button onClick={deletePhoto}>Delete</button>
          </>
          })} 
         
      </main>
  
  

    
  )
}
