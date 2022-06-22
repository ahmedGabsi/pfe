import api from "../api";
import {

  FETCH_CATEGORY,
  FETCH_ALL_CATEGORIES,
  START_LOADING_CATEGORY,
  END_LOADING_CATEGORY, 
  CREATE_CATEGORY


} from "./types"

export const getCategories = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_CATEGORY });

  
      const { data } = await api.get("/categories");
      dispatch({ type: FETCH_ALL_CATEGORIES, payload: data });
      dispatch({ type: END_LOADING_CATEGORY });

    } catch ({ message }) {
      console.log(message);
    }
  };

  export const getSubCategory = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_CATEGORY });

      const { data } = await api.get(`/categories/${id}`);

      dispatch({ type: FETCH_CATEGORY, payload: data });
      dispatch({ type: END_LOADING_CATEGORY });

    } catch ({ message }) {
      console.log(message);
    }
  };
  
  
export const createCategory = (payload) => async (dispatch) => {
    try {
    dispatch({ type: START_LOADING_CATEGORY });

    const { data } = await api.post("/categories", payload);
    dispatch({ type: CREATE_CATEGORY, payload: data });
    dispatch({ type: END_LOADING_CATEGORY });
  } catch (err) {
    console.log(err);
  }
};