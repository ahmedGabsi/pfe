import React from 'react'
import { XCircleIcon } from '@heroicons/react/solid'
function ImageForm({id,base64 ,deleteImg}) {
  return (
    <div className="relative w-32"  >
           <XCircleIcon className="absolute w-8 h-8 right-0 top-0 text-orange-600" onClick={()=>deleteImg(id)}/>
         <img src={base64} className="w-full h-full object-cover text-center" alt="aaa" />
         </div>
  )
}

export default ImageForm