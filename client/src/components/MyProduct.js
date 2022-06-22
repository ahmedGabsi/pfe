import { useState, useEffect, useRef, useLayoutEffect } from "react";
import FileBase64 from "react-file-base64";
import ImageForm from "./ImageForm";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../actions/categories";
import { createProduct, getProduct, getProductsByUser, updateProduct } from "../actions/products";
import { useNavigate, useParams } from "react-router-dom";
import { RESET_MESSAGE } from "../actions/types";
import Spinner from "./Spinner";
import {Tunisia} from "./Tunisia"



export default function MyProduct() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm();
  const dispatch = useDispatch();
  const {id}=useParams()
  const { userData } = useSelector((state) => state.auth);
  const [disabled,setDisabled]= useState(false)
  // const { isLoading,products:{title,category,subCategory:sousCategory,subCategory2,phone,stock,price,discountPrice,description,city:oldCity,delegation:oldDelegation,image} } = useSelector((state) => state.products);
  const { products ,message,isLoading} = useSelector((state) => state.products);
  // const [category, setCategory] = useState("category");
  const {loggedUser}=JSON.parse(localStorage.getItem("profile"))
  const [selectValues,setSelectValues]=useState({
    category:'Catégorie',
    city:'Ville',
    delegation:'',
    subCategory:'',
    subCategory2:''
  })
  // const [city, setCity] = useState("Ville");
  // const [delegation, setDelegation] = useState("");
  const [typeObjectSubCategory, setTypeObjectSubCategory] = useState(null);
  const {categories} = useSelector((state) => state.categories);
  const [x, y] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const imagesFormat = [
    "image/jpg",
    "image/png",
    "image/gif",
    "image/svg",
    "image/jpeg",
  ];
  const [imagesProduct, setImagesProduct] = useState([]);
  const [idImg, setIdImg] = useState(0);
  useEffect(() => {
    dispatch(getCategories());
   
  }, [dispatch]);
  function isObject(o) {
    return o instanceof Object && o.constructor === Object;
  }
  useEffect(() => {
    if(id)
    dispatch(getProduct(id))

  },[id])
useEffect(() => {
  if(id ){
    reset({...products})
    setImagesProduct(products?.image)
    setSelectValues((prevstate)=>({...prevstate,delegation:products?.delegation,city:products?.city,category:products?.category?.title,subCategory:products?.subCategory,subCategory2:products?.subCategory2}))
  
  }

    else {
reset({title:'',description:'',price:'',discountPercentage:'',stock:'',image:'',city:'',delegation:'',phone:''})
setSelectValues({})
setImagesProduct([])

}

},[id,dispatch,reset,products])
useEffect(() => {
  
  setValue("delegation",selectValues.delegation)
  setValue("category",selectValues.category)
  setValue("subCategory",selectValues.subCategory)
  setValue("subCategory2",selectValues.subCategory2)

  setValue("city",selectValues.city)
  setValue("image",imagesProduct)



  },[selectValues.delegation,selectValues.category,selectValues.subCategory,selectValues.subCategory2,imagesProduct])
  
  

  const subCat = categories&&categories.length > 0 &&categories.find((el) => el.title === selectValues.category)?.subCategory;

  useEffect(() => {
    setTypeObjectSubCategory(isObject(subCat));
  }, [subCat]);
  console.log(products)
// useEffect(() => {
//   if(id){
// reset({...product})
// setImagesProduct(products.image)
// setSelectValues({...selectValues,delegation:products.delegation,city:products.city,category:products.category?.title,subCategory:products.subCategory,subCategory2:products.subCategory2})
//   }
 
