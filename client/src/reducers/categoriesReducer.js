import { FETCH_ALL_CATEGORIES, FETCH_CATEGORY,DEFAULT_LOADING_CATEGORY,START_LOADING_CATEGORY,END_LOADING_CATEGORY, CREATE_CATEGORY } from "../actions/types"

const categories=(state={isLoadingCat:null,categories:[],actualCategory:{}},action)=>{
   switch (action.type) {
      case DEFAULT_LOADING_CATEGORY:
         return {...state,isLoadingCat:null}
      case START_LOADING_CATEGORY:
         return {...state,isLoadingCat:true}
       case END_LOADING_CATEGORY:
         return {...state,isLoadingCat:false}
        case FETCH_ALL_CATEGORIES:
            return {...state,categories:action.payload}
            case CREATE_CATEGORY:
               return {...state,categories:[...state.categories,action.payload]}
         case FETCH_CATEGORY:
            return {...state,actualCategory:action.payload}
            case 'RESET_CATEGORY':
               return {...state,actualCategory:{}}
            default: return state
    }
   }

export default categories