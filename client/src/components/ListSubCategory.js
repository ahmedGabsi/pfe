import React, {  useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBarOrders from "./SideBarOrders";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategory } from "../actions/categories";
import CardCategories from "./CardCategories";
import { getProductsByCategory } from "../actions/products";
import Product from "./Product";
import { DEFAULT_PRICE, RESET_PRODUCTS } from "../actions/types";
import { useLocation } from "react-router-dom"

import Spinner from "./Spinner";
import Pagination from "./Pagination";
import PaginationBar from "./PaginationBar";
const useQuery=(location)=>new URLSearchParams(location.search)

function ListSubCategory() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const location=useLocation()
  const {key,pathname} =useLocation()

  const { id } = useParams();
  const queryParams =useQuery(location)
 

  const {qty}=useSelector(state=>state.shoopingCart)

  const { actualCategory,isLoadingCat } = useSelector((state) => state.categories);
  const { products,isLoading,sortPrice,currentPage,detect } = useSelector((state) => state.products);
  // const [detect,setDetect]=useState(null)
  const [subCategory,setSubCategory]=useState(null)
  let price
  if(sortPrice==="asc" || sortPrice==="desc"){
   price= sortPrice|| queryParams.get('price') 
  }
  const page=queryParams.get('page') || 1
  let likes;
  if(sortPrice==="likes" ){
    likes= sortPrice|| queryParams.get('likes') 
   }



  // let detect = null;
  function isObject(o) {
      
    return o instanceof Object && o.constructor === Object;
  }
  // let subCategory = {};
  // if (isObject(actualCategory.subCategory)) {
  //   detect = true;
  //   subCategory = Object.keys(actualCategory.subCategory);
  // } if (!isObject(actualCategory.subCategory)) {
  //   detect = false;
  //   subCategory = actualCategory.subCategory;
  // }

  // useEffect(() => {
  //   dispatch({type:DEFAULT_PRICE})
  // }, [key]);
  useEffect(() => {
   
   
    if(!isLoadingCat &&actualCategory.subCategory && !isObject(actualCategory.subCategory) ){
        setSubCategory(actualCategory.subCategory)
        // setDetect(false)
        dispatch({type:'OBJECT_NOT_DETECT'})
        dispatch(getProductsByCategory(id,page,price,likes));
      
       }
     
    if(!isLoadingCat &&actualCategory.subCategory && isObject(actualCategory.subCategory) ){

      dispatch({type:'OBJECT_DETECT'})

        setSubCategory(Object.keys(actualCategory.subCategory))
    
        // setDetect(true)
      
   }  
return()=>{
  // setDetect(null)
  



  
}
    
  }, [dispatch,page,sortPrice,isLoadingCat,actualCategory.subCategory,likes,price]);

  useEffect(() => {
    dispatch({type:'RESET_CATEGORY'})
    dispatch({type:'DEFAULT_DETECT'})
    console.log(pathname)

return ()=>{    

   dispatch({type:DEFAULT_PRICE})
   dispatch({type:RESET_PRODUCTS})

}
  }, [pathname])
  useEffect(() => {
    if(id)
    dispatch(getSubCategory(id,page));
    return ()=>{
      dispatch({type:'RESET_CATEGORY'})
      dispatch({type:'DEFAULT_DETECT'})

    }
  },[id,page,dispatch])
 
  const url=(cat)=>{
    return `/products/category?subCategory=${cat}`
  }
  return (
    <div className={`bg-white ${qty > 0 ? "lg:w-11/12":"w-full"}`}>
      {!detect &&
<PaginationBar products={products}/>
}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-cols-max xl:grid-cols-4 min-h-full py-2 pr-4">


      <div className=" border-r-2  py-2 pl-4 row-span-3">
        <h2 className="font-bold py-2 text-2xl">{actualCategory && actualCategory.title}</h2>
        {actualCategory &&
          subCategory &&
          subCategory.length > 0 &&
          subCategory.map((cat,i) => (
            <div className="py-2  " key={i}>
              <ul className={`${detect ? "font-semibold text-lg" : "cursor-pointer hover:text-yellow-600 text-lg"}`} 
              onClick={()=>      navigate(`${url(cat).replace(/\&page=\d+&price=(\w+|)/g,'')}&page=${currentPage||1}&price=${sortPrice}`)}
              >{cat}</ul>
              {!isLoadingCat && detect &&
                actualCategory.subCategory[cat]
                  .slice(0, actualCategory.subCategory[cat].length - 1)
                  .map((el) => (
                    <li
                      key={el}
                      className=" cursor-pointer hover:text-yellow-600"
                      onClick={()=>      
                      navigate(`${url(cat).replace(/\&subCategory2=\w+&page=\d+&price=(\w+|)/g,'')}&subCategory2=${el}&page=${currentPage||1}&price=${sortPrice}`)
                    }
                    >
                      {el}
                    </li>
                  ))}
            </div>
          ))}
      </div>
      {detect===null  && <Spinner/>}
      {!detect && isLoading &&
      <Spinner/>
      }
      {detect && isLoadingCat &&
      <Spinner/>
      }
 {detect &&
     actualCategory &&
     subCategory &&
     subCategory.length > 0 &&
     subCategory.map(
         category=> <CardCategories key={category} title={category} image={actualCategory.subCategory[category][actualCategory.subCategory[category].length-1].image} id={category._id}/>
      )
      } 
      {!isLoading && !detect ?
      products &&
      products.length > 0 ?
      products.map(
          product=><Product key={product._id} product={product} />
      ):
      <p>pas de produits</p>
      :<></>
      } 


    </div>

    {qty > 0 &&
      <SideBarOrders />
      }
    </div>
  );
}

export default ListSubCategory;