// },[products,id])
  // useEffect(() => {
  //   dispatch({type:DEFAULT_LOADING})
  //   if(isLoading===false)
  //   navigate('/')  }, [isLoading,dispatch,navigate]);

  const deleteImg = (id) => {
    setImagesProduct(imagesProduct.filter((el) => el.id !== id));
  };
  const getFile = ({ base64, name, size, type }) => {
    if (imagesFormat.includes(type) && Number(size.split(" ")[0]) < 4096) {
      setIdImg(idImg + 1);

      setImagesProduct(
        [...imagesProduct, { id: idImg, name, size, base64 }].slice(0, 5)
      );
    }
  };
  const navigate = useNavigate();

  let subCategory = subCat;

  if (isObject(subCategory)) {
    subCategory = Object.keys(subCategory);
  }
  useEffect(() => {
   
    if(message==='ok'){
      navigate(`/products/user/${loggedUser.id}`)
    }  
    return () => {
      dispatch({type:RESET_MESSAGE})
    }
  }, [message])
  
  const onSubmit = (data) => {
    setDisabled("true")
    setSubmitted(true);
    if (selectValues.delegation && imagesProduct.length > 0) {
    if(id){
      dispatch(
        updateProduct(id,{
          ...data,
          creator: userData.id,
          category: categories.find((el) => el.title === selectValues.category)._id
        }))
       
          setTimeout(() => {
            navigate(`/products/user/${loggedUser.id}`)
    
          }, 3000);
    
        
    }
    else {
      dispatch(
        createProduct({
          ...data,
          creator: userData.id,
          category: categories.find((el) => el.title === selectValues.category)._id,
        })
        
      );
    }

     
      
    }
  };
  return (
    <>
    {id && isLoading && 
    <Spinner/>
    }
    {message==="loading" ?
    <Spinner/>
    :
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="p-5 text-center sm:px-0">
              <h3 className="text-xl font-bold leading-6 text-gray-900">
                Infos générales (obligatoires)
              </h3>
              <p className="mt-1 text-sm font-semibold text-gray-600">
                Entrer les détails de votre annonce
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Choisir une catégorie
                    </label>
                    <select
                      {...register("category", {
                        required: true,
                        pattern: /^((?!Catégorie).)*$/g,
                      })}
                      id="category"
                      name="category"
                      defaultValue={selectValues.category}
                      onChange={(e) =>setSelectValues({...selectValues,subCategory:'',category:e.target.value})}
                      className="py-2 bg-blue-100 w-full"
                    >
                      <option value={selectValues.category}>{selectValues.category}</option>)
                      {categories &&
                        categories.length > 0 &&
                        categories?.map((category) => (
                          <option key={category.title} value={category.title}>
                            {category.title}
                          </option>
                        ))}
                    </select>
                    {errors.category?.type === "required" && (
                    <p className="text-red-600">Veuillez choisir une catégorie </p>
                  )}
                  {errors.category?.type === "pattern" && (
                    <p className="text-red-600">Veuillez choisir une catégorie </p>
                  )}
                  </div>

                  <div className="">
                    <label
                      htmlFor="subCategory"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Choisir une sous-catégorie
                    </label>
                    <select
                      {...register("subCategory", {
                        required: true,
                      })}
                      id="subCategory"
                      name="subCategory"
                      defaultValue=""
                       
                      className="py-2 bg-blue-100 w-full"
                      onChange={(e)=>setSelectValues({...selectValues,subCategory:e.target.value,subCategory2:''})}

                    >
                      <option value=""></option>

                      {subCategory &&
                        subCategory.length > 0 &&
                        subCategory?.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                    </select>
                    {errors.subCategory?.type === "required" && (
                    <p className="text-red-600">Veuillez choisir une sous-catégorie </p>
                  )}
                  </div>

                  {typeObjectSubCategory && (
                    <div className="">
                      <label
                        htmlFor="subCategory2"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Choisir une sous-catégorie
                      </label>
                      <select

                        {...register("subCategory2", {
                          required: true
                        })}
                        id="subCategory2"
                        name="subCategory2"
                        defaultValue={""}
                        className="py-2 bg-blue-100 w-full"
                        onChange={(e)=>setSelectValues({...selectValues,subCategory2:e.target.value})}

                      >
                        <option value=""></option>

                        {subCat &&
                          subCat[watch().subCategory]?.slice(0,subCat[watch().subCategory].length-1).map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                      </select>
                      {errors.subCategory2?.type === "required" && (
                    <p className="text-red-600">Veuillez choisir une sous-catégorie </p>
                  )}
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Titre de l'annonce
                  </label>
                  <input
                    {...register("title", { required: true })}
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Entre le titre"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.title?.type === "required" && (
                    <p className="text-red-600">Entrer le nom du produit</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description du produit/service
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      defaultValue={watch().description}
                      className="shadow-sm px-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Description de produit"
                      {...register("description", {
                        required: true,
                        maxLength: 200,
                      })}
                    />
                  </div>
                  {errors?.description?.type === "required" && (
                    <p className="text-red-600">Entrez la description du produit</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="mb-6">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Prix
                  </label>
                  <div className="relative">
                    <input
                      {...register("price", {
                        required: true,
                        pattern: /^[0-9]+$/i,
                      })}
                      type="number"
                      id="price"
                      name="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Prix"
                    />
                    <span className="text-white absolute top-0.5 bottom-0.5 right-0 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 ">
                      dt
                    </span>
                  </div>
                  {errors?.price?.type === "required" && (
                    <p className="text-red-600">Entrez le prix de produit</p>
                  )}
                  {errors?.price?.type === "pattern" && <p>Numbers only</p>}
                </div>


                <div className="mb-6">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Remise
                  </label>
                  <div className="relative">
                    <input
                      {...register("discountPercentage", {
                        pattern: /^[0-9]+$/i,
                      })}
                      type="number"
                      id="discountPercentage"
                      name="discountPercentage"
                      min="0"
                      max="100"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Remise"
                    />
                    <span className="text-white absolute top-0.5 bottom-0.5 right-0 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 ">
                      %
                    </span>
                  </div>
                 
                  {errors?.discountPercentage?.type === "pattern" && <p></p>}
                </div>


                <div className="mb-6">
                  <label
                    htmlFor="stock"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Stock
                  </label>
                    <input
                      {...register("stock", {
                        required: true,
                        pattern: /^[0-9]+$/i,
                        min:1
                      })}
                      type="number"
                      id="stock"
                      name="stock"
                      min="1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Prix"
                    />
                    
                  {errors?.stock?.type === "required" && (
                    <p className="text-red-600">Entrez le stock de produit</p>
                  )}
                  {errors?.stock?.type === "pattern" && <p>Numbers only</p>}
                </div>








                </div>
                


                

                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="p-5 text-center sm:px-0">
            <h3 className="text-xl font-bold leading-6 text-gray-900">
              Photos Obligatoires
            </h3>
            <p className="mt-1 text-sm font-semibold text-gray-600">
              Postez jusqu'à 5 photos (taille max 4Mo)
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="flex justify-center items-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col justify-center items-center w-full h-50 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  {imagesProduct && imagesProduct.length > 0 && (
                    <div className="w-full p-5 text-right text-gray-700 text-lg font-semibold">{`${imagesProduct.length}/5`}</div>
                  )}

                  <div className="flex flex-col justify-center items-center pt-5 pb-6 h-full">
                    <svg
                      className="mb-3 w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold" >Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF
                    </p>
                  </div>
                  <div className="">
                    <FileBase64

                      multiple={false}
                      onDone={(img) => getFile(img)}
                    />
                    
                    
                  </div>
                </label>
              </div>
              <div className="py-1.5 flex space-x-2 space-y-1 flex-wrap ">
                {imagesProduct && imagesProduct.length > 0 && (
                  <img
                    src={imagesProduct[0].base64}
                    alt=""
                    className="w-full h-28 object-cover"
                  />
                )}
                {submitted && imagesProduct?.length === 0 && (
                  <p>Au moins une image !!</p>
                )}

                {imagesProduct && imagesProduct.length > 0 &&imagesProduct.map((img, i) => (
                  <ImageForm
                    key={i}
                    id={img.id}
                    base64={img.base64}
                    deleteImg={deleteImg}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="p-5 text-center sm:px-0">
              <h3 className="text-xl font-bold leading-6 text-gray-900">
                Emplacement et contact (obligatoires)
              </h3>
              <p className="mt-1 text-sm font-semibold text-gray-600">
                Entrez vos coordonnées
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-6 place-content-center">
                    <div className="">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 py-1"
                      >
                        Choisir l'emplacement
                      </label>
                      <select
                        {...register("city", 
                        {required: true,pattern: /^((?!Ville).)*$/g })}
                        id="city"
                        name="city"
                        defaultValue={selectValues.city}
                        onChange={(e) => {
                          setSelectValues({...selectValues,delegation:"",city:e.target.value});
                        }}
                        className="py-2 bg-blue-100 w-full"
                      >
                        <option value={selectValues.city}>{selectValues.city}</option>)
                        {Tunisia.map((dep) => (
                          <option key={dep.region} value={dep.region}>
                            {dep.region}
                          </option>
                        ))}
                      </select>
                      {errors?.city?.type === "required" && (
                      <p className="text-red-600">Veuillez choisir une ville</p>
                    )}
                    {errors?.city?.type === "pattern" && (
                      <p className="text-red-600">Veuillez choisir une ville</p>
                    )}

                    </div>
                    
                    <div className=" place-self-end w-full	">
                      <label
                        htmlFor="delegation"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Choisir la délégation
                      </label>
                      <select
                                              {...register("delegation", { required: true })}

                        id="delegation"

                        name="delegation"
                        defaultValue={selectValues.delegation}
                        onChange={(e) => setSelectValues({...selectValues,delegation:e.target.value})}
                        className="py-2 bg-blue-100 w-full"
                      >
                        <option value={selectValues.delegation}>{selectValues.delegation}</option>)
                        {selectValues.city &&
                          selectValues.city !== "Ville" &&
                          Tunisia
                            .find((tun) => tun.region === selectValues.city)
                            .ville.map((del) => (
                              <option key={del} value={del}>
                                {del}
                              </option>
                            ))}
                      </select>
                      
                       {errors?.delegation?.type === "required" && <p className="text-red-600">Veuillez choisir une délégation</p>} 
                    </div>
                  </div>
                  <div className="mb-6 flex flex-col items-center">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Numéro de contact
                    </label>
                    <input
                      type="number"
                      id="title"
                      maxLength="8"
                      name="title"
                      placeholder="-- --- ---"
                      className="bg-gray-50 border pl-20  w-56 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("phone", {
                        required: true,
                        maxLength: 8,
                        minLength: 8,
                      })}
                    />
                    {errors?.phone?.type === "required" && (
                      <p className="text-red-600">Entrez votre numéro </p>
                    )}
                    {errors?.phone?.type === "maxLength" && (
                      <p className="text-red-600">Le numéro doit étre composer de 8 chiffres</p>
                    )}
                    {errors?.phone?.type === "minLength" && (
                      <p className="text-red-600">Le numéro doit étre composer de 8 chiffres</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                disbaled={disabled}
                  type="submit"
                  className={`${disabled ? "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center":"inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" }`}
                 
                 >
                  {disabled  &&   <svg role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>
}
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
}
    </>
                    
  );
}




