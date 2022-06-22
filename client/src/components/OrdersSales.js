// import React from "react";

// function OrderPayment({ order }) {
//   return (
//     <>
//     {order?
   
//     <div className="relative border border-gray-500 rounded-md">
//       <div className="flex items-center justify-between p-5 px-10 bg-gray-100 text-sm  text-gray-600">
//         <div>
//           <p className="font-bold text-lg">Commande passée</p>
//           <p>{order.created_at}</p>
//         </div>
//         <div>
//           <p className="font-bold text-lg">Total:</p>
//           <p className="font-semibold text-lg">{order.totalAmount} DT</p>
//         </div>
//         <div>
//           <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
//             {order?.orders.length > 1
//               ? order?.orders.length + " produits"
//               : order?.orders.length + "produit"}{" "}
//           </p>
//         </div>
//       </div>{" "}
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 Vous avez recu votre produit ?
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Nom de produit
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Prix de produit
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Quantité de produit
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Email de vendeur
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Numéro de vendeur
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {order.orders.map((ord, i) => (
//               // <div key={i} className=" flex justify-between item-center py-5 px-10">
//               //     <h2 className="text-semibold">{ord.title}</h2>
//               //     <p className="">{ord.price} DT</p>
//               //     <p>{`${ord.qtyProduct>1 ?ord.qtyProduct+ " produits":ord.qtyProduct +" produit"}`}</p>
//               // </div>
//               <>
//                 <tr
//                   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
//                   key={i}
//                 >
//                   <th
//                     scope="row"
//                     className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
//                   >
//                     <button
//                       type="button"
//                       className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//                     >
//                       Je confirme
//                     </button>
//                   </th>
//                   <th
//                     scope="row"
//                     className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
//                   >
//                     {ord.title}
//                   </th>
//                   <th
//                     scope="row"
//                     className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
//                   >
//                     {ord.price} DT
//                   </th>
//                   <th
//                     scope="row"
//                     className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
//                   >
//                     {`${
//                       ord.qtyProduct > 1
//                         ? ord.qtyProduct + " produits"
//                         : ord.qtyProduct + " produit"
//                     }`}
//                   </th>
//                   <th
//                     scope="row"
//                     className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
//                   >
//                     {ord.seller.email}
//                   </th>
//                   <th
//                     scope="row"
//                     className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
//                   >
//                     {ord.phone}
//                   </th>
//                   {/* <td clas
//                 s="px-6 py-4">
//                     Sliver
//                 </td>
//                 <td className="px-6 py-4">
//                     Laptop
//                 </td>
//                 <td className="px-6 py-4">
//                     $2999
//                 </td>
//                 <td className="px-6 py-4 text-right">
//                     <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//                 </td> */}
//                 </tr>
//               </>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>:
//     <p></p>
  
// }
// </>
//   );
// }

// export default OrderPayment;

import React from 'react'

function OrdersSales({order}) {
  return (

<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
<th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
{order.title}
</th>
<td className="px-6 py-4">
{order.price} Dt
</td>

<td className="px-6 py-4">
{order.qtyProduct}</td>
<td className="px-6 py-4">
{order.buyer.email}</td>
<td className="px-6 py-4">
{order.buyer.firstName+" "+order.buyer.lastName}</td>
<td className="px-6 py-4">
{order.qtyProduct * order.price} DT</td>
</tr>


  )
}

export default OrdersSales
