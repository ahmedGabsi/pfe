import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import PaginationItem from './PaginationItemAdmin'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

function PaginationAdmin({data}) {
  const [itemIsClicked,setItemIsClicked]=useState(1)

  const numbersPagination=Math.ceil(data.length/8)
  return (
    <nav className='bg-transparent shadow-md rounded-sm  space-y-2   ' aria-label="Page navigation example">
       
  <ul className="inline-flex -space-x-px">
  <div
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
    {Array.from({length: numbersPagination}, (_, i) => i + 1).map(item=>
          <li key={item}>

       <PaginationItem item={item} onCHangeItemIsClicked={setItemIsClicked} itemIsClicked={itemIsClicked}/>
       </li>
    )
      }
       <div
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
  </ul>
</nav>
      
  )
}

export default PaginationAdmin