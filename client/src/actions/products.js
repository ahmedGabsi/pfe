import {

  START_LOADING,
  END_LOADING,
  FETCH_PRODUCTS,
  CREATE_PRODUCT,
  FETCH_PRODUCT,
  FETCH_PRODUCTS_BY_SEARCH,
  FETCH_PRODUCTS_BY_USER,
  FETCH_PRODUCTS_BY_CATEGORY,
  ADD_LIST_VIEWS_ITEMS,
  FETCH_PRODUCTS_BY_SUBCATEGORY,
  LIKE,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  LOADING_MESSAGE,
  FETCH_PRODUCTS_BY_LIKE,
  FETCH_PRODUCTS_BY_LIKES_DESC,
  FETCH_PRODUCTS_BY_PRICE_DESC,
  FETCH_PRODUCTS_BY_PRICE_ASC,
  SORT_PRICE,
  SORT_LIKES

} from "./types";

import api from "../api";
export const updateProduct = (id, product) => async (dispatch) => {
    
  try {
   const {data}= await api.patch(`/products/${id}`, product);
   dispatch({ type: UPDATE_PRODUCT, payload: data });


  } catch (err) {
    console.log(err);
  }
};

export const createProduct = (payload) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });

      const { data } = await api.post("/products", { ...payload,currentId:payload.creator});
      dispatch({ type: CREATE_PRODUCT, payload: data });
      dispatch({ type: END_LOADING });
    } catch (err) {
      console.log(err);
    }
  };
  export const getProducts = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.get("/products");
      dispatch({ type: FETCH_PRODUCTS, payload: data });
      dispatch({ type: END_LOADING });
    } catch ({ message }) {
      console.log(message);
    }
  };
  export const getProductsByUser = (id,page,price,likes) => async (dispatch) => {
    console.log(likes)
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.get(`/products/user/${id}?page=${page||1}&price=${price||""}&likes=${likes||""}`);
      dispatch({ type: FETCH_PRODUCTS_BY_USER, payload: data });
      dispatch({ type: END_LOADING });
    } catch ({ message }) {
      console.log(message);
    }
  };
  
  export const getProductsByCategory = (id,page,price,likes) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.get(`/products/category/${id}?page=${page||1}&price=${price||""}&likes=${likes||""}`);
      dispatch({ type: FETCH_PRODUCTS_BY_CATEGORY, payload: data });
      
      dispatch({ type: END_LOADING });
    } catch ({ message }) {
      console.log(message);
    }
  };
  export const getProductsByLike = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.get(`/products/likes`);
      dispatch({ type: FETCH_PRODUCTS_BY_LIKE, payload: data });

      dispatch({ type: END_LOADING});
    } catch ({ message }) {
      console.log(message);
    }
  };


  export const getProductsBySubCategory = (items,page,price,likes) => async (dispatch) => {
    const {subCategory,subCategory2}=items
    console.log("page",page)
    try {
      dispatch({ type: START_LOADING });
      let data
      if(subCategory2){
        data  = await api.get(`/products/subCategory?subCategory=${subCategory}&subCategory2=${subCategory2}&page=${page||1}&price=${price||""}&likes=${likes||""}`);
      }
      else{
         data  = await api.get(`/products/subCategory?subCategory=${subCategory}&page=${page||1}&price=${price||""}&likes=${likes||""}`);

      }
      dispatch({ type: FETCH_PRODUCTS_BY_SUBCATEGORY, payload: data.data });
      dispatch({ type: END_LOADING });
    } catch ({ message }) {
      console.log(message);
    }
  };
  export const getProduct = (id) => async (dispatch) => {
    try {

      dispatch({ type: START_LOADING });
      const { data } = await api.get(`/products/${id}`);

      dispatch({ type: FETCH_PRODUCT, payload: data });
      dispatch({ type: ADD_LIST_VIEWS_ITEMS, payload: data });


      dispatch({ type: END_LOADING });

    } catch ({ message }) {
      console.log(message);
    }
  };
  export const likeProduct = (id) => async (dispatch) => {
    try {

      const { data } = await api.patch(`products/${id}/likeProduct`);
      dispatch({ type: LIKE, payload: data });
      dispatch({ type: END_LOADING });

    } catch (error) {
      console.log(error.message);
    }
  };
  export const getProductsBySearch = (product,page,price,likes) => async (dispatch) => {
    try{
      dispatch({ type: START_LOADING });
  
    const { data } = await api.get(
      `/products/search?product=${product}&page=${page||1}&price=${price||''}&likes=${likes||""}`
    );

    dispatch({ type: FETCH_PRODUCTS_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  
    } 
    catch (err){
      console.log(err)
    }
  };


  export const deleteProduct = (id) => async (dispatch) => {
    try {
      const {data}=  await api.delete(`/products/${id}`);
  
      dispatch({ type: DELETE_PRODUCT, payload: id });
      
    } catch ({ message }) {
      console.log(message);
    }
  };
  export const sortByPrice=(payload)=>(
    {type:SORT_PRICE,payload}

)
export const sortByLikes=(payload)=>(
  {type:SORT_LIKES,payload}

)
