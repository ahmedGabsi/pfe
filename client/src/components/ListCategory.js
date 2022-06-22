import React,{useState,useEffect} from 'react'
import CardCategories from './CardCategories'

import {useDispatch,useSelector} from "react-redux"
import { getProducts } from '../actions/products'
import { getCategories } from '../actions/categories'
import Spinner from './Spinner'

function ListCategory() {
  const dispatch=useDispatch()
  const {categories,isLoadingCat} =useSelector((state) => state.categories)
  // const [products,setProducts] = useState([])
//   useEffect(() => {
// const getCategories=async()=>{
//     const {data} =await axios.get("https://fakestoreapi.com/products")
//     setProducts(data)
// setCategories([...new Set(data.map(el=>el.category))])
// }
// getCategories()


//   },[])

  return (
    

    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 px-7  lg:-mt-60 xl:-mt-80 ">
      {!isLoadingCat  ? 
      <>
             {/* <CardCategories categories={categories} products={products} /> */}
            

      {categories.map(
        category=>
        <CardCategories key={category._id} title={category.title} image={category.image} id={category._id}/>
      )}
                  {/*  <CardCategories categories={categories} products={products} />  */}


      </>
        :
        <Spinner/>
        }
        
</div>

  )
}

export default ListCategory