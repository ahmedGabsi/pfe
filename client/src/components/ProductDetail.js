import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/solid";
import MultiCarousel from "./MultiCarousel";
import { addToCart, addToListViewsItems } from "../actions";
import SideBarOrders from "./SideBarOrders";
import { getProduct} from "../actions/products";
import Spinner from "./Spinner";

function ProductDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // const {
    
  //     description,
  //     price,
  //     rating,
  //     title,
    
  //     discountPercentage,
  //   } = product;
  const user=JSON.parse(localStorage.getItem("profile"))
  const [positionImg,setPositionImg] = useState({x:0,y:0})
  const [qtyProduct, setQtyProduct] = useState(1);
  const { id } = useParams();
  const { qty } = useSelector((state) => state.shoopingCart);
  const {products,isLoading}=useSelector(state=>state.products)
  const {image}=products
  const [defaultImg, setDefaultImg] = useState(null);
  useEffect(() => {
    if(image && image.length > 0){
      setDefaultImg(image[0].base64)
    }
  }, [image]);
  useEffect(() => {
    // const getProduct = async () => {
    //   const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
    //   setProduct(data);
    //   setDefaultImg(data.thumbnail);
    //   dispatch(addToListViewsItems(data));
    // };
    // getProduct();
    dispatch(getProduct(id))
    // if(products)
    // dispatch(addToListViewsItems(products))
    return () => {
      setQtyProduct(1);
    };
  }, [id, dispatch]);
  console.log("ty",products.stock)

  const {
    

    rating,
  
  } = products;

  // const productsSameManufacturer=products.filter(product=>product.brand === brand);
  // const productsSamePricee=products.filter(product=>product.price.toString().length === price.toString().length );
  // console.log(price.toString().length )

   let rate = [];
  // for (let i = 1; i <= Math.round(rating); i++) {
  //   rate.push(<StarIcon className="h-4 w-4 text-yellow-500" />);
  // }

  let newPrice = products.price;
  if (products.discountPercentage) {
    newPrice = products.price - ((products.price * products.discountPercentage) / 100);
  }
if(rating   && rating.length >0){
  const avgRating =rating.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  )/rating.length ;
for(let i=1;i<=Math.round(avgRating);i++){
rate.push(<StarIcon className="h-4 w-4 text-yellow-500"/>)
}
}
const test=(e)=>{
setPositionImg({x:e.clientX,y:e.clientY})
}
useEffect(() => {
  console.log(positionImg)

  
}, [positionImg])
console.log(products)

  return (
          <div className={`bg-white h-screen ${qty > 0 ? "md:w-11/12" : "w-full"}`}>

    {!isLoading ?

<>

            <img
              className="mx-auto w-full   "
              src="https://images-eu.ssl-images-amazon.com/images/G/08/EUBluefield/FDFO/LandingPage/FR_FDFO_LP_Banner_DK_1500x250_1.jpg"
              alt="aa"
            />
            <div className={"px-4 py-1 h-full"}>
              <div className="grid grid-rows-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-6 ">
                <div className="   md:col-span-2 md:row-span-3	 ">
                  <div className=" space-y-2 md:flex md:flex-row md:space-x-2 md:roww-s flex-col  w-full">
                    <div className="flex space-x-3 md:flex-col md:space-y-2 md:space-x-0  ">
                       {products?.image?.map((image,i) => (
                        <img
                        key={i}
                          src={image.base64}
                          
                          className="w-16 h-16 object-cover border border-gray-500 cursor-pointer hover:outline hover:outline-2 hover:outline-offset-1 hover:outline-yellow-700"  onMouseEnter={()=>setDefaultImg(image.base64)}
                         

                         
                        />
                      ))} 
                    </div>
                    <div></div>
                    <img
                      className=" object-contain h-48  md:h-96 md:w-[500px] w-96"
                      onMouseMove={test}
                      src={defaultImg}
                      alt={products.title}
                    />
                  </div>
                </div>
                <div className="lg:row-start-2 lg:row-span-3 lg:col-span-full lg:text-center  xl:col-end-4  xl:row-start-1 xl:col-span-1 space-y-3">
                  <p className="text-2xl font-semibold">{products.title}</p>
                  <div className="divide-y divide-fuchsia-300 space-y-3">
                    <div className="flex py-2xl:justify-left lg:justify-center ">
                      {rate.map((el, i) => (
                        <span key={i}>{el}</span>
                      ))}
                    </div>
                    <div className="py-2 text-lg">{products.description}</div>
                  </div>
                </div>
                <div className="xl:relative row-span-2	">
                  <div className=" block border shadow-sm	rounded-lg  overflow-hidden md:w-4/5 w-full  xl:absolute xl:right-0">
                    <div className="p-4 space-y-3">
                      <h2 className="mt-2 mb-2 text-2xl text-red-800 font-semiboldbold space-x-2">
                        {products.discountPercentage ? (
                          <>
                            <span>{newPrice} DT</span>
                            <span className="line-through text-sm">
                              {" "}
                            {products.price} DT
                            </span>
                          </>
                        ) : (
                          <p>{products.price} Dt</p>
                        )}
                      </h2>

                      <p className="text-base">{products.title}</p>
                      <p className="text-green-800 text-xl font-semibold">
                        In Stock
                      </p>
                      { user &&products && products.creator && user.loggedUser.id !== products.creator._id &&
<>
                      <div className="relative h-10 flex md:row-start-2 md:col-start-2  ">
                        <button className="text-black absolute left-0 top-0 focus:outline-none px-1 rounded-l-md h-full bg-gray-400  text-xs md:text-sm  ">
                          Quantité :
                        </button>

                        <input
                          type="number"
                          min="1"
                          max={products.stock}
                          className="border h-full pl-16 md:pl-20 w-full rounded-md"
                          value={qtyProduct}
                          onChange={(e) => setQtyProduct(+e.target.value)}
                        />
                      </div>
                      <div className="mt-3 flex items-center">
                        <button
                          className="bg-yellow-300 rounded-full w-full font-semibold  p-3 hover:bg-yellow-500"
                          onClick={() =>
                            dispatch(
                              addToCart({
                                ...products,
                               
                                qtyProduct,
                              })
                            )
                          }
                        >
                          {" "}
                          Ajouter au panier{" "}
                        </button>
                      </div>
                      </>
}
                    </div>
                  </div>
                </div>




                <div className="xl:relative row-span-1 cursor-pointer	" onClick={()=>navigate(`/products/user/${products?.creator?._id}`)}>
                  <div className=" bg-gray-200 text-center border shadow-sm	rounded-lg  overflow-hidden md:w-4/5 w-full  xl:absolute xl:right-0">
                    <div className="p-4 space-y-3">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ0_k4XokI-chey0QXFlbjtdgakiP7IZl6Jz1PEETuAIb27ESRpJERPfGBh58uylAYitA&usqp=CAU" className="w-32" alt="logoUser" />

                       <p className="text-base">{products?.creator?.firstName+" "+products?.creator?.lastName}</p> 
                      <div className="bg-blue-200 shadow-md p-2 ">
                        <label>Télephone :</label>
                      <a href={`tel:+${products?.phone}`} className="cursor-pointer">{products?.phone}</a>
                      </div>

                      

                      <div className="mt-3 flex items-center">
                        
                      </div>
                    </div>
                  </div>
                </div>




              </div>
              
            </div>
          

              {/* <div className="container mx-auto my-1">
                <MultiCarousel />
              </div> */}

{qty > 0 && <SideBarOrders />}

</>

      :
      <Spinner/>
}
</div>
  );
}

export default ProductDetail;
