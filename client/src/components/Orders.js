import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Order from "./Order";
import { useDispatch } from "react-redux";
import axios from "axios";
import { UpdateOrders } from "../actions";
import ProductSaveForLater from "./ProductSaveForLater";
import ViewItem from "./ViewItem";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";
function Orders() {
const user=(JSON.parse(localStorage.getItem("profile")))?.loggedUser
const navigate= useNavigate()
  const { qty, orders, listSaveForLater, viewsItems,totalAmount } = useSelector(
    (state) => state.shoopingCart
  );
  const items = listSaveForLater.length;

  //   useEffect(() => {
  //     return ()=>{

  //             dispatch(saveForLater())

  //       }

  //   }, [dispatch]);
 const checkout=()=>{
   if(user){
    createCheckout()
   }
   else
   navigate('/auth')
 }

  const totalPrice =
    orders.length > 0 &&
    orders
      .map((ord) => ord.price * ord.qtyProduct)
      .reduce((previousValue, currentValue) => previousValue + currentValue);

  
      const stripePromise = loadStripe("pk_test_51LBnRDAcoLh1JnomYzVcu9tkeVfFkowIBAD0jKaOBnxFMqVTKrAGHwhW2nIw0nBhi62dQKY7Bwg13eZKcPFJFXRB00Z1xLF2mX");
      const createCheckout = async() =>{
        const stripe = await stripePromise
        const stripe_checkout = await axios.post(' http://localhost:5000/checkout',{
          orders,
          totalAmount,
          buyer:user
          
         
        })
        const result = await stripe.redirectToCheckout({
          sessionId: stripe_checkout.data.id,
        });
        if(result.error){
          alert("error")
        }
      }
  
  
      return (
    <div className="md:p-2 lg:p-4 xl:p-5 space-y-5  ">
      <div className= " grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4  md:gap-3 space-y-2  md:space-x-2 ">
        <div className="bg-white col-span-3 my-2 md:m-0 p-2 md:px-3 xl:px-5 w-full md:col-span-2 lg:col-span-3 md:row-span-1">
          {orders.length ? (
            <div className="grid grid-cols-1 divide-y ">
              <div className="md:flex md:justify-between hidden">
                <p className="text-3xl self-start py-5 font-semibold">
                Panier

                </p>
                <p className="self-end">Prix</p>
              </div>

              {orders.map((order) => (
                <Order key={order.id} order={order} />
              ))}
              <p className="text-xl font-semibold  text-right">
                total de prix ({qty}):{" "}
                <span className="font-bold">{totalPrice} DT</span>
              </p>
            </div>
          ) : (
            <div className="flex space-x-5 items-center	py-10">
              <img
                className=" w-2/6	"
                src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg"
                alt="Amazon Cart is empty"
              />
              {!user &&
              <div className=" space-y-2">
                <p className="text-2xl font-bold">Votre panier Amazon est vide </p>
 
                <button className="bg-yellow-400 py-1 px-2  text-center  rounded-md  text-lg hover:bg-yellow-500 ">
                Connectez-vous à votre compte{" "}
                </button>
              </div>
                }
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-3  h-full md:row-span-4 w-full order-first md:order-none  row-end-1 ">
          {orders.length > 0 && (
            <div className="bg-white p-3  min-h-28 space-y-5 ">
              <p className="text-xl font-semibold ">
                total ({qty + " produits"}):{" "}
                <span className="font-bold">{totalPrice} DT</span>
              </p>
              <button className="bg-yellow-400 w-full py-2 px-1 rounded-md  text-sm hover:bg-yellow-500 " onClick={checkout}>
              Passer à la caisse{" "}
              </button>
            </div>
          )}

          {viewsItems.length ? (
            <div className="bg-white p-4 space-y-3 w-full-height hidden md:block">
                <p className="text-lg  font-semibold">
                Vos produits récemment consultés                </p>

                  {viewsItems.slice(0,5).map((pr) => (
                    <ViewItem product={pr} key={pr.id} />
                  ))}
              </div>
          ) : (
            <p></p>
          )}
        </div>
        <div className="bg-white p-7 col-span-3">
        <div className="grid grid-cols-1 ">
          <p className="text-3xl  pb-5 font-semibold">Vos produits:</p>
          <div className="flex space-x-5 border-b px-3">
            <p className="link border-b-3 border-yellow-500">
              {listSaveForLater && items > 0
                ? `Enregistré pour plus tard  (${items} ${items < 2 ? "produit" : "produits"} )`
                : "Aucun Produit enregistré pour plus tard"}
            </p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-5 ">
            {listSaveForLater.length > 0 &&
              listSaveForLater.map((pr) => (
                <ProductSaveForLater product={pr} key={pr.id} />
              ))}
          </div>
        </div>
      </div>
      </div>

      
    </div>
  );
}

export default Orders;
