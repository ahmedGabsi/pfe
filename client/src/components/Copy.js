import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategories } from '../actions/categories';
import { getProduct, getProductByID, getProducts, getProductsByUser, updateProduct } from '../actions/products';

function Copy() {
  const dispatch=useDispatch()
  const {id}=useParams()
  const onSubmit = async() => {
  
    await dispatch(
       updateProduct(id,x))

  }
 
  
  const [x,y]=useState({
    _id: "629d50b674e2882b59e088c0",
    creator: "6295434f0b6f844490807489",
    title: "eee",
    description: "aaa",
    image: [
        {
            id: 0,
            name: "Photo 3 Restaurant.jpeg",
            size: "248 kB",
            base64: "aa"
        }
    ],
    price: 450,
    discountPercentage: 10,
    city: "Béja",
    delegation: "Goubellat",
    stock: 111,
    phone: "29737939",
    rating: [
        5
    ],
    likes: [],
    subCategory: "Audio et Hi-Fi",
    subCategory2: "Radio-Réveils"
  
})
useEffect(() => {
  if(id)
  dispatch(updateProduct(id,x))

  dispatch(getProduct(id))

},[id,x])

  
  return (
    <button
                  type="button"
                  onClick={onSubmit}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Envoyer
                </button>
  )
}

export default Copy