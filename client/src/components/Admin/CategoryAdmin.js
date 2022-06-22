import React, { useEffect, useState } from 'react'
import FileBase64 from "react-file-base64";
import { useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../../actions/categories';

function CategoryAdmin() {
  const dispatch=useDispatch()
 const navigate= useNavigate()
  const [category,setCategory]=useState("")
  const [submitted,setSubmitted]=useState(false)

  const {isLoadingCat}=useSelector(state=>state.categories)
    const [inputFields, setInputFields] = useState([{
      subCategory:'',
  } ]);
  useEffect(() => {
    if(submitted && !isLoadingCat && isLoadingCat !==null)
    navigate('/')
  
    
  }, [isLoadingCat,submitted])
  

 
  const[image,setImage]=useState('')

  
    const addInputField = ()=>{
        setInputFields([...inputFields,{
          subCategory:'',
      } ])
    }
        const removeInputFields = (index)=>{
            const rows = [...inputFields];
            rows.splice(index, 1);
            setInputFields(rows);
       }
       const handleChange = (index, e)=>{
        
        const { name, value } = e.target;
        const list = [...inputFields];
        list[index][name] = value;
        setInputFields(list);
        
       }
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
      const handleSubmit=(e)=>{
        e.preventDefault()
        setSubmitted(true)
        dispatch(createCategory({title:category,image,subCategory:inputFields.map(el=>el.subCategory)}))
        console.log({category,image,subCategory:inputFields.map(el=>el.subCategory)})

      }
  return (

      <form onSubmit={handleSubmit}>
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
            <div className="p-5 text-center sm:px-0">
              <h3 className="text-xl font-bold leading-6 text-gray-900">Catégorie</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Ajouter une catégorie
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div >
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                      <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Catégorie</label>
                      <input type="text" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ajouter une catégorie" onChange={(e)=>setCategory(e.target.value)} />
                      </div>
                    </div>
  
                
  
                    <FileBase64
                      multiple={false}
                      onDone={(img) => getFile(img)}
                    />
                    {image ? 
                    <img src={image} alt="logo user"className="w-64 h-48" />:
                    <p> </p>
                    }
                   
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                   
                  </div>
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
              <h3 className="text-xl font-bold leading-6 text-gray-900">Sous-catégorie</h3>
                <p className="mt-1 text-sm text-gray-600">Ajouter une ou plusieurs sous-catégorie(s)</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div >
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="p-2">
                <div className="space-y-2">
                  {
                      inputFields.map((data, index)=>{
                          const {subCategory}= data;
                          return(
                            <div className="flex items-center justify-between " key={index}>
                    <div className="col">
                    <div>
            <label for="subCategory" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sous catégorie {1+index}</label>
            <input type="text" name="subCategory" id="subCategory" class="bg-gray-50 border w-96  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(evnt)=>handleChange(index, evnt)} value={subCategory} />
             </div>
                    </div>
                   
                    <div className="col">

                
                 {(inputFields.length!==1)?  <button type="button"  onClick={removeInputFields} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">X</button>:''}
                  
                 
                    </div>
                  </div>
                          )
                      })
                  }
     
                <div className="row">
                    <div className="col-sm-12">
                    <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={addInputField}>Ajouter une sous-catégorie</button>
                    </div>
                </div>
                  </div>
                <div className="col-sm-4">
                </div>
            </div>
            
                  </div>
                  
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">

              <button
                      type="submit"
                      className="inline-flex my-3 justify-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Envoyer
                    </button>
                    </div>
            </div>
            
          </div>
          
        </div>
  
        
        
      
      </form>
  

    )
}

export default CategoryAdmin