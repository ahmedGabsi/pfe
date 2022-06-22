import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, deleteFromListSaveForLater} from "../actions";

function ProductSaveForLater({ product }) {
  const dispatch = useDispatch();
  const { id, image, price, title } = product;
  const clickMoveTocArt=()=>{ 
   
      dispatch(deleteFromListSaveForLater(product));dispatch(addToCart(product))
  }
 const clickDeleteFomCart=()=>{
   dispatch(deleteFromListSaveForLater(product))
 }


  return (
    
    <div className="border border-gray-200 p-3 h-full">
      <img src={image[0].base64} alt={title} className="h-56 w-full mx-auto object-cover " />
      <p className="text-xl">{title}</p>
      <p className="font-bold text-xl"> ${price}</p>
      <button
        type="button"
        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={clickMoveTocArt}
      >
        Move To Cart
      </button>

      <button
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      onClick={clickDeleteFomCart}
      >
        Delete
      </button>
    </div>
  );
}

export default ProductSaveForLater;
