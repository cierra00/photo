import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
  
  return (
    <MDBFooter bgColor='light' id="footer" className='text-center text-lg-start text-muted mt-auto fixed-bottom'>
      
      

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
      &copy;{(new Date().getFullYear())} Copyright Photo Saver
        
      </div>
    </MDBFooter>
  );
}