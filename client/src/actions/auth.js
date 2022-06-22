import api from "../api"
import {SIGN_IN_GOOGLE,LOG_OUT,SIGN_UP,SIGN_IN,UPDATE_USER, START_LOADING_AUTH, END_LOADING_AUTH,FETCH_USER} from "./types"

export const SignInWithGoogle=(payload)=>(
    {type:SIGN_IN_GOOGLE,payload}

)
export const signOut=()=>(
    {type:LOG_OUT,payload:null}

)
export const signUp=(auth)=>async(dispatch)=>{
    const {data}=await api.post("/users/signup",auth)
    dispatch({type:SIGN_UP,payload:data})

}

export const login=(auth)=>async(dispatch)=>{
  const {data}  = await api.post('/users/signin',auth)
  dispatch({type:SIGN_IN,payload:data})


}



export const updateUser=(id,auth)=>async(dispatch)=>{
    dispatch({ type: START_LOADING_AUTH });

    const {data}  = await api.patch(`/users/update/${id}`,auth)
    dispatch({type:UPDATE_USER,payload:data})
    dispatch({ type: END_LOADING_AUTH });

  
  
  }