import React from 'react'
const submitThis = ()=> {
  SubmitPhoto()
  
}

export default function SubmitPhoto({onSubmitPhoto,setNewPhotoAlt,setNewPhotoDescription, setNewPhotoTitle}) {
 

 
  return (
    <>
      <input type="text" placeholder='Photo Title...' onChange={(e)=> setNewPhotoTitle(e.target.value)} />
      <textarea name="" placeholder='Description' onChange={(e)=> setNewPhotoDescription(e.target.value)}></textarea>
      <input type="text" placeholder='Photo Alt...'onChange={(e)=> setNewPhotoAlt(e.target.value)} />
      <button onClick={submitThis}>Submit Photo</button>
     
    </>
  )
}
