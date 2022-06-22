import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPaymentsBySeller } from '../actions/payment'
import { DEFAULT_LOADING_PAYMENT } from '../actions/types'
import OrderPayment from './OrderPayment'
import OrdersSales from './OrdersSales'

function Sales() {
    const dispatch=useDispatch()
    const {payments,isLoadingPayment}=useSelector(state=>state.payments)
    const{id}=useParams()
    useEffect(() => {
      dispatch(getPaymentsBySeller(id))
    
      return () => {
dispatch({type:DEFAULT_LOADING_PAYMENT})
        
      }
    }, [])
  return (
<div className="w-screen px-1 py-10 md:max-w-screen-lg md:mx-auto md:p-10" >
   <h1 className="text-3xl font-bold border-b border-yellow-600 mb-2 pb-1 flex-grow">Mes ventes:</h1> 
    <div className="mt-5 space-y-4">
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

    {!isLoadingPayment ? payments &&  payments.length >0 ? 
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
    <th scope="col" className="px-6 py-3">
    Nom de produit</th>
    <th scope="col" className="px-6 py-3">
    Prix de produit
    
    </th>
    <th scope="col" className="px-6 py-3">
    Quantité de produit
    </th>
    <th scope="col" className="px-6 py-3">
    Email de client
    
    </th>
    <th scope="col" className="px-6 py-3">
    Nom de client</th>
    <th scope="col" className="px-6 py-3">
    Prix total</th>
    </tr>
    </thead>
    <tbody>
    {payments.map((pay,i)=>
    
    <OrdersSales order={pay} key={i}  />
  
    
    )}
    </tbody>
    </table>
    :
    "Vous n'avez pas de ventes" :<></> }
  
</div>
    </div>


        
        
</div>
  )
}

export default Sales