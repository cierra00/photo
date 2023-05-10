import React from 'react'
import Photos from '../components/photos/Photos'
import HomePage from './HomePage';

export default function ManagePage({imageList}) {
  return (
    <div>
     <Photos imageList={imageList} />
    </div>
  )
}
