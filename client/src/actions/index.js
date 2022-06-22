import {
  ADD_TO_CART,
  FETCH_PRODUCTS,
  ADD_TO_SAVED_FOR_LATER,
  UPDATE_STATE,
  DELETE_FROM_CART,
  DELETE_FROM_LIST_SAVE_FOR_LATER,
  ADD_LIST_VIEWS_ITEMS,
  SIGN_IN,
  SIGN_UP,
  LOG_OUT
} from "./types";
import axios from "axios";
// export const getProducts = () => async (dispatch) => {
//   try {
//     const { data } = await axios.get("https://dummyjson.com/products");
//     dispatch({ type: FETCH_PRODUCTS, payload: data.products });
//   } catch (e) {
//     console.log(e);
//   }
// };

export const addToCart = (payload) => ({
  type: ADD_TO_CART,
  payload,
});
export const addToSavedForLater = (payload) => ({
  type: ADD_TO_SAVED_FOR_LATER,
  payload,
});

export const UpdateOrders = () => ({
  type: UPDATE_STATE,
});

export const deleteFromCart = (payload) => ({
  type: DELETE_FROM_CART,
  payload,
});

export const deleteFromListSaveForLater = (payload) => ({
    type: DELETE_FROM_LIST_SAVE_FOR_LATER,
    payload,
  });

export const addToListViewsItems=(payload)=>({
  type:  ADD_LIST_VIEWS_ITEMS,
  payload

})
export const SignUp=(auth)=>async(dispatch)=>{
  const {data}=await axios.post("https://dummyjson.com/users/add",auth)
  dispatch({type:SIGN_UP,payload:data})

}

export const login=(auth)=>async(dispatch)=>{

const user  = await axios.post('https://dummyjson.com/auth/login',auth)
dispatch({type:SIGN_IN,payload:user.data})

}
export const signOut=()=>(
{type:LOG_OUT})