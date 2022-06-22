import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function CardCategories({ id,title,image }) {
  const params = useParams()
  const navigate = useNavigate();
  // const image =
  //   category && products.find((el) => el.category === category).images[2];
  // const desc =
  //   category && products.find((el) => el.category === category).title;
  // onClick={() => navigate(`/products/category?subCategory=${title}`)}
  const setUrl=()=>{
    if(params.id){
      navigate(`/products/category?subCategory=${title}`)
    }
    else {
    navigate(`/categories/${id}`)
    }

  }

  return (
    <div
      className="max-w-sm z-50 p-4 relative bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      onClick={setUrl}
    >
      <h1 className="font-bold text-2xl">{title}</h1>
          <div className="my-5 h-64 cursor-pointer">
            <img src={image} alt={title} className=" object-cover  h-full" />
          </div>
      
      <div className=" py-3">
        <button className="inline-flex absolute bottom-2 items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Lire la suite

          <svg
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CardCategories;
