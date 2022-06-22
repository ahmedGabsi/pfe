import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { DEFAULT_LOADING, DEFAULT_LOADING_CATEGORY } from '../actions/types'

function MiniNavbar() {
  const dispatch=useDispatch()
  useEffect(() => {
   dispatch({type:DEFAULT_LOADING})
  
    
  }, [dispatch])
  
  return (
    <div className="flex bg-gray-700 px-6 py-1 text-white space-x-5">
 

    </div>
  )
}

export default MiniNavbar