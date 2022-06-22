
import api from "../api"
import {FETCH_USER,FETCH_USERS,CHANGE_ITEM_PAGINATION,DELETE_USER} from "./types"


export const getUser=(id)=>async(dispatch)=>{
    const {data}  = await api.get(`/users/${id}`)
    dispatch({type:FETCH_USER,payload:data})
  
  
  }
  export const getUsers=()=>async(dispatch)=>{
    const {data}  = await api.get(`/users`)
    dispatch({type:FETCH_USERS,payload:data})
  
  
  }

  export const deleteUser=(id)=>async(dispatch)=>{
  const {data} =  await api.delete(`/users/${id}`)
    dispatch({type:DELETE_USER,payload:id})
  
  }
  export const changeItemPagination = (payload) => async (dispatch) => {
    try {
      dispatch({ type: CHANGE_ITEM_PAGINATION, payload });
    } catch (err) {
      console.log(err);
    }
  };