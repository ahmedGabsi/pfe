import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { sortByLikes, sortByPrice } from '../actions/products'
import Pagination from './Pagination'
const useQuery=(location)=>new URLSearchParams(location.search)

function PaginationBar({products}) {
 const dispatch= useDispatch()
 const {sortPrice} = useSelector(state=>state.products)
 const {pathname,search} =useLocation()
 const location=useLocation()

 const queryParams =useQuery(location)
 const price=queryParams.get('price')
 const likes=queryParams.get('likes')

 const navigate=useNavigate()
 const [select,setSelect] = useState("")
 const items=[
 
  {
  value:'asc',
  content:'Prix : par ordre croissant'
 },
 {
  value:'desc',
  content:'Prix : par ordre décroissant'
 },
 {
  value:'likes',
  content:'Les plus aimés: par ordre décroissant'
 }

]
const selectedValue=items.find(el=>el?.value===price)

//  useEffect(() => {
//   if(select==="asc" || select==="desc"){
//     navigate(`${pathname+search.replace(/&&price=\w+/g,'')}&price=${select}`)
//   }
    
  
//   if(select==="likesDesc"){
//     navigate(`${pathname+search.replace(/&&likes=\w+/g,'')}&&likes=${select}`)

//   }
 
//  },[select])
const handleChange=(e)=>{
  if(e.target.value==="likes" ){
    dispatch(sortByLikes(e.target.value))
    }
  if(e.target.value==="asc" || e.target.value==="desc"){
  dispatch(sortByPrice(e.target.value))
  }
  
}

  return (
<div className="border shadow-md bg-white flex justify-between items-center p-1 ">

          <p className="text-sm">1-8 sur plus de {products.length} résultats</p>
          <Pagination select={sortPrice}/>

          <select defaultValue=""  onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          { selectedValue ?
          <option value={selectedValue?.value} >{selectedValue?.content}</option>:
          <option value={''} ></option> 
 
}
          {items.filter(el=>el.value !==selectedValue?.value).map(
            item=><option value={item.value} key={item.value} >{item.content}</option>
          )}
  
          </select>

     


    </div>  
    
    )
}

export default PaginationBar