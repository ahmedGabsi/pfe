import React, {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBarOrders from "./SideBarOrders";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategory } from "../actions/categories";
import CardCategories from "./CardCategories";
import { getProductsByCategory } from "../actions/products";
import Product from "./Product";
import { RESET_PRODUCTS } from "../actions/types";
import { useLocation } from "react-router-dom"

import Spinner from "./Spinner";
import Pagination from "./Pagination";
import PaginationBar from "./PaginationBar";

function ListSubCategory() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { id } = useParams();

  const {qty}=useSelector(state=>state.shoopingCart)

  const { actualCategory } = useSelector((state) => state.categories);
  const { products,loading,sortPrice,currentPage } = useSelector((state) => state.products);
  const [detect, setTypeObjectSubCategory] = useState(null);
  const [subCategory, setSubCategory] = useState({});


  function isObject(o) {
      
    return o instanceof Object && o.constructor === Object;
  }
  useEffect(() => {
    if(actualCategory.subCategory)
    setTypeObjectSubCategory(isObject(actualCategory.subCategory));
  }, [actualCategory.subCategory]);
  useEffect(() => {
    if(actualCategory.subCategory){

if(detect){
setSubCategory(Object.keys(actualCategory.subCategory))
}
if(!detect){
setSubCategory(actualCategory.subCategory)
}
    }
  },[detect])
  // let subCategory = {};
  // if (isObject(actualCategory.subCategory)) {
  //   detect = true;
  //   subCategory = Object.keys(actualCategory.subCategory);
  // } if (!isObject(actualCategory.subCategory)) {
  //   detect = false;
  //   subCategory = actualCategory.subCategory;
  // }
  useEffect(() => {
    if(id && !detect ){
    dispatch(getProductsByCategory(id,currentPage));
    }
    if(id && detect || detect===null ){
      dispatch({type:RESET_PRODUCTS})
    }
    console.log("detect",detect)
return()=>{
  dispatch({type:RESET_PRODUCTS})
}
    
  }, [dispatch, id,detect,currentPage]);
  useEffect(() => {
    if(id)
    dispatch(getSubCategory(id,currentPage));
    return ()=>{
      dispatch({type:'RESET_CATEGORY'})
    }
  },[id,currentPage,dispatch])
 
  const url=(cat)=>{
    return `/products/category?subCategory=${cat}`
  }
  console.log(detect)
  console.log(subCategory)
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
              {detect &&
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
 
      {!detect &&!loading?
      products &&
      products.length > 0 ?
      products.map(
          product=><Product key={product._id} product={product} />
      ):
      <Spinner/>
      :<></>
      } 

{detect &&
     actualCategory &&
     subCategory &&
     subCategory.length > 0 &&
     subCategory.map(
         category=> <CardCategories key={category} title={category} image={actualCategory.subCategory[category][actualCategory.subCategory[category].length-1].image} id={category._id}/>
      )
      } 
    </div>

    {qty > 0 &&
      <SideBarOrders />
      }
    </div>
  );
}

export default ListSubCategory;
