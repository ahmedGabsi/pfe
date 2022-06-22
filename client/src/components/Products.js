import React, {useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Product from './Product';
import SideBarOrders from './SideBarOrders';
import { useDispatch, useSelector } from 'react-redux'
import { getProductsBySearch, getProductsBySubCategory, getProductsByUser } from '../actions/products'
import { useLocation } from "react-router-dom"
import Spinner from './Spinner';
import Pagination from './Pagination';
import PaginationBar from './PaginationBar';
import { DEFAULT_PRICE, RESET_PRODUCTS } from '../actions/types';
import { getUser } from '../actions/users';
import { PhoneIcon } from '@heroicons/react/solid'


const useQuery=(location)=>new URLSearchParams(location.search)
function Products() {
  const {qty}=useSelector(state=>state.shoopingCart)
  const {users,loading}=useSelector(state=>state.users)

    const {id}=useParams()
    const {products,isLoading} =useSelector(state=>state.products)
    const location=useLocation()

    const queryParams =useQuery(location)
    const subCategory=queryParams.get('subCategory')
    const subCategory2=queryParams.get('subCategory2')
    const page=queryParams.get('page')
    const product=queryParams.get('product')
    const price=queryParams.get('price')
    const likes=queryParams.get('likes')



  
    const dispatch = useDispatch()

    useEffect(() => {
      if(subCategory  || subCategory2   ){
        console.log(subCategory)
        dispatch (getProductsBySubCategory({subCategory,subCategory2},page,price,likes))
  
      }

      if(product  ) {
      
        dispatch(getProductsBySearch(product,page,price,likes))
        }
      if(id && !subCategory  && !subCategory2 &&!product   ) {
        dispatch(getUser(id))
      dispatch(getProductsByUser(id,page,price,likes))
      }

      return () =>{
              dispatch({type:RESET_PRODUCTS})

      }
      // return=()=>{
      //   dispatch{(type:RESET_PRODUCTS)}
      // }
     

    }, [dispatch,id,subCategory,subCategory2,page,product,price,likes])
  
    console.log(users)


  return (
  <>
 
  {!isLoading ?
    
  <div className={` p-x-2 ${qty > 0 ? "lg:w-11/12":"w-full"}`}>
      <PaginationBar products={products}/>

      {users && location.pathname.includes('/user/') &&
      <div className="flex flex-col items-center justify-center p-2 space-y-2"> 
                <div className=" w-32 h-28 p-2">

        {
        users.image ?
      <img src={users.image} className="rounded-full" alt=""/>:
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9bEl-sOq6JHgen4ZB0SgdblZGuMoUSnMXfw&usqp=CAU" alt="" className="rounded-full"/>
      
      } 
                  </div>

      <div className="text-xl font-semibold space-x-2 pt-6">
        <span>{users.firstName}</span>
        <span>{users.lastName}</span>
         </div>
        <div className="p-2 bg-gray-700 rounded-md text-white flex"> 
        <PhoneIcon className="h-6 w-6" /> {users?.phone}
        </div>
      </div>
      
      }
    <div className="grid md:grid-cols-3  lg:grid-cols-4   gap-3 mt-5 px-2 ">
  {/* <div className="row-span-full">
aaa
  </div> */}
      {products && products.length>0 &&products.map(product=>
      <Product key={product._id} 
      product={product}
      />)}

    </div>
    {qty > 0 &&
      <SideBarOrders />
      }
 { products.length < 1  &&
   <h1 className="text-xl flex justify-center font-semibold">Pas de produits ici </h1>
  }
    </div>
    
    :
    <Spinner/>
      }
      
    </>

  )
}

export default Products