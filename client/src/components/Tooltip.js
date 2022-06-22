import React, { useState } from "react";
import {
    DotsHorizontalIcon,
    KeyIcon,
    ThumbUpIcon,
    StarIcon,
  } from "@heroicons/react/solid";
  import { ThumbUpIcon as ThumbUpIconOutline ,TrashIcon} from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../actions/products";
function Tooltip({id}) {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [tooltipStatus, setTooltipStatus] = useState(0);
    return (
        <>
            <div className=" flex  absolute top-1" onClick={(e)=>e.stopPropagation()}>
                {/*Code Block for white tooltip starts*/}
                <div className="relative mt-20 md:mt-0" onMouseEnter={() => setTooltipStatus(1)} onMouseLeave={() => setTooltipStatus(0)} >
                    <div className="mr-2 cursor-pointer   p-2 bg-gradient-to-r from-red-50 rounded-full shadow-md border-2 border-red-600" >
                    <TrashIcon className="w-8 h-8 text-red-600" />
                    </div>
                    {tooltipStatus == 1 && (
                        <div role="tooltip" className="z-20  w-48 absolute transition duration-150 ease-in-out left-0  shadow-lg bg-red-600 text-white p-4 rounded">
                           <svg className="absolute   bottom-[65px] left-6 h-full" width="9px" height="16px" viewBox="0 0 9 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                    <g id="Tooltips-" transform="translate(-874.000000, -1029.000000)" fill="#dc2626">
                                        <g id="Group-3-Copy-16" transform="translate(850.000000, 975.000000)">
                                            <g id="Group-2" transform="translate(24.000000, 0.000000)">
                                                <polygon id="Triangle" transform="translate(4.500000, 62.000000) rotate(000000) translate(-4.500000, -62.000000) " points="4.5 57.5 12.5 66.5 -3.5 66.5" />
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <p className="text-sm font-bold  pb-1">Supprimer ce produit</p>
                            <p className="text-xs leading-4  pb-3">pour modifier il faut cliquer sur le bouton supprimer</p>
                            <div className="flex justify-between">
                                
                                <div className="flex items-center">
                                    <button className="focus:outline-none bg-white transition duration-150 ease-in-out hover:bg-gray-200 rounded text-red-600 px-5 py-1 text-xs" onClick={(e)=>{e.stopPropagation();dispatch(deleteProduct(id))}}>Supprimer</button>
                                </div>
                            </div>
                        </div>
                    )}{" "}
                </div>
                {/*Code Block for white tooltip ends*/}
                {/*Code Block for indigo tooltip starts*/}
                <div className="relative  md:my-0 md:mx-36" onMouseEnter={() => setTooltipStatus(2)} onMouseLeave={() => setTooltipStatus(0)}>
                    <div className="mr-2 cursor-pointer p-2 bg-gradient-to-r from-indigo-200 rounded-full shadow-md border-2 border-blue-600">
                       <KeyIcon className="w-8 h-8 text-blue-600"  />
                    </div>
                    {tooltipStatus == 2 && (
                        <div role="tooltip" className="z-20   w-48 absolute transition duration-150 ease-in-out right-2  shadow-lg bg-indigo-700 p-4 rounded">
                            <svg className="absolute   bottom-[74px] right-5 h-full" width="9px" height="16px" viewBox="0 0 9 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                    <g id="Tooltips-" transform="translate(-874.000000, -1029.000000)" fill="#4c51bf">
                                        <g id="Group-3-Copy-16" transform="translate(850.000000, 975.000000)">
                                            <g id="Group-2" transform="translate(24.000000, 0.000000)">
                                                <polygon id="Triangle" transform="translate(4.500000, 62.000000) rotate(000000) translate(-4.500000, -62.000000) " points="4.5 57.5 12.5 66.5 -3.5 66.5" />
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <p className="text-sm font-bold text-white pb-1">Modifier les données de ce produit</p>
                            <p className="text-xs leading-4 text-white pb-3">pour modifier il faut cliquer sur le bouton mise a jour</p>
                            <div className="flex justify-between">
                                
                                <div className="flex items-center ">
                                    <button className="bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-200 rounded text-indigo-700 px-5 py-1 text-xs" onClick={(e)=>{e.stopPropagation();navigate(`/updateProduct/${id}`)}}>Mise à jour</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/*Code Block for indigo tooltip ends*/}
                {/*Code Block for gray tooltip starts*/}
                
                {/*Code Block for gray tooltip ends*/}
            </div>
        </>
    );
}
export default Tooltip;
