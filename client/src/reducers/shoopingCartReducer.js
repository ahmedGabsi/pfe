import {
  ADD_TO_CART,
  ADD_TO_SAVED_FOR_LATER,
  DELETE_FROM_CART,
  DELETE_FROM_LIST_SAVE_FOR_LATER,
  ADD_LIST_VIEWS_ITEMS,
  SIDE_BAR_IN,
  SIDE_BAR_OUT
} from "../actions/types";

const shoopingCartReducer = (
  state = { totalAmount:JSON.parse(localStorage.getItem("shoopingCart"))?.totalAmount ||  0 , qty:JSON.parse(localStorage.getItem("shoopingCart"))?.qty|| 0, orders:JSON.parse(localStorage.getItem("shoopingCart"))?.orders || [], listSaveForLater:JSON.parse(localStorage.getItem("shoopingCart"))?.listSaveForLater|| [] ,viewsItems:JSON.parse(localStorage.getItem("shoopingCart"))?.viewsItems||[] ,sideBar:false},
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      //       state.totalAmount+=action.payload.price
      //       state.qty= state.orders.map(el=>el.qty).reduce((previousValue, currentValue) => previousValue + currentValue)

      // state.orders.find(ord=>ord._id===action.payload._id).qty = action.payload.qty
      let newState = {};

      if (state.orders.find((ord) => ord._id === action.payload._id)) {
        const exist = state.orders.find((ord) => ord._id === action.payload._id);
        newState = {
          ...state,
          orders: state.orders.map((order) =>
            order._id === exist._id
              ? {
                  ...action.payload,
                }
              : order
          ),
        };
      } else {
        newState = {
          ...state,
          orders: [{ ...action.payload }, ...state.orders],
        };
      }

      let orders = newState.orders.map((order) =>
        order._id === action.payload._id
          ? { ...order, totalPrice: order.price * order.qtyProduct }
          : order
      );
      newState = { ...newState, orders };

      let totalAmount = newState.orders
        .map((order) => order.totalPrice)
        .reduce((previousValue, currentValue) => previousValue + currentValue);
      let qty = newState.orders
        .map((order) => order.qtyProduct)
        .reduce((previousValue, currentValue) => previousValue + currentValue);
       localStorage.setItem('shoopingCart', JSON.stringify({ ...newState, totalAmount, qty, viewsItems:newState.viewsItems.filter(order=>order._id !==action.payload._id) }))
      return { ...newState, totalAmount, qty, viewsItems:newState.viewsItems.filter(order=>order._id !==action.payload._id) };
      case DELETE_FROM_CART:
        
        const ordersAfterRemovedFromCart=state.orders.filter(order=>order._id !== action.payload._id )
        const x= ordersAfterRemovedFromCart.length ?
        ordersAfterRemovedFromCart
      .map((order) => order.qtyProduct)
      .reduce((previousValue, currentValue) => previousValue + currentValue) : 0;
      localStorage.setItem('shoopingCart', JSON.stringify({...state,orders: ordersAfterRemovedFromCart,qty:x }))

         return {...state,orders: ordersAfterRemovedFromCart,qty:x }
    case ADD_TO_SAVED_FOR_LATER:
      let newState1 = {};
      if (state.listSaveForLater.find((ord) => ord._id === action.payload._id)) {
        const exist = state.listSaveForLater.find(
          (ord) => ord._id === action.payload._id
        );
        newState1 = {
          ...state,
          listSaveForLater: state.listSaveForLater.map((order) =>
            order._id === exist._id
              ? {
                  ...action.payload,
                }
              : order
          ),
        };
      } else {
        newState1 = {
          ...state,
          listSaveForLater: [{ ...action.payload }, ...state.listSaveForLater],
        };
      }

      let orders1 = newState1.orders.map((order) =>
        order._id === action.payload._id
          ? { ...order, qtyProduct: 0, totalPrice: 0 }
          : order
      );
      let newQty = orders1
      .map((order) => order.qtyProduct)
      .reduce((previousValue, currentValue) => previousValue + currentValue);
      localStorage.setItem('shoopingCart', JSON.stringify({ ...newState1, orders: orders1.filter((order) => order.qtyProduct != 0) ,qty:newQty }))

      return { ...newState1, orders: orders1.filter((order) => order.qtyProduct != 0) ,qty:newQty };

    case DELETE_FROM_LIST_SAVE_FOR_LATER:
       const ordersAfterRemovedFromSaveForLater=state.listSaveForLater.filter(order=>order._id !== action.payload._id )
       localStorage.setItem('shoopingCart', JSON.stringify({...state,listSaveForLater: ordersAfterRemovedFromSaveForLater}))

       return {...state,listSaveForLater: ordersAfterRemovedFromSaveForLater}
     
    case ADD_LIST_VIEWS_ITEMS:
      if(! state.viewsItems.some(order=>order._id==action.payload._id) && ! state.orders.some(order=>order._id ===action.payload._id) && ! state.listSaveForLater.some(order=>order._id ===action.payload._id) ){
        localStorage.setItem('shoopingCart', JSON.stringify({...state,viewsItems:[action.payload,...state.viewsItems].slice(0,10)}))

        return {...state,viewsItems:[action.payload,...state.viewsItems].slice(0,10)}

      }
    case SIDE_BAR_IN:
      return {...state,sideBar:true}
      case SIDE_BAR_OUT:
      return {...state,sideBar:false}
    default:
      return state;
  }
};

export default shoopingCartReducer;
