import { CHANGE_ITEM_PAGINATION, DELETE_USER, FETCH_USER, FETCH_USERS } from "../actions/types";

const usersReducer=(state={users:[],loading:null,diff:8,startItemPagination:0,endItemPagination:8,},action)=>{
    switch (action.type) {
     case FETCH_USER:
        return {...state,users:action.payload}
        case FETCH_USERS:
        return {...state,users:action.payload}
        case DELETE_USER:
          return {
            ...state,
            users: state.users.filter(
              (user) => user._id !== action.payload
            ),
          };
        
        
    case CHANGE_ITEM_PAGINATION:
        return {...state,startItemPagination:state.diff*action.payload-state.diff,endItemPagination:action.payload*state.diff};
       default: return state
    }
}

export default usersReducer