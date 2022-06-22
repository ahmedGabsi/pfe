import React, { useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { getProductsByLike } from '../actions/products'
import { ThumbUpIcon } from "@heroicons/react/solid";

import Banner from './Banner'
import ListCategory from './ListCategory'
import MultiCarousel from './MultiCarousel'
import { DEFAULT_PRICE } from '../actions/types';

function Home() {
  const {viewsItems}=useSelector(state=>state.shoopingCart)
  const {likedProducts}=useSelector(state=>state.products)
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getProductsByLike())
    dispatch({type:DEFAULT_PRICE})
   
  }, [dispatch])
  return (
  <>
  <Banner/>
      <ListCategory />
      {likedProducts && likedProducts.length >0  &&

      <div className="p-6 m-6 bg-white rounded-lg border border-gray-200 shadow-md ">
      <MultiCarousel title="Les produits les plus poulaires"  data={ likedProducts?.map((pr,i) => {
        return (
          <div className="cursor-pointer shadow-lg "           key={i}
          >
          <img
            draggable={true}
            style={{ width: "100%", height: "170px" }}
            src={pr.image[0].base64}
          />
          
          <div className="flex space-x-1  justify-around  px-1 ">
          <div className="px-2 text-gray-900 font-medium">{pr.title}</div> 
          <div className="flex">
            <p className="text-lg font-semi-bold"> {pr.likes.length}</p> <ThumbUpIcon className="h-6 w-6 text-blue-600" />   </div>
        </div>
          </div>
        );
      })}/>
      </div>
    }
      <div className="p-6 m-6 bg-white rounded-lg border border-gray-200 shadow-md ">

      <MultiCarousel  title="Les produits récemment consultés" data={viewsItems && viewsItems.length >0  && viewsItems?.map((v,i) => {
        return (
          <div className="cursor-pointer shadow-lg"           key={i}
          >
          <img
            draggable={true}
            style={{ width: "100%", height: "170px" }}
            src={v.image[0].base64}
          />
          <p className="px-2 text-gray-900 font-medium">{v.title}</p>
          </div>
        );
      })}/>
            </div>


       
  </>


    )
}

export default Home