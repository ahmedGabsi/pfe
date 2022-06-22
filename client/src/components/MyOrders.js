import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPaymentsByBuyer } from '../actions/payment'
import OrderPayment from './OrderPayment'

function MyOrders() {
    const dispatch=useDispatch()
    const {payments,isLoadingPayment}=useSelector(state=>state.payments)
    const{id}=useParams()
    useEffect(() => {
      dispatch(getPaymentsByBuyer(id))
    
      return () => {

        
      }
    }, [dispatch,id])
    console.log(payments)
  return (
<div className="w-screen px-1 py-10 md:max-w-screen-lg md:mx-auto md:p-10" >
   <h1 className="text-3xl font-bold border-b border-yellow-600 mb-2 pb-1 flex-grow">Mes commandes:</h1> 
    <div className="mt-5 space-y-4">
    {!isLoadingPayment ? payments.length >0 ? 
    payments.map(pay=><OrderPayment  order={pay} key={pay._id}/>):
    "Vous n'avez pas de commandes" :<></> }

    </div>


        
        
</div>
  )
}

export default MyOrders