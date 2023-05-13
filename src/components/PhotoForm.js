import React,{useState} from 'react'


export default function PhotoForm({uploadFile}) {
    const [file, setFile] = useState(null);
    
    
  return (
    <>
       <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    <button onClick={uploadFile} >Upload File</button>
    </>
  )
}
// testing