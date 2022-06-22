import { combineReducers } from "redux";
import products from './productsReducer'
import shoopingCart from './shoopingCartReducer'
import auth from './authReducer'
import categories from './categoriesReducer'
import payments from './paymentReducer'
import users from './usersReducer'
export default combineReducers({
    products,
    shoopingCart,
    auth,
    categories,
    payments,
    users
})