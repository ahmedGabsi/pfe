import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { login } from "../actions";
import {  signUp, login } from "../actions/auth";

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userAuthenticated = localStorage.getItem("profile");
  const { isAuthenticated,userData,error } = useSelector((state) => state.auth);
  const [isSignUp, setIsSignUp] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  const [auth, setAuth] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone:""
  });
  const token = userData?.token || userAuthenticated?.token;
  const handleChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handleSubmit=(e)=>{
    e.preventDefault()
    setSubmitted(true)
    if(/\S+@\S+\.\S+/.test(auth.email) && (/\S{6,}/.test(auth.password))  ){
    if(isSignUp && (/\S{2,}/.test(auth.firstName)) && (/\S{2,}/.test(auth.lastName))&& (/\S{8,8}/.test(auth.phone)) && auth.password===auth.confirmPassword ){
    dispatch(signUp(auth))
    }
    else{
    dispatch(login({email:auth.email,password:auth.password}))
    }
  }
  console.log(userData)
  }
  return (
    <section className="h-full">
      <div className="container px-6 py-5 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            
            <form onSubmit={handleSubmit}>
            {error &&
            <div className="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" >
  <svg className="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
  <div>
    <span className="font-medium">{error} </span>
  </div>
</div>
}
              {isSignUp && (
                <>
                  <div className="mb-5">
                    <input
                      name="firstName"
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      placeholder="First Name"
                      value={auth.firstName}
                      onChange={handleChange}
                    />
                  {submitted && !(/\S{2,}/.test(auth.firstName)) &&<p className="text-red-600">Veuillez entrer votre prénom </p>}

                  </div>
                  <div className="mb-5">
                    <input
                      name="lastName"
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Last Name"
                      value={auth.lastName}
                      onChange={handleChange}
                    />
                                      {submitted && !(/\S{2,}/.test(auth.lastName)) &&<p className="text-red-600">Veuillez entrer votre nom </p>}

                  </div>
                </>
              )}
              <div className="mb-5">
                <input
                  name="email"
                  type="email"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Adresse Email"
                  value={auth.email}
                  onChange={handleChange}

                />
                {submitted && !(/\S+@\S+\.\S+/.test(auth.email)) &&<p className="text-red-600">Veuillez entrer une adresse email valide</p>}
              </div>

              <div className="mb-5">
                <input
                  name="password"
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Mot de passe"
                  value={auth.password}
                  onChange={handleChange}
                  
                />
                      {submitted && !(/\S{6,}/.test(auth.password)) &&<p className="text-red-600">Veuillez entrer un mot de passe qui contient au moins 6 caractéres</p>}

              </div>
              {isSignUp && (
                <>
                <div className="mb-5">
                  <input
                    name="confirmPassword"
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Confirmer le mot de passe"
                    value={auth.confirmPassword}
                    onChange={handleChange}
                  />
                                        {submitted &&auth.password!==auth.confirmPassword &&<p className="text-red-600">Veuillez entrer le méme mot de passe</p>}

                </div>
                 <div className="mb-5">
                 <input
                   name="phone"
                   type="text"
                   className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                   id="exampleFormControlInput2"
                   placeholder="Numéro de téléphone"
                   value={auth.phone}
                   onChange={handleChange}
                 />
                                       {submitted && !(/^\d{8}$/.test(auth.phone)) &&<p className="text-red-600">Veuillez entrer un numéro de téléphone correct</p>}

               </div>

               </>


              )}

              {/* <div className="flex justify-between items-center mb-5">
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  id="exampleCheck3"
                  checked
                />
                <label className="form-check-label inline-block text-gray-800" for="exampleCheck2"
                  >Remember me</label
                >
              </div>
              <a
                href="#!"
                className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                >Forgot password?
                </a>
            </div> */}

              {!isSignUp ? (
                <>
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    // onClick={() =>
                    //   dispatch(
                    //     login({ username: auth.email, password: auth.password })
                    //   )
                    // }
                  >
                   Se connecter
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Vous n'avez pas de compte ?
                    <span
                      onClick={() => {setIsSignUp(true);setSubmitted(false)}}
                      className="text-red-600 cursor-pointer hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      S'inscrire

                    </span>
                  </p>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                   S'inscrire

                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Vous avez déjà un compte?
                    <span
                      onClick={() => {setIsSignUp(false);setSubmitted(false)}}
                      className="text-red-600 cursor-pointer hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                     Se connecter
                    </span>
                  </p>
                </>
              )}

              

              {/* <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">OR</p>
              </div> */}

              {/* <button
                type="button"
                className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
              >
                <svg
                  className="w-4 h-4 mr-2 -ml-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Sign in with Google
              </button> */}

              
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Auth;
