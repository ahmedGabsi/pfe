import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPayments } from '../../actions/payment'
import PaginationAdmin from "./PaginationAdmin";
import SideBar from './SideBar';

function TransactionsAdmin() {
  const [value, setValue] = useState("");
   const dispatch =useDispatch()
   const {payments,startItemPagination, endItemPagination}=useSelector(state=>state.payments)
 
   useEffect(() => {
     
   dispatch(getPayments())
     
   }, [dispatch])
   console.log(payments.map(el=>el.orders).flat().map(el=>el.title))
  return (
    <div className="flex space-x-5 h-screen bg-gray-50">
    <SideBar/>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
 
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
        <th scope="col" className="px-6 py-3">
                Nom de produit
              </th>
              <th scope="col" className="px-6 py-3">
                Total prix de produit
              </th>
              <th scope="col" className="px-6 py-3">
                Email de vendeur
              </th>
              <th scope="col" className="px-6 py-3">
                Numéro de vendeur
              </th>
              <th scope="col" className="px-6 py-3">
                Email de client
              </th>
              <th scope="col" className="px-6 py-3">
                Numéro de client
              </th>
             
        
        </tr>
      </thead>
      <tbody>
        {payments &&
          payments.length > 0 &&
          payments.map(el=>el.orders).flat().map((payment) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={payment.id}>
             
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {payment.title}
              </th>
            
              <th
                scope="row"
                className="px-6 py-4 font-medium  text-red-600 whitespace-nowrap"
              >
                {payment.qty* payment.price} Dt
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {payment?.seller?.email}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {payment?.seller?.phone}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {payment.buyer?.email}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {payment.buyer.phone}
              </th>
              
              
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  </div>
    )
}

export default TransactionsAdmin