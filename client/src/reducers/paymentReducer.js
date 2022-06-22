import { CHANGE_ITEM_PAGINATION, DEFAULT_LOADING_PAYMENT, END_LOADING_PAYMENT, FETCH_PAYMENTS, FETCH_PAYMENTS_BY_BUYER, FETCH_PAYMENTS_BY_SELLER, START_LOADING_PAYMENT } from "../actions/types"



const payments=(state={isLoadingPayment:null,payments:[],diff:8,startItemPagination:0,endItemPagination:8},action)=>{
   switch (action.type) {
    //   case DEFAULT_LOADING_PAYMENT:
    //      return {...state,isLoadingPayment:null}
      case START_LOADING_PAYMENT:
         return {...state,isLoadingPayment:true}
       case END_LOADING_PAYMENT:
         return {...state,isLoadingPayment:false}

         case FETCH_PAYMENTS_BY_BUYER:
            return {...state,payments:action.payload}
            case FETCH_PAYMENTS_BY_SELLER:
            return {...state,payments:action.payload}
            case FETCH_PAYMENTS:
               return {...state,payments:action.payload}
            case DEFAULT_LOADING_PAYMENT:
               return {...state,isLoadingPayment:null}
               case CHANGE_ITEM_PAGINATION:
                  return {...state,startItemPagination:state.diff*action.payload-state.diff,endItemPagination:action.payload*state.diff};

           
            default: return state
    }
   }

export default payments