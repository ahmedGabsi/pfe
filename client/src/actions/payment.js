
import api from "../api";
import { FETCH_PAYMENTS_BY_BUYER, START_LOADING_PAYMENT, END_LOADING_PAYMENT,FETCH_PAYMENTS_BY_SELLER,FETCH_PAYMENTS } from "./types";

export const getPaymentsByBuyer = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_PAYMENT });
      const { data } = await api.get(`/payment/buyer/${id}`);
      dispatch({ type: FETCH_PAYMENTS_BY_BUYER, payload: data });
      dispatch({ type: END_LOADING_PAYMENT });

    } catch ({ message }) {
      console.log(message);
    }
}
export const getPaymentsBySeller = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_PAYMENT });
      const { data } = await api.get(`/payment/seller/${id}`);
      dispatch({ type: FETCH_PAYMENTS_BY_SELLER, payload: data });
      dispatch({ type: END_LOADING_PAYMENT });

    } catch ({ message }) {
      console.log(message);
    }
}
  
export const getPayments = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_PAYMENT });
    const { data } = await api.get(`/payment`);
    console.log(data)
    dispatch({ type: FETCH_PAYMENTS, payload: data });
    dispatch({ type: END_LOADING_PAYMENT });

  } catch ({ message }) {
    console.log(message);
  }
}
