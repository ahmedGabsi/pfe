import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'
function SideBarOrders() {
    const navigate =useNavigate()
    const dispatch=useDispatch()
    const {totalAmount,qty,orders} = useSelector(state => state.shoopingCart)
useEffect(() => {
 dispatch({type:'SIDE_BAR_IN'})
 return ()=>{
    dispatch({type:'SIDE_BAR_OUT'})

 }
}, [dispatch])


    return (
        <div className='hidden lg:block fixed right-0 top-0 bottom-0 w-1/12  h-full	 bg-white 	 pt-1 pb-5  border border-r-0 border-t-0 border-b-0 border-black border-opacity-25    '>
            <div className='arrow-cart'></div>
                        <div className='flex content-center flex-col h-full divide-y' >
                        <div className='self-center text-center'>
                        <p className="text-xl font-semibold"> Panier</p>
                        <p className='font-bold text-lg text-red-700'>{totalAmount} DT</p>
                            </div>
                        <div className=' w-full h-full overflow-auto space-y-8 py-1  divide-y'>
            {qty > 0  && orders.map(order=> 
            <div  key={order._id} onClick={()=>navigate(`/products/${order._id}`)}>
            <div key={order._id} className='relative flex items-center justify-center link py-1 cursor-pointer ' >
               
                <img key={order._id} src={order.image[0].base64} alt={order.title} className='h-16'/>
                {order.qtyProduct > 1 &&
                <p className='absolute top-full left-auto right-auto border border-black rounded-full h-5 w-5 flex items-center justify-center'>{order.qtyProduct}</p>
              }
              </div>
              </div>
                )
                }
                </div>
                                </div>
                                <style jsx="true">{`
              .arrow-cart{
    border-style: solid;
    border-width: 7px;
    border-color: transparent;
    border-right: 8px solid white;
    border-left-width: 0;
    width: 0;
    height: 0;
   
   
    content: " ";
    position: relative;
    top: 25px;
    left:-8px;
  
}
            `}</style>

        </div>
    )
}

export default SideBarOrders
