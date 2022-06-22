import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../actions'

function ViewItem({product}) {
const navigate=useNavigate()
const dispatch= useDispatch()
const handleClick=(e)=>{
  e.stopPropagation()
  dispatch(addToCart({
    ...product,
    qtyProduct:1
   
  }))

}

  return (
    <div className="flex space-x-2 cursor-pointer  w-full" onClick={()=>navigate(`/products/${product._id}`)}>
    <img src={product?.image[0]?.base64} alt={product.title} className="w-24 h-24 object-cover" />
    <div>
        <p className="text-blue-700 font-semibold text-ellipsis overflow-hidden w-40 whitespace-nowrap	">{product?.title}</p>
        <p className="text-red-700">{product?.price} DT</p>
        <button className="bg-yellow-400 p-1 rounded-md text-xs" onClick={handleClick}>Ajouter au paner</button>
    </div>

    </div>
  )
}

export default ViewItem