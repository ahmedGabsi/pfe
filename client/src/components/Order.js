import { TrashIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart,addToSavedForLater, deleteFromCart } from "../actions";

function Order({ order }) {
  const dispatch = useDispatch();

  const {
    id,
    image,
    title,
    subCategory,
    subCategory2,
    price,
    qtyProduct,
    description,
  } = order;
const clickDeleteOrders=()=>{
  dispatch(deleteFromCart(order))
}
  return (
    <div className="py-3 ">

    <div key={id} className="grid grid-cols-3    gap-x-3 gap-y-2 md:gap-y-0 ">
      <img
        src={image[0].base64}
        alt={description}
        className="w-full h-full object-cover md:row-span-2"
      />
      <div className="flex-col col-span-2">
        <p className="font-semibold text-xl">{title}</p>
        <p className="font-semibold hidden md:flex">{subCategory2 || subCategory}</p>
        <div className="flex"> {price} DT</div>

        <p className="text-green-500">En stock</p>
      </div>
      <div className='relative h-10 flex md:row-start-2 md:col-start-2  '>
      <button className="text-black absolute left-0 top-0 focus:outline-none px-1 rounded-l-md h-full bg-gray-400  text-xs md:text-sm  ">Quantité :</button>

       <input type="number" className="border h-full pl-16 md:pl-20 w-full rounded-md"  value={qtyProduct} onChange={(e)=>dispatch(addToCart({...order,qtyProduct:+(e.target.value)}))}/>

       </div>
        <div className="col-span-2 w-full md:row-start-2 md:col-start-3 space-x-1">
        <button
          type="button"
          className="py-2.5  px-2  mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={clickDeleteOrders}
        >
          Supprimer
        </button>

        <button
          type="button"
          className="py-2.5 px-2  mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={() =>{dispatch(addToSavedForLater(order))}}
        >
          Enregistrer plus tard
        </button>
        </div>
      </div>




      
    </div>
  );
}

export default Order;
