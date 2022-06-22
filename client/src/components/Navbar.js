import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import decode from 'jwt-decode';
import {
  
  ShoppingCartIcon,
  
} from "@heroicons/react/solid";
import { signOut } from "../actions";
import { getCategories } from "../actions/categories";
import { DEFAULT_LOADING, DEFAULT_PRICE } from "../actions/types";
function Navbar() {
  const dispatch = useDispatch()
  const user=JSON.parse(localStorage.getItem("profile") ) ||null
  const { qty ,sideBar} = useSelector((state) => state.shoopingCart);
  const { isAuthenticated,userData } = useSelector((state) => state.auth);
  const  {categories} = useSelector((state) => state.categories)

  const [searchClicked, setSearchClicked] = useState(false);
  const [itemSearched, setItemSearched] = useState("");

  const [userProfileClicked, setUserProfileClicked] = useState(false);
  const [menuNavbar, setMenuNavbar] = useState(false);
  const [select, setSelect] = useState("All");

  const navigate = useNavigate();
  const location = useLocation();
  
  const refSearch = useRef();
  const refUserProfile = useRef();
  

  

  const logout = useCallback(() => {
    dispatch(signOut());

    navigate('/auth');
  },[dispatch,navigate]);


  useEffect(() => {
    const token =userData?.token

    if (token) {
      const decodedToken = decode(userData.token);
      setTimeout(logout, decodedToken.exp * 1000-new Date().getTime());
    }

  }, [location,logout,userData?.token]);


useEffect(() => {
dispatch(getCategories())
return () =>{
  dispatch({type:DEFAULT_LOADING})

}

}, [dispatch])



  useEffect(() => {
    const clickOutsideSearch = (e) => {
      if (refSearch.current && !refSearch.current.contains(e.target)) {
        setSearchClicked(false);
      }
    };
    document.addEventListener("mousedown", clickOutsideSearch);

    return () => {
      document.removeEventListener("mousedown", clickOutsideSearch);
    };
  }, [refSearch]);
  useEffect(() => {
    const clickOutsideUserProfile = (e) => {
      if (
        refUserProfile.current &&
        !refUserProfile.current.contains(e.target)
      ) {
        setUserProfileClicked(false);
      }
    };

    document.addEventListener("mousedown", clickOutsideUserProfile);

    return () => {
      document.removeEventListener("mousedown", clickOutsideUserProfile);
    };
  }, [refUserProfile]);
  const onChangeUserProfile = () => {
    setUserProfileClicked(!userProfileClicked);
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch({type:DEFAULT_PRICE})
    if(itemSearched){
navigate(`/products/search?product=${itemSearched}`)
    }
    if(select==="All"   && !itemSearched && itemSearched===""){
      navigate('/',{ state: { select: "All" } })



          }
    
    if(select && select !=="All" && !itemSearched && itemSearched===""){
             
        navigate(`/categories/${select}`,{ state: { detect: null } })
      // window.location=`/categories/${select}`


          }
    

  }
  return (
    <nav
      className={`bg-gray-900 border-gray-200 px-2 sm:px-6 py-1.5  ${
        qty > 0 &&sideBar ? "lg:w-11/12" : "w-full"
      } `}
    >
      <div className=" flex justify-between flex-wrap space-x-5 items-center w-full mx-auto rounded">
        <img
          src="https://i.pinimg.com/236x/a6/5d/6b/a65d6b218d6b6c225e2f2d9034041ddd--monogram.jpg"
          className="mr-3 h-6 w-12 sm:h-9 cursor-pointer"
          alt="FlowbiteLogo"
          onClick={() => navigate("/")}
        />
        <div className="flex md:order-3 space-x-3">
          {!isAuthenticated && (
            <button
              type="button"
              className=" py-2 px-5   text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() =>navigate('/auth')}
            >
              Se connecter
            </button>
            
        )}
                        {!location.pathname.includes("admin") &&

          <div
          className="  cursor-pointer -mt-[10px]   text-white "
          onClick={() => navigate("/cart/view")}
        >
          <p className="font-bold text-lg text-yellow-400 h-5 w-6 bg-amazon text-right">
            {qty}
          </p>

          <ShoppingCartIcon className=" h-9 w-9  " />
        </div>
}
        {isAuthenticated && (
          <div
            className=" flex items-center relative md:w-24 justify-center md:order-2"
            ref={refUserProfile}
          >
            <button
              className={`hidden  md:flex  justify-between w-full  items-center   md:mr-3 text-sm bg-gray-800 rounded-full mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 ${
                userProfileClicked ? "bg-green-700" : "bg-red-700 "
              }`}
              onClick={() => onChangeUserProfile()}
            >
              <img
                className={`w-9 h-9 rounded-full ease-in duration-300 ${
                  userProfileClicked ? "relative left-12 " : "relative left-0 "
                } `}
                src="https://ouch-cdn2.icons8.com/lKuVLNguQl_yxSAw5bVEIPSlgGLY3D2nd27prwfwzrk/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvODA3/LzM0NDExZmZlLTdk/YzYtNDYyNC04Nzgx/LTc1Zjc0MzFhM2Fk/Zi5zdmc.png"
                alt="userphoto"
              />
              <p></p>
            </button>
            <div
              className={`${
                userProfileClicked
                  ? "absolute top-3/4 right-auto left-auto "
                  : "hidden"
              } z-[500] my-4 w-[138px] text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
            >
              <div className="py-3 px-4">
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                {userData.firstName+' '+userData.lastName}
                </span>
              </div>
              <ul className="py-1" aria-labelledby="dropdown"  onClick={() => {
                    setUserProfileClicked(false);
                  }}>
                    {user?.loggedUser?.role !=="ADMIN" ?
                    <>
                 
            
                <li
                  
                >
                  <div className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"   onClick={()=>navigate(`/myOrders/${userData.id}`)}>
                    Mes commandes
                  </div>
                </li>
                <li
                 
                 >
                 
                  
                    <div className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"   onClick={()=>navigate(`/seller/${userData.id}`)}>
                      Mes ventes
                    </div>
                  </li>
                  <li
                   
                   >
                   <div className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                     onClick={()=>navigate(`/account/${userData.id}`)}>
                   Compte
 
                   </div>
                 </li>
                <li
                 
                >
                  <div className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={()=>navigate(`/newProduct`)}>
                  Ajouter un produit

                  </div>
                </li>

                <li onClick={()=>navigate(`/products/user/${userData.id}`)} >
                  <div className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Mes Produits
                  </div>
                </li>
                
               
                </>
                :
                
                <li>
                  <div className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={()=>navigate(`/admin/users`)}>
                    Tableau de bord
                  </div>
                </li>
                

                
                
              
                
        }
         <li>
                  <div 
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={()=>{dispatch(signOut());navigate('/auth')}}
                  >
                    Se déconnecter

                  </div>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setMenuNavbar(!menuNavbar)}
              className="md:hidden"
            >

              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        )}
                </div>
                {!location.pathname.includes("admin") &&

        <form
          className=" relative pt-2 w-full grow  md:p-0 md:w-auto"
          style={{ margin: 0 }}
          onSubmit={handleSubmit}
        >
          <div
            className={`flex p-0.5 ${
              searchClicked ? "bg-yellow-500" : ""
            } rounded-lg`}
            onClick={() => setSearchClicked(true)}
            ref={refSearch}
          >
            <select
              className="hidden md:block bg-gray-200 rounded-l-md focus:outline-none hover:bg-gray-300 "
              defaultValue={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              <option value="All" >
                Toutes Nos Catégories
              </option>{" "}
              {categories && categories.length >0 && categories.map(
                cat=>
                <option value={cat._id} key={cat.title} >
                {cat.title}
              </option>
              )}
            </select>

            <div className="relative w-full">
              <input
                className="block p-2.5 pl-5  w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:outline-none dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                value={itemSearched}
                onChange={(e) =>setItemSearched(e.target.value)}
              />
              <button
              
                type="submit"
                className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
            
        </form>
        }
      
      




        {menuNavbar && (
          <div
            className=" justify-between items-center w-full  md:w-auto md:order-1 md:hidden"
            style={{ margin: 0 }}
          >
           <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium" aria-labelledby="dropdown"  onClick={() => {
                    setUserProfileClicked(false);
                  }}>
                    {user?.loggedUser?.role !=="ADMIN" ?
                    <>
                   
                <li
                  
                >
                  <div className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"   onClick={()=>navigate(`/myOrders/${userData.id}`)}>
                    Mes commandes
                  </div>
                </li>
                <li
                 
                 >
                 
                  
                    <div className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"   onClick={()=>navigate(`/seller/${userData.id}`)}>
                      Mes ventes
                    </div>
                  </li>
                  <li
                   
                   >
                   <div className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                     onClick={()=>navigate(`/account/${userData.id}`)}>
                   Compte
 
                   </div>
                 </li>
                <li
                 
                >
                  <div className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    onClick={()=>navigate(`/newProduct`)}>
                  Ajouter un produit

                  </div>
                </li>

                <li onClick={()=>navigate(`/products/user/${userData.id}`)} >
                  <div className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">
                    Mes Produits
                  </div>
                </li>
                
               
                </>
                :
                
                <li>
                  <div className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" onClick={()=>navigate(`/admin/users`)}>
                    Tableau de bord
                  </div>
                </li>
                

                
                
              
                
        }
         <li>
                  <div 
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  onClick={()=>{dispatch(signOut());navigate('/auth')}}
                  >
                    Se déconnecter

                  </div>
                </li>
              </ul>
          </div>
        )}

      
      </div>
    </nav>
  );
}

export default Navbar;
