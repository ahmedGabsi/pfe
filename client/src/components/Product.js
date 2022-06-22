import React, { useState } from "react";
import {
 
  ThumbUpIcon,
  StarIcon,
  LocationMarkerIcon
} from "@heroicons/react/solid";
import { ThumbUpIcon as ThumbUpIconOutline } from "@heroicons/react/outline";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { likeProduct } from "../actions/products";
import Tooltip from "./Tooltip";

function Product({ product }) {
  const dispatch = useDispatch();
  const location=useLocation();
  const {id}=useParams()
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.loggedUser.id;
  const navigate = useNavigate();
  const [likes, setLikes] = useState(product?.likes);
  const hasLikedProduct = product.likes.find((like) => like === userId);
  const handleLike = async (e) => {
      e.stopPropagation()
    dispatch(likeProduct(product._id));

    if (hasLikedProduct) {
      setLikes(product.likes.filter((id) => id !== userId));
    } else {
      setLikes([...product.likes, userId]);
    }
  };
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <div className="flex">
          {" "}
          <ThumbUpIcon className="h-6 w-6 text-blue-600 cursor-pointer" />
          &nbsp;
          {likes.length}
        </div>
      ) : (
        <div className="flex">
          <ThumbUpIconOutline className="h-6 w-6  cursor-pointer" />&nbsp;{likes.length} 
        </div>
      );
    }

    return (
      <div className="flex">
        <ThumbUpIconOutline className="h-6 w-6  cursor-pointer" />
        &nbsp;J'aime
      </div>
    );
  };
 

  // let rate = [];
  // const avgRating =
  //   product.rating.reduce(
  //     (previousValue, currentValue) => previousValue + currentValue,
  //     0
  //   ) / product.rating.length;
  // for (let i = 1; i <= Math.round(avgRating); i++) {
  //   rate.push(<StarIcon className="h-4 w-4 text-yellow-500" />);
  // }

const navtoProductDetail=()=>{
    navigate(`/products/${product._id}`)
}

let newPrice = product.price;
  if (product.discountPercentage) {
    newPrice = product.price - ((product.price * product.discountPercentage) / 100);
  }




  return (
<div className="max-w-sm relative bg-[#f8f8f8] rounded-lg border cursor-pointer border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700  hover:bg-gray-100 "   onClick={navtoProductDetail}>
           

    <div className='w-full h-60'>
        
        <img className="rounded-t-lg w-full h-full " src={product.image[0].base64} alt={product.title} />
    </div>
   
    <div className="p-2">
        <div className="text-center">
            <h5 className="mb-2 text-xl   font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
        {/* <p className="flex mb-3 justify-center font-normal text-gray-700 dark:text-gray-400">{rate.map((el,i)=><span key={i}>{el}</span>)}</p>  */}
        <div className='text-xs font-semibold p-2 flex space-x-1 items-center justify-center '> <LocationMarkerIcon className="h-5 w-5"/> <div> {product.city} , {product.delegation}</div> </div>
        </div>

        <div className="flex justify-between">
        <div className="font-semibold flex text-xl space-x-3 items-center text-red-600"> {newPrice} DT</div>
         


<button
              
              disabled={!user?.loggedUser}
              onClick={handleLike}
            >
              <Likes />
            </button>
    </div>
    </div>
    {userId &&id && userId === id &&
    <Tooltip id={product._id}/>
    }


</div>  )
}

export default Product