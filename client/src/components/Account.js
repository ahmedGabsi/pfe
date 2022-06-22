import React,{useEffect, useState} from "react";
import FileBase64 from "react-file-base64";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../actions/auth";

function Account() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

const {loggedUser} =JSON.parse(localStorage.getItem("profile"))  
const {id} = useParams()
const [image, setImage] = useState(loggedUser.image||null);
const dispatch = useDispatch()
const {loading }=useSelector(state=>state.auth)
const navigate=useNavigate()
const imagesFormat = [
    "image/jpg",
    "image/png",
    "image/gif",
    "image/svg",
    "image/jpeg",
  ];
const getFile = ({ base64,size, type }) => {
    if (imagesFormat.includes(type) && Number(size.split(" ")[0]) < 1024) {


      setImage(
          base64 
      )
    }
  };



useEffect(() => {
 if(loading===false  ) {
  navigate('/')
 }
 return()=>{
  dispatch({type:'DEFAULT_LOADING_AUTH'})
 }
}, [loading])


console.log()

  const onSubmit = (data) => {


    for(let key in data) {
      if(data[key] === "") {
         delete data[key]
      }
  }
    dispatch(updateUser(id,{...data,image}))
    
  }
  console.log(image)
  return (
    <form className="md:grid md:grid-cols-3 md:gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="md:col-span-1">
        <div className="p-5 text-center sm:px-0">
          <h3 className="text-xl font-bold leading-6 text-gray-900">Compte</h3>
          <p className="mt-1 text-sm font-semibold text-gray-600">
            Informations personnelles et de compte
          </p>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="mb-6">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Prénom :
                </label>
                <input
                  {...register("firstName")}
                  type="text"
                  id="firstName"
                  name="firstName"
                  defaultValue={loggedUser.firstName}
                  placeholder="Changer votre prénom"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                
              </div>

              <div className="mb-6">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Nom :
                </label>
                <input
                  {...register("lastName")}
                  type="text"
                  id="lastName"
                  name="lastName"
                  defaultValue={loggedUser.lastName}
                  placeholder="Changer votre nom"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
             
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  E-mail
                </label>
                <input
                  {...register("email")}
                  type="text"
                  id="email"
                  name="email"
                  defaultValue={loggedUser.email}
                  placeholder="Changer votre email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
               
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Mot de passe
                </label>
                <input
                {...register("password")}

                  type="password"
                  id="password"
                  name="password"
                  placeholder="Changer votre Mot de passe"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
               
              </div>





              <FileBase64
                      multiple={false}
                      onDone={(img) => getFile(img)}
                    />
                    {image ? 
                    <img src={image} alt="logo user"className="w-64 h-48" />:
                    <p> </p>
                    }

<div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Numéro de téléphone
                </label>
                <input
                {...register("phone")}

                  type="phone"
                  id="phone"
                  name="phone"
                  defaultValue={loggedUser.phone}

                  placeholder="Changer votre numéro de téléphone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
               
              </div>

                     <div className="mb-6">
                <label
                  htmlFor="actualPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Pour changer vos données entrez votre mot de passe actuel
                </label>
                <input
                {...register("actualPassword", { required: true})}

                  type="password"
                  id="actualPassword"
                  name="actualPassword"
                  placeholder="Entrez votre mot de passe actuel"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.actualPassword?.type === "required" && (
                  <p className="text-red-600">Le mot de passe est obligatoire pour changer vos données</p>
                )}
              </div>


            </div>

            <div></div>
            <button type="submit" className="text-white mx-auto flex justify-center bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Envoyer
            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>          </div>
        </div>
      </div>
    </form>
  );
}

export default Account;
