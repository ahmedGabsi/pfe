import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import PaginationItem from './PaginationItem'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function Pagination({select}) {
    const {pathname,search} =useLocation()
    const {id} =useParams()
    const navigate=useNavigate()
  const {currentPage,numberOfPages,sortPrice,sortLikes}=useSelector(state=>state.products)
  useEffect(() => {
    
    if(!id  &&(sortPrice==="asc" || sortPrice==="desc") ){
       navigate(`${pathname+search.replace(/\&page=\d+&price=(\w+|)&likes=(\w+|)/g,'')}&page=${currentPage}&price=${sortPrice}&likes=${""}`,{ replace: true ,state:sortPrice})
    }
    
    if(!id  &&(sortPrice==="likes") ){
      navigate(`${pathname+search.replace(/\&page=\d+&price=(\w+|)&likes=(\w+|)/g,'')}&page=${currentPage}&price=${""}&likes=${sortPrice}`,{ replace: true ,state:sortPrice})
   }
    if(id &&(sortPrice==="asc" || sortPrice==="desc")){
      navigate(`${pathname+search.replace(/\?page=\d+&price=(\w+|)&likes=(\w+|)/g,'')}?page=${currentPage||1}&price=${sortPrice||""}&likes=${""}`,{ replace: true ,state:sortPrice})
    }
    if(id && sortPrice==="likes"){
      navigate(`${pathname+search.replace(/\?page=\d+&price=(\w+|)&likes=(\w+|)/g,'')}?page=${currentPage||1}&price=${""}&likes=${sortPrice}`,{ replace: true ,state:sortPrice})
    }
   
  }, [id,sortPrice,currentPage])

const paginate=(item)=>{
  if(!id  && !sortPrice ){

    navigate(`${pathname+search.replace(/&page=\d+&price=(\w+|)&likes=(\w+|)/g,'')}&page=${item}&price=${""}&likes=${""}`)
  
  }
  if(id  && !sortPrice){
    navigate(`${pathname+search.replace(/\?page=\d+&price=(\w+|)&likes=(\w+|)/g,'')}?page=${item}&price=${""}&likes=${""}`)
  }
  if(!id  &&(sortPrice==="asc" || sortPrice==="desc") ){

    navigate(`${pathname+search.replace(/&page=\d+&price=(\w+|)&likes=(\w+|)/g,'')}&page=${item}&price=${sortPrice}&likes=${""}`)
  
  }
  if(!id  &&(sortPrice==="likes") ){

    navigate(`${pathname+search.replace(/&page=\d+&price=(\w+|)&likes=(\w+|)/g,'')}&page=${item}&price=${""}&likes=${sortPrice}`)
  
  }
  
  if(id  &&(sortPrice==="asc" || sortPrice==="desc")){
    navigate(`${pathname+search.replace(/\?page=\d+&price=(\w+|)&likes=(\w+|)/g,'')}?page=${item}&price=${sortPrice}&likes=${""}`)
  }
  if(id  &&(sortPrice==="likes")){
    navigate(`${pathname+search.replace(/\?page=\d+&price=(\w+|)&likes=(\w+|)/g,'')}?page=${item}&price=${""}&likes=${sortPrice}`)
  }
  // if(!item && id){
  //   navigate(`${pathname+search.replace(/\?page=\d+/g,'')}?page=1`)

  // }
  // if(!id && !item){

  //   navigate(`${pathname+search.replace(/&&page=\d+/g,'')}&&page=${item}`)
  
  // }
  
  
  }

  return (
    <nav className='  shadow-md rounded-sm  space-y-2 space-x-1 '>
       {numberOfPages > 1 &&
  <ul className="inline-flex -space-x-px ">
      {currentPage > 1 &&
  <div className="relative inline-flex items-center px-2 py-2 rounded-l-md  text-sm font-medium bg-gray-900 text-white hover:bg-gradient-to-r from-indigo-500"
  onClick={()=>paginate(currentPage-1)} >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
}
{Array.from({length: numberOfPages}, (_, i) => i + 1).map(item=>
          <li key={item} onClick={()=>paginate(item)}>

       <PaginationItem item={item} itemIsClicked={currentPage}  />
       </li>
    )
    
      }

      {currentPage <numberOfPages &&
       <div
              className="relative inline-flex items-center px-2 py-2 rounded-r-md  bg-gray-900 text-sm font-medium text-white hover:bg-gradient-to-r from-indigo-500 "
              onClick={()=>paginate(currentPage+1)}      >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
}
  </ul>
}
</nav>
      
  )
}

export default Pagination